import Link from "next/link";

import { EditorialPhoto } from "@/components/ui/editorial-photo";
import { buildPageMetadata, siteContent } from "@/lib/site";
import { getCatalog } from "@/lib/catalog";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export const metadata = buildPageMetadata(
  "Online Randevu",
  "Sayamer Güzellik için hizmet veya paket seçerek online randevu oluşturun.",
);

export default function BookingEntryPage() {
  const catalog = getCatalog();
  const featuredServices = catalog.services.filter((service) => service.featured).slice(0, 4);
  const featuredPackages = catalog.packages.slice(0, 3);

  return (
    <div className="shell py-10">
      <section className="glass-card overflow-hidden p-8 sm:p-10">
        <p className="text-sm text-[#8c7376]">
          <Link href="/">Ana Sayfa</Link> / Online Randevu
        </p>
        <div className="mt-4 grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <div>
            <span className="eyebrow">Online Randevu</span>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-espresso">
              Bakım yolculuğunu şimdi başlatın
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#6f5c5e]">
              Önce hizmet veya paketinizi seçin, ardından uygun uzman ve saat aralığını görüntüleyin.
              Randevu akışı hızlı, net ve birkaç adımda tamamlanacak şekilde tasarlandı.
            </p>
          </div>

          <EditorialPhoto
            src={siteContent.hero.slides[1].src}
            alt={siteContent.hero.slides[1].alt}
            eyebrow="Rezervasyon"
            title="Gör, seç ve tamamla"
            copy="Bakım planınızı size uygun uzman ve zaman aralığıyla birlikte oluşturun."
            imageClassName="aspect-[5/4] min-h-[300px]"
          />
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { title: "1. Hizmet veya paket seçin", copy: "İhtiyacınıza uygun bakım alanını belirleyin." },
          { title: "2. Uzmanınızı görüntüleyin", copy: "Seçtiğiniz hizmete uygun ekip listelensin." },
          { title: "3. Saat aralığını kapatın", copy: "Uygun boşluklar içinden randevunuzu kesinleştirin." },
        ].map((item) => (
          <article key={item.title} className="rounded-[24px] border border-[#eadfd3] bg-white p-5 shadow-soft">
            <h2 className="font-display text-3xl text-espresso">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="glass-card overflow-hidden">
          <img
            src={siteContent.categoryHighlights[0].image}
            alt="Tekli hizmet seçimi"
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="p-6">
            <span className="eyebrow">Tekli Hizmet</span>
            <h2 className="mt-4 font-display text-4xl text-espresso">İhtiyacınıza göre seçim yapın</h2>
            <p className="mt-4 text-sm leading-7 text-[#6f5c5e]">
              Kategori, süre ve fiyat bilgisiyle hizmetinizi belirleyin; ardından uygun uzman ve
              boş saat akışına geçin.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/hizmetler" className="soft-button">
                Hizmetleri Aç
              </Link>
              <Link href="/uzmanlar" className="soft-button-secondary">
                Uzmanları Gör
              </Link>
            </div>
          </div>
        </article>

        <article className="glass-card overflow-hidden">
          <img
            src={siteContent.categoryHighlights[2].image}
            alt="Paket seçimi"
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="p-6">
            <span className="eyebrow">Hazır Paket</span>
            <h2 className="mt-4 font-display text-4xl text-espresso">Tek blokta planlanan paketler</h2>
            <p className="mt-4 text-sm leading-7 text-[#6f5c5e]">
              Hazır içerik, net fiyat ve daha kısa karar süreci. Uygun uzman ve zamanı seçerek
              rezervasyonu kolayca tamamlayın.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/paketler" className="soft-button">
                Paketleri Aç
              </Link>
              <Link href="/iletisim" className="soft-button-secondary">
                Ön Bilgi Al
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Hızlı Seçim</span>
            <h2 className="mt-4 font-display text-4xl text-espresso">En çok tercih edilen hizmetler</h2>
          </div>
          <Link href="/hizmetler" className="soft-button-secondary">
            Tümünü Gör
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map((service) => (
            <article key={service.id} className="glass-card p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8c7376]">
                {service.durationMinutes} dk
              </p>
              <h3 className="mt-4 font-display text-3xl text-espresso">{service.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{service.description}</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <strong className="text-lg text-espresso">{formatCurrency(service.price)}</strong>
                <Link
                  href={buildBookingHref("/personeller", {
                    bookingType: "service",
                    itemId: service.id,
                  })}
                  className="soft-button-secondary"
                >
                  Başla
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        {featuredPackages.map((pkg) => (
          <article key={pkg.id} className="glass-card p-6">
            <span className="eyebrow">{pkg.savingsLabel}</span>
            <h3 className="mt-4 font-display text-3xl text-espresso">{pkg.name}</h3>
            <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{pkg.description}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <strong className="text-lg text-espresso">{formatCurrency(pkg.price)}</strong>
              <Link
                href={buildBookingHref("/personeller", {
                  bookingType: "package",
                  itemId: pkg.id,
                })}
                className="soft-button"
              >
                Paketi Seç
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
