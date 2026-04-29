"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    <section className="relative bg-white">
      <div className="shell pt-6 pb-4 lg:pt-8">
        <div className="relative h-[68vh] min-h-[480px] overflow-hidden rounded-[28px] lg:h-[78vh] lg:min-h-[600px]">
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
                <div className="absolute inset-0 bg-gradient-to-br from-mochaDeep/65 via-mocha/30 to-mocha/15" />
              </div>
            );
          })}

          {/* Top: pill tabs left + counter right */}
          <div className="absolute inset-x-0 top-0 z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 lg:p-7">
              {/* Pill tabs */}
              <div className="flex flex-wrap gap-2">
                {slides.map((slide, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Slayt ${i + 1}: ${slide.label}`}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold tracking-tight transition ${
                        active
                          ? "border-white/0 bg-white text-graphite"
                          : "border-white/40 bg-white/0 text-white/85 hover:bg-white/10"
                      }`}
                    >
                      {active ? (
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                          <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                        </svg>
                      ) : null}
                      <span>{slide.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Counter + progress */}
              <div className="hidden items-center gap-4 sm:flex">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-white/85 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative h-[2px] w-32 bg-white/20">
                  <div
                    className="absolute inset-y-0 left-0 bg-white transition-[width] duration-[600ms] ease-out"
                    style={{ width: `${((index + 1) / slides.length) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold tracking-[0.2em] text-white/60 tabular-nums">
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom: headline + CTA + nav arrows */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-12">
              <div className="max-w-2xl">
                {slides.map((slide, i) => {
                  const active = i === index;
                  return (
                    <div
                      key={slide.src}
                      className={`transition-all duration-[1200ms] ease-out ${
                        active ? "translate-y-0 opacity-100" : "absolute -z-10 translate-y-3 opacity-0"
                      }`}
                      style={{ position: active ? "relative" : "absolute" }}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                        Sayamer · İstanbul
                      </p>
                      <h1 className="mt-4 font-display text-display-xl font-bold text-white">
                        {slide.title}
                      </h1>
                      <p className="mt-5 max-w-md text-sm leading-7 text-white/85 lg:text-base lg:leading-8">
                        {slide.copy}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <Link href="/randevu" className="btn-pill-dark bg-white !text-graphite hover:!bg-peach">
                  <span>Randevu al</span>
                  <span aria-hidden>→</span>
                </Link>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Önceki"
                  className="btn-icon-light"
                >
                  <span aria-hidden>←</span>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Sonraki"
                  className="btn-icon-dark"
                >
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
