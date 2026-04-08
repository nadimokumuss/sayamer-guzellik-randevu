import { AppIcon } from "@/components/ui/app-icon";
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
    <aside className="glass-card relative h-fit overflow-hidden p-6">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-[#f6dfdf]/80 via-white/10 to-transparent" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name={bookingTypeLabel === "Paket" ? "layers" : "spark"} className="h-7 w-7" />
            </span>
            <div>
              <span className="eyebrow">{bookingTypeLabel}</span>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[#8c7376]">
                Rezervasyon özeti
              </p>
            </div>
          </div>

          <span className="rounded-full bg-[#f8efea] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8c7376]">
            {durationMinutes} dk
          </span>
        </div>

        <h2 className="mt-6 font-display text-3xl tracking-tight text-espresso">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">{description}</p>

        <div className="mt-6 grid gap-3">
          <div className="metric-card">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Tutar</p>
            <p className="mt-3 font-display text-3xl text-espresso">{formatCurrency(price)}</p>
          </div>
          {staffName ? (
            <div className="metric-card">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Uzman</p>
              <p className="mt-3 text-lg font-medium text-espresso">{staffName}</p>
            </div>
          ) : null}
          {date ? (
            <div className="metric-card">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Tarih</p>
              <p className="mt-3 text-lg font-medium text-espresso">{formatLongDate(date)}</p>
            </div>
          ) : null}
          {timeLabel ? (
            <div className="metric-card">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Saat</p>
              <p className="mt-3 text-lg font-medium text-espresso">{timeLabel}</p>
            </div>
          ) : null}
        </div>

        {includedServices.length ? (
          <div className="mt-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c7376]">
              Paket İçeriği
            </p>
            <ul className="grid gap-2 text-sm text-[#5f4d4f]">
              {includedServices.map((item) => (
                <li
                  key={item}
                  className="rounded-[20px] border border-white/70 bg-white/70 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-6 rounded-[24px] bg-[#fcf7f3] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8c7376]">Deneyim notu</p>
            <p className="mt-3 text-sm leading-7 text-[#6f5c5e]">
              Salon tarafında bu seçim tek blok randevu olarak görünür ve uygunluk motoru buna
              göre hesap yapar.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
