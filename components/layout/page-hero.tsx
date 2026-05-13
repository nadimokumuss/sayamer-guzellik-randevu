import Link from "next/link";
import type { ReactNode } from "react";

import { CountUp } from "@/components/motion/count-up";
import { InView } from "@/components/motion/in-view";
import { RevealText } from "@/components/motion/reveal-text";

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
  dropCap?: boolean;
  actions?: PageHeroAction[];
  photo?: string | string[];
  photoAlt?: string;
  stats?: PageHeroStat[];
  backdropWord?: string;
  variant?: "split" | "centered" | "wide";
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  copy,
  actions,
  photo,
  photoAlt = "",
  stats,
  variant = "split",
  className = "",
}: Props) {
  const photos = typeof photo === "string" ? [photo] : photo ?? [];
  const hasSide = variant === "split" && photos.length > 0;

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="shell relative pt-12 pb-12 lg:pt-16 lg:pb-20">
        <div
          className={
            hasSide
              ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
              : variant === "centered"
                ? "mx-auto max-w-3xl text-center"
                : "max-w-4xl"
          }
        >
          <div>
            <InView>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                {eyebrow}
              </p>
            </InView>

            <RevealText
              as="h1"
              className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900"
              stagger={0.06}
            >
              {title}
            </RevealText>

            {copy ? (
              <InView delay={0.15}>
                <div className="mt-5 max-w-xl text-[15px] leading-7 text-ink-500">{copy}</div>
              </InView>
            ) : null}

            {actions && actions.length > 0 ? (
              <InView delay={0.25}>
                <div
                  className={`mt-8 flex flex-wrap items-center gap-3 ${
                    variant === "centered" ? "justify-center" : ""
                  }`}
                >
                  {actions.map((action) => {
                    const isPrimary = action.primary ?? false;
                    const className = isPrimary ? "btn-pill-brand" : "btn-pill-ghost";
                    return action.external ? (
                      <a
                        key={action.href}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {action.label}
                      </a>
                    ) : (
                      <Link key={action.href} href={action.href} className={className}>
                        {action.label}
                      </Link>
                    );
                  })}
                </div>
              </InView>
            ) : null}

            {stats && stats.length > 0 ? (
              <InView delay={0.4} y={20}>
                <div
                  className="mt-12 grid gap-3"
                  style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
                >
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-brand-50 px-4 py-5 text-center">
                      <p className="font-display text-2xl font-extrabold tracking-tight text-brand-700">
                        <CountUp to={stat.to} decimals={stat.decimals ?? 0} />
                        {stat.suffix ?? ""}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-600">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </InView>
            ) : null}
          </div>

          {hasSide ? (
            <InView>
              <div className="relative overflow-hidden rounded-3xl shadow-card" style={{ aspectRatio: "5/4" }}>
                <img src={photos[0]} alt={photoAlt} className="h-full w-full object-cover" />
              </div>
            </InView>
          ) : null}
        </div>
      </div>
    </section>
  );
}
