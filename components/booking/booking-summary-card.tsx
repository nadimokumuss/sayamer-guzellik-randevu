import { formatCurrency, formatLongDate } from "@/lib/utils";

type BookingSummaryCardProps = {
  title: string;
  description: string;
  durationMinutes: number;
  price: number;
  bookingTypeLabel: string;
  staffName?: string;
  date?: string;
  timeLabel?: string;
  includedServices?: string[];
  /** When true, summary card uses sticky positioning (sidebar usage) */
  sticky?: boolean;
};

export function BookingSummaryCard({
  title,
  description,
  durationMinutes,
  price,
  bookingTypeLabel,
  staffName,
  date,
  timeLabel,
  includedServices = [],
  sticky = true,
}: BookingSummaryCardProps) {
  return (
    <aside
      className={`relative ${sticky ? "lg:sticky lg:top-32" : ""} h-fit overflow-hidden rounded-[28px] bg-peachLight p-6 lg:p-7`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[8rem] font-extrabold leading-none tracking-[-0.04em] text-mocha/10"
      >
        ✦
      </span>

      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mocha">
        {bookingTypeLabel} · Özet
      </p>
      <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-graphite lg:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-graphite/75">{description}</p>

      <dl className="mt-7 space-y-3 border-t border-graphite/10 pt-5 text-sm">
        <Row label="Tutar" value={formatCurrency(price)} emphasize />
        <Row label="Süre" value={`${durationMinutes} dk`} />
        {staffName ? <Row label="Uzman" value={staffName} /> : null}
        {date ? <Row label="Tarih" value={formatLongDate(date)} /> : null}
        {timeLabel ? <Row label="Saat" value={timeLabel} /> : null}
      </dl>

      {includedServices.length ? (
        <div className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mocha">
            Paket içeriği
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-graphite/80">
            {includedServices.map((item) => (
              <li key={item} className="flex items-baseline gap-3">
                <span className="text-rosewood" aria-hidden>
                  ✦
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}

function Row({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-graphite/10 pb-3 last:border-0 last:pb-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mocha/75">
        {label}
      </dt>
      <dd
        className={
          emphasize
            ? "font-display text-2xl font-extrabold tabular-nums text-graphite"
            : "text-sm font-medium tabular-nums text-graphite"
        }
      >
        {value}
      </dd>
    </div>
  );
}
