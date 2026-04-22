import Link from "next/link";

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
    <div>
      {/* HERO — minimal */}
      <section className="shell pt-20 pb-20 lg:pt-32 lg:pb-24">
        <p className="eyebrow-tag">Hizmetler</p>
        <h1 className="mt-8 max-w-3xl font-display text-display-xl text-graphite">
          Saç, cilt, tırnak ve bakım için planlı bir akış.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-ash">
          Her bakım alanını aynı netlik ve özenle tasarlıyoruz. Süre, fiyat ve uzman
          eşleşmesi her zaman açık.
        </p>
      </section>

      {/* ANCHOR LIST */}
      <section className="rule-top bg-bone">
        <div className="shell py-12">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {catalog.categories.map((category, index) => (
              <Link
                key={category.id}
                href={`#${category.id}`}
                className="group inline-flex items-baseline gap-3 text-sm text-ash transition hover:text-graphite"
              >
                <span className="font-display text-xs tabular-nums tracking-[0.18em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="border-b border-transparent group-hover:border-graphite">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {catalog.categories.map((category, index) => {
        const services = catalog.services.filter((s) => s.categoryId === category.id);
        const image = getCategoryImage(category.id);
        const reverse = index % 2 === 1;

        return (
          <section
            key={category.id}
            id={category.id}
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
                    src={image}
                    alt={category.name}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>

                <div>
                  <p className="eyebrow-tag">
                    {String(index + 1).padStart(2, "0")} · Kategori
                  </p>
                  <h2 className="mt-6 font-display text-display-lg text-graphite">
                    {category.name}
                  </h2>
                  <p className="mt-6 max-w-lg text-base leading-8 text-ash">
                    {category.description}
                  </p>
                </div>
              </div>

              <ul className="mt-16 rule-top">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={buildBookingHref("/personeller", {
                        bookingType: "service",
                        itemId: service.id,
                      })}
                      className="service-row flex-col items-start gap-3 transition hover:pl-2 hover:text-clay sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <span className="flex-1">
                        <span className="block font-display text-xl text-graphite sm:text-2xl">
                          {service.name}
                        </span>
                        <span className="mt-2 block max-w-xl text-sm leading-6 text-ash">
                          {service.description}
                        </span>
                      </span>
                      <span className="service-row-meta whitespace-nowrap">
                        {service.durationMinutes} dk
                      </span>
                      <span className="service-row-meta whitespace-nowrap tabular-nums">
                        {formatCurrency(service.price)}
                      </span>
                    </Link>
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
              Hizmetinizi seçtiyseniz, uzman ve saati birlikte planlayalım.
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
