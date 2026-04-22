import Link from "next/link";

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
    <div>
      {/* HERO */}
      <section className="shell pt-20 pb-20 lg:pt-32 lg:pb-24">
        <p className="eyebrow-tag">Uzmanlar</p>
        <h1 className="mt-8 max-w-3xl font-display text-display-xl text-graphite">
          Bakım alanlarına göre deneyimli ekibimiz.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-ash">
          Her kategori için uzman ekip üyelerini görüntüleyebilir, uzmanlık alanlarını
          inceleyebilir ve ardından online randevu akışına geçebilirsiniz.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Link href="/randevu" className="btn-minimal-solid">
            Randevu al
          </Link>
          <Link href="/hizmetler" className="link-underline">
            Hizmetleri gör
          </Link>
        </div>
      </section>

      {/* ANCHOR LIST */}
      <section className="rule-top bg-bone">
        <div className="shell py-12">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {Object.keys(grouped).map((categoryId, index) => {
              const category = getCategoryById(categoryId);
              if (!category) return null;
              return (
                <Link
                  key={categoryId}
                  href={`#${categoryId}`}
                  className="group inline-flex items-baseline gap-3 text-sm text-ash transition hover:text-graphite"
                >
                  <span className="font-display text-xs tabular-nums tracking-[0.18em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="border-b border-transparent group-hover:border-graphite">
                    {category.name}
                  </span>
                  <span className="text-[11px] tabular-nums text-ash/70">
                    ({grouped[categoryId].length})
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* STAFF GROUPS */}
      {Object.entries(grouped).map(([categoryId, members], groupIndex) => {
        const category = getCategoryById(categoryId);
        if (!category) return null;
        const reverse = groupIndex % 2 === 1;

        return (
          <section
            key={categoryId}
            id={categoryId}
            className="rule-top scroll-mt-24 bg-bone"
          >
            <div className="shell py-24 lg:py-32">
              <div
                className={`grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={getCategoryImage(categoryId)}
                    alt={category.name}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>

                <div>
                  <p className="eyebrow-tag">
                    {String(groupIndex + 1).padStart(2, "0")} · Kategori
                  </p>
                  <h2 className="mt-6 font-display text-display-lg text-graphite">
                    {category.name}
                  </h2>
                  <p className="mt-6 max-w-lg text-base leading-8 text-ash">
                    {category.description}
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-8">
                    <Link href={`/hizmetler#${categoryId}`} className="link-underline">
                      {category.name} hizmetleri
                    </Link>
                    <Link href="/randevu" className="link-underline">
                      Randevu al
                    </Link>
                  </div>
                </div>
              </div>

              <ul className="mt-16 rule-top">
                {members.map((member, index) => (
                  <li key={member.id}>
                    <div className="service-row flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                      <span className="service-row-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <p className="font-display text-2xl text-graphite">{member.name}</p>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-ash">
                          {member.title}
                        </p>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-ash">
                          {member.signature}
                        </p>
                        {member.specialties.length > 0 ? (
                          <p className="mt-4 text-xs leading-6 text-ash/80">
                            {member.specialties.slice(0, 4).join(" · ")}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* BOTTOM CTA */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-tag">Devam</p>
            <h2 className="mt-6 font-display text-display-lg text-graphite">
              Uzmanı seçtiyseniz, size uygun hizmet ve saati birlikte planlayalım.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/randevu" className="btn-minimal-solid">
                Randevu al
              </Link>
              <Link href="/paketler" className="link-underline">
                Paketleri görüntüle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
