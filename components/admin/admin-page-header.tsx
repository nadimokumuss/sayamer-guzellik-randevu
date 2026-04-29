import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  copy?: string;
  actions?: ReactNode;
  stats?: { label: string; value: string }[];
};

export function AdminPageHeader({ eyebrow, title, copy, actions, stats }: Props) {
  return (
    <header className="rounded-[24px] border border-hairline bg-white p-6 lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-graphite lg:text-4xl">
            {title}
          </h1>
          {copy ? (
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ash">{copy}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>

      {stats && stats.length > 0 ? (
        <div
          className="mt-7 grid gap-4 border-t border-hairline pt-6"
          style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                {stat.label}
              </p>
              <p className="mt-1.5 font-display text-2xl font-extrabold tabular-nums tracking-tight text-graphite">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </header>
  );
}
