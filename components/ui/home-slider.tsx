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
    }, 5500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative">
      <div className="relative h-[52vh] overflow-hidden lg:h-[64vh]">
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
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-graphite/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0">
                <div className="shell pb-10 lg:pb-16">
                  <p
                    className={`text-[11px] font-medium uppercase tracking-[0.22em] text-bone/85 transition-all duration-[1200ms] ease-out ${
                      active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    {slide.label}
                  </p>
                  <h2
                    className={`mt-5 max-w-2xl font-display text-display-lg text-bone transition-all duration-[1200ms] ease-out ${
                      active ? "translate-y-0 opacity-100 delay-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className={`mt-4 max-w-md text-sm leading-7 text-bone/85 transition-all duration-[1200ms] ease-out ${
                      active ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0"
                    }`}
                  >
                    {slide.copy}
                  </p>
                  <Link
                    href={slide.href}
                    className={`mt-7 inline-flex items-center gap-2 border-b border-bone/70 pb-1 text-sm text-bone transition-all duration-[1200ms] ease-out hover:border-bone ${
                      active ? "translate-y-0 opacity-100 delay-[300ms]" : "translate-y-4 opacity-0"
                    }`}
                  >
                    {slide.label}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shell flex items-center gap-4 border-b border-hairline py-6">
        <div className="flex items-center gap-3">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Slayt ${i + 1}`}
              aria-current={i === index}
              className={`h-[2px] w-12 transition-colors ${
                i === index ? "bg-graphite" : "bg-hairline hover:bg-ash/50"
              }`}
            />
          ))}
        </div>
        <span className="ml-auto text-[11px] uppercase tracking-[0.22em] text-ash tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
