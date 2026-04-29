"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

export type StickyShowcaseStep = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
  href?: string;
};

type Props = {
  steps: StickyShowcaseStep[];
};

export function StickyShowcase({ steps }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = steps.length;

  return (
    <div ref={ref} className="relative" style={{ height: `${total * 80}vh` }}>
      <div className="sticky top-20 h-[80vh]">
        <div className="grid h-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* LEFT — image stack */}
          <div className="relative h-full overflow-hidden rounded-[32px] bg-mocha">
            {steps.map((step, i) => (
              <ImageLayer
                key={step.image}
                step={step}
                index={i}
                total={total}
                progress={scrollYProgress}
              />
            ))}

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white">
              <div className="flex items-center gap-3">
                {steps.map((_, i) => (
                  <ProgressTick key={i} index={i} total={total} progress={scrollYProgress} />
                ))}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 tabular-nums">
                <span className="text-white">{String(total).padStart(2, "0")}</span>
                <span className="text-white/40"> Adım</span>
              </p>
            </div>
          </div>

          {/* RIGHT — copy stack */}
          <div className="relative flex h-full items-center">
            <div className="relative w-full">
              {steps.map((step, i) => (
                <CopyLayer
                  key={step.title}
                  step={step}
                  index={i}
                  total={total}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type LayerProps = {
  step: StickyShowcaseStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function ImageLayer({ step, index, total, progress }: LayerProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.06), start + 0.02, end - 0.04, end],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [start, end], [1.08, 1.0]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.img
        src={step.image}
        alt={step.alt}
        style={{ scale }}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-mochaDeep/55 via-mocha/15 to-transparent" />
    </motion.div>
  );
}

function CopyLayer({ step, index, total, progress }: LayerProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.05), start + 0.02, end - 0.05, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, end], [16, -16]);

  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center" style={{ opacity, y }}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
        {step.eyebrow}
      </p>
      <h3 className="mt-5 font-display text-display-md font-bold tracking-tight text-graphite">
        {step.title}
      </h3>
      <p className="mt-5 max-w-md text-base leading-8 text-ash">{step.copy}</p>
      <p className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite">
        <span className="font-display text-3xl font-extrabold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-[1px] w-12 bg-graphite/30" />
        <span>{total} adımdan biri</span>
      </p>
    </motion.div>
  );
}

function ProgressTick({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const w = useTransform(progress, [start, end], ["0%", "100%"]);
  return (
    <div className="relative h-[2px] w-10 bg-white/25 sm:w-14">
      <motion.div className="absolute inset-y-0 left-0 bg-white" style={{ width: w }} />
    </div>
  );
}
