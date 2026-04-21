import Link from "next/link";

import { AppIcon } from "@/components/ui/app-icon";
import { Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { EditorialPhoto } from "@/components/ui/editorial-photo";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Hakkımızda",
  "Sayamer Güzellik yaklaşımı, salon deneyimi ve bakım anlayışı.",
);

const values = [
  {
    title: "Sadelik",
    copy: "Hizmetleri, fiyatları ve randevu adımlarını zorlamadan anlatan bir dijital deneyim.",
    icon: "spark" as const,
  },
  {
    title: "Özen",
    copy: "Salon içi düzen, uzman yönlendirmesi ve bakım kalitesi aynı çizgide ilerler.",
    icon: "shield" as const,
  },
  {
    title: "Süreklilik",
    copy: "İlk görüşmeden düzenli bakım programına kadar istikrarlı bir hizmet anlayışı sunulur.",
    icon: "leaf" as const,
  },
];

export default function AboutPage() {
  return (
    <div className="shell py-10">
      <section className="card p-8 sm:p-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-400">
          <Link href="/" className="hover:text-espresso">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-espresso">Hakkımızda</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow>Kurumsal</Eyebrow>
            <h1 className="mt-5 font-display text-display-lg text-espresso">
              Güzelliğe sakin, planlı ve özenli bir yaklaşım
            </h1>
            <p className="mt-5 text-base leading-8 text-ink-500">
              {siteContent.sections.welcomeCopy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/vizyon-ve-misyon" variant="primary" size="lg">
                Vizyon ve Misyon
              </LinkButton>
              <LinkButton href="/randevu" variant="outline" size="lg">
                Online Randevu
              </LinkButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-line shadow-editorial">
            <img
              src={siteContent.media.editorial[3].src}
              alt={siteContent.media.editorial[3].alt}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="spotlight-panel">
          <Eyebrow>Bakım Yaklaşımımız</Eyebrow>
          <h2 className="mt-4 font-display text-display-md text-espresso">
            Her adımda anlaşılır ve rahat bir deneyim
          </h2>
          <p className="mt-5 text-base leading-8 text-ink-500">
            {siteContent.sections.comfortCopy}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {siteContent.trust.map((item) => (
              <div key={item} className="card-muted">
                <AppIcon name="check" className="h-5 w-5 text-rosewood" />
                <p className="mt-3 text-sm leading-6 text-ink-500">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {siteContent.media.editorial.slice(0, 2).map((item) => (
            <EditorialPhoto
              key={item.src}
              src={item.src}
              alt={item.alt}
              eyebrow={item.eyebrow}
              title={item.title}
              copy={item.copy}
              imageClassName="aspect-[4/5] min-h-[260px]"
            />
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mt-16">
        <Eyebrow>Değerlerimiz</Eyebrow>
        <h2 className="mt-4 font-display text-display-md text-espresso">
          Çalışmamıza yön veren üç sözcük
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <article key={item.title} className="card p-7">
              <span className="icon-badge icon-badge-sm">
                <AppIcon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl text-espresso">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-500">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <Eyebrow>Devamı</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-espresso">
              Uzmanlarımızla tanışın, bakım rotanızı oluşturun
            </h2>
          </div>
          <div className="flex gap-3">
            <LinkButton href="/uzmanlar" variant="outline" size="lg">
              Uzmanlar
            </LinkButton>
            <LinkButton href="/randevu" variant="primary" size="lg">
              Randevu Al
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
