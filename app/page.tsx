import Link from "next/link";

import { CountUp } from "@/components/motion/count-up";
import { InView } from "@/components/motion/in-view";
import { RevealText } from "@/components/motion/reveal-text";
import { ServiceCard } from "@/components/ui/service-card";
import { getCatalog } from "@/lib/catalog";
import { siteContent } from "@/lib/site";

const trustItems = [
  {
    title: "Uzman Kadro",
    caption: "Sertifikalı profesyoneller",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "%100 Hijyen",
    caption: "Steril ve güvenli ortam",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Premium Ürünler",
    caption: "Dünyaca ünlü markalar",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M5 8h14l-1 11H6L5 8z" strokeLinejoin="round" />
        <path d="M9 8a3 3 0 1 1 6 0" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const catalog = getCatalog();
  const featuredCategories = catalog.categories.slice(0, 4);

  return (
    <div>
      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section className="border-b border-line bg-[#f8f5f2]">
        <div className="shell">
          <div className="grid min-h-[660px] items-center gap-0 py-16 lg:grid-cols-[1fr_2fr_1fr] lg:py-0">

            {/* Sol: hizmet listesi */}
            <div className="hidden lg:flex lg:flex-col lg:justify-center lg:border-r lg:border-line lg:pr-12 lg:py-20">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400">
                Hizmetlerimiz
              </p>
              <ul>
                {catalog.categories.map((cat, i) => (
                  <li key={cat.id} className={i !== 0 ? "border-t border-line" : ""}>
                    <Link
                      href={`/hizmetler#${cat.slug}`}
                      className="group flex items-center justify-between py-3 text-[13px] font-medium text-ink-600 transition-colors hover:text-ink-900"
                    >
                      {cat.name}
                      <span className="opacity-0 transition-opacity group-hover:opacity-100 text-brand-500">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Orta: slogan */}
            <div className="flex flex-col items-center justify-center px-0 text-center lg:px-14 lg:py-20">
              <RevealText
                as="h1"
                className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.15] tracking-tight text-ink-900"
                stagger={0.06}
              >
                Doğal Güzelliğinizi
              </RevealText>
              <InView delay={0.4}>
                <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.15] tracking-tight">
                  <span className="text-brand-gradient inline-block animate-hue-pulse">
                    Ortaya Çıkarın
                  </span>
                </h1>
              </InView>
              <InView delay={0.6}>
                <p className="mt-5 max-w-[300px] text-[14px] leading-7 text-ink-500">
                  Uzman dokunuşlar ve size özel bakım ritüelleriyle kendinizi yenilenmiş hissedin.
                </p>
              </InView>
              <InView delay={0.75}>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link href="/randevu" className="btn-pill-brand">
                    Hemen Randevu Al
                  </Link>
                  <Link
                    href="/hizmetler"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-[13px] font-semibold text-ink-700 transition hover:border-brand-300 hover:text-ink-900"
                  >
                    Hizmetleri İncele
                  </Link>
                </div>
              </InView>
            </div>

            {/* Sağ: fotoğraflar */}
            <div className="hidden lg:flex lg:flex-col lg:gap-3 lg:border-l lg:border-line lg:pl-12 lg:py-16">
              <div className="h-52 overflow-hidden rounded-2xl">
                <img
                  src={siteContent.media.editorial[0].src}
                  alt={siteContent.media.editorial[0].alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-36 overflow-hidden rounded-xl">
                  <img
                    src={siteContent.media.editorial[1].src}
                    alt={siteContent.media.editorial[1].alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-36 overflow-hidden rounded-xl">
                  <img
                    src={siteContent.media.editorial[2].src}
                    alt={siteContent.media.editorial[2].alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. TRUST STRIP ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="shell py-10 lg:py-14">
          <div className="grid gap-8 sm:grid-cols-3">
            {trustItems.map((item, i) => (
              <InView key={item.title} delay={i * 0.1}>
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-display text-[16px] font-bold text-ink-900">{item.title}</p>
                    <p className="text-[13px] text-ink-500">{item.caption}</p>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES PREVIEW ─────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="shell py-16 lg:py-24">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">
                Hizmetlerimiz
              </p>
              <RevealText
                as="h2"
                className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900"
              >
                Size Özel Bakım Çözümleri
              </RevealText>
            </div>
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 hover:gap-2 transition-all"
            >
              Tüm Hizmetleri Gör <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((cat, i) => {
              const image =
                siteContent.serviceCategoryMedia[
                  cat.id as keyof typeof siteContent.serviceCategoryMedia
                ] ?? siteContent.media.editorial[0].src;
              return (
                <InView key={cat.id} delay={i * 0.08} y={28}>
                  <ServiceCard
                    href={`/hizmetler#${cat.id}`}
                    image={image}
                    imageAlt={cat.name}
                    title={cat.name}
                    description={cat.description}
                    priceLabel="Detaylar"
                    detailLabel="Keşfet"
                  />
                </InView>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. ABOUT PREVIEW ────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="shell py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <InView>
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="https://images.pexels.com/photos/3997393/pexels-photo-3997393.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="Sayamer Güzellik Merkezi salon iç mekanı"
                  className="h-full w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
            </InView>

            <div>
              <InView>
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">
                  Hakkımızda
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900">
                  Güzellik ve Bakımda<br />Yılların Deneyimi
                </h2>
              </InView>

              <InView delay={0.15}>
                <p className="mt-6 text-[15px] leading-7 text-ink-500">
                  Sayamer Güzellik Merkezi olarak, güzelliğin sadece dış görünüşten ibaret
                  olmadığına inanıyoruz. Her bireyin kendine has ışığını ortaya çıkarmak için
                  kişiselleştirilmiş hizmetler sunuyoruz.
                </p>
              </InView>

              <InView delay={0.25}>
                <p className="mt-4 text-[15px] leading-7 text-ink-500">
                  Hijyen ortamımız, son teknoloji ekipmanlarımız ve alanında uzman kadromuzla,
                  kendinizi güvende ve özel hissetmeniz için çalışıyoruz.
                </p>
              </InView>

              <InView delay={0.35}>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { value: 10, suffix: "+", label: "Yıllık Tecrübe" },
                    { value: 5, suffix: "k+", label: "Mutlu Müşteri" },
                    { value: 24, suffix: "", label: "Uzman Personel" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl bg-brand-50 px-4 py-5 text-center"
                    >
                      <p className="font-display text-2xl font-extrabold tracking-tight text-brand-700">
                        <CountUp to={stat.value} />{stat.suffix}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-600">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </InView>

              <InView delay={0.45}>
                <Link href="/hakkimizda" className="btn-pill-brand mt-8">
                  Tanışmaya Bekliyoruz
                </Link>
              </InView>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="shell py-16 lg:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">
              Yorumlar
            </p>
            <RevealText
              as="h2"
              className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900"
            >
              Müşterilerimiz Ne Diyor?
            </RevealText>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {siteContent.testimonials.slice(0, 3).map((t, i) => (
              <InView key={t.id} delay={i * 0.08} y={28}>
                <div className="flex h-full flex-col gap-5 rounded-2xl bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover">
                  <div className="flex gap-0.5">
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
                  <p className="flex-1 text-[14px] leading-7 italic text-ink-700">"{t.text}"</p>
                  <div className="flex items-center gap-3 border-t border-line pt-5">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 font-display text-base font-extrabold text-brand-700">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-ink-900">{t.name}</p>
                      <p className="text-[12px] text-ink-500">{t.service}</p>
                    </div>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ───────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16">
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
                className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-white"
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
