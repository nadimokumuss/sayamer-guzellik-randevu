"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode, type ElementType } from "react";

type InViewProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  y?: number;
  className?: string;
  duration?: number;
};

export function InView({
  children,
  as: Tag = "div",
  delay = 0,
  y = 24,
  className = "",
  duration = 0.9,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -8% 0px" });
  const M = motion.create(Tag) as typeof motion.div;

  return (
    <M
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
