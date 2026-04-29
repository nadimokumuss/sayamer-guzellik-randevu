import Link from "next/link";

import { CountUp } from "@/components/motion/count-up";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { getStaffById } from "@/lib/catalog";
import { getDashboardStats } from "@/lib/booking";
import { getCatalogSummary, getAppointments, getBlockedSlots } from "@/lib/store";
import { formatCurrency, formatLongDate, getInitials } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  const stats = getDashboardStats();
  const summary = getCatalogSummary();
  const recentAppointments = getAppointments().slice(0, 5);
  const blockedSlots = getBlockedSlots().slice(0, 3);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Genel Bakış"
        title="Salon akışını tek bakışta oku"
        copy="Müşteri trafiği, ekip kapasitesi ve operasyon araları aynı yüzeyde ayrı bloklar halinde görünür."
        stats={[
          { label: "Bugünkü randevu", value: String(stats.todayCount) },
          { label: "Yaklaşan", value: String(stats.upcomingCount) },
          { label: "Bloke", value: String(stats.blockedCount) },
          { label: "Aktif ciro", value: formatCurrency(stats.confirmedRevenue) },
        ]}
      />

      {/* Stat cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Bugünkü randevu", to: stats.todayCount, copy: "Gün içinde aktif akış" },
          { label: "Yaklaşan", to: stats.upcomingCount, copy: "İleri tarih planı" },
          { label: "Bloke saat", to: stats.blockedCount, copy: "Operasyon araları" },
        ].map((card) => (
          <div key={card.label} className="rounded-[20px] border border-hairline bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
              {card.label}
            </p>
            <p className="mt-3 font-display text-3xl font-extrabold tabular-nums tracking-tight text-graphite">
              <CountUp to={card.to} />
            </p>
            <p className="mt-2 text-xs leading-5 text-ash">{card.copy}</p>
          </div>
        ))}
        <div className="rounded-[20px] border border-hairline bg-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
            Onaylı ciro
          </p>
          <p className="mt-3 font-display text-3xl font-extrabold tabular-nums tracking-tight text-graphite">
            {formatCurrency(stats.confirmedRevenue)}
          </p>
          <p className="mt-2 text-xs leading-5 text-ash">İptaller hariç toplam</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Recent appointments */}
        <div className="rounded-[24px] border border-hairline bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                Yeni randevular
              </p>
              <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-graphite">
                Son aktiviteler
              </h2>
            </div>
            <Link
              href="/yonetim/randevular"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-1.5 text-[12px] font-semibold tracking-tight text-graphite transition hover:bg-peachLight/40"
            >
              <span>Tümü</span>
              <span aria-hidden>↗</span>
            </Link>
          </div>

          <ul className="mt-5 space-y-2">
            {recentAppointments.map((appointment) => (
              <li
                key={appointment.id}
                className="flex flex-col gap-3 rounded-2xl border border-hairline p-4 transition hover:bg-peachLight/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-graphite font-display text-sm font-extrabold text-white">
                    {getInitials(
                      `${appointment.customer.firstName} ${appointment.customer.lastName}`,
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-sm font-bold tracking-tight text-graphite">
                        {appointment.itemName}
                      </p>
                      <StatusPill status={appointment.status} />
                    </div>
                    <p className="mt-1 text-xs text-ash">
                      {appointment.customer.firstName} {appointment.customer.lastName} ·{" "}
                      {getStaffById(appointment.staffId)?.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-ash">
                      {formatLongDate(appointment.date)} · {appointment.startTime}
                    </p>
                  </div>
                </div>
                <p className="font-display text-base font-extrabold tabular-nums text-graphite">
                  {formatCurrency(appointment.price)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          {/* Catalog summary */}
          <div className="rounded-[24px] border border-hairline bg-peachLight/40 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mocha">
              Operasyon Özeti
            </p>
            <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-graphite">
              Katalog ve ekip
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Kategori", to: summary.categories },
                { label: "Uzman", to: summary.staff },
                { label: "Hizmet", to: summary.services },
                { label: "Paket", to: summary.packages },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ash">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-2xl font-extrabold tabular-nums text-graphite">
                    <CountUp to={item.to} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Blocked slots */}
          <div className="rounded-[24px] border border-hairline bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                  Bloke saatler
                </p>
                <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-graphite">
                  Operasyon araları
                </h2>
              </div>
              <Link
                href="/yonetim/uygunluk"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-1.5 text-[12px] font-semibold tracking-tight text-graphite transition hover:bg-peachLight/40"
              >
                <span>Yönet</span>
                <span aria-hidden>↗</span>
              </Link>
            </div>

            <ul className="mt-5 space-y-2">
              {blockedSlots.map((slot) => (
                <li key={slot.id} className="rounded-2xl border border-hairline p-4">
                  <p className="font-display text-sm font-bold tracking-tight text-graphite">
                    {getStaffById(slot.staffId)?.name}
                  </p>
                  <p className="mt-1 text-xs text-ash">
                    {formatLongDate(slot.date)} · {slot.startTime} - {slot.endTime}
                  </p>
                  <p className="mt-1 text-xs text-graphite/75">{slot.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
