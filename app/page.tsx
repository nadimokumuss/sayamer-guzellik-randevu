import Link from "next/link";

import { HeroShowcase } from "@/components/ui/hero-showcase";
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

      <section className="shell mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card p-8">
          <SectionHeading
            eyebrow="Marka Dünyası"
            title="Premium-soft tasarım dili"
            copy="Şampanya, pudra ve sakin yeşil tonları; zarif serif başlıklar ve yumuşak kart katmanlarıyla salon deneyimi dijitalde yeniden kuruldu."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Kategori", value: stats.categories },
            { label: "Uzman", value: stats.staff },
            { label: "Bugünkü yoğunluk", value: dashboardStats.todayCount },
            { label: "Yaklaşan randevu", value: dashboardStats.upcomingCount },
          ].map((item) => (
            <div key={item.label} className="glass-card p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#8c7376]">{item.label}</p>
              <p className="mt-5 font-display text-5xl text-espresso">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell mt-16">
        <SectionHeading
          eyebrow="Öne Çıkan Hizmetler"
          title="En sık tercih edilen bakım rotaları"
          copy="Kategoriler arası dolaşmadan hızlı seçim yapabilmek için öne çıkan bakım ve seanslar girişte görünür tutuldu."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredServices.map((service) => (
            <article key={service.id} className="glass-card p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow">{service.tag || "Demo akışı"}</span>
                <span className="text-sm font-medium text-[#8c7376]">
                  {service.durationMinutes} dk
                </span>
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

      <section className="shell mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-card p-8">
          <SectionHeading
            eyebrow="Paketler"
            title="Tek blokta planlanan hazır seremoniler"
            copy="Paket seçildiğinde müşteri yalnızca sorumlu uzmanı ve uygun zamanı seçer; panel tarafında tüm içerik tek randevu bloğu olarak görünür."
          />
          <div className="mt-8 grid gap-4">
            {featuredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-[24px] border border-white/70 bg-white/70 p-5"
              >
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

        <div className="glass-card p-8">
          <SectionHeading
            eyebrow="Panel Özeti"
            title="Salon tarafında görünüm"
            copy="Takvim, bloke saatler ve statü güncellemeleri aynı mock veri kümesi üzerinde gerçek zamanlı hissiyle ilerler."
          />
          <div className="mt-8 space-y-4">
            {[
              `Aktif hizmet: ${stats.services}`,
              `Hazır paket: ${stats.packages}`,
              `Bloke saat: ${dashboardStats.blockedCount}`,
              `Toplam aktif ciro: ${formatCurrency(dashboardStats.confirmedRevenue)}`,
            ].map((item) => (
              <div key={item} className="rounded-[24px] bg-[#fcf7f3] px-5 py-4 text-sm text-[#5d494b]">
                {item}
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
