"use client";

import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
};

export function CountUp({
  to,
  duration = 1.6,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const v = useMotionValue(0);
  const display = useTransform(v, (n) =>
    decimals === 0 ? Math.floor(n).toString() : n.toFixed(decimals)
  );

  useEffect(() => {
    if (inView) {
      const c = animate(v, to, { duration, ease: [0.22, 1, 0.36, 1] });
      return () => c.stop();
    }
  }, [inView, to, duration, v]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
