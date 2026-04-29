"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  itemGap?: string;
  pauseOnHover?: boolean;
};

export function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = "",
  itemGap = "3rem",
  pauseOnHover = true,
}: MarqueeProps) {
  const doubled = [...items, ...items];
  const x = useMotionValue(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useAnimationFrame((_, delta) => {
    if (pauseOnHover && hovered) return;
    const el = innerRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    if (halfWidth === 0) return;
    const dx = (delta / 1000) * (halfWidth / speed) * (reverse ? 1 : -1);
    let next = x.get() + dx;
    if (next <= -halfWidth) next += halfWidth;
    if (next >= 0) next -= halfWidth;
    x.set(next);
  });

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        ref={innerRef}
        className="flex shrink-0 whitespace-nowrap"
        style={{ gap: itemGap, x }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center" style={{ gap: itemGap }}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
