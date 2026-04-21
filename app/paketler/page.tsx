import Link from "next/link";

import { Badge, Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
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
    <div className="shell py-10">
      {/* Hero */}
      <section className="card p-8 sm:p-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-400">
          <Link href="/" className="hover:text-espresso">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-espresso">Paketler</span>
        </nav>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow>Hazır Paketler</Eyebrow>
            <h1 className="mt-5 font-display text-display-lg text-espresso">
              Tek rezervasyonda planlanan bakım paketleri
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-500">
              İçeriği, süresi ve fiyat avantajı önceden belirlenmiş paketlerle bakım planınızı tek
              adımda oluşturabilirsiniz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/randevu" variant="primary" size="lg">
                Randevu Oluştur
              </LinkButton>
              <LinkButton href="/hizmetler" variant="outline" size="lg">
                Tekli Hizmetler
              </LinkButton>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line shadow-editorial">
            <img
              src={siteContent.categoryHighlights[2].image}
              alt="Paketler"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Promo strip */}
      <section className="mt-10">
        <Eyebrow>Bu Ay Kampanyalar</Eyebrow>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {siteContent.promos.map((promo) => (
            <Link
              key={promo.title}
              href={promo.href}
              className="group card flex flex-col gap-3 p-6 transition hover:-translate-y-1"
            >
              <Badge variant="soft">Fırsat</Badge>
              <h3 className="font-display text-2xl text-espresso">{promo.title}</h3>
              <div className="flex items-end gap-3">
                <span className="text-sm text-ink-400 line-through">{promo.oldPrice}</span>
                <span className="font-display text-3xl text-espresso">{promo.price}</span>
              </div>
              <p className="text-sm text-ink-500">{promo.detail}</p>
              <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-rosewood">
                İncele →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Packages grid */}
      <section className="mt-16 space-y-10">
        <div className="flex flex-col gap-3">
          <Eyebrow>Tüm Paketler</Eyebrow>
          <h2 className="font-display text-display-md text-espresso">
            Salon içinde planladığımız bakım programları
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {catalog.packages.map((pkg, index) => {
            const primaryService = getServiceById(pkg.primaryServiceId);
            const image =
              siteContent.serviceCategoryMedia[
                (primaryService?.categoryId ?? "cilt-bakimi") as keyof typeof siteContent.serviceCategoryMedia
              ] ?? siteContent.media.editorial[0].src;

            return (
              <article
                key={pkg.id}
                className="card overflow-hidden p-0"
              >
                <div className="grid gap-0 sm:grid-cols-[0.85fr_1.15fr]">
                  <div className="relative overflow-hidden">
                    <img
                      src={image}
                      alt={pkg.name}
                      className="h-full min-h-[220px] w-full object-cover"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge variant="dark">{pkg.savingsLabel}</Badge>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <Eyebrow>Paket {index + 1}</Eyebrow>
                      <span className="text-xs uppercase tracking-wider text-ink-400">
                        {pkg.durationMinutes} dk
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-3xl leading-tight text-espresso">
                      {pkg.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-ink-500">{pkg.description}</p>

                    <div className="mt-5">
                      <p className="eyebrow-text">Paket içeriği</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {pkg.includedServiceIds.map((serviceId) => {
                          const s = getServiceById(serviceId);
                          if (!s) return null;
                          return (
                            <span key={serviceId} className="admin-chip">
                              {s.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-line-subtle pt-5">
                      <div>
                        <p className="eyebrow-text">Paket fiyatı</p>
                        <p className="mt-1 font-display text-3xl text-espresso">
                          {formatCurrency(pkg.price)}
                        </p>
                      </div>
                      <LinkButton
                        href={buildBookingHref("/personeller", {
                          bookingType: "package",
                          itemId: pkg.id,
                        })}
                        variant="primary"
                        size="md"
                      >
                        Paketi Seç
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
