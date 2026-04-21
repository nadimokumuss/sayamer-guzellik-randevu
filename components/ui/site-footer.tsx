import Link from "next/link";

import { AppIcon } from "@/components/ui/app-icon";
import { LinkButton } from "@/components/ui/button";
import { siteContent } from "@/lib/site";

const serviceLinks = [
  { label: "Saç Tasarımı", href: "/hizmetler#kuafor" },
  { label: "Cilt Bakımı", href: "/hizmetler#cilt-bakimi" },
  { label: "Tırnak Bakımı", href: "/hizmetler#tirnak-bakimi" },
  { label: "Epilasyon", href: "/hizmetler#epilasyon" },
  { label: "G5 ve Vücut Bakımı", href: "/hizmetler#g5" },
  { label: "Masaj ve Head Spa", href: "/hizmetler#masaj" },
];

const corporateLinks = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Vizyon ve Misyon", href: "/vizyon-ve-misyon" },
  { label: "Uzmanlar", href: "/uzmanlar" },
  { label: "İletişim", href: "/iletisim" },
];

const mediaLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Bilgi Bankası", href: "/bilgi-bankasi" },
  { label: "Paketler", href: "/paketler" },
  { label: "Online Randevu", href: "/randevu" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-surface-sunken">
      <div className="shell py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="icon-badge icon-badge-lg">
                <AppIcon name="spark" className="h-7 w-7" />
              </span>
              <div>
                <p className="font-display text-2xl text-espresso">{siteContent.brand.name}</p>
                <p className="text-[11px] uppercase tracking-eyebrow text-ink-400">
                  {siteContent.brand.tagline}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-7 text-ink-500">
              {siteContent.brand.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <LinkButton href={siteContent.cta.bookingHref} variant="primary" size="sm">
                {siteContent.cta.bookingLabel}
              </LinkButton>
              <LinkButton href={siteContent.contact.whatsappUrl} external variant="outline" size="sm">
                {siteContent.cta.whatsappLabel}
              </LinkButton>
            </div>
          </div>

          <div>
            <p className="eyebrow-text">Hizmetler</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-ink-500">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-espresso">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-text">Kurumsal</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-ink-500">
              {corporateLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-espresso">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow-text mt-8">Medya</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-ink-500">
              {mediaLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-espresso">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-text">İletişim</p>
            <div className="mt-5 space-y-4 text-sm text-ink-500">
              <div>
                <p className="font-medium text-espresso">{siteContent.contact.addressTitle}</p>
                <div className="mt-1.5 space-y-0.5 leading-6">
                  {siteContent.contact.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <AppIcon name="phone" className="h-4 w-4 text-rosewood" />
                  {siteContent.contact.phoneDisplay}
                </p>
                <p className="flex items-center gap-2">
                  <AppIcon name="message" className="h-4 w-4 text-rosewood" />
                  {siteContent.contact.email}
                </p>
              </div>

              <div>
                <p className="eyebrow-text mb-2">Çalışma saatleri</p>
                <ul className="space-y-1 leading-6">
                  {siteContent.contact.hours.map((entry) => (
                    <li key={entry.label} className="flex items-center justify-between gap-3">
                      <span className="text-ink-400">{entry.label}</span>
                      <span className="font-medium text-espresso">{entry.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                {siteContent.contact.socials.map((entry) => (
                  <p key={entry.label}>
                    <span className="text-ink-400">{entry.label}:</span>{" "}
                    <span className="font-medium text-espresso">{entry.handle}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-subtle pt-6 text-xs uppercase tracking-wider text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteContent.brand.name}. Tüm hakları saklıdır.
          </p>
          <p>Premium-soft salon deneyimi</p>
        </div>
      </div>
    </footer>
  );
}
