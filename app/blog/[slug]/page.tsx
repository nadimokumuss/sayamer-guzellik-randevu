import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { InView } from "@/components/motion/in-view";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { DarkCTA } from "@/components/layout/dark-cta";
import { SectionHeader } from "@/components/layout/section-header";
import { siteContent } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return siteContent.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = siteContent.blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Yazı bulunamadı" };
  }
  return { title: post.title, description: post.excerpt };
}

const categoryImageMap: Record<string, keyof typeof siteContent.serviceCategoryMedia> = {
  "Cilt Bakımı": "cilt-bakimi",
  "Tırnak Bakımı": "tirnak-bakimi",
  Epilasyon: "epilasyon",
  "Vücut Bakımı": "g5",
};

export default async function BlogDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = siteContent.blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const imageKey = categoryImageMap[post.category] ?? "cilt-bakimi";
  const image = siteContent.serviceCategoryMedia[imageKey];

  const related = siteContent.blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div>
      {/* Header */}
      <section className="bg-white">
        <div className="shell py-20 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ash transition hover:text-graphite"
            >
              <span aria-hidden className="transition group-hover:-translate-x-1">←</span>
              <span>Blog'a dön</span>
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-peach px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-mocha">
                {post.category}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ash">
                {post.readMinutes} dk okuma
              </span>
            </div>

            <RevealText
              as="h1"
              className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-graphite"
            >
              {post.title}
            </RevealText>

            <InView delay={0.2}>
              <p className="mt-8 text-lg leading-8 text-ash">{post.excerpt}</p>
            </InView>

            <InView delay={0.3}>
              <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ash">
                Sayamer Ekibi
              </p>
            </InView>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-white">
        <div className="shell pb-12 lg:pb-16">
          <ClipReveal direction="up" duration={1.4}>
            <div className="relative overflow-hidden rounded-[36px]" style={{ height: "52vh", minHeight: "420px" }}>
              <ParallaxImage
                src={image}
                alt={post.title}
                className="absolute inset-0"
                amount={70}
                scale={1.15}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mochaDeep/30 via-transparent to-transparent" />
            </div>
          </ClipReveal>
        </div>
      </section>

      {/* Body — drop cap on first paragraph */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <article className="mx-auto max-w-3xl space-y-8 text-lg leading-9 text-graphite/90">
            {post.body.map((paragraph, index) => {
              if (index === 0) {
                const first = paragraph.charAt(0);
                const rest = paragraph.slice(1);
                return (
                  <InView key={index} delay={index * 0.05}>
                    <p>
                      <span className="float-left mr-3 mt-2 font-display text-[5rem] font-extrabold leading-[0.85] tracking-tight text-graphite">
                        {first}
                      </span>
                      {rest}
                    </p>
                  </InView>
                );
              }
              if (index === 1 && post.body.length > 2) {
                return (
                  <InView key={index} delay={index * 0.05}>
                    <p>{paragraph}</p>
                    <p
                      className="my-12 border-y border-hairline py-10 text-center font-display text-2xl italic font-medium leading-[1.4] tracking-tight text-mocha lg:text-3xl"
                      aria-hidden
                    >
                      &ldquo;{post.excerpt}&rdquo;
                    </p>
                  </InView>
                );
              }
              return (
                <InView key={index} delay={index * 0.05}>
                  <p>{paragraph}</p>
                </InView>
              );
            })}
          </article>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-16 lg:py-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-[28px] bg-peachLight p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mocha">
                Pratiğe dök
              </p>
              <p className="mt-3 font-display text-xl font-extrabold tracking-tight text-graphite lg:text-2xl">
                {post.category} uzmanımızla seansınızı planlayın.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/randevu"
                className="group inline-flex items-center gap-3 rounded-full bg-graphite px-6 py-3 text-sm font-semibold text-white transition hover:bg-mocha"
              >
                <span>Randevu al</span>
                <span aria-hidden className="grid h-6 w-6 place-items-center rounded-full bg-white text-graphite transition group-hover:rotate-45">
                  →
                </span>
              </Link>
              <Link href={post.href} className="btn-pill-outline">
                <span>İlgili hizmetler</span>
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related — peach masonry */}
      {related.length > 0 ? (
        <section className="border-t border-hairline bg-white">
          <div className="shell py-20 lg:py-28">
            <SectionHeader
              number="—"
              eyebrow="Diğer yazılar"
              title="Daha fazla oku."
              cta={{ label: "Tümü", href: "/blog" }}
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, idx) => {
                const cat = categoryImageMap[p.category] ?? "cilt-bakimi";
                const img = siteContent.serviceCategoryMedia[cat];
                const tilt = idx % 3 === 1 ? "lg:translate-y-4" : "";
                return (
                  <InView key={p.slug} delay={idx * 0.08} y={28}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className={`group flex h-full flex-col overflow-hidden rounded-[28px] bg-peachLight transition hover:-translate-y-1 hover:bg-peach ${tilt}`}
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                        <img
                          src={img}
                          alt={p.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rosewood">
                          {p.category}
                        </p>
                        <p className="mt-3 font-display text-lg font-extrabold tracking-tight text-graphite">
                          {p.title}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-graphite/75">
                          {p.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                            {p.readMinutes} dk
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
        number="—"
        eyebrow="Devam"
        title="Bakım rotanızı netleştirin, randevunuzu oluşturun."
        primaryCta={{ label: "Randevu al", href: "/randevu" }}
        secondaryCta={{ label: "Blog'a dön", href: "/blog" }}
      />
    </div>
  );
}
