import Link from "next/link";

import { AnimatedLink } from "@/components/motion/animated-link";
import { NewsletterForm } from "@/components/ui/newsletter-form";
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
  const recentPosts = siteContent.blogPosts.slice(0, 2);

  return (
    <footer className="relative overflow-hidden border-t border-brand-200 bg-brand-50 text-ink-700">
      <div className="shell relative pb-10 pt-16 lg:pt-20">
        {/* Top — 4 main columns */}
        <div className="grid gap-12 pb-12 lg:grid-cols-[1.3fr_0.9fr_1fr_1.2fr] lg:gap-12">
          {/* Brand col */}
          <div>
            <Wordmark />
            <p className="mt-5 max-w-sm text-sm leading-7 text-ink-600">
              {siteContent.brand.description}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-brand-gradient hover:text-white hover:border-transparent"
                aria-label="Instagram"
              >
                {socialIcons.Instagram}
              </a>
              <a
                href={siteContent.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-brand-gradient hover:text-white hover:border-transparent"
                aria-label="WhatsApp"
              >
                {socialIcons.WhatsApp}
              </a>
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-brand-gradient hover:text-white hover:border-transparent"
                aria-label="E-posta"
              >
                {socialIcons.Email}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">Hızlı Erişim</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <AnimatedLink href={item.href} className="text-ink-600 hover:text-brand-700">
                    {item.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">Hizmetler</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {catalog.categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <AnimatedLink href={`/hizmetler#${cat.id}`} className="text-ink-600 hover:text-brand-700">
                    {cat.name}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">İletişim</p>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm text-ink-600">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
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
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </svg>
                </span>
                <a href={`tel:${siteContent.contact.phoneRaw}`} className="hover:text-brand-700">
                  {siteContent.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                  {socialIcons.Email}
                </span>
                <a href={`mailto:${siteContent.contact.email}`} className="hover:text-brand-700">
                  {siteContent.contact.email}
                </a>
              </li>
            </ul>

            <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">Çalışma Saatleri</p>
            <ul className="mt-4 space-y-2 text-sm tabular-nums text-ink-600">
              {siteContent.contact.hours.map((entry) => (
                <li key={entry.label} className="flex items-baseline justify-between gap-4">
                  <span>{entry.label}</span>
                  <span className="font-semibold text-ink-800">{entry.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Widgets row — Recent Posts + Newsletter */}
        <div className="grid gap-10 border-t border-brand-200 py-12 lg:grid-cols-2 lg:gap-16">
          {/* Recent Posts */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">Son Yazılar</p>
            <ul className="mt-5 space-y-4">
              {recentPosts.map((post) => {
                const cover = post.coverUrl;
                return (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-4 rounded-2xl border border-brand-200 bg-white p-3 transition hover:border-brand-400 hover:shadow-card"
                    >
                      <img
                        src={cover}
                        alt={post.title}
                        className="h-16 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                          {post.category}
                        </p>
                        <p className="mt-1 line-clamp-2 font-display text-[14px] font-bold leading-snug text-ink-900 transition group-hover:text-brand-700">
                          {post.title}
                        </p>
                        <p className="mt-1 text-[11px] text-ink-500">
                          {post.readMinutes} dakika okuma
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">Bültenimize Abone Olun</p>
            <p className="mt-5 text-sm leading-7 text-ink-600">
              Yeni kampanyalar, sezon paketleri ve bakım ipuçlarını ilk siz öğrenmek için e-posta listemize katılın.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-3 border-t border-brand-200 pt-7 text-[12px] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteContent.brand.name}. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-5">
            <Link href="/gizlilik-politikasi" className="hover:text-brand-700">Gizlilik Politikası</Link>
            <span aria-hidden className="text-ink-300">|</span>
            <Link href="/kullanim-sartlari" className="hover:text-brand-700">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
