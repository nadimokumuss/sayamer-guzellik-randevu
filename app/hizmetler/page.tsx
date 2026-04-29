import Link from "next/link";

import { InView } from "@/components/motion/in-view";
import { Marquee } from "@/components/motion/marquee";
import { ManifestoMoment } from "@/components/motion/manifesto-moment";
import { AltImageText } from "@/components/layout/alt-image-text";
import { DarkCTA } from "@/components/layout/dark-cta";
import { EditorialList } from "@/components/layout/editorial-list";
import { PageHero } from "@/components/layout/page-hero";
import { getCatalog } from "@/lib/catalog";
import { buildPageMetadata, siteContent } from "@/lib/site";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export const metadata = buildPageMetadata(
  "Hizmetler",
  "Sayamer Güzellik hizmetlerini kategori bazlı inceleyin ve online randevu oluşturun.",
);

function getCategoryImage(categoryId: string) {
  return (
    siteContent.serviceCategoryMedia[
      categoryId as keyof typeof siteContent.serviceCategoryMedia
    ] ?? siteContent.media.editorial[0].src
  );
}

export default function ServicesPage() {
  const catalog = getCatalog();

  return (
    <div>
      <PageHero
        number="01"
        eyebrow="Hizmetler"
        title="Bakım alanlarımız."
        copy="Her bakım alanını aynı netlik ve özenle tasarlıyoruz. Süre, fiyat ve uzman eşleşmesi her zaman açık."
        photo={[
          siteContent.serviceCategoryMedia["cilt-bakimi"],
          siteContent.serviceCategoryMedia["tirnak-bakimi"],
          siteContent.serviceCategoryMedia["kuafor"],
        ]}
        photoAlt="Sayamer hizmet alanları"
        actions={[
          { label: "Online randevu", href: "/randevu", primary: true },
          { label: "Paketler", href: "/paketler" },
        ]}
        backdropWord="HIZMET"
      />

      {/* Marquee */}
      <section className="border-y border-hairline bg-white py-4 lg:py-5">
        <Marquee
          speed={45}
          itemGap="3rem"
          items={catalog.categories.flatMap((cat, idx) => [
            <span
              key={`cat-${cat.id}`}
              className={`font-display text-xl font-bold tracking-tight lg:text-2xl ${
                idx % 2 === 0 ? "text-graphite" : "italic text-graphite/55"
              }`}
            >
              {cat.name}
            </span>,
            <span key={`sep-${cat.id}`} aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
          ])}
        />
      </section>

      {/* Anchor pills */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-10">
          <InView>
            <div className="flex flex-wrap gap-2">
              {catalog.categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`#${category.id}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-1.5 text-[12px] font-semibold tracking-tight text-ink-400 transition hover:border-graphite/30 hover:bg-peachLight/40 hover:text-graphite"
                >
                  <span className="font-display text-[11px] font-extrabold text-rosewood">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </InView>
        </div>
      </section>

      <ManifestoMoment eyebrow="Felsefe" caption="— Sayamer">
        <span>Hizmetin </span>
        <em className="not-italic font-extrabold">netliği</em>
        <span>, sürenin </span>
        <em className="not-italic font-extrabold">sadakati</em>
        <span> ve uzmanın </span>
        <em className="not-italic font-extrabold">özeni</em>
        <span> aynı çerçevede tutulur.</span>
      </ManifestoMoment>

      {/* Categories — alternating */}
      {catalog.categories.map((category, index) => {
        const services = catalog.services.filter((s) => s.categoryId === category.id);
        const image = getCategoryImage(category.id);
        return (
          <AltImageText
            key={category.id}
            anchorId={category.id}
            index={index}
            image={image}
            imageAlt={category.name}
            badge={`Kategori · ${String(index + 1).padStart(2, "0")}`}
            number={String(index + 1).padStart(2, "0")}
            title={category.name}
          >
            <p className="max-w-lg text-base leading-8 text-ash">{category.description}</p>
            <div className="mt-8">
              <EditorialList
                variant="row"
                items={services.map((service) => ({
                  id: service.id,
                  title: service.name,
                  description: service.description,
                  meta: `${service.durationMinutes} dk · ${formatCurrency(service.price)}`,
                  href: buildBookingHref("/personeller", {
                    bookingType: "service",
                    itemId: service.id,
                  }),
                }))}
              />
            </div>
          </AltImageText>
        );
      })}

      <DarkCTA
        number={String(catalog.categories.length + 2).padStart(2, "0")}
        eyebrow="Devam"
        title="Hizmetinizi seçtiyseniz, uzman ve saati birlikte planlayalım."
        primaryCta={{ label: "Randevu al", href: "/randevu" }}
        secondaryCta={{ label: "Paketler", href: "/paketler" }}
      />
    </div>
  );
}
