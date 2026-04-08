import Link from "next/link";

import { AppIcon } from "@/components/ui/app-icon";
import { PageIntro } from "@/components/ui/page-intro";
import { getCatalog, getServiceById } from "@/lib/catalog";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export default function PackagesPage() {
  const catalog = getCatalog();

  return (
    <div className="shell py-10">
      <PageIntro
        eyebrow="Hazır Paketler"
        title="Tek rezervasyonda seremonik bakım akışı"
        copy="Her paket tek bir sorumlu uzman ve tek zaman bloğu ile planlanır. Müşteri karmaşık kombinasyonlar yerine net süre ve net fiyat görür."
        icon="layers"
        asideTitle="Hazır kurgulanmış deneyim"
        asideCopy="Paketler; içeriği, avantajı ve süresi ilk bakışta okunan net vitriniyle sunulur."
        stats={[
          { label: "Paket", value: String(catalog.packages.length) },
          { label: "Sistem", value: "Tek blok" },
          { label: "Karar", value: "Net fiyat" },
          { label: "Akış", value: "1 tık sonrası uzman" },
        ]}
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        {catalog.packages.map((pkg) => (
          <article key={pkg.id} className="glass-card overflow-hidden p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="icon-badge h-11 w-11 rounded-[18px] bg-[#f8efe9]">
                  <AppIcon name="layers" />
                </span>
                <span className="eyebrow">{pkg.savingsLabel}</span>
              </div>
              <span className="rounded-full bg-[#f8efea] px-4 py-2 text-sm text-espresso">
                {pkg.durationMinutes} dk
              </span>
            </div>

            <h2 className="mt-5 font-display text-4xl tracking-tight text-espresso">{pkg.name}</h2>
            <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{pkg.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="metric-card">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">İçerik</p>
                <p className="mt-3 font-display text-3xl text-espresso">
                  {pkg.includedServiceIds.length}
                </p>
              </div>
              <div className="metric-card">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Akış</p>
                <p className="mt-3 font-display text-3xl text-espresso">Tek uzman</p>
              </div>
              <div className="metric-card">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Fiyat</p>
                <p className="mt-3 font-display text-3xl text-espresso">{formatCurrency(pkg.price)}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] bg-[#fcf7f3] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
                Paket İçeriği
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {pkg.includedServiceIds.map((serviceId) => (
                  <span
                    key={serviceId}
                    className="rounded-full border border-rosewood/10 bg-white/80 px-4 py-2 text-sm text-[#5d494b]"
                  >
                    {getServiceById(serviceId)?.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <strong className="text-2xl text-espresso">{formatCurrency(pkg.price)}</strong>
              <Link
                href={buildBookingHref("/personeller", {
                  bookingType: "package",
                  itemId: pkg.id,
                })}
                className="soft-button"
              >
                Paket Randevusu Al
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
