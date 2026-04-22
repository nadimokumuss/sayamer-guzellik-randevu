import Link from "next/link";

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
    <footer className="mt-32 border-t border-hairline bg-bone">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-20">
          <div>
            <p className="wordmark">{siteContent.brand.shortName}</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-ash">
              {siteContent.brand.description}
            </p>
            <Link href="/randevu" className="mt-8 link-underline">
              Randevu al
            </Link>
          </div>

          <div>
            <p className="eyebrow-tag">Menü</p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-ash">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-graphite">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-tag">İletişim</p>
            <div className="mt-6 space-y-5 text-sm text-ash">
              <div>
                <p className="text-graphite">{siteContent.contact.addressTitle}</p>
                <div className="mt-1 space-y-0.5 leading-6">
                  {siteContent.contact.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <a href={`tel:${siteContent.contact.phoneRaw}`} className="block transition hover:text-graphite">
                  {siteContent.contact.phoneDisplay}
                </a>
                <a href={`mailto:${siteContent.contact.email}`} className="block transition hover:text-graphite">
                  {siteContent.contact.email}
                </a>
              </div>

              <div className="space-y-1 pt-2">
                {siteContent.contact.hours.map((entry) => (
                  <p key={entry.label} className="flex items-baseline justify-between gap-4 tabular-nums">
                    <span>{entry.label}</span>
                    <span className="text-graphite">{entry.value}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-6 text-xs tracking-[0.18em] text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteContent.brand.name}</p>
          <div className="flex gap-5">
            {siteContent.contact.socials.map((entry) => (
              <span key={entry.label}>
                {entry.label} · {entry.handle}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
