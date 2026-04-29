"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedLink } from "@/components/motion/animated-link";
import { LiveClock } from "@/components/motion/live-clock";
import { Wordmark } from "@/components/ui/wordmark";
import { classNames } from "@/lib/utils";

const navItems: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Paketler", href: "/paketler" },
  { label: "Uzmanlar", href: "/uzmanlar" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

const categoryPills: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Saç Tasarımı", href: "/hizmetler#kuafor" },
  { label: "Cilt Bakımı", href: "/hizmetler#cilt-bakimi" },
  { label: "Tırnak Bakımı", href: "/hizmetler#tirnak-bakimi" },
  { label: "Epilasyon", href: "/hizmetler#epilasyon" },
  { label: "Masaj", href: "/hizmetler#masaj" },
  { label: "Paketler", href: "/paketler" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.split("#")[0]);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={classNames(
        "sticky top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-hairline bg-white/92 backdrop-blur-md"
          : "border-b border-transparent bg-white/70 backdrop-blur-sm",
      )}
    >
      {/* Top utility row */}
      <div className="border-b border-hairline/70 bg-white/40">
        <div className="shell flex h-8 items-center justify-between gap-4 text-[11px] text-ash">
          <LiveClock tone="dark" compact />
          <div className="hidden items-center gap-5 sm:flex">
            <span>Bağdat Caddesi · Anadolu Yakası</span>
            <span aria-hidden className="text-ash/40">·</span>
            <a href="tel:+905388887766" className="transition hover:text-graphite">
              +90 538 888 77 66
            </a>
          </div>
        </div>
      </div>

      {/* Main nav row */}
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-18">
        <Wordmark size="md" />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <AnimatedLink
              key={item.href}
              href={item.href}
              className={classNames(
                "text-[13px] font-medium tracking-tight transition-colors",
                isActive(pathname, item.href) ? "text-graphite" : "text-ink-400 hover:text-graphite",
              )}
            >
              {item.label}
            </AnimatedLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/randevu"
            className="hidden lg:inline-flex group items-center gap-2 rounded-full bg-graphite px-5 py-2.5 text-[12px] font-semibold tracking-tight text-white transition hover:bg-mocha"
          >
            <span>Randevu al</span>
            <span aria-hidden className="grid h-5 w-5 place-items-center rounded-full bg-white/95 text-graphite transition group-hover:rotate-45 text-[11px]">
              →
            </span>
          </Link>

          <button
            type="button"
            aria-label="Menü"
            aria-expanded={menuOpen}
            className="inline-flex h-9 w-9 items-center justify-center text-graphite lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      </div>

      {/* Category pills sub-bar — only on home + hizmetler */}
      {(isHome || pathname.startsWith("/hizmetler")) && !menuOpen && (
        <div className="border-t border-hairline">
          <div className="shell flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {categoryPills.map((pill, idx) => {
              const active = idx === 0;
              return (
                <Link
                  key={pill.href}
                  href={pill.href}
                  className={classNames(
                    "shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-semibold tracking-tight transition-colors",
                    active
                      ? "bg-graphite text-white"
                      : "border border-hairline text-ink-400 hover:border-graphite/30 hover:text-graphite",
                  )}
                >
                  {active ? (
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                    </svg>
                  ) : null}
                  <span>{pill.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-hairline bg-white lg:hidden">
          <div className="shell flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  "border-b border-hairline py-4 text-[15px] tracking-tight",
                  isActive(pathname, item.href) ? "text-graphite" : "text-ink-400",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/randevu" className="btn-pill-dark mt-6 justify-center">
              Randevu al →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
