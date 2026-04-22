import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "İletişim",
  "Sayamer Güzellik iletişim bilgileri, salon adresi ve online randevu alanı.",
);

export default function ContactPage() {
  const mapQuery = [
    siteContent.contact.addressTitle,
    ...siteContent.contact.addressLines,
  ].join(", ");
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  return (
    <div>
      {/* HERO */}
      <section className="shell pt-20 pb-20 lg:pt-32 lg:pb-24">
        <p className="eyebrow-tag">İletişim</p>
        <h1 className="mt-8 max-w-3xl font-display text-display-xl text-graphite">
          Hızlı iletişim ve online randevu.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-ash">
          Salon konumu, iletişim bilgileri ve randevu başlangıç adımları aynı sayfada
          kolayca erişilebilir biçimde sunulur.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Link href="/randevu" className="btn-minimal-solid">
            Online randevu
          </Link>
          <a
            href={siteContent.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            WhatsApp
          </a>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-20">
            <div>
              <p className="eyebrow-tag">Adres</p>
              <p className="mt-6 font-display text-2xl text-graphite">
                {siteContent.contact.addressTitle}
              </p>
              <div className="mt-4 space-y-1 text-sm leading-7 text-ash">
                {siteContent.contact.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow-tag">İletişim</p>
              <div className="mt-6 space-y-4 text-sm leading-7 text-ash">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ash/80">Telefon</p>
                  <a
                    href={`tel:${siteContent.contact.phoneRaw}`}
                    className="mt-2 block font-display text-xl text-graphite transition hover:text-clay"
                  >
                    {siteContent.contact.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ash/80">E-posta</p>
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="mt-2 block font-display text-xl text-graphite transition hover:text-clay"
                  >
                    {siteContent.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow-tag">Çalışma saatleri</p>
              <div className="mt-6 space-y-2 tabular-nums text-sm leading-7 text-ash">
                {siteContent.contact.hours.map((entry) => (
                  <p key={entry.label} className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2">
                    <span>{entry.label}</span>
                    <span className="text-graphite">{entry.value}</span>
                  </p>
                ))}
              </div>
              <div className="mt-8 space-y-1 text-sm text-ash">
                {siteContent.contact.socials.map((item) => (
                  <p key={item.label} className="flex items-baseline justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-ash/80">
                      {item.label}
                    </span>
                    <span className="text-graphite">{item.handle}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <p className="eyebrow-tag">Konum</p>
          <div className="mt-8 overflow-hidden">
            <iframe
              src={mapSrc}
              title="Salon konumu"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[16/9] w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <div>
              <p className="eyebrow-tag">Mesaj bırakın</p>
              <h2 className="mt-6 font-display text-display-lg text-graphite">
                Kısa bir not yazın, size dönelim.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-ash">
                Formu doldurun, mesajınız WhatsApp üzerinden salona iletilsin. Genelde
                aynı gün içinde dönüş yapıyoruz.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
