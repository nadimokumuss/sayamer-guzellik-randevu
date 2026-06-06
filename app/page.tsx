import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { CountUp } from "@/components/motion/count-up";
import { InView } from "@/components/motion/in-view";
import { RevealText } from "@/components/motion/reveal-text";
import { BeautyGalleryTabs } from "@/components/ui/beauty-gallery-tabs";
import { Botanical } from "@/components/ui/botanical";
import { BrandStrip } from "@/components/ui/brand-strip";
import { BrandVideo } from "@/components/ui/brand-video";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { HomeHeroSlider } from "@/components/ui/home-hero-slider";
import { PricingCard } from "@/components/ui/pricing-card";
import { SectionTitleMark } from "@/components/ui/section-title-mark";
import { CategoryIcon } from "@/components/ui/service-icons";
import { getCatalog } from "@/lib/catalog";
import { siteContent } from "@/lib/site";

export default function HomePage() {
  const catalog = getCatalog();
  const editorial = siteContent.media.editorial;
  const media = siteContent.serviceCategoryMedia;

  // Top 4 service categories for the services grid
  const featuredCategories = [
    catalog.categories.find((c) => c.id === "cilt-bakimi")!,
    catalog.categories.find((c) => c.id === "kuafor")!,
    catalog.categories.find((c) => c.id === "tirnak-bakimi")!,
    catalog.categories.find((c) => c.id === "masaj")!,
  ];

  // Pricing — combine site promos with one package, enriched as product cards
  const pkg = catalog.packages[0];
  const promoImageMap: Record<string, { src: string; cat: string }> = {
    "G5 Masajı": { src: media.g5, cat: "Vücut" },
    "Cilt Bakımı": { src: media["cilt-bakimi"], cat: "Cilt" },
    "Zarif Tırnak": { src: media["tirnak-bakimi"], cat: "Tırnak" },
  };
  const pricingCards = [
    ...siteContent.promos.map((p) => {
      const img = promoImageMap[p.title] ?? { src: media["cilt-bakimi"], cat: "Premium" };
      return {
        title: p.title,
        description: p.detail,
        oldPrice: p.oldPrice,
        price: p.price,
        detail: p.detail,
        href: p.href,
        imageSrc: img.src,
        imageAlt: `${p.title} paketi`,
        category: img.cat,
        rating: 5,
        ctaLabel: "Detaylı İncele",
      };
    }),
    {
      title: pkg?.name ?? "Bakım Paketi",
      description: pkg?.description ?? "Çoklu seanslı paket avantajı",
      price: pkg ? `${pkg.price.toLocaleString("tr-TR")} TL` : "—",
      detail: pkg?.savingsLabel ?? "Paket avantajı",
      href: "/paketler",
      imageSrc: media.kuafor,
      imageAlt: pkg?.name ?? "Bakım paketi",
      category: "Paket",
      rating: 5,
      ctaLabel: "Detaylı İncele",
    },
  ];

  // Gallery tabs (BeautyGalleryTabs auto-prepends "Tümü")
  const galleryTabs = [
    {
      id: "kuafor",
      label: "Kuaför",
      images: [
        { src: media.kuafor, alt: "Kuaför uygulaması" },
        { src: media["sac-taramasi"], alt: "Saç tarama" },
      ],
    },
    {
      id: "cilt-bakimi",
      label: "Cilt Bakımı",
      images: [
        { src: media["cilt-bakimi"], alt: "Cilt bakımı" },
        { src: editorial[0].src, alt: editorial[0].alt },
      ],
    },
    {
      id: "tirnak-bakimi",
      label: "Tırnak & Ayak",
      images: [
        { src: media["tirnak-bakimi"], alt: "Tırnak bakımı" },
        { src: media["ayak-bakimi"], alt: "Ayak bakımı" },
      ],
    },
    {
      id: "masaj",
      label: "Masaj",
      images: [
        { src: media.masaj, alt: "Masaj" },
        { src: media["kafa-masaji"], alt: "Kafa masajı" },
        { src: media.g5, alt: "G5 vücut bakımı" },
      ],
    },
    {
      id: "epilasyon",
      label: "Epilasyon",
      images: [
        { src: media.epilasyon, alt: "Epilasyon" },
        { src: editorial[2].src, alt: editorial[2].alt },
      ],
    },
  ];

  const aboutStats = [
    { value: 10, suffix: "+", label: "Yıllık Tecrübe" },
    { value: 50, suffix: "+", label: "Premium Ürün" },
    { value: 5, suffix: "K+", label: "Mutlu Müşteri" },
    { value: 24, suffix: "+", label: "Uzman Personel" },
  ];

  const whyChoosePricing = [
    {
      title: "Saç Bakımı",
      description: "Kesim, fön ve ışıltı seansları.",
      price: "₺1.250",
      iconId: "kuafor",
    },
    {
      title: "Cilt Bakımı",
      description: "Arınma, nem ve canlı bir görünüm.",
      price: "₺1.700",
      iconId: "cilt-bakimi",
    },
    {
      title: "Tırnak Bakımı",
      description: "Manikür + uzun ömürlü kalıcı oje.",
      price: "₺1.450",
      iconId: "tirnak-bakimi",
    },
    {
      title: "Vücut & Masaj",
      description: "G5 ve rahatlatıcı seans birleşimi.",
      price: "₺2.150",
      iconId: "masaj",
    },
  ];

  return (
    <div>
      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <HomeHeroSlider />

      {/* ── 2. ABOUT + STATS ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <Botanical className="absolute -left-6 top-12 h-40 w-40 text-brand-300 opacity-50" />

        <div className="shell relative py-20 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Image stack */}
            <InView>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-card">
                  <img
                    src={editorial[0].src}
                    alt={editorial[0].alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 pt-10">
                  <div className="relative aspect-square overflow-hidden rounded-[40px] shadow-card">
                    <img
                      src={editorial[1].src}
                      alt={editorial[1].alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-card">
                    <img
                      src={editorial[2]?.src ?? editorial[0].src}
                      alt={editorial[2]?.alt ?? editorial[0].alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </InView>

            {/* Text */}
            <div>
              <InView>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                  Hakkımızda
                </p>
                <SectionTitleMark align="left" className="mt-2" />
              </InView>
              <RevealText
                as="h2"
                className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold italic leading-[1.05] tracking-tight text-ink-900"
              >
                Güzelliğin Üstünde Hiçbir Şey Yok
              </RevealText>

              <InView delay={0.15}>
                <p className="mt-6 text-[15px] leading-7 text-ink-600">
                  Sayamer Güzellik olarak; saç, cilt, tırnak ve bakım ritüellerini sakin,
                  planlı ve premium-soft bir deneyim içinde sunuyoruz. Her bireyin kendine has
                  ışığını ortaya çıkarmak için kişiselleştirilmiş hizmetler tasarlıyoruz.
                </p>
              </InView>

              <ul className="mt-7 space-y-3">
                {[
                  "Sertifikalı uzman kadro",
                  "Premium ürün ve son teknoloji ekipman",
                  "Hijyen odaklı, sakin ve modern salon",
                ].map((line, i) => (
                  <InView key={line} delay={i * 0.05}>
                    <li className="flex items-center gap-3 text-[14px] text-ink-700">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                          <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {line}
                    </li>
                  </InView>
                ))}
              </ul>

              <InView delay={0.4}>
                <Link href="/hakkimizda" className="btn-pill-brand mt-9">
                  Daha Fazla Bilgi <span aria-hidden>→</span>
                </Link>
              </InView>
            </div>
          </div>

          {/* 4-stat row */}
          <div className="mt-16 grid grid-cols-2 border-t border-brand-100 pt-12 sm:grid-cols-4">
            {aboutStats.map((stat, i) => (
              <InView key={stat.label} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-2 px-4 text-center sm:border-r sm:border-brand-100/70 sm:last:border-r-0">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 shadow-card">
                    {i === 0 && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M9 3h6v3H9zM10 6h4v3a3 3 0 0 1 3 3v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8a3 3 0 0 1 3-3z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <circle cx="9" cy="8" r="3.2" />
                        <circle cx="17" cy="9" r="2.4" />
                        <path d="M3 20c0-3 3-5 6-5s6 2 6 5M14 20c0-2 2-3.5 4-3.5s3 1.2 3 3" strokeLinecap="round" />
                      </svg>
                    )}
                    {i === 3 && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M12 3l1.8 4.6L18.5 9l-4 3 1.2 5L12 14.5 8.3 17l1.2-5-4-3 4.7-1.4z" strokeLinejoin="round" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                  <p className="mt-1 font-display text-3xl font-extrabold tracking-tight text-brand-700">
                    <CountUp to={stat.value} />
                    {stat.suffix}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-600">
                    {stat.label}
                  </p>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BRAND VIDEO ──────────────────────────────────────────── */}
      <BrandVideo />

      {/* ── 4. SERVICES GRID ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-50">
        <Botanical className="absolute -left-6 top-12 h-36 w-36 text-brand-300 opacity-60" />
        <Botanical
          flip
          className="absolute -right-6 bottom-12 h-36 w-36 text-brand-300 opacity-60"
        />

        <div className="shell relative py-20 lg:py-28">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <InView>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                Hizmetlerimiz
              </p>
              <SectionTitleMark className="mt-2" />
            </InView>
            <RevealText
              as="h2"
              className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold italic leading-[1.05] tracking-tight text-ink-900"
            >
              Premium Güzellik Bakım Hizmetleri
            </RevealText>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((cat, i) => (
              <InView key={cat.id} delay={i * 0.08} y={28}>
                <Link
                  href={`/hizmetler#${cat.id}`}
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-brand-100 bg-white p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-cardHover"
                >
                  <Botanical
                    className="pointer-events-none absolute -left-3 -top-3 h-20 w-20 text-brand-300 opacity-25 transition group-hover:opacity-40"
                  />
                  <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 shadow-card transition group-hover:scale-105">
                    <CategoryIcon categoryId={cat.id} className="h-9 w-9" />
                  </span>
                  <p className="mt-5 font-display text-[18px] font-bold tracking-tight text-ink-900">
                    {cat.name}
                  </p>
                  <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-ink-500">
                    {cat.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 border-b border-brand-300 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 transition group-hover:gap-2.5 group-hover:border-brand-600">
                    Randevu Al <span aria-hidden>→</span>
                  </span>
                </Link>
              </InView>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-700 hover:gap-3 transition-all"
            >
              Tüm Hizmetleri Keşfedin <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. WE ARE EXPERIENCED ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <Botanical className="absolute -left-6 top-12 h-40 w-40 text-brand-300 opacity-50" />
        <Botanical
          flip
          className="absolute -right-6 bottom-12 h-40 w-40 text-brand-300 opacity-50"
        />

        <div className="shell relative py-20 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <InView>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                  Tecrübemiz
                </p>
                <SectionTitleMark align="left" className="mt-2" />
              </InView>
              <RevealText
                as="h2"
                className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold italic leading-[1.05] tracking-tight text-ink-900"
              >
                Sizi Daha Güzel Yapmakta Yıllarca Deneyimliyiz
              </RevealText>

              <InView delay={0.15}>
                <p className="mt-6 text-[15px] leading-7 text-ink-600">
                  Hijyen, uzmanlık ve müşteri konforu birleştiğinde gerçek anlamda iyi hissetme
                  hali ortaya çıkar. Sayamer'da her seans bu üçlü çerçevede planlanır.
                </p>
              </InView>

              <ul className="mt-7 space-y-4">
                {[
                  ["Uzman Eşleşmesi", "Her hizmet için alanında deneyimli uzman."],
                  ["Şeffaf Fiyat", "Süre ve fiyat hizmet kartında açıkça yazılıdır."],
                  ["Modern Salon", "Sakin aydınlatma, hijyen ve özenli hazırlık."],
                  ["Kolay Rezervasyon", "Online randevu ve WhatsApp teyit akışı."],
                ].map(([title, copy], i) => (
                  <InView key={title} delay={i * 0.06}>
                    <li className="flex items-start gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                          <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-display text-[15px] font-bold text-ink-900">
                          {title}
                        </p>
                        <p className="mt-1 text-[13px] leading-6 text-ink-500">{copy}</p>
                      </div>
                    </li>
                  </InView>
                ))}
              </ul>

              <InView delay={0.4}>
                <Link href="/randevu" className="btn-pill-brand mt-10">
                  Hemen Randevu Al <span aria-hidden>→</span>
                </Link>
              </InView>
            </div>

            <InView y={28}>
              <div className="relative">
                <Botanical className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 text-brand-300 opacity-50" />
                <Botanical
                  flip
                  className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 text-brand-300 opacity-50"
                />
                <ul className="relative flex flex-col gap-4">
                  {whyChoosePricing.map((card, i) => (
                    <InView key={card.title} delay={i * 0.08}>
                      <li className="group flex items-center justify-between gap-4 rounded-3xl border border-brand-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-cardHover lg:p-6">
                        <div className="flex items-center gap-4">
                          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700">
                            <CategoryIcon categoryId={card.iconId} className="h-7 w-7" />
                          </span>
                          <div>
                            <p className="font-display text-[17px] font-bold tracking-tight text-ink-900">
                              {card.title}
                            </p>
                            <p className="mt-1 text-[12px] leading-5 text-ink-500">
                              {card.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="font-display text-xl font-extrabold tabular-nums text-brand-700">
                            {card.price}
                          </span>
                          <Link
                            href="/randevu"
                            className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700 transition group-hover:text-brand-800"
                          >
                            Randevu Al →
                          </Link>
                        </div>
                      </li>
                    </InView>
                  ))}
                </ul>
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* ── 5. GALLERY ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-50">
        <Botanical className="absolute -left-6 top-12 h-36 w-36 text-brand-300 opacity-60" />
        <Botanical
          flip
          className="absolute -right-6 bottom-12 h-36 w-36 text-brand-300 opacity-60"
        />

        <div className="shell relative py-20 lg:py-28">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <InView>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                Galeri
              </p>
              <SectionTitleMark className="mt-2" />
            </InView>
            <RevealText
              as="h2"
              className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold italic leading-[1.05] tracking-tight text-ink-900"
            >
              Salondan Anlar
            </RevealText>
          </div>

          <BeautyGalleryTabs tabs={galleryTabs} />

          <div className="mt-12 text-center">
            <Link
              href="/galeri"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-700 hover:gap-3 transition-all"
            >
              Tüm Galeriye Göz At <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. CONTACT / PROMO SPLIT ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <Botanical className="absolute -left-6 top-12 h-36 w-36 text-brand-300 opacity-50" />
        <Botanical
          flip
          className="absolute -right-6 bottom-12 h-36 w-36 text-brand-300 opacity-50"
        />

        <div className="shell relative py-20 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div className="space-y-8">
              <InView y={28}>
                <div className="relative overflow-hidden rounded-[40px] shadow-elevated">
                  <div className="relative aspect-[4/5]">
                    <img
                      src={media.kuafor}
                      alt="Salondan kuaför uygulaması"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/55 via-transparent to-transparent" />
                  </div>
                  {/* Promo badge */}
                  <div className="absolute right-5 bottom-5 rounded-2xl bg-brand-gradient px-5 py-4 text-white shadow-elevated lg:right-7 lg:bottom-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                      Bu Hafta
                    </p>
                    <p className="mt-1 font-display text-2xl font-extrabold italic leading-tight">
                      %20 İndirim
                    </p>
                    <p className="mt-1 text-[11px] font-semibold tracking-wide text-white/90">
                      {siteContent.promos[0]?.title ?? "Seçili paketlerde"}
                    </p>
                  </div>
                  {/* Eyebrow on image */}
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur lg:left-7 lg:top-7">
                    Özel Teklif
                  </div>
                </div>
              </InView>

              <div className="grid gap-3 rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:grid-cols-3 sm:gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">
                    Telefon
                  </p>
                  <a
                    href={`tel:${siteContent.contact.phoneRaw}`}
                    className="mt-1 block font-display text-[15px] font-bold leading-snug text-ink-900 hover:text-brand-700"
                  >
                    {siteContent.contact.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">
                    Çalışma Saati
                  </p>
                  <p className="mt-1 text-[12px] leading-5 text-ink-700">
                    {siteContent.contact.hours[0]?.label} · {siteContent.contact.hours[0]?.value}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">
                    Konum
                  </p>
                  <p className="mt-1 text-[12px] leading-5 text-ink-700">
                    {siteContent.contact.addressTitle}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <InView>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                  Hızlı İletişim
                </p>
                <SectionTitleMark align="left" className="mt-2" />
              </InView>
              <RevealText
                as="h2"
                className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold italic leading-[1.05] tracking-tight text-ink-900"
              >
                Bize Bir Soru Bırakın
              </RevealText>
              <InView delay={0.15}>
                <p className="mt-5 text-[14px] leading-7 text-ink-600">
                  Hizmetler, paketler veya rezervasyon süreci ile ilgili her türlü sorunuz için
                  formu doldurun — uzman ekibimiz WhatsApp üzerinden en kısa sürede dönüş yapsın.
                </p>
              </InView>
              <div className="mt-8 rounded-[28px] bg-white p-6 shadow-card lg:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-50">
        <Botanical className="absolute -left-6 top-12 h-36 w-36 text-brand-300 opacity-60" />
        <Botanical
          flip
          className="absolute -right-6 bottom-12 h-36 w-36 text-brand-300 opacity-60"
        />

        <div className="shell relative py-20 lg:py-28">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <InView>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                Sık Sorulanlar
              </p>
              <SectionTitleMark className="mt-2" />
            </InView>
            <RevealText
              as="h2"
              className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold italic leading-[1.05] tracking-tight text-ink-900"
            >
              Aklınızdaki Soruların Cevabı
            </RevealText>
          </div>

          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={[...siteContent.knowledgeBase]} />
          </div>
        </div>
      </section>

      {/* ── 8. AVANTAJLI PAKETLER ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <Botanical className="absolute -left-6 top-12 h-36 w-36 text-brand-300 opacity-50" />
        <Botanical
          flip
          className="absolute -right-6 bottom-12 h-36 w-36 text-brand-300 opacity-50"
        />

        <div className="shell relative py-20 lg:py-28">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <InView>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                Avantajlar
              </p>
              <SectionTitleMark className="mt-2" />
            </InView>
            <RevealText
              as="h2"
              className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold italic leading-[1.05] tracking-tight text-ink-900"
            >
              Avantajlı Paketler & Promosyonlar
            </RevealText>
            <InView delay={0.15}>
              <p className="mx-auto mt-5 max-w-xl text-[14px] leading-7 text-ink-600">
                Seçili hizmetlerde dönemsel indirimler ve çoklu seans paketleri ile bakım
                ritüellerinizi daha avantajlı planlayın.
              </p>
            </InView>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pricingCards.map((card, i) => (
              <InView key={card.title} delay={i * 0.08} y={20}>
                <PricingCard {...card} />
              </InView>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/paketler"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-700 transition-all hover:gap-3"
            >
              Tüm Paketler <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. BRAND STRIP ──────────────────────────────────────────── */}
      <section className="border-y border-brand-100 bg-white">
        <div className="shell py-10 lg:py-12">
          <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-brand-600">
            Çalıştığımız Profesyonel Markalar
          </p>
          <BrandStrip />
        </div>
      </section>

      {/* ── 10. TESTIMONIALS ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-50">
        <Botanical className="absolute -left-6 top-12 h-36 w-36 text-brand-300 opacity-60" />
        <Botanical
          flip
          className="absolute -right-6 bottom-12 h-36 w-36 text-brand-300 opacity-60"
        />

        <div className="shell relative py-20 lg:py-28">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <InView>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                Yorumlar
              </p>
              <SectionTitleMark className="mt-2" />
            </InView>
            <RevealText
              as="h2"
              className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold italic leading-[1.05] tracking-tight text-ink-900"
            >
              Müşterilerimiz Ne Diyor?
            </RevealText>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {siteContent.testimonials.slice(0, 3).map((t, i) => (
              <InView key={t.id} delay={i * 0.1} y={28}>
                <div className="relative flex h-full flex-col rounded-[28px] border border-transparent bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover">
                  {/* big decorative quote glyph */}
                  <svg
                    viewBox="0 0 32 32"
                    className="h-12 w-12"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id={`quoteGrad-${t.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C8956D" />
                        <stop offset="100%" stopColor="#8B5E3C" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M9 8c-3 0-5 2-5 5v8h8v-8H8c0-1 1-2 1-2V8zm14 0c-3 0-5 2-5 5v8h8v-8h-4c0-1 1-2 1-2V8z"
                      fill={`url(#quoteGrad-${t.id})`}
                      opacity="0.9"
                    />
                  </svg>

                  <div className="mt-5 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, ix) => (
                      <svg
                        key={ix}
                        className="h-4 w-4 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="mt-5 flex-1 text-[14px] leading-7 italic text-ink-700">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-brand-100 pt-5">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-brand-100">
                      <img
                        src={t.photoUrl}
                        alt={t.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-display text-[14px] font-bold text-ink-900">
                        {t.name}
                      </p>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
                        {t.service}
                      </p>
                    </div>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. BLOG ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <Botanical className="absolute -left-6 top-12 h-36 w-36 text-brand-300 opacity-50" />
        <Botanical
          flip
          className="absolute -right-6 bottom-12 h-36 w-36 text-brand-300 opacity-50"
        />

        <div className="shell relative py-20 lg:py-28">
          <div className="mb-12 flex flex-col items-end gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <InView>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                  Bilgi & Bakım
                </p>
                <SectionTitleMark align="left" className="mt-2" />
              </InView>
              <RevealText
                as="h2"
                className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold italic leading-[1.05] tracking-tight text-ink-900"
              >
                Son Yazılarımız
              </RevealText>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700 hover:gap-3 transition-all"
            >
              Tüm Yazılar <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {siteContent.blogPosts.slice(0, 3).map((post, i) => {
              const cover = post.coverUrl;
              return (
                <InView key={post.slug} delay={i * 0.1} y={28}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover"
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                      <img
                        src={cover}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-brand-gradient px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-card">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                        Yazar: {post.author} ·{" "}
                        {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="mt-3 font-display text-[19px] font-bold leading-snug tracking-tight text-ink-900 transition group-hover:text-brand-700">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-ink-500">
                        {post.excerpt}
                      </p>
                      <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700 transition group-hover:gap-3">
                        Devamını Oku <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </InView>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BRAND SIGNATURE ─────────────────────────────────────────── */}
      <section className="bg-brand-50 pt-16 lg:pt-20">
        <div className="shell flex flex-col items-center gap-5 text-center">
          <InView>
            <Image
              src="/sayamer-logo.png"
              alt={siteContent.brand.name}
              width={280}
              height={239}
              className="h-auto w-44 lg:w-52"
            />
          </InView>
          <InView delay={0.1}>
            <p className="max-w-md font-display text-[15px] italic leading-7 text-ink-500">
              {siteContent.brand.tagline}
            </p>
          </InView>
        </div>
      </section>

      {/* ── 12. CTA BANNER ──────────────────────────────────────────── */}
      <section className="bg-brand-50 py-12 lg:py-16">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[28px] bg-brand-gradient px-7 py-14 text-center text-white lg:px-14 lg:py-16">
            <span
              className="brand-blob h-72 w-72 animate-pulse-slow"
              style={{ background: "rgba(255,255,255,0.25)", top: "-30%", left: "-10%" }}
            />
            <span
              className="brand-blob h-64 w-64 animate-pulse-slow"
              style={{
                background: "rgba(255,255,255,0.18)",
                bottom: "-30%",
                right: "-5%",
                animationDelay: "2s",
              }}
            />

            <div className="relative mx-auto max-w-2xl">
              <RevealText
                as="h2"
                className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold italic leading-[1.1] tracking-tight text-white"
              >
                Güzelliğiniz İçin İlk Adımı Atın
              </RevealText>
              <InView delay={0.15}>
                <p className="mt-4 text-[15px] leading-7 text-white/85">
                  Ücretsiz ön görüşme randevusu oluşturun, uzmanlarımız cildiniz ve ihtiyaçlarınız
                  için en uygun planı çıkarsın.
                </p>
              </InView>
              <InView delay={0.25}>
                <Link href="/randevu" className="btn-pill-white mt-8">
                  Ücretsiz Danışma Al
                </Link>
              </InView>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
