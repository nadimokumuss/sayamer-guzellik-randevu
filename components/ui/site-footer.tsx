import Link from "next/link";

import { AnimatedLink } from "@/components/motion/animated-link";
import { Wordmark } from "@/components/ui/wordmark";
import { getCatalog } from "@/lib/catalog";
import { siteContent } from "@/lib/site";

const quickLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Galeri", href: "/galeri" },
  { label: "İletişim", href: "/iletisim" },
];

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M3.5 20.5l1.4-4.2a8 8 0 1 1 3 3l-4.4 1.2z" strokeLinejoin="round" />
      <path d="M9 9.5c.3 1.6 1.6 3.6 3.4 4.5 1 .5 1.7.4 2.4-.2l.6-.6 1.7 1c.2.3.3.6.1 1-.5 1-1.6 1.4-2.7 1.2-2.6-.4-5.1-3-5.6-5.5-.2-1 .3-2.2 1.3-2.6.4-.2.7 0 .9.2l1 1.7-.6.6c-.4.4-.6 1-.5 1.7" strokeLinejoin="round" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7" strokeLinecap="round" />
    </svg>
  ),
};

export function SiteFooter() {
  const catalog = getCatalog();

  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div className="shell relative pb-10 pt-16 lg:pt-20">
        {/* Top — 4 columns */}
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_0.9fr_1fr_1.2fr] lg:gap-12">
          {/* Brand col */}
          <div>
            <Wordmark tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              {siteContent.brand.description}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-brand-500 hover:text-white"
                aria-label="Instagram"
              >
                {socialIcons.Instagram}
              </a>
              <a
                href={siteContent.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-brand-500 hover:text-white"
                aria-label="WhatsApp"
              >
                {socialIcons.WhatsApp}
              </a>
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-brand-500 hover:text-white"
                aria-label="E-posta"
              >
                {socialIcons.Email}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white">Hızlı Erişim</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <AnimatedLink href={item.href} className="text-white/65 hover:text-white">
                    {item.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white">Hizmetler</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {catalog.categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <AnimatedLink href={`/hizmetler#${cat.id}`} className="text-white/65 hover:text-white">
                    {cat.name}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white">İletişim</p>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm text-white/65">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z" />
                    <circle cx="12" cy="9" r="2.4" />
                  </svg>
                </span>
                <span>
                  {siteContent.contact.addressTitle}
                  <br />
                  {siteContent.contact.addressLines[2] ?? "İstanbul"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </svg>
                </span>
                <a href={`tel:${siteContent.contact.phoneRaw}`} className="hover:text-white">
                  {siteContent.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                  {socialIcons.Email}
                </span>
                <a href={`mailto:${siteContent.contact.email}`} className="hover:text-white">
                  {siteContent.contact.email}
                </a>
              </li>
            </ul>

            <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.16em] text-white">Çalışma Saatleri</p>
            <ul className="mt-4 space-y-2 text-sm tabular-nums text-white/65">
              {siteContent.contact.hours.map((entry) => (
                <li key={entry.label} className="flex items-baseline justify-between gap-4">
                  <span>{entry.label}</span>
                  <span className="text-white/90">{entry.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-7 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteContent.brand.name}. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-5">
            <Link href="/gizlilik-politikasi" className="hover:text-white">Gizlilik Politikası</Link>
            <span aria-hidden className="text-white/20">|</span>
            <Link href="/kullanim-sartlari" className="hover:text-white">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
