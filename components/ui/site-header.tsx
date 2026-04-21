"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AppIcon } from "@/components/ui/app-icon";
import { LinkButton } from "@/components/ui/button";
import { siteContent } from "@/lib/site";
import { classNames } from "@/lib/utils";

function isGroupActive(pathname: string, href?: string, items?: readonly { href: string }[]) {
  if (href) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  }
  return items?.some((item) => pathname.startsWith(item.href.split("#")[0])) ?? false;
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

  return (
    <header
      className={classNames(
        "sticky top-0 z-40 transition-all duration-300 ease-soft",
        scrolled
          ? "border-b border-line bg-[#fcf7f1]/92 shadow-subtle backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {!scrolled ? (
        <div className="border-b border-line-subtle bg-white/60">
          <div className="shell flex flex-col gap-2 py-2.5 text-xs text-ink-500 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <span className="flex items-center gap-1.5">
                <AppIcon name="compass" className="h-3.5 w-3.5" />
                {siteContent.contact.addressTitle}
              </span>
              <a
                href={siteContent.contact.whatsappUrl}
                className="flex items-center gap-1.5 transition hover:text-espresso"
              >
                <AppIcon name="phone" className="h-3.5 w-3.5" />
                {siteContent.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="flex items-center gap-1.5 transition hover:text-espresso"
              >
                <AppIcon name="message" className="h-3.5 w-3.5" />
                {siteContent.contact.email}
              </a>
            </div>
            <span className="rounded-full bg-champagne px-3 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-rosewood">
              Premium Soft Salon
            </span>
          </div>
        </div>
      ) : null}

      <div className="shell py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span
              className={classNames(
                "icon-badge transition",
                scrolled ? "icon-badge-sm" : "icon-badge-lg float-slow",
              )}
            >
              <AppIcon name="spark" className={scrolled ? "h-5 w-5" : "h-7 w-7"} />
            </span>
            <div>
              <p
                className={classNames(
                  "font-display tracking-tight transition",
                  scrolled ? "text-xl" : "text-2xl",
                )}
              >
                {siteContent.brand.name}
              </p>
              {!scrolled ? (
                <p className="text-[11px] uppercase tracking-eyebrow text-ink-400">
                  {siteContent.brand.tagline}
                </p>
              ) : null}
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-line bg-white/80 px-2 py-1.5 shadow-subtle backdrop-blur xl:flex">
            {siteContent.navigationGroups.map((group) =>
              "href" in group ? (
                <Link
                  key={group.label}
                  href={group.href}
                  className={classNames(
                    "rounded-full px-4 py-2 text-sm font-medium transition hover:bg-champagne hover:text-espresso",
                    isGroupActive(pathname, group.href) ? "bg-champagne text-espresso" : "text-ink-500",
                  )}
                >
                  {group.label}
                </Link>
              ) : (
                <div key={group.label} className="group relative">
                  <button
                    type="button"
                    className={classNames(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition group-hover:bg-champagne group-hover:text-espresso",
                      isGroupActive(pathname, undefined, group.items)
                        ? "bg-champagne text-espresso"
                        : "text-ink-500",
                    )}
                  >
                    {group.label}
                    <svg
                      className="h-3 w-3 opacity-60"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="m3 4.5 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="invisible absolute left-0 top-full z-30 mt-2 min-w-[240px] translate-y-2 rounded-3xl border border-line bg-white p-3 opacity-0 shadow-elevated transition duration-200 ease-soft group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid gap-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-2xl px-3 py-2 text-sm text-ink-500 transition hover:bg-surface-muted hover:text-espresso"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <LinkButton href={siteContent.contact.whatsappUrl} external variant="outline" size="sm">
              {siteContent.cta.whatsappLabel}
            </LinkButton>
            <LinkButton href={siteContent.cta.bookingHref} variant="primary" size="sm">
              {siteContent.cta.bookingLabel}
            </LinkButton>
          </div>

          <button
            type="button"
            aria-label="Menüyü aç/kapat"
            aria-expanded={menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-espresso shadow-subtle xl:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-line bg-white/95 shadow-elevated backdrop-blur-xl xl:hidden">
          <div className="shell grid gap-3 py-5">
            {siteContent.navigationGroups.map((group) => (
              <div key={group.label} className="card-muted">
                {"href" in group ? (
                  <Link href={group.href} className="text-sm font-medium text-espresso">
                    {group.label}
                  </Link>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {group.label}
                    </p>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-ink-500">
                      {group.items.map((item) => (
                        <Link key={item.href} href={item.href} className="transition hover:text-espresso">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 rounded-3xl bg-champagne p-4">
              <LinkButton href={siteContent.contact.whatsappUrl} external variant="outline" size="md">
                {siteContent.cta.whatsappLabel}
              </LinkButton>
              <LinkButton href={siteContent.cta.bookingHref} variant="primary" size="md">
                {siteContent.cta.bookingLabel}
              </LinkButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
