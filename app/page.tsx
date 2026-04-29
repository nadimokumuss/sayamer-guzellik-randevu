import Link from "next/link";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { CountUp } from "@/components/motion/count-up";
import { InView } from "@/components/motion/in-view";
import { LiveClock } from "@/components/motion/live-clock";
import { Magnetic } from "@/components/motion/magnetic";
import { ManifestoMoment } from "@/components/motion/manifesto-moment";
import { Marquee } from "@/components/motion/marquee";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { StickyShowcase, type StickyShowcaseStep } from "@/components/motion/sticky-showcase";
import { HomeSlider } from "@/components/ui/home-slider";
import { getCatalog } from "@/lib/catalog";
import { siteContent } from "@/lib/site";
import { buildBookingHref, formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const catalog = getCatalog();
  const categoriesForHome = catalog.categories.slice(0, 4);
  const featuredPackages = catalog.packages.slice(0, 4);

  const stickySteps: StickyShowcaseStep[] = [
    {
      eyebrow: "01 · Hizmet seçimi",
      title: "Bakım yolculuğunuza karar verin",
      copy:
        "Saç, cilt, tırnak veya vücut bakımı — neye ihtiyacınız varsa açık fiyat ve süreyle önünüze geliyor.",
      image:
        "https://images.pexels.com/photos/3993421/pexels-photo-3993421.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Cilt bakımı yakın plan",
    },
    {
      eyebrow: "02 · Uzman eşleşmesi",
      title: "Doğru uzman ile zamanı kayıt edin",
      copy:
        "Hizmet için en uygun uzman ve uygun saatleri tek bakışta görün; zaman kaybetmeden randevuyu netleştirin.",
      image:
        "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Salon uygulama anı",
    },
    {
      eyebrow: "03 · Anında onay",
      title: "WhatsApp ile teyit, eli boş yola çıkmayın",
      copy:
        "Online onayın ardından WhatsApp üzerinden hatırlatma; geliş gününde her şey hazır olarak sizi bekliyor.",
      image:
        "https://images.pexels.com/photos/3997393/pexels-photo-3997393.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Salon iç mekanı",
    },
  ];

  return (
    <div>
      {/* ── 1. SLIDER ───────────────────────────────────────────────── */}
      <HomeSlider />

      {/* ── 2. STATUS RIBBON ────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="shell flex flex-wrap items-center justify-between gap-4 border-b border-hairline py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-graphite">
          <div className="flex items-center gap-5">
            <LiveClock compact />
            <span aria-hidden className="text-ash/40">·</span>
            <span className="hidden text-ash sm:inline">Bağdat Caddesi · Anadolu Yakası</span>
          </div>
          <div className="hidden items-center gap-5 text-ash md:flex">
            <span>Online randevu açık</span>
            <span aria-hidden className="text-ash/40">·</span>
            <span>WhatsApp 24/7</span>
            <span aria-hidden className="text-ash/40">·</span>
            <span className="text-graphite">≈ 3 saat müsaitlik</span>
          </div>
        </div>
      </section>

      {/* ── 3. MARQUEE — running ticker ─────────────────────────────── */}
      <section className="border-b border-hairline bg-white py-5 lg:py-7">
        <Marquee
          speed={45}
          itemGap="3.5rem"
          items={[
            <span key="a" className="font-display text-2xl font-bold tracking-tight text-graphite lg:text-3xl">
              Saç Tasarımı
            </span>,
            <span key="b" aria-hidden className="font-display text-2xl text-rosewood lg:text-3xl">✦</span>,
            <span key="c" className="font-display text-2xl font-bold italic tracking-tight text-graphite/55 lg:text-3xl">
              Cilt Bakımı
            </span>,
            <span key="d" aria-hidden className="font-display text-2xl text-rosewood lg:text-3xl">✦</span>,
            <span key="e" className="font-display text-2xl font-bold tracking-tight text-graphite lg:text-3xl">
              Tırnak Bakımı
            </span>,
            <span key="f" aria-hidden className="font-display text-2xl text-rosewood lg:text-3xl">✦</span>,
            <span key="g" className="font-display text-2xl font-bold italic tracking-tight text-graphite/55 lg:text-3xl">
              Epilasyon
            </span>,
            <span key="h" aria-hidden className="font-display text-2xl text-rosewood lg:text-3xl">✦</span>,
            <span key="i" className="font-display text-2xl font-bold tracking-tight text-graphite lg:text-3xl">
              Masaj &amp; Head Spa
            </span>,
            <span key="j" aria-hidden className="font-display text-2xl text-rosewood lg:text-3xl">✦</span>,
            <span key="k" className="font-display text-2xl font-bold italic tracking-tight text-graphite/55 lg:text-3xl">
              Vücut Bakımı
            </span>,
            <span key="l" aria-hidden className="font-display text-2xl text-rosewood lg:text-3xl">✦</span>,
          ]}
        />
      </section>

      {/* ── 4. INTRO — kinetic + parallax + editorial annotations ───── */}
      <section className="relative overflow-hidden bg-white">
        {/* Outlined backdrop word */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[20vw] font-extrabold leading-[0.85] tracking-[-0.04em] text-transparent lg:text-[18vw]"
          style={{ WebkitTextStroke: "1px rgba(26,26,24,0.06)" }}
        >
          SAYAMER
        </span>

        <div className="shell relative py-24 lg:py-32">
          <div className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <InView>
                <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite">
                  <span className="font-display text-base font-extrabold text-rosewood">01</span>
                  <span className="h-[1px] w-10 bg-graphite" />
                  Sayamer · İstanbul
                </p>
              </InView>

              <RevealText
                as="h2"
                className="mt-7 font-display text-[clamp(2.75rem,7vw,6rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-graphite"
                stagger={0.07}
              >
                Bakım yolculuğunuz burada başlıyor.
              </RevealText>

              <InView delay={0.15}>
                <p className="mt-8 max-w-md text-base leading-8 text-ash">
                  <span className="float-left mr-3 mt-1 font-display text-[3.4rem] font-extrabold leading-[0.85] tracking-tight text-graphite">
                    S
                  </span>
                  aç, cilt, tırnak ve bakım ritüellerini sakin bir salon atmosferi ve net bir
                  rezervasyon akışıyla sunuyoruz. Her detay özenli, hiçbiri fazla değil.
                </p>
              </InView>

              <InView delay={0.25}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Magnetic strength={0.3}>
                    <Link
                      href="/randevu"
                      className="group inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-4 text-sm font-semibold text-white transition hover:bg-mocha"
                    >
                      <span>Randevu al</span>
                      <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white text-graphite transition group-hover:rotate-45">
                        →
                      </span>
                    </Link>
                  </Magnetic>
                  <Link href="/hizmetler" className="btn-pill-outline">
                    <span>Hizmetler</span>
                    <span aria-hidden>↗</span>
                  </Link>
                </div>
              </InView>

              {/* Stats with editorial layout */}
              <InView delay={0.4} y={20}>
                <div className="mt-16 grid grid-cols-3 gap-6 border-t border-hairline pt-8">
                  <div className="relative">
                    <p className="font-display text-3xl font-extrabold tracking-tight text-graphite lg:text-4xl">
                      <CountUp to={6} />+
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                      Bakım alanı
                    </p>
                  </div>
                  <div className="relative">
                    <p className="font-display text-3xl font-extrabold tracking-tight text-graphite lg:text-4xl">
                      <CountUp to={4.9} decimals={1} />
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                      Memnuniyet
                    </p>
                  </div>
                  <div className="relative">
                    <p className="font-display text-3xl font-extrabold tracking-tight text-graphite lg:text-4xl">
                      <CountUp to={1200} />+
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                      Mutlu seans
                    </p>
                  </div>
                </div>
              </InView>
            </div>

            {/* RIGHT — clipped parallax photo + floating cards + annotation */}
            <div className="relative h-[560px] lg:h-[680px]">
              <ClipReveal direction="up" duration={1.4}>
                <ParallaxImage
                  src={siteContent.media.editorial[0].src}
                  alt={siteContent.media.editorial[0].alt}
                  className="absolute inset-0 rounded-[36px]"
                  amount={50}
                  scale={1.1}
                />
              </ClipReveal>
              <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-tr from-mochaDeep/50 via-mocha/0 to-transparent" />

              {/* Editorial annotation — handdrawn arrow + label */}
              <InView delay={1.0}>
                <div className="absolute -left-2 top-20 hidden lg:block">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite">
                      uzman uygulama
                    </span>
                    <svg viewBox="0 0 80 30" className="h-7 w-20 text-graphite/70" aria-hidden>
                      <path
                        d="M2 15 Q30 5 70 18 M64 12 L70 18 L62 22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </InView>

              {/* Floating credential card */}
              <InView delay={0.6} y={40}>
                <div className="absolute -right-3 top-10 w-[210px] rounded-2xl border border-hairline bg-white/95 p-4 shadow-[0_30px_70px_-20px_rgba(43,29,27,0.35)] backdrop-blur lg:-right-6">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-peach text-graphite">
                      <span aria-hidden>✦</span>
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ash">Hijyen</p>
                      <p className="text-[13px] font-bold tracking-tight text-graphite">Sertifikalı</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="font-display text-2xl font-extrabold tracking-tight text-graphite">
                      <CountUp to={100} />%
                    </p>
                    <p className="text-[11px] text-ash">tek kullanım</p>
                  </div>
                </div>
              </InView>

              {/* Floating availability card */}
              <InView delay={0.8} y={40}>
                <div className="absolute -left-3 bottom-12 w-[230px] rounded-2xl bg-graphite p-4 text-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)] lg:-left-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">Bugün</p>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                  </div>
                  <p className="mt-3 font-display text-lg font-bold tracking-tight">Müsait saat var</p>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {["14:00", "16:30", "18:00"].map((slot) => (
                      <span
                        key={slot}
                        className="rounded-full bg-white/10 px-2 py-1 text-center text-[11px] font-semibold tabular-nums text-white"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/randevu"
                    className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-peach hover:text-white transition"
                  >
                    Hemen al →
                  </Link>
                </div>
              </InView>

              {/* Decorative dotted ring */}
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 text-peach lg:h-32 lg:w-32"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="2 5"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MANIFESTO MOMENT ─────────────────────────────────────── */}
      <ManifestoMoment eyebrow="Felsefe" caption="— since 2019">
        <span>Karmaşayı değil </span>
        <em className="not-italic font-extrabold">sakinliği</em>
        <span> seçtik. Hizmeti, uzmanı ve saati </span>
        <em className="not-italic font-extrabold">net</em>
        <span> görüyor; gereksiz adım yaşamadan bakımınızı planlıyorsunuz.</span>
      </ManifestoMoment>

      {/* ── 6. STICKY SHOWCASE ──────────────────────────────────────── */}
      <section className="border-t border-hairline bg-white">
        <div className="shell pt-20 pb-10 lg:pt-28 lg:pb-12">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite">
                <span className="font-display text-base font-extrabold text-rosewood">02</span>
                <span className="h-[1px] w-10 bg-graphite" />
                Nasıl çalışıyor
              </p>
              <RevealText
                as="h2"
                className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-graphite"
              >
                Üç adımda planlı bakım.
              </RevealText>
            </div>
            <Link href="/randevu" className="hidden sm:inline-flex btn-pill-outline shrink-0">
              <span>Akışa başla</span>
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
        <div className="shell pb-20 lg:pb-28">
          <StickyShowcase steps={stickySteps} />
        </div>
      </section>

      {/* ── 7. SERVICES ─────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite">
                <span className="font-display text-base font-extrabold text-rosewood">03</span>
                <span className="h-[1px] w-10 bg-graphite" />
                Hizmetler
              </p>
              <RevealText
                as="h2"
                className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-graphite"
              >
                Bakım alanlarımız.
              </RevealText>
            </div>
            <Link href="/hizmetler" className="hidden sm:inline-flex btn-pill-outline shrink-0">
              <span>Tümünü gör</span>
              <span aria-hidden>↗</span>
            </Link>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <ul className="space-y-3">
              {categoriesForHome.map((category, idx) => {
                const photo =
                  siteContent.serviceCategoryMedia[
                    category.id as keyof typeof siteContent.serviceCategoryMedia
                  ];
                return (
                  <InView key={category.id} delay={idx * 0.08} y={16}>
                    <Link
                      href={`/hizmetler#${category.id}`}
                      className="group flex items-center gap-4 rounded-full border border-hairline bg-white px-3 py-2.5 pr-3 transition hover:border-graphite/30 hover:bg-peachLight/40"
                    >
                      {photo ? (
                        <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                          <img src={photo} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                        </span>
                      ) : (
                        <span className="h-11 w-11 shrink-0 rounded-full bg-peach" />
                      )}
                      <span className="flex-1 font-display text-base font-semibold tracking-tight text-graphite">
                        {category.name}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
                        <span aria-hidden>↗</span>
                      </span>
                    </Link>
                  </InView>
                );
              })}
            </ul>

            <div className="grid grid-cols-2 gap-4">
              <ClipReveal direction="up" duration={1.2}>
                <div className="group relative h-full overflow-hidden rounded-[32px]" style={{ aspectRatio: "4/5" }}>
                  <ParallaxImage
                    src={siteContent.media.editorial[1].src}
                    alt={siteContent.media.editorial[1].alt}
                    className="absolute inset-0"
                    amount={40}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mochaDeep/50 via-transparent to-transparent transition group-hover:from-mochaDeep/65" />
                  <div className="absolute right-4 top-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45">
                      <span aria-hidden>↗</span>
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">Editorial</p>
                    <p className="mt-1.5 font-display text-lg font-bold text-white">Detay odaklı uygulama</p>
                  </div>
                </div>
              </ClipReveal>
              <ClipReveal direction="up" duration={1.2} delay={0.15}>
                <div className="group relative h-full overflow-hidden rounded-[32px] bg-peach" style={{ aspectRatio: "4/5" }}>
                  <ParallaxImage
                    src="https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Beauty product close-up"
                    className="absolute inset-0"
                    amount={40}
                  />
                </div>
              </ClipReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. PACKAGES ─────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite">
                <span className="font-display text-base font-extrabold text-rosewood">04</span>
                <span className="h-[1px] w-10 bg-graphite" />
                Programlar
              </p>
              <RevealText
                as="h2"
                className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-graphite"
              >
                Bakım programları.
              </RevealText>
            </div>
            <Link href="/paketler" className="btn-pill-outline shrink-0">
              <span>Tümü</span>
              <span aria-hidden>↗</span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPackages.map((pkg, idx) => {
              const primaryService = catalog.services.find((s) => s.id === pkg.primaryServiceId);
              const categoryKey = primaryService?.categoryId as keyof typeof siteContent.serviceCategoryMedia;
              const pkgImage =
                siteContent.serviceCategoryMedia[categoryKey] ??
                siteContent.media.editorial[idx % siteContent.media.editorial.length].src;
              return (
                <InView key={pkg.id} delay={idx * 0.08} y={32}>
                  <Link
                    href={buildBookingHref("/personeller", { bookingType: "package", itemId: pkg.id })}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-hairline bg-white transition hover:-translate-y-1 hover:border-graphite/25 hover:shadow-[0_30px_70px_-30px_rgba(43,29,27,0.4)]"
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <img
                        src={pkgImage}
                        alt={pkg.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-mochaDeep/40 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-graphite">
                        <span aria-hidden>✦</span>Paket {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-display text-base font-bold tracking-tight text-graphite">{pkg.name}</p>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-ash">{pkg.description}</p>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <p className="font-display text-xl font-extrabold tracking-tight text-graphite">
                          {formatCurrency(pkg.price)}
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

      {/* ── 9. EDITORIAL BENTO ──────────────────────────────────────── */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite">
                <span className="font-display text-base font-extrabold text-rosewood">05</span>
                <span className="h-[1px] w-10 bg-graphite" />
                Bakım deneyimi
              </p>
              <RevealText
                as="h2"
                className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-graphite"
              >
                Bütüncül yaklaşım, dramatic detay.
              </RevealText>
            </div>
            <Link href="/hizmetler" className="hidden sm:inline-flex btn-pill-outline shrink-0">
              <span>Daha fazla</span>
              <span aria-hidden>↗</span>
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <ClipReveal direction="up" duration={1.4}>
              <div className="group relative overflow-hidden rounded-[36px] bg-mocha" style={{ minHeight: "480px" }}>
                <ParallaxImage
                  src={siteContent.categoryHighlights[1].image}
                  alt={siteContent.categoryHighlights[1].title}
                  className="absolute inset-0"
                  amount={60}
                  scale={1.15}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-mochaDeep/80 via-mocha/35 to-transparent" />

                <Link
                  href={siteContent.categoryHighlights[1].href}
                  className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur transition hover:bg-white/25"
                >
                  <span>Detay</span>
                  <span aria-hidden>↗</span>
                </Link>

                <svg
                  aria-hidden
                  viewBox="0 0 60 30"
                  className="absolute right-32 top-12 h-8 w-16 text-white/60"
                >
                  <path d="M2 15 Q30 2 56 15 M50 9 L56 15 L48 18" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>

                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Holistic</p>
                  <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight text-white">
                    {siteContent.categoryHighlights[1].title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
                    {siteContent.categoryHighlights[1].copy}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-graphite">
                    <span aria-hidden>✕</span>
                    <span>Cilt Bakımı</span>
                  </div>
                </div>
              </div>
            </ClipReveal>

            <div className="grid gap-4">
              <ClipReveal direction="up" duration={1.2} delay={0.15}>
                <div className="relative overflow-hidden rounded-[36px]" style={{ minHeight: "232px" }}>
                  <ParallaxImage
                    src={siteContent.categoryHighlights[0].image}
                    alt={siteContent.categoryHighlights[0].title}
                    className="absolute inset-0"
                    amount={45}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mochaDeep/45 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 font-display text-lg font-bold text-white">
                    Pürüzsüz cilt
                  </p>
                </div>
              </ClipReveal>
              <ClipReveal direction="up" duration={1.2} delay={0.3}>
                <div className="relative overflow-hidden rounded-[36px]" style={{ minHeight: "232px" }}>
                  <ParallaxImage
                    src={siteContent.categoryHighlights[2].image}
                    alt={siteContent.categoryHighlights[2].title}
                    className="absolute inset-0"
                    amount={45}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mochaDeep/45 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 font-display text-lg font-bold text-white">
                    Vücut bakımı
                  </p>
                </div>
              </ClipReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. REVIEWS ─────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite">
                <span className="font-display text-base font-extrabold text-rosewood">06</span>
                <span className="h-[1px] w-10 bg-graphite" />
                Yorumlar
              </p>
              <RevealText
                as="h2"
                className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-graphite"
              >
                Mutlu deneyimler.
              </RevealText>
              <InView delay={0.2}>
                <p className="mt-5 max-w-sm text-sm leading-7 text-ash">
                  İlk ziyaret edenlerden düzenli müşterilerimize kadar pek çok kişi deneyimini paylaştı.
                </p>
              </InView>

              <InView delay={0.3}>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {siteContent.testimonials.slice(0, 4).map((t) => (
                      <div
                        key={t.id}
                        className="grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-peach font-display text-sm font-extrabold text-mocha"
                      >
                        {t.name[0]}
                      </div>
                    ))}
                    <div className="grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-graphite font-display text-[10px] font-extrabold text-white">
                      +<CountUp to={42} />
                    </div>
                  </div>
                </div>
              </InView>

              <InView delay={0.4}>
                <div className="mt-8 flex items-baseline gap-3">
                  <p className="font-display text-5xl font-extrabold tracking-tight text-graphite">
                    <CountUp to={4.9} decimals={1} />
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ash">/5 ortalama</p>
                </div>
              </InView>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {siteContent.testimonials.map((t, i) => {
                const tilt =
                  i % 3 === 1 ? "lg:translate-y-6" : i % 3 === 2 ? "lg:-translate-y-3" : "";
                return (
                  <InView key={t.id} delay={i * 0.06} y={28}>
                    <div
                      className={`group relative flex h-full flex-col gap-4 rounded-[28px] bg-peachLight p-6 transition hover:-translate-y-1 hover:bg-peach ${tilt}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {Array.from({ length: t.rating }).map((_, ix) => (
                            <svg key={ix} className="h-3.5 w-3.5 text-graphite" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span aria-hidden className="font-display text-3xl font-extrabold leading-none text-graphite/15">
                          ”
                        </span>
                      </div>
                      <p className="flex-1 text-sm leading-7 text-graphite/85">{t.text}</p>
                      <div className="flex items-center gap-3 pt-2">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-white font-display text-sm font-extrabold text-graphite">
                          {t.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-graphite">{t.name}</p>
                          <p className="text-[11px] text-ash">{t.service}</p>
                        </div>
                      </div>
                    </div>
                  </InView>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. CTA — full bleed dark ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-mochaDeep text-white">
        <ParallaxImage
          src={siteContent.media.editorial[2].src}
          alt={siteContent.media.editorial[2].alt}
          className="absolute inset-0 opacity-40"
          amount={70}
          scale={1.15}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mochaDeep via-mochaDeep/85 to-mochaDeep/55" />

        <div className="shell relative py-24 lg:py-32">
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-peach">
                <span className="h-[1px] w-10 bg-peach" />
                Ziyaret
              </p>
              <RevealText
                as="h2"
                className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white"
              >
                Salon'da görüşmek üzere.
              </RevealText>
              <InView delay={0.2}>
                <p className="mt-6 max-w-lg text-base leading-8 text-white/75">
                  Randevu almak için hizmet veya paketinizi seçin; ekibiniz uygun saat aralığında sizi bekliyor.
                </p>
              </InView>
              <InView delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <Link
                      href="/randevu"
                      className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-graphite transition hover:bg-peach"
                    >
                      <span>Randevu al</span>
                      <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45">
                        →
                      </span>
                    </Link>
                  </Magnetic>
                  <a
                    href={siteContent.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    WhatsApp <span aria-hidden>↗</span>
                  </a>
                </div>
              </InView>
            </div>

            <InView delay={0.4} y={20}>
              <div className="text-sm leading-7 text-white/70 lg:text-right">
                <p className="font-display font-bold text-white">{siteContent.contact.addressTitle}</p>
                {siteContent.contact.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <div className="mt-4 space-y-1">
                  <a href={`tel:${siteContent.contact.phoneRaw}`} className="block transition hover:text-white">
                    {siteContent.contact.phoneDisplay}
                  </a>
                  <a href={`mailto:${siteContent.contact.email}`} className="block transition hover:text-white">
                    {siteContent.contact.email}
                  </a>
                </div>
                <div className="mt-4 space-y-1 tabular-nums">
                  {siteContent.contact.hours.map((entry) => (
                    <p key={entry.label} className="flex items-baseline justify-between gap-4 lg:justify-end">
                      <span>{entry.label}</span>
                      <span className="text-white">{entry.value}</span>
                    </p>
                  ))}
                </div>
              </div>
            </InView>
          </div>
        </div>
      </section>
    </div>
  );
}
