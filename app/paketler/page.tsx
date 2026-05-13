import Link from "next/link";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { InView } from "@/components/motion/in-view";
import { ManifestoMoment } from "@/components/motion/manifesto-moment";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { DarkCTA } from "@/components/layout/dark-cta";
import { EditorialList } from "@/components/layout/editorial-list";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { getCatalog, getServiceById } from "@/lib/catalog";
import { buildPageMetadata, siteContent } from "@/lib/site";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export const metadata = buildPageMetadata(
  "Paketler",
  "Sayamer Güzellik hazır paketlerini ve fiyat avantajlarını inceleyin.",
);

export default function PackagesPage() {
  const catalog = getCatalog();

  return (
    <div>
      <PageHero
        number="01"
        eyebrow="Paketler"
        title="Tek rezervasyonda planlanan bakım."
        copy="İçeriği, süresi ve fiyat avantajı önceden belirlenmiş paketlerle bakım planınızı tek adımda oluşturabilirsiniz."
        photo={[
          siteContent.serviceCategoryMedia.g5,
          siteContent.serviceCategoryMedia["cilt-bakimi"],
          siteContent.serviceCategoryMedia["tirnak-bakimi"],
        ]}
        photoAlt="Sayamer paketleri"
        actions={[
          { label: "Randevu al", href: "/randevu", primary: true },
          { label: "Tekli hizmetler", href: "/hizmetler" },
        ]}
        backdropWord="PAKET"
      />

      {/* Promo strip */}
      <section className="border-t border-hairline bg-white/60">
        <div className="shell py-20 lg:py-28">
          <SectionHeader number="02" eyebrow="Bu ay" title="Kampanyalar." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteContent.promos.map((promo, idx) => (
              <InView key={promo.title} delay={idx * 0.08} y={28}>
                <Link
                  href={promo.href}
                  className="group flex h-full flex-col rounded-[28px] bg-peachLight p-6 transition hover:-translate-y-1 hover:bg-peach"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mocha">
                      Kampanya · {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
                      <span aria-hidden>↗</span>
                    </span>
                  </div>
                  <p className="mt-4 font-display text-2xl font-extrabold tracking-tight text-graphite">
                    {promo.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-graphite/75">{promo.detail}</p>
                  <div className="mt-auto flex items-baseline gap-3 pt-6">
                    <span className="text-sm text-ash line-through tabular-nums">
                      {promo.oldPrice}
                    </span>
                    <span className="font-display text-2xl font-extrabold tabular-nums text-graphite">
                      {promo.price}
                    </span>
                  </div>
                </Link>
              </InView>
            ))}
          </div>
        </div>
      </section>

      <ManifestoMoment eyebrow="Yaklaşım" caption="— Paket felsefesi">
        <span>Paketler </span>
        <em className="not-italic font-extrabold">tek bir blok</em>
        <span> halinde planlanan bakım rotalarıdır. Hizmet, süre ve fiyat </span>
        <em className="not-italic font-extrabold">önceden netleşir</em>
        <span>; siz sadece zamanı seçersiniz.</span>
      </ManifestoMoment>

      {/* Packages — alternating */}
      {catalog.packages.map((pkg, index) => {
        const primaryService = getServiceById(pkg.primaryServiceId);
        const image =
          siteContent.serviceCategoryMedia[
            (primaryService?.categoryId ?? "cilt-bakimi") as keyof typeof siteContent.serviceCategoryMedia
          ] ?? siteContent.media.editorial[0].src;
        const reverse = index % 2 === 1;

        const includedItems = pkg.includedServiceIds
          .map((id) => getServiceById(id))
          .filter((s): s is NonNullable<typeof s> => Boolean(s))
          .map((s) => ({
            id: s.id,
            title: s.name,
            description: `${s.durationMinutes} dk`,
            href: "/randevu",
          }));

        return (
          <section key={pkg.id} className="border-t border-hairline bg-white/60">
            <div
              className={`shell flex flex-col gap-12 py-20 lg:flex-row lg:items-center lg:gap-16 lg:py-28 ${
                reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-1/2">
                <ClipReveal direction="up" duration={1.3}>
                  <div className="relative overflow-hidden rounded-[36px]" style={{ aspectRatio: "5/4" }}>
                    <ParallaxImage
                      src={image}
                      alt={pkg.name}
                      className="absolute inset-0"
                      amount={50}
                      scale={1.12}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-mochaDeep/40 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-graphite">
                      <span aria-hidden>✦</span>Paket {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </ClipReveal>
              </div>

              <div className="lg:w-1/2">
                <InView>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-peach px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-mocha">
                    {pkg.savingsLabel}
                  </span>
                </InView>
                <InView delay={0.1}>
                  <p className="mt-5 font-display text-[5rem] font-extrabold leading-[0.85] tracking-[-0.04em] text-graphite/15 lg:text-[6rem]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </InView>
                <InView delay={0.2}>
                  <h2 className="mt-3 font-display text-[clamp(1.875rem,3.5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-graphite">
                    {pkg.name}
                  </h2>
                </InView>
                <InView delay={0.3}>
                  <p className="mt-6 max-w-lg text-base leading-8 text-ash">{pkg.description}</p>
                </InView>

                {includedItems.length > 0 ? (
                  <InView delay={0.4}>
                    <div className="mt-10">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                        Paket içeriği
                      </p>
                      <div className="mt-5">
                        <EditorialList variant="row" items={includedItems} />
                      </div>
                    </div>
                  </InView>
                ) : null}

                <InView delay={0.5}>
                  <div className="mt-10 flex flex-wrap items-baseline justify-between gap-6 border-t border-hairline pt-6">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ash">
                        Paket fiyatı
                      </p>
                      <p className="mt-2 font-display text-4xl font-extrabold tabular-nums text-graphite lg:text-5xl">
                        {formatCurrency(pkg.price)}
                      </p>
                      <p className="mt-1 text-sm text-ash">{pkg.durationMinutes} dk</p>
                    </div>
                    <Link
                      href="/randevu"
                      className="group inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-4 text-sm font-semibold text-white transition hover:bg-mocha"
                    >
                      <span>Paketi seç</span>
                      <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white text-graphite transition group-hover:rotate-45">
                        →
                      </span>
                    </Link>
                  </div>
                </InView>
              </div>
            </div>
          </section>
        );
      })}

      <DarkCTA
        number={String(catalog.packages.length + 3).padStart(2, "0")}
        eyebrow="Devam"
        title="Tekli hizmet yolunda da aynı netlikte bir akış sizi bekliyor."
        primaryCta={{ label: "Randevu al", href: "/randevu" }}
        secondaryCta={{ label: "Hizmetler", href: "/hizmetler" }}
      />
    </div>
  );
}
