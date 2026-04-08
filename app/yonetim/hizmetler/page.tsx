import { getCatalog, getCategoryById, getServiceById } from "@/lib/catalog";
import { formatCurrency } from "@/lib/utils";

export default function AdminServicesPage() {
  const catalog = getCatalog();

  return (
    <div className="space-y-6">
      <section className="glass-card p-8">
        <span className="eyebrow">Katalog</span>
        <h1 className="mt-5 font-display text-5xl tracking-tight text-espresso">
          Hizmet ve paket yapısı
        </h1>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="glass-card p-6">
          <h2 className="font-display text-3xl text-espresso">Hizmetler</h2>
          <div className="mt-6 space-y-3">
            {catalog.services.map((service) => (
              <article key={service.id} className="rounded-[24px] bg-[#fcf7f3] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-espresso">{service.name}</p>
                    <p className="mt-1 text-sm text-[#6f5c5e]">
                      {getCategoryById(service.categoryId)?.name} • {service.durationMinutes} dk
                    </p>
                  </div>
                  <strong className="text-espresso">{formatCurrency(service.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card p-6">
          <h2 className="font-display text-3xl text-espresso">Paketler</h2>
          <div className="mt-6 space-y-3">
            {catalog.packages.map((pkg) => (
              <article key={pkg.id} className="rounded-[24px] bg-[#fcf7f3] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-espresso">{pkg.name}</p>
                    <p className="mt-1 text-sm text-[#6f5c5e]">{pkg.description}</p>
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
