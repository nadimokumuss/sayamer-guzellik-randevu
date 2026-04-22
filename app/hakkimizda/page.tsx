import Link from "next/link";

import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Hakkımızda",
  "Sayamer Güzellik yaklaşımı, salon deneyimi ve bakım anlayışı.",
);

const values = [
  {
    title: "Sadelik",
    copy: "Hizmetleri, fiyatları ve randevu adımlarını zorlamadan anlatan bir dijital deneyim.",
  },
  {
    title: "Özen",
    copy: "Salon içi düzen, uzman yönlendirmesi ve bakım kalitesi aynı çizgide ilerler.",
  },
  {
    title: "Süreklilik",
    copy: "İlk görüşmeden düzenli bakım programına kadar istikrarlı bir hizmet anlayışı sunulur.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <section className="warm-wash">
        <div className="shell pt-20 pb-20 lg:pt-32 lg:pb-24">
          <p className="eyebrow-tag" data-reveal>
            Hakkımızda
          </p>
          <h1
            className="mt-8 max-w-3xl font-display text-display-xl text-graphite"
            data-reveal
            data-reveal-delay="1"
          >
            Güzelliğe sakin, planlı ve özenli bir yaklaşım.
          </h1>
          <p
            className="mt-8 max-w-xl text-base leading-8 text-ash"
            data-reveal
            data-reveal-delay="2"
          >
            {siteContent.sections.welcomeCopy}
          </p>
          <div
            className="mt-12 flex flex-wrap items-center gap-8"
            data-reveal
            data-reveal-delay="3"
          >
            <Link href="/vizyon-ve-misyon" className="btn-minimal-solid">
              Vizyon ve misyon
            </Link>
            <Link href="/randevu" className="link-underline">
              Online randevu
            </Link>
          </div>
        </div>
      </section>

      {/* EDITORIAL PHOTO */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="overflow-hidden" data-reveal>
            <img
              src={siteContent.media.editorial[3].src}
              alt={siteContent.media.editorial[3].alt}
              className="h-[38vh] w-full object-cover transition duration-[1400ms] ease-out hover:scale-[1.02] lg:h-[48vh]"
            />
          </div>
          <div className="mt-6 flex items-start justify-between gap-6">
            <p className="max-w-md text-sm leading-7 text-ash">
              {siteContent.media.editorial[3].copy}
            </p>
            <p className="eyebrow-tag">Sayamer · Salon</p>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <p className="eyebrow-tag">Bakım yaklaşımımız</p>
            <div>
              <p className="font-display text-2xl leading-[1.5] text-graphite sm:text-3xl sm:leading-[1.5]">
                {siteContent.sections.comfortCopy}
              </p>
              <ul className="mt-12 rule-top">
                {siteContent.trust.map((item, index) => (
                  <li key={item}>
                    <div className="service-row">
                      <span className="service-row-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="service-row-name text-xl">{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-tag">Değerlerimiz</p>
            <h2 className="mt-6 font-display text-display-lg text-graphite">
              Çalışmamıza yön veren üç sözcük
            </h2>
          </div>

          <ul className="mt-16 rule-top">
            {values.map((item, index) => (
              <li key={item.title}>
                <div className="service-row flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="service-row-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-2xl text-graphite">{item.title}</p>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-ash">{item.copy}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-tag">Devam</p>
            <h2 className="mt-6 font-display text-display-lg text-graphite">
              Uzmanlarımızla tanışın, bakım rotanızı oluşturun.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/randevu" className="btn-minimal-solid">
                Randevu al
              </Link>
              <Link href="/uzmanlar" className="link-underline">
                Uzmanları görüntüle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
