import Link from "next/link";

import { AppIcon } from "@/components/ui/app-icon";
import { Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "İletişim",
  "Sayamer Güzellik iletişim bilgileri, salon adresi ve online randevu alanı.",
);

export default function ContactPage() {
  return (
    <div className="shell py-10">
      {/* Hero */}
      <section className="card p-8 sm:p-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-400">
          <Link href="/" className="hover:text-espresso">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-espresso">İletişim</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>İletişim</Eyebrow>
            <h1 className="mt-5 font-display text-display-lg text-espresso">
              Hızlı iletişim ve online randevu
            </h1>
            <p className="mt-5 text-base leading-8 text-ink-500">
              Salon konumu, iletişim bilgileri ve randevu başlangıç adımları aynı sayfada kolayca
              erişilebilir biçimde sunulur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/randevu" variant="primary" size="lg">
                Online Randevu
              </LinkButton>
              <LinkButton
                href={siteContent.contact.whatsappUrl}
                external
                variant="outline"
                size="lg"
                leadingIcon={<AppIcon name="message" className="h-4 w-4" />}
              >
                WhatsApp
              </LinkButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-line shadow-editorial">
            <img
              src={siteContent.media.editorial[3].src}
              alt={siteContent.media.editorial[3].alt}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <article className="card p-7">
          <span className="icon-badge icon-badge-sm">
            <AppIcon name="compass" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 font-display text-xl text-espresso">Adres</h2>
          <p className="mt-3 font-medium text-espresso">{siteContent.contact.addressTitle}</p>
          <div className="mt-2 space-y-1 text-sm leading-7 text-ink-500">
            {siteContent.contact.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </article>

        <article className="card p-7">
          <span className="icon-badge icon-badge-sm">
            <AppIcon name="phone" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 font-display text-xl text-espresso">Hızlı iletişim</h2>
          <div className="mt-3 space-y-2 text-sm leading-7 text-ink-500">
            <p className="flex items-center gap-2">
              <span className="eyebrow-text">Telefon</span>
            </p>
            <p className="font-medium text-espresso">{siteContent.contact.phoneDisplay}</p>
            <p className="flex items-center gap-2 pt-2">
              <span className="eyebrow-text">E-posta</span>
            </p>
            <p className="font-medium text-espresso">{siteContent.contact.email}</p>
          </div>
        </article>

        <article className="card p-7">
          <span className="icon-badge icon-badge-sm">
            <AppIcon name="clock" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 font-display text-xl text-espresso">Çalışma saatleri</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {siteContent.contact.hours.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3">
                <span className="text-ink-400">{item.label}</span>
                <span className="font-medium text-espresso">{item.value}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Map placeholder + social */}
      <section className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-3xl border border-line shadow-soft">
          <div
            className="relative flex aspect-[16/10] w-full items-center justify-center bg-surface-muted"
            aria-label="Salon konumu haritası"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-surface-muted to-champagne" />
            <div className="relative z-10 text-center">
              <span className="icon-badge icon-badge-lg mx-auto">
                <AppIcon name="compass" className="h-7 w-7" />
              </span>
              <p className="mt-4 font-display text-2xl text-espresso">
                {siteContent.contact.addressTitle}
              </p>
              <p className="mt-2 text-sm text-ink-500">
                Konum ayrıntısı rezervasyon sonrası paylaşılır.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-7">
            <Eyebrow>Bizi takip edin</Eyebrow>
            <div className="mt-5 space-y-3">
              {siteContent.contact.socials.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-line bg-white p-4"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ink-400">{item.label}</p>
                    <p className="mt-1 font-medium text-espresso">{item.handle}</p>
                  </div>
                  <AppIcon name="arrow" className="h-4 w-4 text-rosewood" />
                </div>
              ))}
            </div>
          </div>

          <div className="spotlight-panel">
            <Eyebrow>Online Randevu</Eyebrow>
            <h3 className="mt-4 font-display text-2xl text-espresso">Şimdi başla</h3>
            <p className="mt-3 text-sm leading-7 text-ink-500">
              Hizmet veya paket seçerek birkaç adımda rezervasyonunuzu oluşturabilirsiniz.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <LinkButton href="/randevu" variant="primary" size="md">
                Randevu
              </LinkButton>
              <LinkButton href="/paketler" variant="outline" size="md">
                Paketler
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
