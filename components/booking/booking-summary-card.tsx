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
}: BookingSummaryCardProps) {
  return (
    <aside className="rule-top border-l-0 border-r-0 border-b border-hairline pb-10 lg:border-t-0 lg:border-l lg:border-r-0 lg:border-b-0 lg:py-0 lg:pl-12 lg:pb-0">
      <div className="pt-10 lg:pt-0">
        <p className="eyebrow-tag">{bookingTypeLabel} · Özet</p>
        <h2 className="mt-6 font-display text-display-md text-graphite">{title}</h2>
        <p className="mt-4 text-sm leading-7 text-ash">{description}</p>

        <dl className="mt-8 space-y-4 border-t border-hairline pt-6 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[11px] uppercase tracking-[0.22em] text-ash">Tutar</dt>
            <dd className="font-display text-2xl text-graphite tabular-nums">
              {formatCurrency(price)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-hairline pt-4">
            <dt className="text-[11px] uppercase tracking-[0.22em] text-ash">Süre</dt>
            <dd className="text-graphite tabular-nums">{durationMinutes} dk</dd>
          </div>
          {staffName ? (
            <div className="flex items-baseline justify-between gap-4 border-t border-hairline pt-4">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-ash">Uzman</dt>
              <dd className="text-graphite">{staffName}</dd>
            </div>
          ) : null}
          {date ? (
            <div className="flex items-baseline justify-between gap-4 border-t border-hairline pt-4">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-ash">Tarih</dt>
              <dd className="text-graphite">{formatLongDate(date)}</dd>
            </div>
          ) : null}
          {timeLabel ? (
            <div className="flex items-baseline justify-between gap-4 border-t border-hairline pt-4">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-ash">Saat</dt>
              <dd className="text-graphite tabular-nums">{timeLabel}</dd>
            </div>
          ) : null}
        </dl>

        {includedServices.length ? (
          <div className="mt-10">
            <p className="eyebrow-tag">Paket içeriği</p>
            <ul className="mt-6 space-y-2 text-sm leading-7 text-ash">
              {includedServices.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span className="font-display text-[11px] text-ash/70">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
