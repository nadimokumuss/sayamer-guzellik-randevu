import { ClipReveal } from "@/components/motion/clip-reveal";
import { ManifestoMoment } from "@/components/motion/manifesto-moment";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { DarkCTA } from "@/components/layout/dark-cta";
import { EditorialList } from "@/components/layout/editorial-list";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Vizyon ve Misyon",
  "Sayamer Güzellik vizyonu, misyonu ve çalışma yaklaşımı.",
);

const principles = [
  {
    id: "karar",
    title: "Karar vermeyi kolaylaştırmak",
    description:
      "Hizmet, süre ve fiyat bilgilerini açık sunarak müşteri için hızlı bir karar zemini oluşturuyoruz.",
  },
  {
    id: "operasyon",
    title: "İletişim, hijyen ve düzenle bakım kalitesi",
    description:
      "Rezervasyondan seans sonrasına kadar süreci destekleyen operasyonel çerçeveyi titizlikle tutuyoruz.",
  },
  {
    id: "his",
    title: "Güvenli ve sakin bir salon hissi",
    description:
      "Kişisel ilgi ve tutarlı hizmet ile müşterinin dönüş niyetini güçlendiriyoruz.",
  },
];

export default function VisionMissionPage() {
  return (
    <div>
      <PageHero
        number="02"
        eyebrow="Vizyon ve Misyon"
        title="Bakım deneyimini tüm yolculukla birlikte tasarlıyoruz."
        copy="Sayamer, salon atmosferini ve bakım hizmetlerini aynı sakin çizgide buluşturan bir güzellik evi olmayı hedefler."
        photo={[
          siteContent.media.editorial[1].src,
          siteContent.media.editorial[0].src,
          siteContent.media.editorial[3].src,
        ]}
        photoAlt={siteContent.media.editorial[1].alt}
        actions={[
          { label: "Hakkımızda", href: "/hakkimizda" },
          { label: "Randevu al", href: "/randevu", primary: true },
        ]}
        backdropWord="VIZYON"
      />

      <ManifestoMoment eyebrow="Vizyon" caption="— Sayamer · 2030">
        {siteContent.visionMission.vision}
      </ManifestoMoment>

      <ManifestoMoment eyebrow="Misyon" caption="— Bugün ve her gün">
        {siteContent.visionMission.mission}
      </ManifestoMoment>

      {/* Editorial photo */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <ClipReveal direction="up" duration={1.4}>
            <div className="relative overflow-hidden rounded-[36px]" style={{ height: "52vh", minHeight: "420px" }}>
              <ParallaxImage
                src={siteContent.media.editorial[1].src}
                alt={siteContent.media.editorial[1].alt}
                className="absolute inset-0"
                amount={70}
                scale={1.15}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mochaDeep/55 via-mocha/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                  Sayamer · {siteContent.media.editorial[1].eyebrow}
                </p>
                <p className="mt-3 max-w-xl font-display text-2xl font-bold text-white">
                  {siteContent.media.editorial[1].title}
                </p>
              </div>
            </div>
          </ClipReveal>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <SectionHeader
            number="03"
            eyebrow="İlkelerimiz"
            title="Her ziyaretin arkasında üç temel çalışma prensibi."
          />
          <EditorialList
            variant="row"
            className="mt-12"
            items={principles.map((p) => ({
              id: p.id,
              title: p.title,
              description: p.description,
              href: "/randevu",
            }))}
          />
        </div>
      </section>

      <DarkCTA
        number="04"
        eyebrow="Başlayalım"
        title="Bakım planlamak sizin için kolay, uygulama bizim işimiz."
        primaryCta={{ label: "Randevu al", href: "/randevu" }}
        secondaryCta={{ label: "Hakkımızda", href: "/hakkimizda" }}
      />
    </div>
  );
}
