import Link from "next/link";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { InView } from "@/components/motion/in-view";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { DarkCTA } from "@/components/layout/dark-cta";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { getCatalog } from "@/lib/catalog";
import { buildPageMetadata, siteContent } from "@/lib/site";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export const metadata = buildPageMetadata(
  "Online Randevu",
  "Sayamer Güzellik için hizmet veya paket seçerek online randevu oluşturun.",
);

const steps = [
  {
    no: "01",
    title: "Hizmet veya paket seçin",
    copy: "İhtiyacınıza uygun bakım alanını belirleyin.",
  },
  {
    no: "02",
    title: "Uzmanınızı görüntüleyin",
    copy: "Seçtiğiniz hizmete uygun ekip listelensin.",
  },
  {
    no: "03",
    title: "Saat aralığını kapatın",
    copy: "Uygun boşluklar içinden randevunuzu kesinleştirin.",
  },
];

export default function BookingEntryPage() {
  const catalog = getCatalog();
  const featuredServices = catalog.services.filter((s) => s.featured).slice(0, 4);
  const featuredPackages = catalog.packages.slice(0, 4);

  return (
    <div>
      <PageHero
        number="01"
        eyebrow="Online Randevu"
        title="Bakım rotanı şimdi başlat."
        copy="Önce hizmet veya paketinizi seçin, ardından uygun uzman ve saat aralığını görüntüleyin. Akış birkaç adımda tamamlanır."
        photo={[
          siteContent.media.editorial[0].src,
          siteContent.media.editorial[1].src,
          siteContent.media.editorial[3].src,
        ]}
        photoAlt="Sayamer randevu akışı"
        actions={[
          { label: "Hizmetleri aç", href: "/hizmetler", primary: true },
          { label: "Paketleri aç", href: "/paketler" },
        ]}
        backdropWord="RANDEVU"
      />

      {/* Steps */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <SectionHeader number="02" eyebrow="Akış" title="Üç adımda randevu." />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {steps.map((step, idx) => (
              <InView key={step.no} delay={idx * 0.08} y={20}>
                <div className="rounded-[28px] border border-hairline bg-white p-6 transition hover:border-graphite/25 hover:shadow-subtle">
                  <p className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] text-graphite/15">
                    {step.no}
                  </p>
                  <p className="mt-6 font-display text-xl font-extrabold tracking-tight text-graphite">
                    {step.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ash">{step.copy}</p>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* Two entry points */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {[
              {
                kind: "Tekli hizmet",
                title: "İhtiyacınıza göre seçim",
                copy:
                  "Kategori, süre ve fiyat bilgisiyle hizmetinizi belirleyin; ardından uygun uzman ve boş saat akışına geçin.",
                href: "/hizmetler",
                cta: "Hizmetleri aç",
                image: siteContent.categoryHighlights[0].image,
              },
              {
                kind: "Hazır paket",
                title: "Tek blokta planlanan paketler",
                copy:
                  "Hazır içerik, net fiyat ve daha kısa karar süreci. Uygun uzman ve zamanı seçerek rezervasyonu kolayca tamamlayın.",
                href: "/paketler",
                cta: "Paketleri aç",
                image: siteContent.categoryHighlights[2].image,
              },
            ].map((entry, idx) => (
              <ClipReveal key={entry.kind} direction="up" duration={1.3} delay={idx * 0.1}>
                <Link
                  href={entry.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[36px] border border-hairline bg-white transition hover:-translate-y-1 hover:border-graphite/25 hover:shadow-[0_30px_70px_-30px_rgba(43,29,27,0.4)]"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "5/4" }}>
                    <ParallaxImage
                      src={entry.image}
                      alt={entry.kind}
                      className="absolute inset-0"
                      amount={45}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mochaDeep/40 via-transparent to-transparent transition group-hover:from-mochaDeep/55" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-graphite">
                      {entry.kind}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7 lg:p-8">
                    <p className="font-display text-2xl font-extrabold tracking-tight text-graphite">
                      {entry.title}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-7 text-ash">{entry.copy}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-graphite">
                      <span>{entry.cta}</span>
                      <span
                        aria-hidden
                        className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha"
                      >
                        ↗
                      </span>
                    </span>
                  </div>
                </Link>
              </ClipReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured services */}
      {featuredServices.length > 0 ? (
        <section className="border-t border-hairline bg-white">
          <div className="shell py-20 lg:py-28">
            <SectionHeader
              number="03"
              eyebrow="Hızlı seçim"
              title="En çok tercih edilen hizmetler."
              cta={{ label: "Tümü", href: "/hizmetler" }}
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredServices.map((service, idx) => (
                <InView key={service.id} delay={idx * 0.06} y={28}>
                  <Link
                    href={buildBookingHref("/personeller", {
                      bookingType: "service",
                      itemId: service.id,
                    })}
                    className="group flex h-full flex-col rounded-[28px] bg-peachLight p-5 transition hover:-translate-y-1 hover:bg-peach"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mocha">
                        {service.tag ?? "Hizmet"}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mocha/70">
                        {service.durationMinutes} dk
                      </span>
                    </div>
                    <p className="mt-4 font-display text-lg font-extrabold tracking-tight text-graphite">
                      {service.name}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-graphite/70">
                      {service.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <p className="font-display text-xl font-extrabold tabular-nums text-graphite">
                        {formatCurrency(service.price)}
                      </p>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
                        <span aria-hidden>↗</span>
                      </span>
                    </div>
                  </Link>
                </InView>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Featured packages */}
      {featuredPackages.length > 0 ? (
        <section className="border-t border-hairline bg-white">
          <div className="shell py-20 lg:py-28">
            <SectionHeader
              number="04"
              eyebrow="Programlar"
              title="Planlı bakım paketleri."
              cta={{ label: "Tümü", href: "/paketler" }}
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredPackages.map((pkg, idx) => {
                const primary = catalog.services.find((s) => s.id === pkg.primaryServiceId);
                const cat = primary?.categoryId as keyof typeof siteContent.serviceCategoryMedia;
                const img =
                  siteContent.serviceCategoryMedia[cat] ??
                  siteContent.media.editorial[idx % siteContent.media.editorial.length].src;
                return (
                  <InView key={pkg.id} delay={idx * 0.06} y={28}>
                    <Link
                      href={buildBookingHref("/personeller", {
                        bookingType: "package",
                        itemId: pkg.id,
                      })}
                      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-hairline bg-white transition hover:-translate-y-1 hover:border-graphite/25 hover:shadow-subtle"
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: "5/4" }}>
                        <img
                          src={img}
                          alt={pkg.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="font-display text-base font-bold tracking-tight text-graphite">
                          {pkg.name}
                        </p>
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-ash">
                          {pkg.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <p className="font-display text-xl font-extrabold tabular-nums text-graphite">
                            {formatCurrency(pkg.price)}
                          </p>
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
                            <span aria-hidden className="text-[13px]">↗</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </InView>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <DarkCTA
        number="05"
        eyebrow="Yardım"
        title="Karar veremediyseniz, WhatsApp'tan kısa bir görüşme yeter."
        primaryCta={{ label: "İletişim", href: "/iletisim" }}
        secondaryCta={{
          label: "WhatsApp",
          href: siteContent.contact.whatsappUrl,
          external: true,
        }}
      />
    </div>
  );
}
