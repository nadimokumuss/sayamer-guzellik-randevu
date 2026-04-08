import Link from "next/link";

import { StatusPill } from "@/components/admin/status-pill";
import { AppIcon } from "@/components/ui/app-icon";
import { PageIntro } from "@/components/ui/page-intro";
import { getStaffById } from "@/lib/catalog";
import { getDashboardStats } from "@/lib/booking";
import { getCatalogSummary, getAppointments, getBlockedSlots } from "@/lib/store";
import { formatCurrency, formatLongDate, getInitials } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  const stats = getDashboardStats();
  const summary = getCatalogSummary();
  const recentAppointments = getAppointments().slice(0, 4);
  const blockedSlots = getBlockedSlots().slice(0, 3);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Genel Bakış"
        title="Salon akışını tek bakışta oku"
        copy="Müşteri trafiği, ekip kapasitesi ve operasyon araları aynı yüzeyde ayrı bloklar halinde görünür. Böylece panel metin yükü olmadan yön duygusu verir."
        icon="chart"
        asideTitle="Bugün odak görünümü"
        asideCopy="Randevu hacmi, yaklaşan trafik ve bloke saatler önce kartlaşır; detaylar sonra açılır."
        stats={[
          { label: "Bugünkü randevu", value: String(stats.todayCount) },
          { label: "Yaklaşan", value: String(stats.upcomingCount) },
          { label: "Bloke", value: String(stats.blockedCount) },
          { label: "Aktif ciro", value: formatCurrency(stats.confirmedRevenue) },
        ]}
      />

      <section className="visual-grid">
        {[
          { icon: "calendar", label: "Bugünkü randevu", value: String(stats.todayCount), copy: "Gün içinde aktif akış" },
          { icon: "bookmark", label: "Yaklaşan randevu", value: String(stats.upcomingCount), copy: "İleri tarih planı" },
          { icon: "block", label: "Bloke saat", value: String(stats.blockedCount), copy: "Operasyon araları" },
          { icon: "check", label: "Onaylı ciro", value: formatCurrency(stats.confirmedRevenue), copy: "İptaller hariç toplam" },
        ].map((card) => (
          <div key={card.label} className="metric-card min-h-[180px]">
            <span className="icon-badge h-11 w-11 rounded-[18px]">
              <AppIcon
                name={card.icon as "calendar" | "bookmark" | "block" | "check"}
              />
            </span>
            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-[#8c7376]">{card.label}</p>
            <p className="mt-3 font-display text-4xl text-espresso">{card.value}</p>
            <p className="mt-3 text-sm leading-6 text-[#6f5c5e]">{card.copy}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="icon-badge icon-badge-lg">
                <AppIcon name="bookmark" className="h-7 w-7" />
              </span>
              <div>
                <span className="eyebrow">Yeni Randevular</span>
                <h2 className="mt-4 font-display text-3xl text-espresso">Son aktiviteler</h2>
              </div>
            </div>
            <Link href="/yonetim/randevular" className="soft-button-secondary">
              Tümünü Gör
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="rounded-[28px] border border-white/70 bg-[#fcf7f3] p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="icon-badge h-12 w-12 rounded-[18px] bg-white/80 font-display text-lg text-rosewood">
                      {getInitials(
                        `${appointment.customer.firstName} ${appointment.customer.lastName}`,
                      )}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-medium text-espresso">{appointment.itemName}</p>
                        <StatusPill status={appointment.status} />
                      </div>
                      <p className="mt-2 text-sm text-[#6f5c5e]">
                        {appointment.customer.firstName} {appointment.customer.lastName} •{" "}
                        {getStaffById(appointment.staffId)?.name}
                      </p>
                      <p className="mt-1 text-sm text-[#8c7376]">
                        {formatLongDate(appointment.date)} • {appointment.startTime}
                      </p>
                    </div>
                  </div>
                  <strong className="text-lg text-espresso">{formatCurrency(appointment.price)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="spotlight-panel">
            <div className="flex items-center gap-4">
              <span className="icon-badge icon-badge-lg">
                <AppIcon name="layers" className="h-7 w-7" />
              </span>
              <div>
                <span className="eyebrow">Operasyon Özeti</span>
                <h2 className="mt-4 font-display text-3xl text-espresso">Katalog ve ekip</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Kategori", value: String(summary.categories) },
                { label: "Uzman", value: String(summary.staff) },
                { label: "Hizmet", value: String(summary.services) },
                { label: "Paket", value: String(summary.packages) },
              ].map((item) => (
                <div key={item.label} className="metric-card">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">
                    {item.label}
                  </p>
                  <p className="mt-3 font-display text-3xl text-espresso">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="icon-badge icon-badge-lg">
                  <AppIcon name="block" className="h-7 w-7" />
                </span>
                <div>
                  <span className="eyebrow">Son bloke saatler</span>
                  <h2 className="mt-4 font-display text-3xl text-espresso">Operasyon araları</h2>
                </div>
              </div>
              <Link href="/yonetim/uygunluk" className="soft-button-secondary">
                Yönet
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {blockedSlots.map((slot) => (
                <div key={slot.id} className="rounded-[24px] border border-white/70 bg-white/75 p-4">
                  <p className="font-medium text-espresso">{getStaffById(slot.staffId)?.name}</p>
                  <p className="mt-1 text-sm text-[#6f5c5e]">
                    {formatLongDate(slot.date)} • {slot.startTime} - {slot.endTime}
                  </p>
                  <p className="mt-2 text-sm text-[#8c7376]">{slot.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
