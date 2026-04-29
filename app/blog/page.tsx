import Link from "next/link";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { InView } from "@/components/motion/in-view";
import { Marquee } from "@/components/motion/marquee";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { DarkCTA } from "@/components/layout/dark-cta";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata("Blog", "Sayamer Güzellik blog yazıları ve bakım notları.");

const categoryImageMap: Record<string, keyof typeof siteContent.serviceCategoryMedia> = {
  "Cilt Bakımı": "cilt-bakimi",
  "Tırnak Bakımı": "tirnak-bakimi",
  Epilasyon: "epilasyon",
  "Vücut Bakımı": "g5",
};

function imageFor(category: string) {
  const key = categoryImageMap[category] ?? "cilt-bakimi";
  return siteContent.serviceCategoryMedia[key];
}

export default function BlogPage() {
  const [featured, ...rest] = siteContent.blogPosts;

  return (
    <div>
      <PageHero
        number="01"
        eyebrow="Blog"
        title="Bakım notları ve kısa rehberler."
        copy="Bakım rutinleri, uygulama öncesi hazırlıklar ve hizmet seçiminde yardımcı olacak kısa rehber içerikler."
        photo={[
          siteContent.media.editorial[1].src,
          siteContent.media.editorial[0].src,
        ]}
        photoAlt="Editorial bakım yazıları"
        actions={[
          { label: "Online randevu", href: "/randevu", primary: true },
          { label: "Hizmetler", href: "/hizmetler" },
        ]}
        backdropWord="JOURNAL"
      />

      {/* Marquee — categories */}
      <section className="border-y border-hairline bg-white py-4 lg:py-5">
        <Marquee
          speed={45}
          itemGap="3rem"
          items={[
            <span key="a" className="font-display text-xl font-bold tracking-tight text-graphite lg:text-2xl">
              Cilt Bakımı
            </span>,
            <span key="b" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
            <span key="c" className="font-display text-xl font-bold italic tracking-tight text-graphite/55 lg:text-2xl">
              Tırnak Bakımı
            </span>,
            <span key="d" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
            <span key="e" className="font-display text-xl font-bold tracking-tight text-graphite lg:text-2xl">
              Epilasyon
            </span>,
            <span key="f" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
            <span key="g" className="font-display text-xl font-bold italic tracking-tight text-graphite/55 lg:text-2xl">
              Vücut Bakımı
            </span>,
            <span key="h" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
            <span key="i" className="font-display text-xl font-bold tracking-tight text-graphite lg:text-2xl">
              Saç Tasarımı
            </span>,
            <span key="j" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
          ]}
        />
      </section>

      {/* Featured */}
      {featured ? (
        <section className="border-t border-hairline bg-white">
          <div className="shell py-20 lg:py-28">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <ClipReveal direction="up" duration={1.4}>
                  <div className="relative overflow-hidden rounded-[36px]" style={{ aspectRatio: "5/4" }}>
                    <ParallaxImage
                      src={imageFor(featured.category)}
                      alt={featured.title}
                      className="absolute inset-0"
                      amount={50}
                      scale={1.12}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mochaDeep/40 via-transparent to-transparent transition group-hover:from-mochaDeep/55" />
                    <div className="absolute right-5 top-5">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45">
                        <span aria-hidden>↗</span>
                      </span>
                    </div>
                  </div>
                </ClipReveal>

                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-peach px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-mocha">
                    Öne çıkan · {featured.category}
                  </span>
                  <RevealText
                    as="h2"
                    className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-graphite group-hover:text-mocha"
                  >
                    {featured.title}
                  </RevealText>
                  <InView delay={0.2}>
                    <p className="mt-6 max-w-lg text-base leading-8 text-ash">{featured.excerpt}</p>
                  </InView>
                  <InView delay={0.3}>
                    <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ash">
                      {featured.readMinutes} dk okuma · Sayamer Ekibi
                    </p>
                  </InView>
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {/* Rest — masonry-style peach cards */}
      {rest.length > 0 ? (
        <section className="border-t border-hairline bg-white">
          <div className="shell py-20 lg:py-28">
            <SectionHeader number="02" eyebrow="Diğer yazılar" title="Yazı arşivi." />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, idx) => {
                const tilt = idx % 3 === 1 ? "lg:translate-y-6" : idx % 3 === 2 ? "lg:-translate-y-3" : "";
                return (
                  <InView key={post.slug} delay={idx * 0.06} y={28}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={`group flex h-full flex-col overflow-hidden rounded-[28px] bg-peachLight transition hover:-translate-y-1 hover:bg-peach ${tilt}`}
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                        <img
                          src={imageFor(post.category)}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-graphite">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="font-display text-lg font-extrabold tracking-tight text-graphite">
                          {post.title}
                        </p>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-graphite/75">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                            {post.readMinutes} dk
                          </p>
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
                            <span aria-hidden>↗</span>
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
        number="03"
        eyebrow="Devam"
        title="Okuduklarınızı uzmanlarla pratiğe dökün."
        primaryCta={{ label: "Randevu al", href: "/randevu" }}
        secondaryCta={{ label: "Hizmetler", href: "/hizmetler" }}
      />
    </div>
  );
}
