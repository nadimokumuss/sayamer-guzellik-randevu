import { type ReactNode } from "react";

import { classNames } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  accent?: ReactNode;
  className?: string;
};

export function StatCard({ label, value, hint, accent, className }: StatCardProps) {
  return (
    <div className={classNames("metric-card", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow-text">{label}</p>
          <p className="mt-3 font-display text-3xl text-espresso">{value}</p>
          {hint ? <p className="mt-1 text-xs text-ink-400">{hint}</p> : null}
        </div>
        {accent ? <div className="text-rosewood">{accent}</div> : null}
      </div>
    </div>
  );
}
