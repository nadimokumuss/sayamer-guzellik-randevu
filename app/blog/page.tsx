import Link from "next/link";

import { Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata("Blog", "Sayamer Güzellik blog yazıları ve bakım notları.");

const blogImages = [
  siteContent.serviceCategoryMedia["cilt-bakimi"],
  siteContent.serviceCategoryMedia["tirnak-bakimi"],
  siteContent.serviceCategoryMedia.epilasyon,
  siteContent.serviceCategoryMedia.g5,
];

export default function BlogPage() {
  const [featured, ...rest] = siteContent.blogPosts;

  return (
    <div className="shell py-10">
      {/* Hero */}
      <section className="card p-8 sm:p-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-400">
          <Link href="/" className="hover:text-espresso">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-espresso">Blog</span>
        </nav>

        <div className="mt-6 max-w-3xl">
          <Eyebrow>Medya</Eyebrow>
          <h1 className="mt-5 font-display text-display-lg text-espresso">
            Bakım notları ve kısa rehberler
          </h1>
          <p className="mt-5 text-base leading-8 text-ink-500">
            Bakım rutinleri, uygulama öncesi hazırlıklar ve hizmet seçiminde yardımcı olacak kısa
            rehber içerikler burada yer alır.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured ? (
        <section className="mt-10">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block overflow-hidden rounded-4xl border border-line bg-white shadow-editorial transition duration-500 ease-soft hover:-translate-y-1"
          >
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <img
                  src={blogImages[0]}
                  alt={featured.title}
                  className="h-full w-full object-cover transition duration-700 ease-soft group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <Eyebrow>Öne Çıkan Yazı</Eyebrow>
                <h2 className="mt-4 font-display text-display-md leading-tight text-espresso">
                  {featured.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-ink-500">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-wider text-ink-400">
                  <span>{featured.category}</span>
                  <span>•</span>
                  <span>{featured.readMinutes} dk okuma</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rosewood">
                  Yazıyı oku →
                </span>
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      {/* Rest */}
      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition duration-500 ease-soft hover:-translate-y-1 hover:shadow-elevated"
          >
            <div className="aspect-[16/11] overflow-hidden">
              <img
                src={blogImages[(index + 1) % blogImages.length]}
                alt={post.title}
                className="h-full w-full object-cover transition duration-700 ease-soft group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="eyebrow-text">{post.category}</p>
              <h3 className="mt-3 font-display text-xl leading-tight text-espresso">{post.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-500">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-wider text-ink-400">
                <span>{post.readMinutes} dk okuma</span>
                <span className="text-rosewood">Oku →</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-16">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <Eyebrow>Sonraki Adım</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-espresso">
              Yazılarda okuduklarınızı uzmanlarla pratiğe dökün
            </h2>
          </div>
          <LinkButton href="/randevu" variant="primary" size="lg">
            Randevu Oluştur
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
