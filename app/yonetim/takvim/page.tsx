import { getAppointments } from "@/lib/store";
import { getStaffById } from "@/lib/catalog";
import { formatLongDate } from "@/lib/utils";

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
      <section className="glass-card p-8">
        <span className="eyebrow">Takvim</span>
        <h1 className="mt-5 font-display text-5xl tracking-tight text-espresso">
          Gün bazlı plan görünümü
        </h1>
      </section>

      <div className="space-y-5">
        {Object.entries(grouped).map(([date, items]) => (
          <section key={date} className="glass-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
                  {items.length} randevu
                </p>
                <h2 className="mt-2 font-display text-3xl text-espresso">
                  {formatLongDate(date)}
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {items.map((appointment) => (
                <article key={appointment.id} className="rounded-[24px] bg-[#fcf7f3] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="admin-chip">{appointment.startTime} - {appointment.endTime}</span>
                    <span className="admin-chip">{appointment.status}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-espresso">{appointment.itemName}</h3>
                  <p className="mt-2 text-sm text-[#6f5c5e]">
                    {appointment.customer.firstName} {appointment.customer.lastName}
                  </p>
                  <p className="mt-1 text-sm text-[#8c7376]">
                    {getStaffById(appointment.staffId)?.name}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
