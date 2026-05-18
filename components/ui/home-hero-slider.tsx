"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  BigBeigeBranch,
  MonsteraLeaf,
  OrchidBranch,
  PinkBlossom,
  TinyDaisy,
} from "@/components/ui/floral-decor";
import { siteContent } from "@/lib/site";

const AUTO_PLAY_MS = 6500;

export function HomeHeroSlider() {
  const slides = siteContent.hero.slides;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const slide = slides[index];
  const portrait: string = slide.portraitSrc;

  function go(next: number) {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F6E2D1] via-[#FAEEDC] to-[#FAF6F1]">
      {/* GÜZELLİK watermark — center back layer */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] z-10 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[10rem] italic font-extrabold leading-none tracking-[-0.04em] text-white/55 sm:text-[14rem] lg:text-[18rem]"
      >
        GÜZELLİK
      </span>

      {/* Pale botanical sprays — back layer */}
      <BigBeigeBranch className="pointer-events-none absolute -left-16 top-8 hidden h-[420px] w-[420px] opacity-55 lg:block" />
      <BigBeigeBranch
        flip
        className="pointer-events-none absolute -right-20 bottom-0 hidden h-[380px] w-[380px] opacity-35 lg:block"
      />
      <BigBeigeBranch className="pointer-events-none absolute -left-12 top-4 h-48 w-48 opacity-40 lg:hidden" />

      {/* RIGHT-SIDE PORTRAIT (desktop only, behind text on z-axis but visually right) */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full w-[46%] lg:block xl:w-[44%]">
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={`portrait-${index}`}
              src={portrait}
              alt={slide.alt}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 22%, black 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 100%)",
                WebkitMaskComposite: "source-in",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 22%, black 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 100%)",
                maskComposite: "intersect",
              }}
            />
          </AnimatePresence>

          {/* Decorative tropical accents around the portrait */}
          <MonsteraLeaf
            flip
            className="absolute -left-10 top-1/3 h-44 w-44 opacity-70 drop-shadow-md animate-float"
          />
          <MonsteraLeaf
            className="absolute right-2 bottom-12 h-36 w-36 opacity-65 animate-float"
            style={{ animationDelay: "1.2s" }}
          />
          <OrchidBranch
            className="absolute -left-6 top-10 h-40 w-32 animate-float"
            style={{ animationDelay: "0.6s" }}
          />
          <PinkBlossom
            className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 animate-float"
            style={{ animationDelay: "1.8s" }}
          />
          <PinkBlossom
            className="absolute right-1/3 bottom-1/3 h-14 w-14 opacity-90 animate-float"
            style={{ animationDelay: "2.4s" }}
          />
        </div>
      </div>

      {/* Floating tiny florals scattered around the hero (left half) */}
      <TinyDaisy
        className="pointer-events-none absolute left-[18%] top-[26%] z-10 hidden h-8 w-8 animate-float opacity-90 lg:block"
        style={{ animationDelay: "0.4s" }}
      />
      <TinyDaisy
        className="pointer-events-none absolute left-[8%] top-[54%] z-10 hidden h-7 w-7 animate-float opacity-80 lg:block"
        style={{ animationDelay: "1.6s" }}
      />
      <PinkBlossom
        className="pointer-events-none absolute left-[14%] bottom-[20%] z-10 hidden h-10 w-10 animate-float opacity-85 lg:block"
        style={{ animationDelay: "2.1s" }}
      />

      {/* HERO COPY (left side) */}
      <div className="shell relative z-30 grid min-h-[78vh] items-center pb-24 pt-16 lg:min-h-[88vh] lg:grid-cols-2 lg:pb-32 lg:pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="font-display text-[18px] italic tracking-tight text-brand-700 lg:text-[20px]">
              Sayamer Güzellik Salonuna Hoş Geldiniz
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold italic leading-[1.02] tracking-tight text-ink-900">
              {slide.title}
            </h1>

            <p className="mt-6 max-w-lg text-[15px] leading-7 text-ink-700">{slide.copy}</p>

            <Link
              href={slide.href ?? "/randevu"}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-brand-gradient px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white shadow-card transition hover:shadow-cardHover"
            >
              <span>Randevu Al</span>
              <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white/25">
                →
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Mobile portrait — stacks under heading */}
        <div className="relative mt-10 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-portrait-${index}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-elevated"
            >
              <img
                src={portrait}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
              />
            </motion.div>
          </AnimatePresence>
          <PinkBlossom className="absolute -left-4 top-6 h-14 w-14 animate-float" />
          <MonsteraLeaf
            flip
            className="absolute -right-6 bottom-10 h-24 w-24 opacity-80 animate-float"
            style={{ animationDelay: "1.4s" }}
          />
          <OrchidBranch
            className="absolute -right-4 -top-6 h-28 w-20 animate-float"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        aria-label="Önceki slayt"
        onClick={() => go(index - 1)}
        className="absolute left-4 top-1/2 z-40 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-card backdrop-blur transition hover:bg-white lg:flex"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Sonraki slayt"
        onClick={() => go(index + 1)}
        className="absolute right-4 top-1/2 z-40 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-card backdrop-blur transition hover:bg-white lg:flex"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slayt ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-brand-gradient" : "w-2 bg-white/80 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
