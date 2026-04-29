import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { getStaffById } from "@/lib/catalog";
import { getAppointments } from "@/lib/store";
import { formatLongDate, getInitials } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminCalendarPage() {
  const appointments = [...getAppointments()].sort((left, right) => {
    const leftKey = `${left.date} ${left.startTime}`;
    const rightKey = `${right.date} ${right.startTime}`;
    return leftKey.localeCompare(rightKey, "tr");
  });

  const grouped = appointments.reduce<Record<string, typeof appointments>>((accumulator, entry) => {
    accumulator[entry.date] = accumulator[entry.date] || [];
    accumulator[entry.date].push(entry);
    return accumulator;
  }, {});

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Takvim"
        title="Gün bazlı plan görünümü"
        copy="Takvim ekranı her günün yükünü ayrı başlıkta gösterir; saat blokları kart bazlı ve statü renkleriyle desteklenir."
        stats={[
          { label: "Gün", value: String(Object.keys(grouped).length) },
          { label: "Toplam kayıt", value: String(appointments.length) },
          { label: "Görünüm", value: "Gün blokları" },
          { label: "Odak", value: "Saat akışı" },
        ]}
      />

      <div className="space-y-4">
        {Object.entries(grouped).map(([date, items]) => (
          <section key={date} className="rounded-[24px] border border-hairline bg-white p-6">
            <div className="flex items-center justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                  {items.length} randevu
                </p>
                <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-graphite lg:text-2xl">
                  {formatLongDate(date)}
                </h2>
              </div>
            </div>

            <ul className="mt-5 grid gap-3 xl:grid-cols-2">
              {items.map((appointment) => (
                <li
                  key={appointment.id}
                  className="rounded-2xl border border-hairline p-4 transition hover:border-graphite/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-graphite font-display text-sm font-extrabold text-white">
                        {getInitials(
                          `${appointment.customer.firstName} ${appointment.customer.lastName}`,
                        )}
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ash tabular-nums">
                          {appointment.startTime} - {appointment.endTime}
                        </p>
                        <p className="mt-1 font-display text-base font-extrabold tracking-tight text-graphite">
                          {appointment.itemName}
                        </p>
                      </div>
                    </div>
                    <StatusPill status={appointment.status} />
                  </div>
                  <p className="mt-3 text-xs text-ash">
                    {appointment.customer.firstName} {appointment.customer.lastName} ·{" "}
                    {getStaffById(appointment.staffId)?.name}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
