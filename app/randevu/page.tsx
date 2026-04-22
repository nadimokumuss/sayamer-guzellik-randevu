import Link from "next/link";

import { buildPageMetadata, siteContent } from "@/lib/site";
import { getCatalog } from "@/lib/catalog";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export const metadata = buildPageMetadata(
  "Online Randevu",
  "Sayamer Güzellik için hizmet veya paket seçerek online randevu oluşturun.",
);

const steps = [
  { title: "Hizmet veya paket seçin", copy: "İhtiyacınıza uygun bakım alanını belirleyin." },
  { title: "Uzmanınızı görüntüleyin", copy: "Seçtiğiniz hizmete uygun ekip listelensin." },
  { title: "Saat aralığını kapatın", copy: "Uygun boşluklar içinden randevunuzu kesinleştirin." },
];

export default function BookingEntryPage() {
  const catalog = getCatalog();
  const featuredServices = catalog.services.filter((service) => service.featured).slice(0, 4);
  const featuredPackages = catalog.packages.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="warm-wash">
        <div className="shell pt-20 pb-20 lg:pt-32 lg:pb-24">
          <p className="eyebrow-tag" data-reveal>
            Online randevu
          </p>
          <h1
            className="mt-8 max-w-3xl font-display text-display-xl text-graphite"
            data-reveal
            data-reveal-delay="1"
          >
            Bakım yolculuğunu şimdi başlatın.
          </h1>
          <p
            className="mt-8 max-w-xl text-base leading-8 text-ash"
            data-reveal
            data-reveal-delay="2"
          >
            Önce hizmet veya paketinizi seçin, ardından uygun uzman ve saat aralığını
            görüntüleyin. Akış birkaç adımda tamamlanır.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <p className="eyebrow-tag">Akış</p>
          <ul className="mt-16 rule-top">
            {steps.map((item, index) => (
              <li key={item.title}>
                <div className="service-row flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="service-row-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-2xl text-graphite">{item.title}</p>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-ash">{item.copy}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TWO ENTRY POINTS */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <article>
              <div className="overflow-hidden" data-reveal>
                <img
                  src={siteContent.categoryHighlights[0].image}
                  alt="Tekli hizmet"
                  className="aspect-[5/4] w-full object-cover transition duration-[1400ms] ease-out hover:scale-[1.02]"
                />
              </div>
              <p className="mt-8 eyebrow-tag">Tekli hizmet</p>
              <h2 className="mt-6 font-display text-display-lg text-graphite">
                İhtiyacınıza göre seçim
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-ash">
                Kategori, süre ve fiyat bilgisiyle hizmetinizi belirleyin; ardından uygun
                uzman ve boş saat akışına geçin.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-8">
                <Link href="/hizmetler" className="btn-minimal-solid">
                  Hizmetleri aç
                </Link>
                <Link href="/uzmanlar" className="link-underline">
                  Uzmanları gör
                </Link>
              </div>
            </article>

            <article>
              <div className="overflow-hidden" data-reveal>
                <img
                  src={siteContent.categoryHighlights[2].image}
                  alt="Hazır paket"
                  className="aspect-[5/4] w-full object-cover transition duration-[1400ms] ease-out hover:scale-[1.02]"
                />
              </div>
              <p className="mt-8 eyebrow-tag">Hazır paket</p>
              <h2 className="mt-6 font-display text-display-lg text-graphite">
                Tek blokta planlanan paketler
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-ash">
                Hazır içerik, net fiyat ve daha kısa karar süreci. Uygun uzman ve zamanı
                seçerek rezervasyonu kolayca tamamlayın.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-8">
                <Link href="/paketler" className="btn-minimal-solid">
                  Paketleri aç
                </Link>
                <Link href="/iletisim" className="link-underline">
                  Ön bilgi al
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      {featuredServices.length > 0 ? (
        <section className="rule-top bg-bone">
          <div className="shell py-24 lg:py-32">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow-tag">Hızlı seçim</p>
                <h2 className="mt-6 font-display text-display-lg text-graphite">
                  En çok tercih edilen hizmetler
                </h2>
              </div>
              <Link href="/hizmetler" className="link-underline">
                Tümü
              </Link>
            </div>

            <ul className="mt-16 rule-top">
              {featuredServices.map((service, index) => (
                <li key={service.id}>
                  <Link
                    href={buildBookingHref("/personeller", {
                      bookingType: "service",
                      itemId: service.id,
                    })}
                    className="service-row flex-col items-start gap-3 transition hover:pl-2 hover:text-clay sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="service-row-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="font-display text-2xl text-graphite">{service.name}</p>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-ash">
                        {service.description}
                      </p>
                    </div>
                    <span className="service-row-meta whitespace-nowrap">
                      {service.durationMinutes} dk
                    </span>
                    <span className="service-row-meta whitespace-nowrap tabular-nums">
                      {formatCurrency(service.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* FEATURED PACKAGES */}
      {featuredPackages.length > 0 ? (
        <section className="rule-top bg-bone">
          <div className="shell py-24 lg:py-32">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow-tag">Paketler</p>
                <h2 className="mt-6 font-display text-display-lg text-graphite">
                  Planlı bakım programları
                </h2>
              </div>
              <Link href="/paketler" className="link-underline">
                Tümü
              </Link>
            </div>

            <ul className="mt-16 rule-top">
              {featuredPackages.map((pkg, index) => (
                <li key={pkg.id}>
                  <Link
                    href={buildBookingHref("/personeller", {
                      bookingType: "package",
                      itemId: pkg.id,
                    })}
                    className="service-row flex-col items-start gap-3 transition hover:pl-2 hover:text-clay sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="service-row-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="font-display text-2xl text-graphite">{pkg.name}</p>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-ash">
                        {pkg.description}
                      </p>
                    </div>
                    <span className="service-row-meta whitespace-nowrap tabular-nums">
                      {formatCurrency(pkg.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
}
