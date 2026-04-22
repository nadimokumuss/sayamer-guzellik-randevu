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
      <div className="relative h-[62vh] overflow-hidden lg:h-[78vh]">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/55 via-graphite/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="shell pb-12 lg:pb-20">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-bone/80">
                  {slide.label}
                </p>
                <h2 className="mt-6 max-w-2xl font-display text-display-lg text-bone">
                  {slide.title}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-bone/85">
                  {slide.copy}
                </p>
                <Link
                  href={slide.href}
                  className="mt-8 inline-flex items-center gap-2 border-b border-bone/70 pb-1 text-sm text-bone transition hover:border-bone"
                >
                  {slide.label}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
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
