import Link from "next/link";

import { InView } from "@/components/motion/in-view";
import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { NumberedEyebrow } from "@/components/layout/numbered-eyebrow";
import { siteContent } from "@/lib/site";

type Props = {
  number?: string;
  eyebrow?: string;
  title: string;
  copy?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string; external?: boolean };
  /** Optional override; defaults to siteContent.media.editorial[2] */
  backgroundImage?: string;
  /** When true, skips the contact info column on right */
  hideContact?: boolean;
};

export function DarkCTA({
  number = "00",
  eyebrow = "Ziyaret",
  title,
  copy = "Randevu almak için hizmet veya paketinizi seçin; ekibiniz uygun saat aralığında sizi bekliyor.",
  primaryCta = { label: "Randevu al", href: "/randevu" },
  secondaryCta = {
    label: "WhatsApp",
    href: siteContent.contact.whatsappUrl,
    external: true,
  },
  backgroundImage = siteContent.media.editorial[2].src,
  hideContact = false,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-mochaDeep text-white">
      <ParallaxImage
        src={backgroundImage}
        alt=""
        className="absolute inset-0 opacity-40"
        amount={70}
        scale={1.15}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-mochaDeep via-mochaDeep/85 to-mochaDeep/55" />

      <div className="shell relative py-24 lg:py-32">
        <div
          className={
            hideContact
              ? "max-w-3xl"
              : "grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]"
          }
        >
          <div>
            <NumberedEyebrow number={number} label={eyebrow} tone="light" />
            <RevealText
              as="h2"
              className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white"
            >
              {title}
            </RevealText>
            <InView delay={0.2}>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/75">{copy}</p>
            </InView>
            <InView delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href={primaryCta.href}
                    className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-graphite transition hover:bg-peach"
                  >
                    <span>{primaryCta.label}</span>
                    <span
                      aria-hidden
                      className="grid h-7 w-7 place-items-center rounded-full bg-graphite text-white transition group-hover:rotate-45"
                    >
                      →
                    </span>
                  </Link>
                </Magnetic>
                {secondaryCta ? (
                  secondaryCta.external ? (
                    <a
                      href={secondaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      {secondaryCta.label} <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      {secondaryCta.label} <span aria-hidden>↗</span>
                    </Link>
                  )
                ) : null}
              </div>
            </InView>
          </div>

          {!hideContact ? (
            <InView delay={0.4} y={20}>
              <div className="text-sm leading-7 text-white/70 lg:text-right">
                <p className="font-display font-bold text-white">
                  {siteContent.contact.addressTitle}
                </p>
                {siteContent.contact.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <div className="mt-4 space-y-1">
                  <a
                    href={`tel:${siteContent.contact.phoneRaw}`}
                    className="block transition hover:text-white"
                  >
                    {siteContent.contact.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="block transition hover:text-white"
                  >
                    {siteContent.contact.email}
                  </a>
                </div>
                <div className="mt-4 space-y-1 tabular-nums">
                  {siteContent.contact.hours.map((entry) => (
                    <p
                      key={entry.label}
                      className="flex items-baseline justify-between gap-4 lg:justify-end"
                    >
                      <span>{entry.label}</span>
                      <span className="text-white">{entry.value}</span>
                    </p>
                  ))}
                </div>
              </div>
            </InView>
          ) : null}
        </div>
      </div>
    </section>
  );
}
