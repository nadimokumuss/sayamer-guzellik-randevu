"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type RevealTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "word" | "char";
  stagger?: number;
};

export function RevealText({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  splitBy = "word",
  stagger = 0.06,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const tokens =
    splitBy === "word"
      ? children.split(/(\s+)/)
      : children.split("");

  const MotionTag = motion.create(Tag) as typeof motion.h2;

  return (
    <MotionTag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} aria-label={children}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={`s-${i}`}>{token}</span>;
        return (
          <span key={i} className="inline-block overflow-hidden align-baseline" aria-hidden>
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{
                duration: 0.9,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {token}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
