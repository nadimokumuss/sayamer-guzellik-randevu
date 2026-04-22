import Link from "next/link";

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
    <div>
      {/* HERO */}
      <section className="warm-wash">
        <div className="shell pt-20 pb-20 lg:pt-32 lg:pb-24">
          <p className="eyebrow-tag" data-reveal>
            Blog
          </p>
          <h1
            className="mt-8 max-w-3xl font-display text-display-xl text-graphite"
            data-reveal
            data-reveal-delay="1"
          >
            Bakım notları ve kısa rehberler.
          </h1>
          <p
            className="mt-8 max-w-xl text-base leading-8 text-ash"
            data-reveal
            data-reveal-delay="2"
          >
            Bakım rutinleri, uygulama öncesi hazırlıklar ve hizmet seçiminde yardımcı
            olacak kısa rehber içerikler burada yer alır.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      {featured ? (
        <section className="rule-top bg-bone">
          <div className="shell py-24 lg:py-32">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
                <div className="overflow-hidden" data-reveal>
                  <img
                    src={blogImages[0]}
                    alt={featured.title}
                    className="aspect-[5/4] w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <p className="eyebrow-tag">Öne çıkan · {featured.category}</p>
                  <h2 className="mt-6 font-display text-display-lg text-graphite transition group-hover:text-clay">
                    {featured.title}
                  </h2>
                  <p className="mt-6 max-w-lg text-base leading-8 text-ash">
                    {featured.excerpt}
                  </p>
                  <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ash">
                    {featured.readMinutes} dk okuma
                  </p>
                  <span className="mt-10 inline-block link-underline">Yazıyı oku</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {/* REST */}
      {rest.length > 0 ? (
        <section className="rule-top bg-bone">
          <div className="shell py-24 lg:py-32">
            <p className="eyebrow-tag">Diğer yazılar</p>

            <ul className="mt-16 rule-top">
              {rest.map((post, index) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="service-row flex-col items-start gap-3 transition hover:pl-2 hover:text-clay sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="service-row-number">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-ash">
                        {post.category}
                      </p>
                      <p className="mt-3 font-display text-2xl text-graphite">
                        {post.title}
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-ash">
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="service-row-meta whitespace-nowrap">
                      {post.readMinutes} dk
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-tag">Devam</p>
            <h2 className="mt-6 font-display text-display-lg text-graphite">
              Okuduklarınızı uzmanlarla pratiğe dökün.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/randevu" className="btn-minimal-solid">
                Randevu al
              </Link>
              <Link href="/hizmetler" className="link-underline">
                Hizmetleri görüntüle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
