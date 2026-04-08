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
    <aside className="glass-card h-fit p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow">{bookingTypeLabel}</span>
        <span className="rounded-full bg-[#f8efea] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8c7376]">
          {durationMinutes} dk
        </span>
      </div>

      <h2 className="mt-5 font-display text-3xl tracking-tight text-espresso">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{description}</p>

      <div className="mt-6 space-y-3 rounded-[24px] bg-[#fcf7f3] p-5">
        <div className="flex items-center justify-between text-sm text-[#6f5c5e]">
          <span>Tutar</span>
          <strong className="text-lg font-semibold text-espresso">{formatCurrency(price)}</strong>
        </div>
        {staffName ? (
          <div className="flex items-center justify-between text-sm text-[#6f5c5e]">
            <span>Uzman</span>
            <span className="font-medium text-espresso">{staffName}</span>
          </div>
        ) : null}
        {date ? (
          <div className="flex items-center justify-between text-sm text-[#6f5c5e]">
            <span>Tarih</span>
            <span className="font-medium text-espresso">{formatLongDate(date)}</span>
          </div>
        ) : null}
        {timeLabel ? (
          <div className="flex items-center justify-between text-sm text-[#6f5c5e]">
            <span>Saat</span>
            <span className="font-medium text-espresso">{timeLabel}</span>
          </div>
        ) : null}
      </div>

      {includedServices.length ? (
        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c7376]">
            Paket İçeriği
          </p>
          <ul className="space-y-2 text-sm text-[#5f4d4f]">
            {includedServices.map((item) => (
              <li key={item} className="rounded-2xl border border-white/70 bg-white/60 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
