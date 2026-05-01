import { ContactForm } from "@/components/contact/contact-form";
import { InView } from "@/components/motion/in-view";
import { RevealText } from "@/components/motion/reveal-text";
import { InfoCard } from "@/components/layout/info-card";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "İletişim",
  "Sayamer Güzellik Merkezi iletişim bilgileri, salon adresi ve online randevu alanı.",
);

export default function ContactPage() {
  const mapQuery = [siteContent.contact.addressTitle, ...siteContent.contact.addressLines].join(
    ", ",
  );
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

  return (
    <div className="bg-surface">
      {/* Header */}
      <section>
        <div className="shell pt-12 pb-8 lg:pt-16">
          <InView>
            <RevealText
              as="h1"
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900"
            >
              Bize Ulaşın
            </RevealText>
          </InView>
          <InView delay={0.15}>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-ink-500">
              Güzelliğinizi ortaya çıkarmak için buradayız. Sorularınız, randevu talepleriniz veya
              önerileriniz için aşağıdaki kanallardan bize ulaşabilirsiniz.
            </p>
          </InView>
        </div>
      </section>

      {/* 3 info cards */}
      <section>
        <div className="shell pb-10">
          <div className="grid gap-5 md:grid-cols-3">
            <InView delay={0.05}>
              <InfoCard
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                    <path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="2.4" />
                  </svg>
                }
                label="Adres"
                caption={siteContent.contact.addressTitle}
                value={siteContent.contact.addressLines[2] ?? "İstanbul / Anadolu Yakası"}
              />
            </InView>
            <InView delay={0.15}>
              <InfoCard
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" strokeLinejoin="round" />
                  </svg>
                }
                label="Telefon"
                caption="Haftanın her günü 09:00 - 20:00"
                value={siteContent.contact.phoneDisplay}
                href={`tel:${siteContent.contact.phoneRaw}`}
              />
            </InView>
            <InView delay={0.25}>
              <InfoCard
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 7 9-7" strokeLinecap="round" />
                  </svg>
                }
                label="E-posta"
                caption="Her türlü sorunuz için"
                value={siteContent.contact.email}
                href={`mailto:${siteContent.contact.email}`}
              />
            </InView>
          </div>
        </div>
      </section>

      {/* Form + map */}
      <section>
        <div className="shell pb-16 lg:pb-24">
          <div className="grid gap-6 lg:grid-cols-2">
            <InView>
              <div className="rounded-3xl bg-white p-7 shadow-card lg:p-9">
                <h2 className="font-display text-[22px] font-extrabold tracking-tight text-ink-900">
                  Bize Yazın
                </h2>
                <p className="mt-2 text-[13px] font-semibold text-brand-600">
                  Formu doldurun, en kısa sürede size geri dönüş yapalım.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </InView>

            <InView delay={0.1}>
              <div className="relative h-full min-h-[480px] overflow-hidden rounded-3xl shadow-card">
                <iframe
                  src={mapSrc}
                  title="Salon konumu"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />

                {/* Animated map pin overlay center */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="relative grid h-12 w-12 place-items-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/40" />
                    <span className="relative grid h-12 w-12 place-items-center rounded-full bg-brand-gradient text-white shadow-elevated">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z" strokeLinejoin="round" />
                        <circle cx="12" cy="9" r="2.4" />
                      </svg>
                    </span>
                  </span>
                </div>

                {/* Bottom info chip */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-white/95 px-5 py-3.5 shadow-card backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-600">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <rect x="3" y="9" width="18" height="9" rx="1.5" />
                        <path d="M5 9V7a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
                        <circle cx="8" cy="14.5" r="0.7" fill="currentColor" />
                        <circle cx="16" cy="14.5" r="0.7" fill="currentColor" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600">
                        Ulaşım
                      </p>
                      <p className="text-[14px] font-bold text-ink-900">Otopark Mevcuttur</p>
                    </div>
                  </div>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 hover:gap-1.5 transition-all"
                  >
                    Yol Tarifi <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </InView>
          </div>
        </div>
      </section>
    </div>
  );
}
