import Link from "next/link";

import { HeroShowcase } from "@/components/ui/hero-showcase";
import { AppIcon } from "@/components/ui/app-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCatalog } from "@/lib/catalog";
import { getDashboardStats } from "@/lib/booking";
import { getCatalogSummary } from "@/lib/store";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const catalog = getCatalog();
  const stats = getCatalogSummary();
  const dashboardStats = getDashboardStats();
  const featuredServices = catalog.services.filter((service) => service.featured).slice(0, 6);
  const featuredPackages = catalog.packages.slice(0, 3);

  return (
    <div className="pb-8">
      <HeroShowcase campaigns={catalog.campaigns} testimonials={catalog.testimonials} />

      <section className="shell mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="spotlight-panel">
          <SectionHeading
            eyebrow="Deneyim Omurgası"
            title="Karar yükünü azaltan görsel yönlendirme"
            copy="Her alan, müşteri veya salon ekibinin sıradaki hamlesini öne çıkaracak şekilde yeniden düzenlendi. Uzun açıklamalar arka planda kaldı; ön planda ise kısa karar blokları ve okunabilir kartlar var."
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: "spark", title: "Seç", copy: "Hizmet veya paketi belirle" },
              { icon: "users", title: "Eşleştir", copy: "Doğru uzmanı hızlı ayır" },
              { icon: "calendar", title: "Kapat", copy: "Takvimden seansı sabitle" },
            ].map((item) => (
              <div key={item.title} className="metric-card">
                <span className="icon-badge h-11 w-11 rounded-[18px]">
                  <AppIcon name={item.icon as "spark" | "users" | "calendar"} />
                </span>
                <p className="mt-4 font-medium text-espresso">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#6f5c5e]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="visual-grid">
          {[
            { icon: "layers", label: "Kategori", value: String(stats.categories) },
            { icon: "users", label: "Uzman", value: String(stats.staff) },
            { icon: "calendar", label: "Bugünkü yoğunluk", value: String(dashboardStats.todayCount) },
            { icon: "chart", label: "Yaklaşan randevu", value: String(dashboardStats.upcomingCount) },
            { icon: "block", label: "Bloke saat", value: String(dashboardStats.blockedCount) },
            { icon: "check", label: "Aktif ciro", value: formatCurrency(dashboardStats.confirmedRevenue) },
          ].map((item) => (
            <div key={item.label} className="metric-card min-h-[168px]">
              <span className="icon-badge h-11 w-11 rounded-[18px]">
                <AppIcon
                  name={
                    item.icon as
                      | "layers"
                      | "users"
                      | "calendar"
                      | "chart"
                      | "block"
                      | "check"
                  }
                />
              </span>
              <p className="mt-5 text-xs uppercase tracking-[0.22em] text-[#8c7376]">{item.label}</p>
              <p className="mt-3 font-display text-4xl text-espresso">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell mt-16">
        <SectionHeading
          eyebrow="Öne Çıkan Hizmetler"
          title="En sık tercih edilen bakım rotaları"
          copy="Kategoriler arası kaybolmadan karar verebilmek için en çok seçilen seansları girişte net aksiyon kartlarına dönüştürdük."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredServices.map((service) => (
            <article key={service.id} className="glass-card overflow-hidden p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="icon-badge h-11 w-11 rounded-[18px] bg-[#f8efe9]">
                    <AppIcon name="spark" />
                  </span>
                  <span className="eyebrow">{service.tag || "Demo akışı"}</span>
                </div>
                <span className="text-sm font-medium text-[#8c7376]">{service.durationMinutes} dk</span>
              </div>
              <h3 className="mt-5 font-display text-3xl text-espresso">{service.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{service.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-semibold text-espresso">
                  {formatCurrency(service.price)}
                </span>
                <Link
                  href={buildBookingHref("/personeller", {
                    bookingType: "service",
                    itemId: service.id,
                  })}
                  className="soft-button-secondary"
                >
                  Uzman Seç
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card p-8">
          <div className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name="layers" className="h-7 w-7" />
            </span>
            <SectionHeading
              eyebrow="Paketler"
              title="Tek blokta planlanan hazır seremoniler"
              copy="Paket seçildiğinde müşteri yalnızca sorumlu uzmanı ve uygun zamanı seçer; panel tarafında tüm içerik tek randevu bloğu olarak görünür."
            />
          </div>

          <div className="mt-8 grid gap-4">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="rounded-[24px] border border-white/70 bg-white/70 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#8c7376]">
                      {pkg.savingsLabel}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-espresso">{pkg.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{pkg.description}</p>
                  </div>
                  <span className="rounded-full bg-[#f7efe8] px-4 py-2 text-sm text-espresso">
                    {formatCurrency(pkg.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/paketler" className="soft-button mt-8">
            Paket Sayfasına Git
          </Link>
        </div>

        <div className="spotlight-panel">
          <div className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name="chart" className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c7376]">
                Panel Özeti
              </p>
              <h2 className="mt-2 font-display text-3xl text-espresso">Salon tarafında görünüm</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {[
              `Aktif hizmet: ${stats.services}`,
              `Hazır paket: ${stats.packages}`,
              `Bloke saat: ${dashboardStats.blockedCount}`,
              `Toplam aktif ciro: ${formatCurrency(dashboardStats.confirmedRevenue)}`,
            ].map((item) => (
              <div key={item} className="metric-card">
                <p className="text-sm text-[#5d494b]">{item}</p>
              </div>
            ))}
          </div>
          <Link href="/yonetim" className="soft-button-secondary mt-8">
            Paneli İncele
          </Link>
        </div>
      </section>
    </div>
  );
}
