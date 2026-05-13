"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/ui/wordmark";
import { classNames } from "@/lib/utils";

const navItems: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Galeri", href: "/galeri" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Homepage renders its own integrated hero+header via <HomeHero />.
  // Early-return must come AFTER all hooks to satisfy Rules of Hooks.
  if (pathname === "/") return null;

  return (
    <header
      className={classNames(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_2px_24px_rgba(17,24,39,0.06)] backdrop-blur"
          : "bg-white/85 backdrop-blur-sm",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-20">
        <Wordmark size="md" />

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  "relative inline-flex items-center px-4 py-2 text-[14px] font-medium tracking-tight transition-colors",
                  active ? "text-brand-600" : "text-ink-600 hover:text-ink-900",
                )}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/randevu"
            className="hidden lg:inline-flex btn-pill-brand"
          >
            <span>Randevu Al</span>
          </Link>

          <button
            type="button"
            aria-label="Menü"
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition hover:bg-brand-50 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
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
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <div className="shell flex flex-col py-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={classNames(
                      "block border-b border-line py-4 text-[15px] tracking-tight",
                      isActive(pathname, item.href) ? "text-brand-600 font-semibold" : "text-ink-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/randevu" className="btn-pill-brand mt-6 justify-center">
                Randevu Al
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
