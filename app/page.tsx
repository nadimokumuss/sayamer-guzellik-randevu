import Link from "next/link";

import { HomeSlider } from "@/components/ui/home-slider";
import { getCatalog } from "@/lib/catalog";
import { siteContent } from "@/lib/site";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const catalog = getCatalog();
  const categoriesForHome = catalog.categories.slice(0, 6);
  const featuredPackages = catalog.packages.slice(0, 3);

  return (
    <div>
      {/* 1. SLIDER */}
      <HomeSlider />

      {/* 2. HERO — typographic only */}
      <section className="shell pb-24 pt-20 lg:pb-32 lg:pt-28">
        <div className="max-w-4xl">
          <p className="eyebrow-tag">Sayamer Güzellik · İstanbul</p>
          <h1 className="mt-10 font-display text-display-2xl text-graphite">
            Bakım.<br />
            Sadece gereken.
          </h1>
          <p className="mt-10 max-w-xl text-base leading-8 text-ash">
            Saç, cilt, tırnak ve bakım ritüellerini sakin bir salon atmosferi ve net
            bir rezervasyon akışıyla sunuyoruz.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <Link href="/randevu" className="btn-minimal-solid">
              Randevu al
            </Link>
            <Link href="/hizmetler" className="link-underline">
              Hizmetleri görüntüle
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <p className="eyebrow-tag">Bakım anlayışımız</p>
            <p className="font-display text-2xl leading-[1.5] text-graphite sm:text-3xl sm:leading-[1.5]">
              Karmaşayı değil sakinliği seçtik. Hizmeti, uzmanı ve saati net görüyor,
              gereksiz adım yaşamadan bakımınızı planlıyorsunuz. Her detay özenli ama
              hiçbiri fazla değil.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SERVICES — typographic list */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow-tag">Hizmetler</p>
              <h2 className="mt-6 font-display text-display-lg text-graphite">
                Bakım alanlarımız
              </h2>
            </div>
            <Link href="/hizmetler" className="link-underline">
              Hepsi
            </Link>
          </div>

          <ul className="mt-16 rule-top">
            {categoriesForHome.map((category, index) => {
              const services = catalog.services.filter((s) => s.categoryId === category.id);
              const min = services.length > 0 ? Math.min(...services.map((s) => s.price)) : 0;
              return (
                <li key={category.id}>
                  <Link
                    href={`/hizmetler#${category.id}`}
                    className="service-row transition hover:pl-2 hover:text-clay"
                  >
                    <span className="service-row-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="service-row-name">{category.name}</span>
                    <span className="service-row-meta hidden sm:block">
                      {services.length} hizmet
                    </span>
                    <span className="service-row-meta">
                      {min > 0 ? `${formatCurrency(min)}+` : "—"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. EDITORIAL PHOTO */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="overflow-hidden">
            <img
              src={siteContent.media.editorial[3].src}
              alt={siteContent.media.editorial[3].alt}
              className="h-[60vh] w-full object-cover lg:h-[72vh]"
            />
          </div>
          <div className="mt-6 flex items-start justify-between gap-6">
            <p className="max-w-md text-sm leading-7 text-ash">
              {siteContent.media.editorial[3].copy}
            </p>
            <p className="eyebrow-tag">Sayamer · Salon</p>
          </div>
        </div>
      </section>

      {/* 5. PACKAGES — list */}
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
                  <span className="service-row-meta">{formatCurrency(pkg.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. VISIT */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow-tag">Ziyaret</p>
              <h2 className="mt-6 font-display text-display-lg text-graphite">
                Salon'da görüşmek üzere
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-ash">
                Randevu almak için hizmet veya paketinizi seçin; ekibiniz uygun saat
                aralığında sizi bekliyor olacak.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <Link href="/randevu" className="btn-minimal-solid">
                  Randevu al
                </Link>
                <a
                  href={siteContent.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="border-t border-hairline pt-8 text-sm leading-7 text-ash lg:border-0 lg:pt-0">
              <p className="text-graphite">{siteContent.contact.addressTitle}</p>
              {siteContent.contact.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <div className="mt-6 space-y-1">
                <a href={`tel:${siteContent.contact.phoneRaw}`} className="block transition hover:text-graphite">
                  {siteContent.contact.phoneDisplay}
                </a>
                <a href={`mailto:${siteContent.contact.email}`} className="block transition hover:text-graphite">
                  {siteContent.contact.email}
                </a>
              </div>
              <div className="mt-6 space-y-1 tabular-nums">
                {siteContent.contact.hours.map((entry) => (
                  <p key={entry.label} className="flex items-baseline justify-between gap-4">
                    <span>{entry.label}</span>
                    <span className="text-graphite">{entry.value}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
