import Link from "next/link";

import { RevealText } from "@/components/motion/reveal-text";
import { NumberedEyebrow } from "@/components/layout/numbered-eyebrow";

type Props = {
  number: string;
  eyebrow: string;
  title: string;
  cta?: { label: string; href: string };
  align?: "row" | "stacked";
  className?: string;
};

export function SectionHeader({
  number,
  eyebrow,
  title,
  cta,
  align = "row",
  className = "",
}: Props) {
  const layout =
    align === "row"
      ? "flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
      : "flex flex-col gap-6";

  return (
    <div className={`${layout} ${className}`}>
      <div className="max-w-2xl">
        <NumberedEyebrow number={number} label={eyebrow} />
        <RevealText
          as="h2"
          className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-graphite"
        >
          {title}
        </RevealText>
      </div>
      {cta ? (
        <Link href={cta.href} className="btn-pill-outline shrink-0">
          <span>{cta.label}</span>
          <span aria-hidden>↗</span>
        </Link>
      ) : null}
    </div>
  );
}
