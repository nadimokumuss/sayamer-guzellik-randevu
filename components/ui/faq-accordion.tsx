"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { InView } from "@/components/motion/in-view";

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-hairline">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <InView key={item.question} delay={idx * 0.06} y={16}>
            <li className="border-b border-hairline">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : idx)}
                className="group flex w-full items-baseline justify-between gap-6 py-7 text-left transition hover:pl-1"
              >
                <span className="flex items-baseline gap-6">
                  <span className="font-display text-xs font-semibold tabular-nums text-rosewood" style={{ minWidth: "2rem" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-xl font-semibold tracking-tight transition lg:text-2xl ${
                      isOpen ? "text-graphite" : "text-graphite/85 group-hover:text-graphite"
                    }`}
                  >
                    {item.question}
                  </span>
                </span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 bg-graphite text-white"
                      : "border border-hairline bg-white text-graphite group-hover:border-graphite/30"
                  }`}
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mb-7 ml-[3.5rem] max-w-2xl text-base leading-8 text-ash">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          </InView>
        );
      })}
    </ul>
  );
}
