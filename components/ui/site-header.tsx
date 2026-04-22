"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteContent } from "@/lib/site";
import { classNames } from "@/lib/utils";

const navItems: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Paketler", href: "/paketler" },
  { label: "Uzmanlar", href: "/uzmanlar" },
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

  return (
    <header
      className={classNames(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled ? "border-b border-hairline bg-bone/95 backdrop-blur" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="wordmark">
          {siteContent.brand.shortName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                "text-[13px] tracking-wide transition",
                isActive(pathname, item.href)
                  ? "text-graphite"
                  : "text-ash hover:text-graphite",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/randevu" className="hidden link-underline lg:inline-flex">
            Randevu al
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

      {menuOpen ? (
        <div className="border-t border-hairline bg-bone lg:hidden">
          <div className="shell flex flex-col gap-0 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  "border-b border-hairline py-4 text-[15px] tracking-wide",
                  isActive(pathname, item.href) ? "text-graphite" : "text-ash",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/randevu" className="mt-6 btn-minimal-solid w-full justify-center">
              Randevu al
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
