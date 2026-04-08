import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { getCatalog } from "@/lib/catalog";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export default function ServicesPage() {
  const catalog = getCatalog();

  return (
    <div className="shell py-10">
      <SectionHeading
        eyebrow="Hizmet Seçimi"
        title="Kategorilere göre randevu oluştur"
        copy="Müşteri önce hizmetini seçer, ardından uygun uzman ve saat adımına geçer. Paket yerine tekli bakım planlamak için bu sayfa kullanılır."
      />

      <div className="mt-10 space-y-10">
        {catalog.categories.map((category) => {
          const services = catalog.services.filter((service) => service.categoryId === category.id);

          return (
            <section key={category.id} className="glass-card overflow-hidden">
              <div className={`bg-gradient-to-r ${category.accent} p-8`}>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7b6668]">
                  {category.name}
                </p>
                <h2 className="mt-3 font-display text-4xl text-espresso">{category.heroLine}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5d494b]">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <article key={service.id} className="rounded-[24px] bg-white/75 p-5 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <span className="eyebrow">{service.tag || category.name}</span>
                      <span className="text-sm text-[#8c7376]">{service.durationMinutes} dk</span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl text-espresso">{service.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{service.description}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <strong className="text-lg text-espresso">
                        {formatCurrency(service.price)}
                      </strong>
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
          );
        })}
      </div>
    </div>
  );
}
