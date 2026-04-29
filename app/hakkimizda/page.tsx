import { ClipReveal } from "@/components/motion/clip-reveal";
import { InView } from "@/components/motion/in-view";
import { ManifestoMoment } from "@/components/motion/manifesto-moment";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { DarkCTA } from "@/components/layout/dark-cta";
import { EditorialList } from "@/components/layout/editorial-list";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Hakkımızda",
  "Sayamer Güzellik yaklaşımı, salon deneyimi ve bakım anlayışı.",
);

const values = [
  {
    id: "sadelik",
    title: "Sadelik",
    description:
      "Hizmetleri, fiyatları ve randevu adımlarını zorlamadan anlatan bir dijital deneyim.",
  },
  {
    id: "ozen",
    title: "Özen",
    description: "Salon içi düzen, uzman yönlendirmesi ve bakım kalitesi aynı çizgide ilerler.",
  },
  {
    id: "sureklilik",
    title: "Süreklilik",
    description:
      "İlk görüşmeden düzenli bakım programına kadar istikrarlı bir hizmet anlayışı sunulur.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        number="01"
        eyebrow="Hakkımızda"
        title="Güzelliğe sakin, planlı ve özenli bir yaklaşım."
        copy={siteContent.sections.welcomeCopy}
        dropCap
        photo={[
          siteContent.media.editorial[3].src,
          siteContent.media.editorial[1].src,
          siteContent.media.editorial[0].src,
        ]}
        photoAlt={siteContent.media.editorial[3].alt}
        actions={[
          { label: "Vizyon ve misyon", href: "/vizyon-ve-misyon", primary: true },
          { label: "Online randevu", href: "/randevu" },
        ]}
        backdropWord="HAKKIMIZDA"
      />

      <ManifestoMoment eyebrow="Felsefe" caption="— since 2019">
        <span>Bakım yalnızca </span>
        <em className="not-italic font-extrabold">sonuç</em>
        <span> değil, aynı zamanda </span>
        <em className="not-italic font-extrabold">süreçtir</em>
        <span>. Hizmetin kendisini, mekânı ve karşılamayı bütüncül tasarlıyoruz.</span>
      </ManifestoMoment>

      {/* 3-photo editorial bento */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <ClipReveal direction="up" duration={1.4}>
              <div className="relative overflow-hidden rounded-[36px] bg-mocha" style={{ minHeight: "440px" }}>
                <ParallaxImage
                  src={siteContent.media.editorial[3].src}
                  alt={siteContent.media.editorial[3].alt}
                  className="absolute inset-0"
                  amount={60}
                  scale={1.15}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-mochaDeep/70 via-mocha/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    Mekan
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                    Salon hissi
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
                    {siteContent.media.editorial[3].copy}
                  </p>
                </div>
              </div>
            </ClipReveal>

            <div className="grid gap-4">
              <ClipReveal direction="up" duration={1.2} delay={0.15}>
                <div className="relative overflow-hidden rounded-[36px]" style={{ minHeight: "210px" }}>
                  <ParallaxImage
                    src={siteContent.media.editorial[1].src}
                    alt={siteContent.media.editorial[1].alt}
                    className="absolute inset-0"
                    amount={45}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mochaDeep/45 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 font-display text-lg font-bold text-white">
                    Uygulama
                  </p>
                </div>
              </ClipReveal>
              <ClipReveal direction="up" duration={1.2} delay={0.3}>
                <div className="relative overflow-hidden rounded-[36px]" style={{ minHeight: "210px" }}>
                  <ParallaxImage
                    src={siteContent.media.editorial[0].src}
                    alt={siteContent.media.editorial[0].alt}
                    className="absolute inset-0"
                    amount={45}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mochaDeep/45 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 font-display text-lg font-bold text-white">
                    Bakım
                  </p>
                </div>
              </ClipReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Approach + trust list */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <SectionHeader
            number="02"
            eyebrow="Bakım yaklaşımımız"
            title="Süreç bizim için sonuç kadar önemli."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <InView>
              <p className="font-display text-2xl leading-[1.5] font-medium text-graphite sm:text-3xl">
                {siteContent.sections.comfortCopy}
              </p>
            </InView>

            <EditorialList
              variant="row"
              items={siteContent.trust.map((item, idx) => ({
                id: `trust-${idx}`,
                title: item,
                href: "/randevu",
              }))}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <SectionHeader
            number="03"
            eyebrow="Değerlerimiz"
            title="Çalışmamıza yön veren üç sözcük."
          />

          <EditorialList
            variant="row"
            className="mt-12"
            items={values.map((v) => ({
              id: v.id,
              title: v.title,
              description: v.description,
              href: "/uzmanlar",
            }))}
          />
        </div>
      </section>

      <DarkCTA
        number="04"
        eyebrow="Devam"
        title="Uzmanlarımızla tanışın, bakım rotanızı oluşturun."
        primaryCta={{ label: "Randevu al", href: "/randevu" }}
        secondaryCta={{ label: "Uzmanları gör", href: "/uzmanlar" }}
      />
    </div>
  );
}
