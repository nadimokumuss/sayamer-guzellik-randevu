import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getCatalog, getCategoryById, getServiceById } from "@/lib/catalog";
import { formatCurrency } from "@/lib/utils";

export default function AdminServicesPage() {
  const catalog = getCatalog();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Katalog"
        title="Hizmet ve paket yapısı"
        copy="Katalog ekranı kategori bazlı bloklara ayrıldı; ekip hangi hizmetin hangi başlık altında durduğunu hızlı ayırt eder."
        stats={[
          { label: "Kategori", value: String(catalog.categories.length) },
          { label: "Hizmet", value: String(catalog.services.length) },
          { label: "Paket", value: String(catalog.packages.length) },
          { label: "Ekip", value: String(catalog.staff.length) },
        ]}
      />

      <div className="space-y-6">
        {catalog.categories.map((category) => {
          const services = catalog.services.filter((s) => s.categoryId === category.id);
          const staffCount = catalog.staff.filter((m) => m.categoryId === category.id).length;

          return (
            <section
              key={category.id}
              className="overflow-hidden rounded-[24px] border border-hairline bg-white"
            >
              <div className="border-b border-hairline bg-peachLight/40 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mocha">
                  {category.name}
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-graphite lg:text-3xl">
                  {category.heroLine}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-graphite/75">
                  {category.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Badge label="Hizmet" value={String(services.length)} />
                  <Badge label="Ekip" value={String(staffCount)} />
                </div>
              </div>

              <div className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <article
                    key={service.id}
                    className="rounded-2xl border border-hairline p-4 transition hover:border-graphite/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rosewood">
                        {getCategoryById(service.categoryId)?.name}
                      </span>
                      <span className="text-[11px] font-semibold tabular-nums text-ash">
                        {service.durationMinutes} dk
                      </span>
                    </div>
                    <p className="mt-3 font-display text-base font-bold tracking-tight text-graphite">
                      {service.name}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-ash">
                      {service.description}
                    </p>
                    <p className="mt-3 font-display text-base font-extrabold tabular-nums text-graphite">
                      {formatCurrency(service.price)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <section className="rounded-[24px] border border-hairline bg-white p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
            Hazır Paketler
          </p>
          <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-graphite">
            Paket vitrini
          </h2>

          <ul className="mt-5 grid gap-3 xl:grid-cols-2">
            {catalog.packages.map((pkg) => (
              <li key={pkg.id} className="rounded-2xl border border-hairline p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rosewood">
                      {pkg.savingsLabel}
                    </p>
                    <p className="mt-2 font-display text-base font-extrabold tracking-tight text-graphite">
                      {pkg.name}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-ash">
                      {pkg.description}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ash">
                      Ana hizmet: {getServiceById(pkg.primaryServiceId)?.name}
                    </p>
                  </div>
                  <p className="font-display text-base font-extrabold tabular-nums text-graphite">
                    {formatCurrency(pkg.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-tight">
      <span className="text-ash">{label}</span>
      <span className="font-display font-extrabold tabular-nums text-graphite">{value}</span>
    </span>
  );
}
