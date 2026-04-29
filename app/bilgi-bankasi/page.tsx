import { DarkCTA } from "@/components/layout/dark-cta";
import { EditorialList } from "@/components/layout/editorial-list";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Bilgi Bankası",
  "Sayamer Güzellik bilgi bankası ve sık sorulan sorular.",
);

const quickLinks = [
  { id: "hizmetler", title: "Hizmetleri gör", href: "/hizmetler", meta: "Tüm bakım alanları" },
  { id: "paketler", title: "Paketleri incele", href: "/paketler", meta: "Çoklu seans avantajı" },
  { id: "randevu", title: "Online randevu", href: "/randevu", meta: "Anında onay" },
];

export default function KnowledgeBasePage() {
  return (
    <div>
      <PageHero
        number="01"
        eyebrow="Bilgi Bankası"
        title="Sık sorulan sorular ve kısa yanıtlar."
        copy="Randevu süreci, fiyat yaklaşımı ve paket seçimleri hakkında en çok sorulan konuların kısa yanıtları."
        photo={[
          siteContent.media.editorial[0].src,
          siteContent.media.editorial[3].src,
        ]}
        photoAlt={siteContent.media.editorial[0].alt}
        actions={[
          { label: "İletişim formu", href: "/iletisim", primary: true },
          {
            label: "WhatsApp",
            href: siteContent.contact.whatsappUrl,
            external: true,
          },
        ]}
        backdropWord="SSS"
      />

      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <SectionHeader
                number="02"
                eyebrow="Yardım"
                title="Sorunuz listede yok mu?"
                align="stacked"
              />
              <p className="mt-6 max-w-sm text-sm leading-7 text-ash">
                Ekibimize ulaşın, sizi en kısa sürede yönlendirelim. Çalışma saatleri içinde
                aynı gün dönüş yapıyoruz.
              </p>
            </div>

            <FaqAccordion items={siteContent.knowledgeBase.map((k) => ({ ...k }))} />
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <SectionHeader number="03" eyebrow="Hızlı bağlantılar" title="Sıradaki adım." />
          <EditorialList variant="row" className="mt-12" items={quickLinks} />
        </div>
      </section>

      <DarkCTA
        number="04"
        eyebrow="Yardım"
        title="Hâlâ aklınızda soru varsa yazın."
        primaryCta={{ label: "İletişim formu", href: "/iletisim" }}
        secondaryCta={{
          label: "WhatsApp",
          href: siteContent.contact.whatsappUrl,
          external: true,
        }}
      />
    </div>
  );
}
