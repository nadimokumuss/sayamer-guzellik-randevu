import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
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
    <div className="shell py-10">
      <article className="mx-auto max-w-4xl">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-400">
          <Link href="/" className="hover:text-espresso">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-espresso">Blog</Link>
          <span>/</span>
          <span className="text-espresso">{post.category}</span>
        </nav>

        <header className="mt-6">
          <Eyebrow>{post.category}</Eyebrow>
          <h1 className="mt-5 font-display text-display-lg leading-tight text-espresso">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-500">{post.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-wider text-ink-400">
            <span>{post.readMinutes} dk okuma</span>
            <span>•</span>
            <span>Sayamer Ekibi</span>
          </div>
        </header>

        <div className="mt-8 overflow-hidden rounded-3xl border border-line shadow-editorial">
          <img src={image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
        </div>

        <div className="prose-editorial mt-10 space-y-6 text-base leading-8 text-ink-500">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <Eyebrow>Pratiğe Dök</Eyebrow>
            <h2 className="mt-3 font-display text-2xl text-espresso">
              {post.category.toLowerCase()} uzmanımızla seansınızı planlayın
            </h2>
          </div>
          <div className="flex gap-3">
            <LinkButton href={post.href} variant="outline" size="md">
              İlgili Hizmetler
            </LinkButton>
            <LinkButton href="/randevu" variant="primary" size="md">
              Randevu Al
            </LinkButton>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 ? (
        <section className="mt-20">
          <Eyebrow>Diğer yazılar</Eyebrow>
          <h2 className="mt-4 font-display text-display-md text-espresso">Daha fazla oku</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((p) => {
              const imgKey = categoryImageMap[p.category] ?? "cilt-bakimi";
              const img = siteContent.serviceCategoryMedia[imgKey];
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition duration-500 ease-soft hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="aspect-[16/11] overflow-hidden">
                    <img
                      src={img}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-700 ease-soft group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="eyebrow-text">{p.category}</p>
                    <h3 className="mt-3 font-display text-lg leading-tight text-espresso">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-500">{p.excerpt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
