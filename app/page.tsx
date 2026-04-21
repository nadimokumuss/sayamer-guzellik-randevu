import Link from "next/link";

import { AppIcon } from "@/components/ui/app-icon";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { EditorialPhoto } from "@/components/ui/editorial-photo";
import { PriceCard } from "@/components/ui/price-card";
import { StaffCard } from "@/components/ui/staff-card";
import { StatCard } from "@/components/ui/stat-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { getCatalog } from "@/lib/catalog";
import { siteContent } from "@/lib/site";
import { buildBookingHref } from "@/lib/utils";

function getCategoryImage(categoryId: string) {
  return (
    siteContent.serviceCategoryMedia[
      categoryId as keyof typeof siteContent.serviceCategoryMedia
    ] ?? siteContent.media.editorial[0].src
  );
}

export default function HomePage() {
  const catalog = getCatalog();
  const featuredServices = catalog.services.filter((service) => service.featured).slice(0, 6);
  const featuredPackages = catalog.packages.slice(0, 3);
  const previewStaff = [
    catalog.staff.find((s) => s.categoryId === "kuafor"),
    catalog.staff.find((s) => s.categoryId === "cilt-bakimi"),
    catalog.staff.find((s) => s.categoryId === "masaj"),
  ].filter((s): s is NonNullable<typeof s> => Boolean(s));
  const testimonials = catalog.testimonials.slice(0, 3);

  return (
    <div className="pb-24">
      {/* HERO */}
      <section className="shell pt-8 lg:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="card flex flex-col justify-between p-8 sm:p-12">
            <div>
              <Eyebrow>Sayamer Güzellik</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl text-espresso">
                {siteContent.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-ink-500">
                {siteContent.hero.copy}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/randevu" variant="primary" size="lg">
                  {siteContent.cta.bookingLabel}
                </LinkButton>
                <LinkButton href="/hizmetler" variant="outline" size="lg">
                  {siteContent.cta.servicesLabel}
                </LinkButton>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {siteContent.trust.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-subtle bg-surface-muted px-3 py-1.5 text-xs text-ink-500"
                >
                  <AppIcon name="check" className="h-3.5 w-3.5 text-rosewood" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-4xl border border-line shadow-editorial">
            <img
              src={siteContent.hero.slides[0].src}
              alt={siteContent.hero.slides[0].alt}
              className="h-full min-h-[420px] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <Badge variant="dark">Salon Deneyimi</Badge>
              <h2 className="mt-4 font-display text-3xl leading-tight">
                {siteContent.hero.slides[0].title}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/80">
                {siteContent.hero.slides[0].copy}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="shell mt-16">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Hizmet alanı"
            value={catalog.categories.length}
            hint="kategori, farklı ritüeller"
            accent={<AppIcon name="layers" className="h-6 w-6" />}
          />
          <StatCard
            label="Uzman kadro"
            value={catalog.staff.length}
            hint="deneyimli terapist ve stilist"
            accent={<AppIcon name="users" className="h-6 w-6" />}
          />
          <StatCard
            label="Online randevu"
            value="7/24"
            hint="anlık müsaitlik ve onay"
            accent={<AppIcon name="calendar" className="h-6 w-6" />}
          />
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="shell mt-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Hizmet Alanları</Eyebrow>
            <h2 className="mt-4 section-title-lg">Salon içinde deneyimleyebileceğiniz bakım rotaları</h2>
            <p className="section-copy mt-4">
              Saçtan cilde, tırnaktan vücuda kadar planlı ve açık bir bakım akışı tasarladık. Her
              kategoride uzmanıyla eşleşen hizmetleri inceleyin.
            </p>
          </div>
          <LinkButton href="/hizmetler" variant="outline" size="md">
            Tüm Hizmetler
          </LinkButton>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              href={`/hizmetler#${category.id}`}
              className="group relative overflow-hidden rounded-3xl border border-line shadow-soft transition duration-500 ease-soft hover:-translate-y-1 hover:shadow-elevated"
            >
              <img
                src={getCategoryImage(category.id)}
                alt={category.name}
                className="aspect-[4/3] w-full object-cover transition duration-700 ease-soft group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[11px] uppercase tracking-eyebrow text-white/80">
                  {category.accent ? "Kategori" : "Kategori"}
                </p>
                <h3 className="mt-2 font-display text-2xl">{category.name}</h3>
                <p className="mt-1 text-xs leading-5 text-white/80 line-clamp-2">
                  {category.heroLine}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="shell mt-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Öne Çıkanlar</Eyebrow>
            <h2 className="mt-4 section-title-lg">En çok tercih edilen hizmetler</h2>
          </div>
          <LinkButton href="/randevu" variant="link" size="md">
            Randevu ile başla →
          </LinkButton>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => {
            const category = catalog.categories.find((c) => c.id === service.categoryId);
            return (
              <PriceCard
                key={service.id}
                name={service.name}
                description={service.description}
                price={service.price}
                durationMinutes={service.durationMinutes}
                imageUrl={getCategoryImage(service.categoryId)}
                categoryLabel={service.tag ?? category?.name}
                href={buildBookingHref("/personeller", {
                  bookingType: "service",
                  itemId: service.id,
                })}
              />
            );
          })}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="shell mt-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            {siteContent.media.editorial.slice(0, 4).map((item, index) => (
              <div
                key={item.src}
                className={index === 0 || index === 3 ? "row-span-1" : ""}
              >
                <EditorialPhoto
                  src={item.src}
                  alt={item.alt}
                  imageClassName="aspect-[4/5] min-h-[200px]"
                />
              </div>
            ))}
          </div>

          <div>
            <Eyebrow>Salon Atmosferi</Eyebrow>
            <h2 className="mt-4 section-title-lg">{siteContent.sections.welcomeTitle}</h2>
            <p className="section-copy mt-5">{siteContent.sections.welcomeCopy}</p>
            <p className="section-copy mt-4">{siteContent.sections.comfortCopy}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/hakkimizda" variant="outline" size="md">
                Hakkımızda
              </LinkButton>
              <LinkButton href="/vizyon-ve-misyon" variant="primary" size="md">
                Vizyon ve Misyon
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="shell mt-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Paketler</Eyebrow>
            <h2 className="mt-4 section-title-lg">Avantajlı bakım programları</h2>
            <p className="section-copy mt-4">
              Hazırlanmış bakım rotaları ile hem avantajlı hem planlı ilerleyin.
            </p>
          </div>
          <LinkButton href="/paketler" variant="outline" size="md">
            Tüm Paketler
          </LinkButton>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((pkg, index) => (
            <PriceCard
              key={pkg.id}
              name={pkg.name}
              description={pkg.description}
              price={pkg.price}
              durationMinutes={pkg.durationMinutes}
              savingsLabel={pkg.savingsLabel}
              imageUrl={getCategoryImage(
                catalog.services.find((s) => s.id === pkg.primaryServiceId)?.categoryId ?? "cilt-bakimi",
              )}
              categoryLabel="Paket"
              highlight={index === 1}
              ctaLabel="Paketi Seç"
              href={buildBookingHref("/personeller", {
                bookingType: "package",
                itemId: pkg.id,
              })}
            />
          ))}
        </div>
      </section>

      {/* STAFF */}
      {previewStaff.length > 0 ? (
        <section className="shell mt-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Uzman Kadro</Eyebrow>
              <h2 className="mt-4 section-title-lg">Deneyimli dokunuşlar</h2>
            </div>
            <LinkButton href="/uzmanlar" variant="link" size="md">
              Tüm uzmanlar →
            </LinkButton>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {previewStaff.map((staff) => {
              const [firstName, ...rest] = staff.name.split(" ");
              return (
                <StaffCard
                  key={staff.id}
                  firstName={firstName}
                  lastName={rest.join(" ")}
                  title={staff.title}
                  signature={staff.signature}
                  specialties={staff.specialties.slice(0, 3)}
                />
              );
            })}
          </div>
        </section>
      ) : null}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 ? (
        <section className="shell mt-24">
          <div className="text-center">
            <Eyebrow>Müşteri Deneyimi</Eyebrow>
            <h2 className="mt-4 section-title-lg">Sayamer'de yaşanan bakım hissi</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                quote={t.quote}
                author={t.author}
                role={t.treatment}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* PROMOS */}
      <section className="shell mt-24">
        <div className="overflow-hidden rounded-4xl bg-espresso px-8 py-12 text-white shadow-elevated sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-blush">
                Bu Ay Öne Çıkanlar
              </span>
              <h2 className="mt-4 font-display text-display-md">
                Kendinize vakit ayırmanın en zarif yolu
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/80">
                Seçili paket ve hizmetlerde sezonluk avantajlar. Erken rezervasyonla daha uygun
                koşullarda planlama fırsatı.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/paketler" variant="outline" size="md" className="border-white/40 bg-white text-espresso hover:bg-white/95">
                  Paketleri İncele
                </LinkButton>
                <LinkButton href="/randevu" variant="outline" size="md" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                  Randevu Al
                </LinkButton>
              </div>
            </div>

            <div className="grid gap-3">
              {siteContent.promos.map((promo) => (
                <Link
                  key={promo.title}
                  href={promo.href}
                  className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <div>
                    <p className="font-display text-xl">{promo.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                      {promo.detail}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/50 line-through">{promo.oldPrice}</p>
                    <p className="font-display text-2xl">{promo.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="shell mt-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Blog</Eyebrow>
            <h2 className="mt-4 section-title-lg">Bakım notları ve kısa rehberler</h2>
          </div>
          <LinkButton href="/blog" variant="outline" size="md">
            Tüm Yazılar
          </LinkButton>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteContent.blogPosts.slice(0, 4).map((post, index) => {
            const imageKeys = ["cilt-bakimi", "tirnak-bakimi", "epilasyon", "g5"] as const;
            const image = siteContent.serviceCategoryMedia[imageKeys[index % imageKeys.length]];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition duration-500 ease-soft hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <img
                    src={image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-700 ease-soft group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="eyebrow-text">Yazı</p>
                  <h3 className="mt-3 font-display text-xl leading-tight text-espresso">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-500">{post.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="shell mt-24">
        <div className="card grid gap-8 p-10 sm:p-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow>İletişim</Eyebrow>
            <h2 className="mt-4 section-title-lg">Sizin için en uygun randevu birkaç adım ötede</h2>
            <p className="section-copy mt-5">
              Dilerseniz hizmet ve paketleri inceleyin, dilerseniz doğrudan iletişime geçin. Karar
              sürecini sade, rezervasyonu hızlı tuttuk.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/randevu" variant="primary" size="lg">
                Online Randevu
              </LinkButton>
              <LinkButton href="/iletisim" variant="outline" size="lg">
                İletişim
              </LinkButton>
              <LinkButton
                href={siteContent.contact.whatsappUrl}
                external
                variant="ghost"
                size="lg"
                leadingIcon={<AppIcon name="message" className="h-4 w-4" />}
              >
                WhatsApp
              </LinkButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-muted">
              <p className="eyebrow-text">Adres</p>
              <p className="mt-3 font-medium text-espresso">{siteContent.contact.addressTitle}</p>
              <div className="mt-2 space-y-1 text-sm leading-6 text-ink-500">
                {siteContent.contact.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <div className="card-muted">
              <p className="eyebrow-text">Hızlı İletişim</p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-ink-500">
                <p className="flex items-center gap-2">
                  <AppIcon name="phone" className="h-4 w-4 text-rosewood" />
                  {siteContent.contact.phoneDisplay}
                </p>
                <p className="flex items-center gap-2">
                  <AppIcon name="message" className="h-4 w-4 text-rosewood" />
                  {siteContent.contact.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
