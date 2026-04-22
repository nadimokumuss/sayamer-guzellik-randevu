import Link from "next/link";

import { getCatalog, getServiceById } from "@/lib/catalog";
import { buildPageMetadata, siteContent } from "@/lib/site";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export const metadata = buildPageMetadata(
  "Paketler",
  "Sayamer Güzellik hazır paketlerini ve fiyat avantajlarını inceleyin.",
);

export default function PackagesPage() {
  const catalog = getCatalog();

  return (
    <div>
      {/* HERO */}
      <section className="shell pt-20 pb-20 lg:pt-32 lg:pb-24">
        <p className="eyebrow-tag">Paketler</p>
        <h1 className="mt-8 max-w-3xl font-display text-display-xl text-graphite">
          Tek rezervasyonda planlanan bakım paketleri.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-ash">
          İçeriği, süresi ve fiyat avantajı önceden belirlenmiş paketlerle bakım planınızı
          tek adımda oluşturabilirsiniz.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Link href="/randevu" className="btn-minimal-solid">
            Randevu al
          </Link>
          <Link href="/hizmetler" className="link-underline">
            Tekli hizmetler
          </Link>
        </div>
      </section>

      {/* PROMO */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow-tag">Bu ay</p>
              <h2 className="mt-6 font-display text-display-lg text-graphite">
                Kampanyalar
              </h2>
            </div>
          </div>

          <ul className="mt-16 rule-top">
            {siteContent.promos.map((promo, index) => (
              <li key={promo.title}>
                <Link
                  href={promo.href}
                  className="service-row flex-col items-start gap-3 transition hover:pl-2 hover:text-clay sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="service-row-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-2xl text-graphite">{promo.title}</p>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-ash">
                      {promo.detail}
                    </p>
                  </div>
                  <span className="flex items-baseline gap-3">
                    <span className="text-sm text-ash line-through tabular-nums">
                      {promo.oldPrice}
                    </span>
                    <span className="service-row-meta tabular-nums">{promo.price}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-tag">Tüm paketler</p>
            <h2 className="mt-6 font-display text-display-lg text-graphite">
              Salon içinde planladığımız bakım programları
            </h2>
          </div>

          <div className="mt-16 space-y-24">
            {catalog.packages.map((pkg, index) => {
              const primaryService = getServiceById(pkg.primaryServiceId);
              const image =
                siteContent.serviceCategoryMedia[
                  (primaryService?.categoryId ?? "cilt-bakimi") as keyof typeof siteContent.serviceCategoryMedia
                ] ?? siteContent.media.editorial[0].src;
              const reverse = index % 2 === 1;

              return (
                <article key={pkg.id} className="rule-top pt-12">
                  <div
                    className={`grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20 ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={image}
                        alt={pkg.name}
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="eyebrow-tag">
                        {String(index + 1).padStart(2, "0")} · {pkg.savingsLabel}
                      </p>
                      <h3 className="mt-6 font-display text-display-lg text-graphite">
                        {pkg.name}
                      </h3>
                      <p className="mt-6 max-w-lg text-base leading-8 text-ash">
                        {pkg.description}
                      </p>

                      <div className="mt-10">
                        <p className="eyebrow-tag">Paket içeriği</p>
                        <ul className="mt-6 space-y-2 text-sm leading-7 text-ash">
                          {pkg.includedServiceIds.map((serviceId) => {
                            const s = getServiceById(serviceId);
                            if (!s) return null;
                            return (
                              <li key={serviceId} className="flex items-baseline gap-3">
                                <span className="font-display text-[11px] tabular-nums text-ash/70">
                                  —
                                </span>
                                <span>{s.name}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="mt-10 flex items-baseline justify-between border-t border-hairline pt-6">
                        <div>
                          <p className="eyebrow-tag">Paket fiyatı</p>
                          <p className="mt-3 font-display text-display-md text-graphite tabular-nums">
                            {formatCurrency(pkg.price)}
                          </p>
                          <p className="mt-2 text-sm text-ash">{pkg.durationMinutes} dk</p>
                        </div>
                        <Link
                          href={buildBookingHref("/personeller", {
                            bookingType: "package",
                            itemId: pkg.id,
                          })}
                          className="btn-minimal-solid"
                        >
                          Paketi seç
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-tag">Devam</p>
            <h2 className="mt-6 font-display text-display-lg text-graphite">
              Hazır paketler yerine tekli hizmet tercih ederseniz, aynı netlikte bir akış sizi bekliyor.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/randevu" className="btn-minimal-solid">
                Randevu al
              </Link>
              <Link href="/hizmetler" className="link-underline">
                Hizmetleri görüntüle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
