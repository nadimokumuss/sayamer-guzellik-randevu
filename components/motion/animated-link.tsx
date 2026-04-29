"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

type Props = {
  href: string;
  children: string;
  className?: string;
  trailing?: ReactNode;
  external?: boolean;
};

export function AnimatedLink({ href, children, className = "", trailing, external }: Props) {
  const [hover, setHover] = useState(false);
  const Wrapper = external ? "a" : Link;
  const props = external
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href };

  return (
    <Wrapper
      {...(props as { href: string })}
      aria-label={children}
      className={`group relative inline-flex items-center gap-2 ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative inline-flex overflow-hidden" aria-hidden>
        {children.split("").map((ch, i) => (
          <span key={i} className="relative inline-block">
            <motion.span
              className="inline-block"
              animate={{ y: hover ? "-110%" : "0%" }}
              transition={{ duration: 0.45, delay: i * 0.022, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
            <motion.span
              className="absolute left-0 top-full inline-block"
              animate={{ y: hover ? "-100%" : "0%" }}
              transition={{ duration: 0.45, delay: i * 0.022, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          </span>
        ))}
      </span>
      {trailing ? <span className="relative" aria-hidden>{trailing}</span> : null}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
      />
    </Wrapper>
  );
}
