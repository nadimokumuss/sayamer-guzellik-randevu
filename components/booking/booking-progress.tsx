"use client";

import Link from "next/link";

const STEPS = [
  { id: "service", label: "Hizmet", short: "01" },
  { id: "staff", label: "Uzman", short: "02" },
  { id: "time", label: "Saat", short: "03" },
  { id: "info", label: "Bilgiler", short: "04" },
  { id: "confirm", label: "Onay", short: "05" },
] as const;

export type BookingStepId = (typeof STEPS)[number]["id"];

type Props = {
  current: BookingStepId;
  /** Optional href map for going back to earlier steps */
  hrefs?: Partial<Record<BookingStepId, string>>;
};

export function BookingProgress({ current, hrefs }: Props) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);

  return (
    <div className="sticky top-0 z-30 border-b border-hairline bg-white/95 backdrop-blur">
      <div className="shell flex items-center gap-2 overflow-x-auto py-3.5 sm:gap-3 lg:py-4">
        {STEPS.map((step, idx) => {
          const isActive = idx === currentIdx;
          const isDone = idx < currentIdx;
          const href = hrefs?.[step.id];
          const interactive = isDone && href;

          const inner = (
            <div
              className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 transition ${
                isActive
                  ? "bg-graphite text-white"
                  : isDone
                    ? "bg-peach text-mocha"
                    : "bg-transparent text-ash"
              } ${interactive ? "hover:bg-mocha hover:text-white" : ""}`}
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold tabular-nums ${
                  isActive
                    ? "bg-white text-graphite"
                    : isDone
                      ? "bg-mocha text-white"
                      : "bg-hairline text-ash"
                }`}
              >
                {isDone ? "✓" : step.short}
              </span>
              <span className="text-[12px] font-semibold tracking-tight">{step.label}</span>
            </div>
          );

          return (
            <div key={step.id} className="flex shrink-0 items-center gap-2 sm:gap-3">
              {interactive ? (
                <Link href={href}>{inner}</Link>
              ) : (
                inner
              )}
              {idx < STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className={`h-[1px] w-6 sm:w-10 ${
                    idx < currentIdx ? "bg-mocha" : "bg-hairline"
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
