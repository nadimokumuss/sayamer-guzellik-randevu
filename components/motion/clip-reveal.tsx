"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
};

const variants = {
  up: { hidden: "inset(100% 0% 0% 0%)", visible: "inset(0% 0% 0% 0%)" },
  down: { hidden: "inset(0% 0% 100% 0%)", visible: "inset(0% 0% 0% 0%)" },
  left: { hidden: "inset(0% 100% 0% 0%)", visible: "inset(0% 0% 0% 0%)" },
  right: { hidden: "inset(0% 0% 0% 100%)", visible: "inset(0% 0% 0% 0%)" },
};

export function ClipReveal({
  children,
  className = "",
  direction = "up",
  duration = 1.2,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const v = variants[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: v.hidden }}
      animate={{ clipPath: inView ? v.visible : v.hidden }}
      transition={{ duration, delay, ease: [0.77, 0, 0.175, 1] }}
    >
      {children}
    </motion.div>
  );
}
