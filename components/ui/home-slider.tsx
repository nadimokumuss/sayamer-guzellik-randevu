"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BotanicalSpray } from "@/components/ui/botanical";
import { siteContent } from "@/lib/site";

export function HomeSlider() {
  const slides = siteContent.hero.slides;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section className="relative bg-brand-50">
      <div className="relative h-[88vh] min-h-[560px] overflow-hidden lg:h-[92vh] lg:min-h-[640px]">
        {/* Decorative botanicals (lg only) */}
        <BotanicalSpray className="pointer-events-none absolute -left-16 bottom-0 z-10 hidden h-72 w-72 text-white opacity-30 lg:block" />
        <BotanicalSpray
          flip
          className="pointer-events-none absolute -right-16 top-0 z-10 hidden h-72 w-72 text-white opacity-25 lg:block"
        />

        {/* Slides */}
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.src}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className={`h-full w-full object-cover ${active ? "ken-burns" : ""}`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2E1F12]/55 via-[#4A3320]/30 to-transparent" />
            </div>
          );
        })}

        {/* Centered headline + CTA */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="shell">
            <div className="mx-auto max-w-3xl text-center">
              {slides.map((slide, i) => {
                const active = i === index;
                return (
                  <div
                    key={slide.src}
                    className={`transition-all duration-[1200ms] ease-out ${
                      active ? "translate-y-0 opacity-100" : "absolute inset-0 -z-10 translate-y-3 opacity-0"
                    }`}
                    style={{ position: active ? "relative" : "absolute" }}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
                      <svg viewBox="0 0 20 20" className="h-3 w-3 text-white" fill="currentColor" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Sayamer · İstanbul
                    </span>
                    <h1 className="mt-6 font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold italic leading-[1.02] tracking-tight text-white">
                      {slide.title}
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-[14px] leading-7 text-white/85 lg:text-[15px] lg:leading-8">
                      {slide.copy}
                    </p>
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                      <Link href="/randevu" className="btn-pill-brand">
                        Randevu Al <span aria-hidden>→</span>
                      </Link>
                      <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white hover:text-brand-700"
                      >
                        Hizmetler
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom controls: dots + arrows + counter */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-6 lg:px-10 lg:pb-9">
          <div className="flex items-center justify-between gap-4">
            {/* counter */}
            <span className="hidden text-[11px] font-bold tracking-[0.24em] text-white/80 tabular-nums sm:inline">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>

            {/* dots */}
            <div className="flex items-center gap-2">
              {slides.map((slide, i) => {
                const active = i === index;
                return (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Slayt ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      active ? "w-10 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                );
              })}
            </div>

            {/* arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Önceki slayt"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-brand-700"
              >
                <span aria-hidden>←</span>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Sonraki slayt"
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand-700 transition hover:bg-brand-100"
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
