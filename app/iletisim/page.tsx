import { ClipReveal } from "@/components/motion/clip-reveal";
import { InView } from "@/components/motion/in-view";
import { LiveClock } from "@/components/motion/live-clock";
import { Marquee } from "@/components/motion/marquee";
import { ContactForm } from "@/components/contact/contact-form";
import { DarkCTA } from "@/components/layout/dark-cta";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "İletişim",
  "Sayamer Güzellik iletişim bilgileri, salon adresi ve online randevu alanı.",
);

export default function ContactPage() {
  const mapQuery = [siteContent.contact.addressTitle, ...siteContent.contact.addressLines].join(
    ", ",
  );
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  return (
    <div>
      <PageHero
        number="01"
        eyebrow="İletişim"
        title="Hızlı iletişim ve online randevu."
        copy="Salon konumu, iletişim bilgileri ve randevu başlangıç adımları aynı sayfada kolayca erişilebilir biçimde sunulur."
        photo={[
          siteContent.media.editorial[3].src,
          siteContent.media.editorial[2].src,
        ]}
        photoAlt={siteContent.media.editorial[3].alt}
        actions={[
          { label: "Online randevu", href: "/randevu", primary: true },
          {
            label: "WhatsApp",
            href: siteContent.contact.whatsappUrl,
            external: true,
          },
        ]}
        backdropWord="ILETISIM"
      />

      {/* Marquee — channels */}
      <section className="border-y border-hairline bg-white py-4 lg:py-5">
        <Marquee
          speed={50}
          itemGap="3rem"
          items={[
            <span key="a" className="font-display text-xl font-bold tracking-tight text-graphite lg:text-2xl">
              WhatsApp
            </span>,
            <span key="b" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
            <span key="c" className="font-display text-xl font-bold italic tracking-tight text-graphite/55 lg:text-2xl">
              Telefon
            </span>,
            <span key="d" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
            <span key="e" className="font-display text-xl font-bold tracking-tight text-graphite lg:text-2xl">
              E-posta
            </span>,
            <span key="f" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
            <span key="g" className="font-display text-xl font-bold italic tracking-tight text-graphite/55 lg:text-2xl">
              Instagram
            </span>,
            <span key="h" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
            <span key="i" className="font-display text-xl font-bold tracking-tight text-graphite lg:text-2xl">
              Online randevu
            </span>,
            <span key="j" aria-hidden className="font-display text-xl text-rosewood lg:text-2xl">
              ✦
            </span>,
          ]}
        />
      </section>

      {/* Form + Info — asymmetric */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            {/* LEFT — Form card */}
            <InView>
              <div className="rounded-[36px] border border-hairline bg-white p-7 shadow-[0_30px_70px_-30px_rgba(43,29,27,0.18)] lg:p-10">
                <SectionHeader
                  number="02"
                  eyebrow="Mesaj bırakın"
                  title="Kısa bir not yazın, size dönelim."
                  align="stacked"
                />
                <p className="mt-5 max-w-md text-sm leading-7 text-ash">
                  Formu doldurun, mesajınız WhatsApp üzerinden salona iletilir. Çalışma saatleri
                  içinde aynı gün dönüş yapıyoruz.
                </p>
                <div className="mt-10">
                  <ContactForm />
                </div>
              </div>
            </InView>

            {/* RIGHT — Info column */}
            <div className="space-y-8">
              <InView delay={0.15}>
                <div className="rounded-[28px] bg-peachLight p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mocha">
                    Salon · şu an
                  </p>
                  <div className="mt-3">
                    <LiveClock tone="dark" />
                  </div>
                </div>
              </InView>

              <InView delay={0.25}>
                <div className="rounded-[28px] border border-hairline bg-white p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ash">
                    Adres
                  </p>
                  <p className="mt-3 font-display text-xl font-bold tracking-tight text-graphite">
                    {siteContent.contact.addressTitle}
                  </p>
                  <div className="mt-3 space-y-1 text-sm leading-7 text-ash">
                    {siteContent.contact.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </InView>

              <InView delay={0.35}>
                <div className="grid gap-3">
                  <a
                    href={`tel:${siteContent.contact.phoneRaw}`}
                    className="group flex items-center justify-between rounded-full border border-hairline bg-white px-5 py-3 transition hover:border-graphite/30 hover:bg-peachLight/40"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                        Telefon
                      </span>
                      <span className="font-display text-base font-semibold tracking-tight text-graphite">
                        {siteContent.contact.phoneDisplay}
                      </span>
                    </div>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
                      <span aria-hidden>↗</span>
                    </span>
                  </a>

                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="group flex items-center justify-between rounded-full border border-hairline bg-white px-5 py-3 transition hover:border-graphite/30 hover:bg-peachLight/40"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                        E-posta
                      </span>
                      <span className="font-display text-base font-semibold tracking-tight text-graphite">
                        {siteContent.contact.email}
                      </span>
                    </div>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45 group-hover:bg-mocha">
                      <span aria-hidden>↗</span>
                    </span>
                  </a>
                </div>
              </InView>

              <InView delay={0.45}>
                <div className="rounded-[28px] border border-hairline bg-white p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ash">
                    Çalışma saatleri
                  </p>
                  <ul className="mt-4 space-y-2 text-sm tabular-nums">
                    {siteContent.contact.hours.map((entry) => (
                      <li
                        key={entry.label}
                        className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2 last:border-0 last:pb-0 text-ash"
                      >
                        <span>{entry.label}</span>
                        <span className="text-graphite">{entry.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </InView>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-20 lg:py-28">
          <SectionHeader number="03" eyebrow="Konum" title="Bağdat Caddesi · Anadolu Yakası." />
          <div className="mt-10">
            <ClipReveal direction="up" duration={1.4}>
              <div className="overflow-hidden rounded-[36px] border border-hairline">
                <iframe
                  src={mapSrc}
                  title="Salon konumu"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[16/9] w-full border-0"
                  allowFullScreen
                />
              </div>
            </ClipReveal>
          </div>
        </div>
      </section>

      <DarkCTA
        number="04"
        eyebrow="Devam"
        title="Mesaj yerine doğrudan online randevu da bırakabilirsiniz."
        primaryCta={{ label: "Randevu al", href: "/randevu" }}
        secondaryCta={{
          label: "WhatsApp",
          href: siteContent.contact.whatsappUrl,
          external: true,
        }}
      />
    </div>
  );
}
