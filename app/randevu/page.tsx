import Link from "next/link";

import { AppIcon } from "@/components/ui/app-icon";
import { PageIntro } from "@/components/ui/page-intro";
import { getCatalog } from "@/lib/catalog";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export default function ServicesPage() {
  const catalog = getCatalog();
  const featuredCount = catalog.services.filter((service) => service.featured).length;

  return (
    <div className="shell py-10">
      <PageIntro
        eyebrow="Hizmet Seçimi"
        title="Kategorilere göre randevu oluştur"
        copy="Müşteri önce hizmetini seçer, ardından uygun uzman ve saat adımına geçer. Paket yerine tekli bakım planlamak için bu sayfa kullanılır."
        icon="spark"
        asideTitle="Kararı kolaylaştıran vitrin"
        asideCopy="Her kategori kendi tonunda ayrılır; süre, fiyat ve yönlendirme ilk bakışta görünür."
        stats={[
          { label: "Kategori", value: String(catalog.categories.length) },
          { label: "Öne çıkan", value: String(featuredCount) },
          { label: "Sonraki adım", value: "Uzman" },
          { label: "Akış", value: "1 / 4" },
        ]}
      />

      <div className="mt-10 space-y-10">
        {catalog.categories.map((category) => {
          const services = catalog.services.filter((service) => service.categoryId === category.id);

          return (
            <section key={category.id} className="glass-card overflow-hidden">
              <div className={`grid gap-6 bg-gradient-to-r ${category.accent} p-8 lg:grid-cols-[0.9fr_1.1fr]`}>
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

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="metric-card">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Toplam hizmet</p>
                    <p className="mt-3 font-display text-3xl text-espresso">{services.length}</p>
                  </div>
                  <div className="metric-card">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Rota</p>
                    <p className="mt-3 font-display text-3xl text-espresso">Tek seçim</p>
                  </div>
                  <div className="metric-card">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Devam</p>
                    <p className="mt-3 font-display text-3xl text-espresso">Takvim</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <article key={service.id} className="rounded-[26px] bg-white/80 p-5 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <span className="eyebrow">{service.tag || category.name}</span>
                      <span className="text-sm text-[#8c7376]">{service.durationMinutes} dk</span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl text-espresso">{service.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{service.description}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <strong className="text-lg text-espresso">{formatCurrency(service.price)}</strong>
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
