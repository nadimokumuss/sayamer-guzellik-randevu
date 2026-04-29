import Link from "next/link";

import { AnimatedLink } from "@/components/motion/animated-link";
import { LiveClock } from "@/components/motion/live-clock";
import { Wordmark } from "@/components/ui/wordmark";
import { siteContent } from "@/lib/site";

const navLinks = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Paketler", href: "/paketler" },
  { label: "Uzmanlar", href: "/uzmanlar" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-mochaDeep text-white">
      {/* Massive backdrop wordmark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[28vw] font-extrabold leading-[0.85] tracking-[-0.04em] text-transparent lg:text-[22vw]"
        style={{ WebkitTextStroke: "1px rgba(245,230,220,0.10)" }}
      >
        SAYAMER
      </span>

      <div className="shell relative pb-10 pt-20 lg:pt-28">
        {/* Top row — big CTA + clock */}
        <div className="grid items-end gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
              <span className="mr-3 inline-block h-[1px] w-10 align-middle bg-white/40" />
              Şehir ritmini yavaşlat
            </p>
            <h2 className="mt-7 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[1.0] tracking-[-0.035em] text-white">
              Bir sonraki bakım<br />
              <span className="italic font-medium text-peach">randevunuz</span><br />
              bekliyor.
            </h2>
            <Link
              href="/randevu"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-graphite transition hover:bg-peach"
            >
              <span>Randevu al</span>
              <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45">
                →
              </span>
            </Link>
          </div>

          <div className="space-y-6 text-sm text-white/70 lg:text-right">
            <LiveClock tone="light" />
            <div>
              <p className="font-display text-base font-bold text-white">
                {siteContent.contact.addressTitle}
              </p>
              {siteContent.contact.addressLines.map((line) => (
                <p key={line} className="leading-7">{line}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm tabular-nums lg:justify-end">
              <a href={`tel:${siteContent.contact.phoneRaw}`} className="transition hover:text-white">
                {siteContent.contact.phoneDisplay}
              </a>
              <a href={`mailto:${siteContent.contact.email}`} className="transition hover:text-white">
                {siteContent.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Middle — columns */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-16">
          <div>
            <Wordmark tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
              {siteContent.brand.description}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Sayfalar</p>
            <ul className="mt-6 flex flex-col gap-3.5 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <AnimatedLink href={item.href} className="text-white/80 hover:text-white">
                    {item.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Çalışma</p>
            <ul className="mt-6 flex flex-col gap-3 text-sm tabular-nums text-white/80">
              {siteContent.contact.hours.map((entry) => (
                <li key={entry.label} className="flex items-baseline justify-between gap-4">
                  <span>{entry.label}</span>
                  <span className="text-white">{entry.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Sosyal</p>
            <ul className="mt-6 flex flex-col gap-3 text-sm">
              {siteContent.contact.socials.map((entry) => (
                <li key={entry.label}>
                  <AnimatedLink
                    href="#"
                    className="text-white/80 hover:text-white"
                    trailing={<span aria-hidden className="text-white/40">↗</span>}
                  >
                    {entry.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-6 text-white/50">
              {siteContent.contact.socials.map((s) => s.handle).join(" · ")}
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-[11px] tracking-[0.16em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteContent.brand.name}. Tüm hakları saklıdır.</p>
          <p className="flex items-center gap-3">
            <span aria-hidden className="text-white/30">✦</span>
            <span>Premium · soft · editorial</span>
            <span aria-hidden className="text-white/30">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
