"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  eyebrow?: string;
  children: ReactNode;
  caption?: string;
};

export function ManifestoMoment({ eyebrow, children, caption }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.15, 1, 1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-32 lg:py-44">
      {/* Decorative outlined backdrop word */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[28vw] font-extrabold leading-[0.9] tracking-[-0.04em] text-transparent"
        style={{ WebkitTextStroke: "1px rgba(26,26,24,0.07)" }}
      >
        SAYAMER
      </span>

      <div className="shell relative">
        {eyebrow ? (
          <p className="mb-12 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-graphite">
            <span className="mr-3 inline-block h-[1px] w-10 align-middle bg-graphite" />
            {eyebrow}
            <span className="ml-3 inline-block h-[1px] w-10 align-middle bg-graphite" />
          </p>
        ) : null}

        <motion.div style={{ opacity, y }} className="mx-auto max-w-5xl text-center">
          <p className="font-display text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.18] tracking-[-0.02em] text-graphite">
            {children}
          </p>
        </motion.div>

        {caption ? (
          <p className="mt-16 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-ash">
            {caption}
          </p>
        ) : null}
      </div>
    </section>
  );
}
