"use client";

import Link from "next/link";
import { useState } from "react";

import {
  BigBeigeBranch,
  MonsteraLeaf,
  OrchidBranch,
  PinkBlossom,
  TinyDaisy,
} from "@/components/ui/floral-decor";
import { Wordmark } from "@/components/ui/wordmark";
import { siteContent } from "@/lib/site";
import { classNames } from "@/lib/utils";

const navItems: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Galeri", href: "/galeri" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export function HomeHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const portrait = siteContent.hero.slides[0].src;

  // Split nav into two clusters so model image breaks them visually
  const leftNav = navItems.slice(0, 3);
  const rightNav = navItems.slice(3);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F6E2D1] via-[#FAEEDC] to-[#FAF6F1]">
      {/* Big "BEAUTY" watermark behind everything */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 select-none font-display text-[10rem] italic font-bold leading-none tracking-[-0.04em] text-white/50 sm:text-[14rem] lg:text-[18rem]"
      >
        BEAUTY
      </span>

      {/* Large pale botanical sprays — background layer */}
      <BigBeigeBranch className="pointer-events-none absolute -left-16 top-8 hidden h-[420px] w-[420px] opacity-50 lg:block" />
      <BigBeigeBranch
        flip
        className="pointer-events-none absolute -right-20 bottom-0 hidden h-[380px] w-[380px] opacity-35 lg:block"
      />

      {/* Mobile pale botanical (smaller) */}
      <BigBeigeBranch className="pointer-events-none absolute -left-12 top-4 h-48 w-48 opacity-40 lg:hidden" />

      {/* ── HEADER (split menu) ───────────────────────────────────── */}
      <div className="relative z-30">
        <div className="shell flex items-center gap-4 py-5 lg:gap-6 lg:py-6">
          <Wordmark size="md" />

          {/* Left nav cluster */}
          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            {leftNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative inline-flex items-center px-3 py-2 text-[13px] font-semibold tracking-tight text-ink-700 transition hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center gap — the model image visually fills this area below */}
          <div className="hidden flex-1 lg:block" />

          {/* Right nav cluster */}
          <nav className="hidden items-center gap-1 lg:flex">
            {rightNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative inline-flex items-center px-3 py-2 text-[13px] font-semibold tracking-tight text-ink-700 transition hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/randevu" className="btn-pill-brand hidden lg:inline-flex">
            <span>Randevu Al</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Menü"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-ink-900 backdrop-blur transition hover:bg-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 8h16" strokeLinecap="round" />
                  <path d="M4 16h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-brand-100/60 bg-white/90 backdrop-blur lg:hidden">
            <div className="shell flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-line py-3 text-[14px] tracking-tight text-ink-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/randevu" className="btn-pill-brand mt-4 justify-center">
                Randevu Al
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── MODEL PORTRAIT (right side, extends up behind menu) ─── */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[46%] lg:block xl:w-[42%]">
        <div className="relative h-full">
          <img
            src={portrait}
            alt="Sayamer Güzellik"
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 22%, black 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 22%, black 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 100%)",
              maskComposite: "intersect",
            }}
          />

          {/* Decorative tropical accents around the portrait */}
          <MonsteraLeaf
            flip
            className="absolute -left-10 top-1/3 h-44 w-44 opacity-70 drop-shadow-md animate-float"
          />
          <MonsteraLeaf className="absolute right-2 bottom-12 h-36 w-36 opacity-65 animate-float" style={{ animationDelay: "1.2s" }} />
          <OrchidBranch className="absolute -left-6 top-10 h-40 w-32 animate-float" style={{ animationDelay: "0.6s" }} />
          <PinkBlossom className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 animate-float" style={{ animationDelay: "1.8s" }} />
          <PinkBlossom className="absolute right-1/3 bottom-1/3 h-14 w-14 opacity-90 animate-float" style={{ animationDelay: "2.4s" }} />
        </div>
      </div>

      {/* ── HERO COPY (left side) ─────────────────────────────────── */}
      <div className="shell relative z-20 grid items-center gap-10 pb-16 pt-10 lg:grid-cols-2 lg:pb-28 lg:pt-16">
        <div className="relative">
          <p className="font-display text-[18px] italic tracking-tight text-brand-700 lg:text-[20px]">
            Sayamer Güzellik Salonuna Hoş Geldiniz
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] tracking-tight text-ink-900">
            Güzelliği
            <br />
            <span className="italic text-brand-700">Kendinizden</span>
            <br />
            Başlatın
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-7 text-ink-600">
            Saç, cilt, tırnak ve bakım ritüellerinizi sakin ve modern bir salonda; uzman elinden,
            açık fiyatla planlayın.
          </p>

          <Link
            href="/randevu"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-brand-gradient px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white shadow-card transition hover:shadow-cardHover"
          >
            <span>Randevu Al</span>
            <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white/25">
              →
            </span>
          </Link>
        </div>

        {/* Mobile portrait — stacks under heading */}
        <div className="relative lg:hidden">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-elevated">
            <img
              src={portrait}
              alt="Sayamer Güzellik"
              className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            />
          </div>
          <PinkBlossom className="absolute -left-4 top-6 h-14 w-14 animate-float" />
          <MonsteraLeaf flip className="absolute -right-6 bottom-10 h-24 w-24 opacity-80 animate-float" style={{ animationDelay: "1.4s" }} />
          <OrchidBranch className="absolute -right-4 -top-6 h-28 w-20 animate-float" style={{ animationDelay: "0.6s" }} />
        </div>

        {/* desktop right column kept empty — model fills the absolute layer */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      {/* ── Floating tiny florals scattered around the hero ──────── */}
      <TinyDaisy
        className="pointer-events-none absolute left-[18%] top-[26%] hidden h-8 w-8 animate-float opacity-90 lg:block"
        style={{ animationDelay: "0.4s" }}
      />
      <TinyDaisy
        className="pointer-events-none absolute left-[8%] top-[54%] hidden h-7 w-7 animate-float opacity-80 lg:block"
        style={{ animationDelay: "1.6s" }}
      />
      <TinyDaisy
        className="pointer-events-none absolute left-[42%] bottom-[18%] hidden h-9 w-9 animate-float opacity-85 lg:block"
        style={{ animationDelay: "0.9s" }}
      />
      <PinkBlossom
        className="pointer-events-none absolute left-[36%] top-[20%] hidden h-12 w-12 animate-float opacity-90 lg:block"
        style={{ animationDelay: "1.1s" }}
      />
      <PinkBlossom
        className="pointer-events-none absolute left-[12%] bottom-[22%] hidden h-10 w-10 animate-float opacity-85 lg:block"
        style={{ animationDelay: "2.1s" }}
      />
      <MonsteraLeaf
        className="pointer-events-none absolute -left-4 bottom-2 hidden h-40 w-40 rotate-[12deg] opacity-60 lg:block"
      />

      {/* Decorative "scroll" dot indicator (right edge) */}
      <button
        type="button"
        aria-label="Aşağı kaydır"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className={classNames(
          "absolute right-4 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full",
          "bg-white/85 text-brand-700 shadow-card backdrop-blur transition hover:bg-white lg:flex",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
