import { InView } from "@/components/motion/in-view";
import { CountUp } from "@/components/motion/count-up";
import { RevealText } from "@/components/motion/reveal-text";
import { BrandCTA } from "@/components/layout/brand-cta";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Hakkımızda",
  "Sayamer Güzellik Merkezi yaklaşımı, salon deneyimi ve bakım anlayışı.",
);

const values = [
  {
    id: "sadelik",
    title: "Sadelik",
    description:
      "Hizmetleri, fiyatları ve randevu adımlarını zorlamadan anlatan bir dijital deneyim.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "ozen",
    title: "Özen",
    description: "Salon içi düzen, uzman yönlendirmesi ve bakım kalitesi aynı çizgide ilerler.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 21s-7-4.5-7-11a4.5 4.5 0 0 1 7-3.7A4.5 4.5 0 0 1 19 10c0 6.5-7 11-7 11z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "sureklilik",
    title: "Süreklilik",
    description:
      "İlk görüşmeden düzenli bakım programına kadar istikrarlı bir hizmet anlayışı sunulur.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 12a8 8 0 0 1 14-5l2-2v6h-6l2-2A6 6 0 0 0 6 12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12a8 8 0 0 1-14 5l-2 2v-6h6l-2 2a6 6 0 0 0 10-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="bg-surface">
      {/* Hero */}
      <section>
        <div className="shell pt-12 pb-10 lg:pt-16 lg:pb-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <InView>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                  Hakkımızda
                </p>
              </InView>
              <RevealText
                as="h1"
                className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900"
                stagger={0.06}
              >
                Güzelliğe sakin, planlı ve özenli bir yaklaşım.
              </RevealText>
              <InView delay={0.15}>
                <p className="mt-5 text-[15px] leading-7 text-ink-500">
                  {siteContent.sections.welcomeCopy}
                </p>
              </InView>
              <InView delay={0.25}>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { value: 10, suffix: "+", label: "Yıllık Tecrübe" },
                    { value: 5, suffix: "k+", label: "Mutlu Müşteri" },
                    { value: 24, suffix: "", label: "Uzman Personel" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white px-4 py-5 text-center shadow-card">
                      <p className="font-display text-2xl font-extrabold tracking-tight text-brand-700">
                        <CountUp to={stat.value} />{stat.suffix}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-600">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </InView>
            </div>
            <InView>
              <div className="relative overflow-hidden rounded-3xl shadow-card" style={{ aspectRatio: "4/5" }}>
                <img
                  src={siteContent.media.editorial[3].src}
                  alt={siteContent.media.editorial[3].alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-white">
        <div className="shell py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <InView>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                Bakım yaklaşımımız
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900">
                Süreç bizim için sonuç kadar önemli.
              </h2>
            </InView>
            <InView delay={0.15}>
              <p className="text-[16px] leading-8 text-ink-700">
                {siteContent.sections.comfortCopy}
              </p>
              <ul className="mt-6 space-y-3">
                {siteContent.trust.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] leading-6 text-ink-600">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </InView>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface">
        <div className="shell py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
              Değerlerimiz
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900">
              Çalışmamıza yön veren üç sözcük.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <InView key={v.id} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-cardHover">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-600">
                    {v.icon}
                  </span>
                  <h3 className="mt-5 font-display text-[18px] font-bold text-ink-900">{v.title}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-ink-500">{v.description}</p>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      <BrandCTA
        title="Uzmanlarımızla tanışın, bakım rotanızı oluşturun."
        copy="Hizmet veya paketinizi seçin; ekibiniz uygun saat aralığında sizi bekliyor."
        primaryCta={{ label: "Randevu Al", href: "/randevu" }}
        secondaryCta={{ label: "Uzmanları Gör", href: "/uzmanlar" }}
      />
    </div>
  );
}
