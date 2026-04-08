import Link from "next/link";

import { getCatalogSummary, getAppointments, getBlockedSlots } from "@/lib/store";
import { getStaffById } from "@/lib/catalog";
import { getDashboardStats } from "@/lib/booking";
import { formatCurrency, formatLongDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  const stats = getDashboardStats();
  const summary = getCatalogSummary();
  const recentAppointments = getAppointments().slice(0, 4);
  const blockedSlots = getBlockedSlots().slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="glass-card p-8">
        <span className="eyebrow">Genel Bakış</span>
        <h1 className="mt-5 font-display text-5xl tracking-tight text-espresso">
          Günlük salon akışı
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6f5c5e]">
          Müşteri randevuları, operasyon araları ve ekip kapasitesi aynı ekranda takip edilir.
          Bu demo veri katmanı müşteri akışıyla birebir paylaşılır.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Bugünkü randevu", value: stats.todayCount },
          { label: "Yaklaşan randevu", value: stats.upcomingCount },
          { label: "Bloke saat", value: stats.blockedCount },
          { label: "Aktif ciro", value: formatCurrency(stats.confirmedRevenue) },
        ].map((card) => (
          <div key={card.label} className="glass-card p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8c7376]">{card.label}</p>
            <p className="mt-4 font-display text-4xl text-espresso">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="eyebrow">Yeni Randevular</span>
              <h2 className="mt-4 font-display text-3xl text-espresso">Son aktiviteler</h2>
            </div>
            <Link href="/yonetim/randevular" className="soft-button-secondary">
              Tümünü Gör
            </Link>
          </div>
          <div className="mt-6 space-y-3">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="rounded-[24px] bg-[#fcf7f3] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-espresso">{appointment.itemName}</p>
                    <p className="mt-1 text-sm text-[#6f5c5e]">
                      {appointment.customer.firstName} {appointment.customer.lastName} •{" "}
                      {getStaffById(appointment.staffId)?.name}
                    </p>
                  </div>
                  <div className="text-sm text-[#8c7376]">
                    {formatLongDate(appointment.date)} • {appointment.startTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <span className="eyebrow">Operasyon Özeti</span>
          <h2 className="mt-4 font-display text-3xl text-espresso">Katalog ve blokeler</h2>
          <div className="mt-6 space-y-3">
            {[
              `Toplam kategori: ${summary.categories}`,
              `Toplam uzman: ${summary.staff}`,
              `Toplam hizmet: ${summary.services}`,
              `Toplam paket: ${summary.packages}`,
            ].map((line) => (
              <div key={line} className="rounded-[20px] bg-[#fcf7f3] px-4 py-3 text-sm text-[#5d494b]">
                {line}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
              Son bloke saatler
            </p>
            {blockedSlots.map((slot) => (
              <div key={slot.id} className="rounded-[20px] border border-white/70 bg-white/70 p-4">
                <p className="font-medium text-espresso">{getStaffById(slot.staffId)?.name}</p>
                <p className="mt-1 text-sm text-[#6f5c5e]">
                  {formatLongDate(slot.date)} • {slot.startTime} - {slot.endTime}
                </p>
                <p className="mt-1 text-sm text-[#8c7376]">{slot.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
