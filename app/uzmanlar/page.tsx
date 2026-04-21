import Link from "next/link";

import { Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { StaffCard } from "@/components/ui/staff-card";
import { getCatalog, getCategoryById } from "@/lib/catalog";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Uzmanlar",
  "Sayamer Güzellik uzman kadrosunu ve bakım alanlarını inceleyin.",
);

function getCategoryImage(categoryId: string) {
  return (
    siteContent.serviceCategoryMedia[
      categoryId as keyof typeof siteContent.serviceCategoryMedia
    ] ?? siteContent.media.editorial[0].src
  );
}

export default function ExpertsPage() {
  const catalog = getCatalog();
  const grouped = catalog.staff.reduce<Record<string, typeof catalog.staff>>((acc, member) => {
    acc[member.categoryId] = acc[member.categoryId] || [];
    acc[member.categoryId].push(member);
    return acc;
  }, {});

  return (
    <div className="shell py-10">
      {/* Hero */}
      <section className="card p-8 sm:p-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-400">
          <Link href="/" className="hover:text-espresso">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-espresso">Uzmanlar</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow>Uzmanlar</Eyebrow>
            <h1 className="mt-5 font-display text-display-lg text-espresso">
              Bakım alanlarına göre deneyimli ekibimiz
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-500">
              Her kategori için uzman ekip üyelerini görüntüleyebilir, uzmanlık alanlarını
              inceleyebilir ve ardından online randevu akışına geçebilirsiniz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/randevu" variant="primary" size="lg">
                Randevu Oluştur
              </LinkButton>
              <LinkButton href="/hizmetler" variant="outline" size="lg">
                Hizmetleri Gör
              </LinkButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-line shadow-editorial">
            <img
              src={siteContent.hero.slides[0].src}
              alt={siteContent.hero.slides[0].alt}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Category quick-jump */}
      <section className="mt-10">
        <div className="flex flex-wrap gap-2">
          {Object.keys(grouped).map((categoryId) => {
            const category = getCategoryById(categoryId);
            if (!category) return null;
            return (
              <Link
                key={categoryId}
                href={`#${categoryId}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-500 transition hover:border-rosewood/30 hover:bg-surface-muted hover:text-espresso"
              >
                {category.name}
                <span className="text-xs text-ink-400">{grouped[categoryId].length}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Staff groups */}
      <div className="mt-14 space-y-20">
        {Object.entries(grouped).map(([categoryId, members]) => {
          const category = getCategoryById(categoryId);
          if (!category) return null;

          return (
            <section key={categoryId} id={categoryId} className="scroll-mt-28">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="overflow-hidden rounded-3xl border border-line shadow-editorial">
                  <img
                    src={getCategoryImage(categoryId)}
                    alt={category.name}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>

                <div>
                  <Eyebrow>{category.name}</Eyebrow>
                  <h2 className="mt-4 font-display text-display-md text-espresso">
                    {category.heroLine}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-ink-500">{category.description}</p>

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {members.map((member) => {
                      const [firstName, ...rest] = member.name.split(" ");
                      return (
                        <StaffCard
                          key={member.id}
                          firstName={firstName}
                          lastName={rest.join(" ")}
                          title={member.title}
                          signature={member.signature}
                          specialties={member.specialties.slice(0, 3)}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <LinkButton href={`/hizmetler#${categoryId}`} variant="outline" size="md">
                      {category.name} hizmetleri
                    </LinkButton>
                    <LinkButton href="/randevu" variant="primary" size="md">
                      Randevu Al
                    </LinkButton>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
