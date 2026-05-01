import Link from "next/link";

import { RevealText } from "@/components/motion/reveal-text";

type Props = {
  number?: string;
  eyebrow: string;
  title: string;
  cta?: { label: string; href: string };
  align?: "row" | "stacked";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  cta,
  align = "row",
  className = "",
}: Props) {
  const layout =
    align === "row"
      ? "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      : "flex flex-col gap-4";

  return (
    <div className={`${layout} ${className}`}>
      <div className="max-w-2xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
          {eyebrow}
        </p>
        <RevealText
          as="h2"
          className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900"
        >
          {title}
        </RevealText>
      </div>
      {cta ? (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 hover:gap-2 transition-all"
        >
          {cta.label} <span aria-hidden>→</span>
        </Link>
      ) : null}
    </div>
  );
}
