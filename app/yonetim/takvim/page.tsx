import { StatusPill } from "@/components/admin/status-pill";
import { PageIntro } from "@/components/ui/page-intro";
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
      <PageIntro
        eyebrow="Takvim"
        title="Gün bazlı plan görünümü"
        copy="Takvim ekranı, her günün yükünü ayrı başlıkta gösterir. Saat blokları artık kart bazlı ve statü renkleriyle desteklenir."
        stats={[
          { label: "Gün", value: String(Object.keys(grouped).length) },
          { label: "Toplam kayıt", value: String(appointments.length) },
          { label: "Görünüm", value: "Gün blokları" },
          { label: "Odak", value: "Saat akışı" },
        ]}
      />

      <div className="space-y-5">
        {Object.entries(grouped).map(([date, items]) => (
          <section key={date} className="glass-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
                  {items.length} randevu
                </p>
                <h2 className="mt-2 font-display text-3xl text-espresso">{formatLongDate(date)}</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {items.map((appointment) => (
                <article key={appointment.id} className="rounded-[28px] bg-[#fcf7f3] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <span className="icon-badge h-12 w-12 rounded-[18px] bg-white/80 font-display text-lg text-rosewood">
                        {getInitials(
                          `${appointment.customer.firstName} ${appointment.customer.lastName}`,
                        )}
                      </span>
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-[#8c7376]">
                          {appointment.startTime} - {appointment.endTime}
                        </p>
                        <h3 className="mt-2 font-display text-2xl text-espresso">
                          {appointment.itemName}
                        </h3>
                      </div>
                    </div>
                    <StatusPill status={appointment.status} />
                  </div>
                  <p className="mt-4 text-sm text-[#6f5c5e]">
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
