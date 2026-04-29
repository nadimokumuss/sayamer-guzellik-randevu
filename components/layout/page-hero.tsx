import Link from "next/link";
import type { ReactNode } from "react";

import { ClipReveal } from "@/components/motion/clip-reveal";
import { CountUp } from "@/components/motion/count-up";
import { InView } from "@/components/motion/in-view";
import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { NumberedEyebrow } from "@/components/layout/numbered-eyebrow";

export type PageHeroStat = {
  label: string;
  to: number;
  decimals?: number;
  suffix?: string;
};

export type PageHeroAction = {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
};

type Props = {
  number?: string;
  eyebrow: string;
  title: string;
  copy?: string | ReactNode;
  /** First letter of `copy` rendered as drop cap if string and dropCap=true */
  dropCap?: boolean;
  actions?: PageHeroAction[];
  /** Optional side image — string for single, array for bento */
  photo?: string | string[];
  photoAlt?: string;
  /** When set, shows stats row at bottom of hero */
  stats?: PageHeroStat[];
  /** Optional backdrop word (outlined) — only renders on home or large heros */
  backdropWord?: string;
  /** Allow hero to be full-bleed (no side image) — wider title */
  variant?: "split" | "centered" | "wide";
  className?: string;
};

export function PageHero({
  number = "00",
  eyebrow,
  title,
  copy,
  dropCap,
  actions,
  photo,
  photoAlt = "",
  stats,
  backdropWord,
  variant = "split",
  className = "",
}: Props) {
  const photos = typeof photo === "string" ? [photo] : photo ?? [];
  const hasSide = variant === "split" && photos.length > 0;

  let copyNode: ReactNode = copy;
  if (typeof copy === "string" && dropCap && copy.length > 0) {
    const first = copy.charAt(0);
    const rest = copy.slice(1);
    copyNode = (
      <>
        <span className="float-left mr-3 mt-1 font-display text-[3.4rem] font-extrabold leading-[0.85] tracking-tight text-graphite">
          {first}
        </span>
        {rest}
      </>
    );
  }

  return (
    <section className={`relative overflow-hidden bg-white ${className}`}>
      {backdropWord ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[20vw] font-extrabold leading-[0.85] tracking-[-0.04em] text-transparent lg:text-[18vw]"
          style={{ WebkitTextStroke: "1px rgba(26,26,24,0.06)" }}
        >
          {backdropWord}
        </span>
      ) : null}

      <div className="shell relative py-20 lg:py-28">
        <div
          className={
            hasSide
              ? "grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20"
              : variant === "centered"
                ? "mx-auto max-w-3xl text-center"
                : "max-w-4xl"
          }
        >
          <div>
            <InView>
              <NumberedEyebrow number={number} label={eyebrow} />
            </InView>

            <RevealText
              as="h1"
              className="mt-7 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-graphite"
              stagger={0.06}
            >
              {title}
            </RevealText>

            {copy ? (
              <InView delay={0.15}>
                <p className="mt-8 max-w-xl text-base leading-8 text-ash">{copyNode}</p>
              </InView>
            ) : null}

            {actions && actions.length > 0 ? (
              <InView delay={0.25}>
                <div
                  className={`mt-10 flex flex-wrap items-center gap-4 ${
                    variant === "centered" ? "justify-center" : ""
                  }`}
                >
                  {actions.map((action) => {
                    const isPrimary = action.primary ?? false;
                    if (isPrimary) {
                      return (
                        <Magnetic key={action.href} strength={0.3}>
                          {action.external ? (
                            <a
                              href={action.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-4 text-sm font-semibold text-white transition hover:bg-mocha"
                            >
                              <span>{action.label}</span>
                              <span
                                aria-hidden
                                className="grid h-7 w-7 place-items-center rounded-full bg-white text-graphite transition group-hover:rotate-45"
                              >
                                →
                              </span>
                            </a>
                          ) : (
                            <Link
                              href={action.href}
                              className="group inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-4 text-sm font-semibold text-white transition hover:bg-mocha"
                            >
                              <span>{action.label}</span>
                              <span
                                aria-hidden
                                className="grid h-7 w-7 place-items-center rounded-full bg-white text-graphite transition group-hover:rotate-45"
                              >
                                →
                              </span>
                            </Link>
                          )}
                        </Magnetic>
                      );
                    }
                    return action.external ? (
                      <a
                        key={action.href}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill-outline"
                      >
                        <span>{action.label}</span>
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <Link key={action.href} href={action.href} className="btn-pill-outline">
                        <span>{action.label}</span>
                        <span aria-hidden>↗</span>
                      </Link>
                    );
                  })}
                </div>
              </InView>
            ) : null}

            {stats && stats.length > 0 ? (
              <InView delay={0.4} y={20}>
                <div
                  className={`mt-16 grid gap-6 border-t border-hairline pt-8`}
                  style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
                >
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-3xl font-extrabold tracking-tight text-graphite lg:text-4xl">
                        <CountUp to={stat.to} decimals={stat.decimals ?? 0} />
                        {stat.suffix ?? ""}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </InView>
            ) : null}
          </div>

          {hasSide ? (
            <div className="relative h-[480px] lg:h-[600px]">
              <ClipReveal direction="up" duration={1.4}>
                <ParallaxImage
                  src={photos[0]}
                  alt={photoAlt}
                  className="absolute inset-0 rounded-[36px]"
                  amount={50}
                  scale={1.1}
                />
              </ClipReveal>
              <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-tr from-mochaDeep/45 via-mocha/0 to-transparent" />

              {photos[1] ? (
                <InView delay={0.6} y={40}>
                  <div className="absolute -right-3 top-12 hidden h-40 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-[0_30px_70px_-20px_rgba(43,29,27,0.35)] sm:block">
                    <img src={photos[1]} alt="" className="h-full w-full object-cover" />
                  </div>
                </InView>
              ) : null}
              {photos[2] ? (
                <InView delay={0.8} y={40}>
                  <div className="absolute -left-3 bottom-10 hidden h-36 w-28 overflow-hidden rounded-2xl border-4 border-white shadow-[0_30px_70px_-20px_rgba(43,29,27,0.35)] sm:block">
                    <img src={photos[2]} alt="" className="h-full w-full object-cover" />
                  </div>
                </InView>
              ) : null}

              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 text-peach lg:h-32 lg:w-32"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="2 5"
                  strokeWidth="1"
                />
              </svg>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
