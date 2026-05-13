"use client";

import { motion } from "framer-motion";

type Option = {
  id: string;
  label: string;
};

type Props = {
  options: ReadonlyArray<Option>;
  activeId: string;
  onChange: (id: string) => void;
  layoutId?: string;
};

export function FilterPills({ options, activeId, onChange, layoutId = "filter-active-bg" }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.id === activeId;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`relative inline-flex items-center rounded-full px-5 py-2 text-[13px] font-semibold tracking-tight transition ${
              active ? "text-white" : "text-ink-600 hover:text-brand-600"
            }`}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-brand-gradient shadow-[0_6px_18px_rgba(176,122,82,0.32)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : (
              <span className="absolute inset-0 rounded-full border border-line bg-white" aria-hidden />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
