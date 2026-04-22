import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  return {
    title: post.title,
    description: post.excerpt,
  };
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
      {/* HEADER */}
      <section className="shell pt-20 pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow-tag">
            <Link href="/blog" className="transition hover:text-graphite">
              Blog
            </Link>{" "}
            · {post.category}
          </p>
          <h1 className="mt-8 font-display text-display-xl text-graphite">
            {post.title}
          </h1>
          <p className="mt-8 text-lg leading-8 text-ash">{post.excerpt}</p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ash">
            {post.readMinutes} dk okuma · Sayamer Ekibi
          </p>
        </div>
      </section>

      {/* IMAGE */}
      <section className="rule-top bg-bone">
        <div className="shell py-16 lg:py-24">
          <div className="overflow-hidden" data-reveal>
            <img
              src={image}
              alt={post.title}
              className="h-[36vh] w-full object-cover transition duration-[1400ms] ease-out hover:scale-[1.02] lg:h-[48vh]"
            />
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <article className="mx-auto max-w-3xl space-y-8 text-lg leading-9 text-graphite/90">
            {post.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>

      {/* INLINE CTA */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-tag">Pratiğe dök</p>
            <h2 className="mt-6 font-display text-display-lg text-graphite">
              {post.category} uzmanımızla seansınızı planlayın.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/randevu" className="btn-minimal-solid">
                Randevu al
              </Link>
              <Link href={post.href} className="link-underline">
                İlgili hizmetler
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 ? (
        <section className="rule-top bg-bone">
          <div className="shell py-24 lg:py-32">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow-tag">Diğer yazılar</p>
                <h2 className="mt-6 font-display text-display-lg text-graphite">
                  Daha fazla oku
                </h2>
              </div>
              <Link href="/blog" className="link-underline">
                Tümü
              </Link>
            </div>

            <ul className="mt-16 rule-top">
              {related.map((p, index) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="service-row flex-col items-start gap-3 transition hover:pl-2 hover:text-clay sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="service-row-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-ash">
                        {p.category}
                      </p>
                      <p className="mt-3 font-display text-2xl text-graphite">{p.title}</p>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-ash">
                        {p.excerpt}
                      </p>
                    </div>
                    <span className="service-row-meta whitespace-nowrap">
                      {p.readMinutes} dk
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
