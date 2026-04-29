import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { StatusSelect } from "@/components/admin/status-select";
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
      <AdminPageHeader
        eyebrow="Randevular"
        title="Durum ve müşteri yönetimi"
        copy="Randevular statü grupları altında ayrı kartlara ayrıldı; ekip hangi blokta ne olduğunu tek bakışta ayırt eder."
        stats={[
          { label: "Toplam kayıt", value: String(appointments.length) },
          { label: "Onaylandı", value: String(groups[0].items.length) },
          { label: "Geldi", value: String(groups[1].items.length) },
          { label: "Tamamlandı", value: String(groups[2].items.length) },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-2">
        {groups.map((group) => (
          <div key={group.status} className="rounded-[24px] border border-hairline bg-white p-6">
            <div className="flex items-center gap-3 border-b border-hairline pb-4">
              <StatusPill status={group.status} />
              <p className="text-xs text-ash">{group.items.length} kayıt</p>
            </div>

            <ul className="mt-5 space-y-3">
              {group.items.length ? (
                group.items.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="rounded-2xl border border-hairline bg-white p-4 transition hover:border-graphite/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-graphite font-display text-sm font-extrabold text-white">
                          {getInitials(
                            `${appointment.customer.firstName} ${appointment.customer.lastName}`,
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-base font-extrabold tracking-tight text-graphite">
                            {appointment.customer.firstName} {appointment.customer.lastName}
                          </p>
                          <p className="text-[11px] text-ash tabular-nums">
                            {appointment.customer.phone}
                          </p>
                        </div>
                      </div>
                      <p className="font-display text-base font-extrabold tabular-nums text-graphite">
                        {formatCurrency(appointment.price)}
                      </p>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <Field label="Hizmet" value={appointment.itemName} />
                      <Field label="Uzman" value={getStaffById(appointment.staffId)?.name ?? "—"} />
                      <Field label="Tarih" value={formatLongDate(appointment.date)} />
                      <Field label="Saat" value={appointment.startTime} />
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                        Durum
                      </span>
                      <StatusSelect
                        appointmentId={appointment.id}
                        currentStatus={appointment.status}
                      />
                    </div>
                  </li>
                ))
              ) : (
                <li className="rounded-2xl border border-dashed border-hairline bg-peachLight/20 p-5 text-sm text-ash">
                  Bu statüde kayıt bulunmuyor.
                </li>
              )}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-peachLight/40 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ash">{label}</p>
      <p className="mt-1 text-sm font-medium text-graphite">{value}</p>
    </div>
  );
}
