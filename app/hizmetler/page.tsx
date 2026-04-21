import Link from "next/link";

import { Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { PriceCard } from "@/components/ui/price-card";
import { buildPageMetadata, siteContent } from "@/lib/site";
import { getCatalog } from "@/lib/catalog";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export const metadata = buildPageMetadata(
  "Hizmetler",
  "Sayamer Güzellik hizmetlerini kategori bazlı inceleyin ve online randevu oluşturun.",
);

function getCategoryImage(categoryId: string) {
  return (
    siteContent.serviceCategoryMedia[
      categoryId as keyof typeof siteContent.serviceCategoryMedia
    ] ?? siteContent.media.editorial[0].src
  );
}

export default function ServicesPage() {
  const catalog = getCatalog();

  return (
    <div className="shell py-10">
      {/* Hero */}
      <section className="card p-8 sm:p-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-400">
          <Link href="/" className="hover:text-espresso">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-espresso">Hizmetler</span>
        </nav>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>Hizmetler</Eyebrow>
            <h1 className="mt-5 font-display text-display-lg text-espresso">
              Güzelliğinize değer katan profesyonel bakım alanları
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-500">
              Saç, cilt, tırnak, epilasyon ve destekleyici bakım uygulamalarını kategori bazında
              inceleyebilir; süre, fiyat ve uzman eşleşmelerini net biçimde görebilirsiniz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/randevu" variant="primary" size="lg">
                Randevu Al
              </LinkButton>
              <LinkButton href="/paketler" variant="outline" size="lg">
                Paketleri Gör
              </LinkButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-line shadow-editorial">
            <img
              src={siteContent.media.editorial[1].src}
              alt={siteContent.media.editorial[1].alt}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="mt-10">
        <div className="flex flex-wrap gap-2">
          {catalog.categories.map((category) => (
            <Link
              key={category.id}
              href={`#${category.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-500 transition hover:border-rosewood/30 hover:bg-surface-muted hover:text-espresso"
            >
              {category.name}
              <span className="text-xs text-ink-400">
                {catalog.services.filter((s) => s.categoryId === category.id).length}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-14 space-y-20">
        {catalog.categories.map((category, index) => {
          const services = catalog.services.filter((service) => service.categoryId === category.id);
          const image = getCategoryImage(category.id);

          return (
            <section key={category.id} id={category.id} className="scroll-mt-28">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="overflow-hidden rounded-3xl border border-line shadow-editorial">
                    <img
                      src={image}
                      alt={category.name}
                      className="aspect-[5/4] w-full object-cover"
                    />
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <Eyebrow>{category.name}</Eyebrow>
                  <h2 className="mt-4 font-display text-display-md text-espresso">
                    {category.heroLine}
                  </h2>
                  <p className="mt-5 text-base leading-8 text-ink-500">{category.description}</p>

                  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="card-muted">
                      <dt className="eyebrow-text">Hizmet sayısı</dt>
                      <dd className="mt-2 font-display text-2xl text-espresso">
                        {services.length}
                      </dd>
                    </div>
                    <div className="card-muted">
                      <dt className="eyebrow-text">Fiyat aralığı</dt>
                      <dd className="mt-2 font-display text-2xl text-espresso">
                        {services.length > 0
                          ? `${formatCurrency(Math.min(...services.map((s) => s.price)))} – ${formatCurrency(Math.max(...services.map((s) => s.price)))}`
                          : "—"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <PriceCard
                    key={service.id}
                    name={service.name}
                    description={service.description}
                    price={service.price}
                    durationMinutes={service.durationMinutes}
                    imageUrl={image}
                    categoryLabel={service.tag ?? category.name}
                    href={buildBookingHref("/personeller", {
                      bookingType: "service",
                      itemId: service.id,
                    })}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="mt-24">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <Eyebrow>Devam et</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-espresso">
              Size uygun hizmeti seçin, biz uzmanla eşleştirelim
            </h2>
          </div>
          <LinkButton href="/randevu" variant="primary" size="lg">
            Online Randevu Oluştur
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
