import Link from "next/link";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { InView } from "@/components/motion/in-view";
import { Marquee } from "@/components/motion/marquee";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { StaffBentoCard } from "@/components/booking/staff-bento-card";
import { DarkCTA } from "@/components/layout/dark-cta";
import { NumberedEyebrow } from "@/components/layout/numbered-eyebrow";
import { PageHero } from "@/components/layout/page-hero";
import { getCatalog, getCategoryById } from "@/lib/catalog";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Uzmanlar",
  "Sayamer Güzellik uzman kadrosunu ve bakım alanlarını inceleyin.",
);

function getCategoryImage(categoryId: string) {
  return (
    siteContent.serviceCategoryMedia[
      categoryId as keyof typeof siteContent.serviceCategoryMedia
    ] ?? siteContent.media.editorial[0].src
  );
}

export default function ExpertsPage() {
  const catalog = getCatalog();
  const grouped = catalog.staff.reduce<Record<string, typeof catalog.staff>>((acc, member) => {
    acc[member.categoryId] = acc[member.categoryId] || [];
    acc[member.categoryId].push(member);
    return acc;
  }, {});

  return (
    <div>
      <PageHero
        number="01"
        eyebrow="Uzmanlar"
        title="Bakım alanlarına göre deneyimli ekibimiz."
        copy="Her kategori için uzman ekip üyelerini görüntüleyin, uzmanlık alanlarını inceleyin ve ardından online randevu akışına geçin."
        photo={[
          siteContent.serviceCategoryMedia["kuafor"],
          siteContent.serviceCategoryMedia["cilt-bakimi"],
          siteContent.serviceCategoryMedia["masaj"],
        ]}
        photoAlt="Uzman ekibimiz"
        actions={[
          { label: "Randevu al", href: "/randevu", primary: true },
          { label: "Hizmetler", href: "/hizmetler" },
        ]}
        backdropWord="EKIP"
        stats={[
          { label: "Uzman", to: catalog.staff.length },
          { label: "Bakım alanı", to: catalog.categories.length },
          { label: "Memnuniyet", to: 4.9, decimals: 1 },
        ]}
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
            <span
              key={`sep-${cat.id}`}
              aria-hidden
              className="font-display text-xl text-rosewood lg:text-2xl"
            >
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
              {Object.keys(grouped).map((categoryId, index) => {
                const category = getCategoryById(categoryId);
                if (!category) return null;
                return (
                  <Link
                    key={categoryId}
                    href={`#${categoryId}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-1.5 text-[12px] font-semibold tracking-tight text-ink-400 transition hover:border-graphite/30 hover:bg-peachLight/40 hover:text-graphite"
                  >
                    <span className="font-display text-[11px] font-extrabold text-rosewood">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{category.name}</span>
                    <span className="text-[10px] tabular-nums text-ash">
                      {grouped[categoryId].length}
                    </span>
                  </Link>
                );
              })}
            </div>
          </InView>
        </div>
      </section>

      {/* Staff groups */}
      {Object.entries(grouped).map(([categoryId, members], groupIndex) => {
        const category = getCategoryById(categoryId);
        if (!category) return null;
        const reverse = groupIndex % 2 === 1;

        return (
          <section
            key={categoryId}
            id={categoryId}
            className="border-t border-hairline scroll-mt-24 bg-white"
          >
            <div className="shell py-20 lg:py-28">
              <div
                className={`grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ClipReveal direction="up" duration={1.3}>
                  <div className="relative overflow-hidden rounded-[36px]" style={{ aspectRatio: "5/4" }}>
                    <ParallaxImage
                      src={getCategoryImage(categoryId)}
                      alt={category.name}
                      className="absolute inset-0"
                      amount={50}
                      scale={1.12}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-mochaDeep/35 via-transparent to-transparent" />
                  </div>
                </ClipReveal>

                <div>
                  <NumberedEyebrow
                    number={String(groupIndex + 1).padStart(2, "0")}
                    label="Kategori"
                  />
                  <RevealText
                    as="h2"
                    className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-graphite"
                  >
                    {category.name}
                  </RevealText>
                  <InView delay={0.2}>
                    <p className="mt-6 max-w-lg text-base leading-8 text-ash">
                      {category.description}
                    </p>
                  </InView>
                  <InView delay={0.3}>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link href={`/hizmetler#${categoryId}`} className="btn-pill-outline">
                        <span>{category.name} hizmetleri</span>
                        <span aria-hidden>↗</span>
                      </Link>
                    </div>
                  </InView>
                </div>
              </div>

              {/* Staff bento grid */}
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member, idx) => (
                  <StaffBentoCard key={member.id} staff={member} delay={idx * 0.08} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <DarkCTA
        number={String(Object.keys(grouped).length + 2).padStart(2, "0")}
        eyebrow="Devam"
        title="Uzmanı seçtiyseniz, hizmet ve saati birlikte planlayalım."
        primaryCta={{ label: "Randevu al", href: "/randevu" }}
        secondaryCta={{ label: "Paketler", href: "/paketler" }}
      />
    </div>
  );
}
