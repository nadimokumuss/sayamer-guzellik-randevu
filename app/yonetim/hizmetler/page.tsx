import { AppIcon } from "@/components/ui/app-icon";
import { PageIntro } from "@/components/ui/page-intro";
import { getCatalog, getCategoryById, getServiceById } from "@/lib/catalog";
import { formatCurrency } from "@/lib/utils";

export default function AdminServicesPage() {
  const catalog = getCatalog();

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Katalog"
        title="Hizmet ve paket yapısı"
        copy="Katalog ekranı, kategori bazlı bloklara ayrıldı. Böylece ekip hangi hizmetlerin hangi başlık altında durduğunu daha hızlı ayırt eder."
        stats={[
          { label: "Kategori", value: String(catalog.categories.length) },
          { label: "Hizmet", value: String(catalog.services.length) },
          { label: "Paket", value: String(catalog.packages.length) },
          { label: "Sunum", value: "Ayrı bloklar" },
        ]}
      />

      <div className="space-y-6">
        {catalog.categories.map((category) => {
          const services = catalog.services.filter((service) => service.categoryId === category.id);

          return (
            <section key={category.id} className="glass-card overflow-hidden">
              <div className={`grid gap-6 bg-gradient-to-r ${category.accent} p-8 lg:grid-cols-[1fr_0.9fr]`}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="icon-badge h-11 w-11 rounded-[18px] bg-white/75">
                      <AppIcon name="spark" />
                    </span>
                    <span className="eyebrow">{category.name}</span>
                  </div>
                  <h2 className="mt-4 font-display text-4xl text-espresso">{category.heroLine}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5d494b]">
                    {category.description}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="metric-card">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Hizmet</p>
                    <p className="mt-3 font-display text-3xl text-espresso">{services.length}</p>
                  </div>
                  <div className="metric-card">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Ekip</p>
                    <p className="mt-3 font-display text-3xl text-espresso">
                      {catalog.staff.filter((member) => member.categoryId === category.id).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <article key={service.id} className="rounded-[24px] bg-white/80 p-4 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <span className="eyebrow">{getCategoryById(service.categoryId)?.name}</span>
                      <span className="text-sm text-[#8c7376]">{service.durationMinutes} dk</span>
                    </div>
                    <p className="mt-4 font-medium text-espresso">{service.name}</p>
                    <p className="mt-2 text-sm leading-7 text-[#6f5c5e]">{service.description}</p>
                    <p className="mt-4 font-semibold text-espresso">{formatCurrency(service.price)}</p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <section className="glass-card p-6">
          <div className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name="layers" className="h-7 w-7" />
            </span>
            <div>
              <span className="eyebrow">Hazır Paketler</span>
              <h2 className="mt-4 font-display text-3xl text-espresso">Paket vitrini</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {catalog.packages.map((pkg) => (
              <article key={pkg.id} className="rounded-[24px] bg-[#fcf7f3] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#8c7376]">
                      {pkg.savingsLabel}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-espresso">{pkg.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{pkg.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#8c7376]">
                      Ana hizmet: {getServiceById(pkg.primaryServiceId)?.name}
                    </p>
                  </div>
                  <strong className="text-espresso">{formatCurrency(pkg.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
