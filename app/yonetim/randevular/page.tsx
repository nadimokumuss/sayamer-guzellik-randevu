import { StatusSelect } from "@/components/admin/status-select";
import { StatusPill } from "@/components/admin/status-pill";
import { PageIntro } from "@/components/ui/page-intro";
import { getStaffById } from "@/lib/catalog";
import { getAppointments } from "@/lib/store";
import { formatCurrency, formatLongDate, getInitials } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusOrder = ["confirmed", "checked_in", "completed", "cancelled"] as const;

export default function AdminAppointmentsPage() {
  const appointments = getAppointments();
  const groups = statusOrder.map((status) => ({
    status,
    items: appointments.filter((appointment) => appointment.status === status),
  }));

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Randevular"
        title="Durum ve müşteri yönetimi"
        copy="Tablo yoğunluğu azaltıldı; randevular statü grupları altında ayrı kartlara ayrıldı. Böylece ekip hangi blokta ne olduğunu tek bakışta ayırt eder."
        icon="bookmark"
        asideTitle="Kart bazlı çalışma düzeni"
        asideCopy="Her randevu müşteri, hizmet, uzman ve statüyü tek yüzeyde toplar. Güncelleme kontrolü kartın içinde kalır."
        stats={[
          { label: "Toplam kayıt", value: String(appointments.length) },
          { label: "Onaylandı", value: String(groups[0].items.length) },
          { label: "Geldi", value: String(groups[1].items.length) },
          { label: "Tamamlandı", value: String(groups[2].items.length) },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-2">
        {groups.map((group) => (
          <div key={group.status} className="glass-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <StatusPill status={group.status} />
                <p className="text-sm text-[#6f5c5e]">{group.items.length} kayıt</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {group.items.length ? (
                group.items.map((appointment) => (
                  <article
                    key={appointment.id}
                    className="rounded-[28px] border border-white/70 bg-[#fcf7f3] p-5"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <span className="icon-badge h-12 w-12 rounded-[18px] bg-white/80 font-display text-lg text-rosewood">
                            {getInitials(
                              `${appointment.customer.firstName} ${appointment.customer.lastName}`,
                            )}
                          </span>
                          <div>
                            <p className="font-display text-2xl text-espresso">
                              {appointment.customer.firstName} {appointment.customer.lastName}
                            </p>
                            <p className="mt-1 text-sm text-[#8c7376]">
                              {appointment.customer.phone}
                            </p>
                          </div>
                        </div>
                        <strong className="text-lg text-espresso">
                          {formatCurrency(appointment.price)}
                        </strong>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="metric-card">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">
                            Hizmet
                          </p>
                          <p className="mt-3 font-medium text-espresso">{appointment.itemName}</p>
                        </div>
                        <div className="metric-card">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">
                            Uzman
                          </p>
                          <p className="mt-3 font-medium text-espresso">
                            {getStaffById(appointment.staffId)?.name}
                          </p>
                        </div>
                        <div className="metric-card">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">
                            Tarih
                          </p>
                          <p className="mt-3 font-medium text-espresso">
                            {formatLongDate(appointment.date)}
                          </p>
                        </div>
                        <div className="metric-card">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">
                            Saat
                          </p>
                          <p className="mt-3 font-medium text-espresso">{appointment.startTime}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <StatusPill status={appointment.status} />
                        <StatusSelect
                          appointmentId={appointment.id}
                          currentStatus={appointment.status}
                        />
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-[24px] border border-dashed border-rosewood/20 bg-white/60 p-5 text-sm text-[#6f5c5e]">
                  Bu statüde kayıt bulunmuyor.
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
