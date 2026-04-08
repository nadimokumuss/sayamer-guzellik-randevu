import { StatusSelect } from "@/components/admin/status-select";
import { getStaffById } from "@/lib/catalog";
import { getAppointments } from "@/lib/store";
import { formatCurrency, formatLongDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminAppointmentsPage() {
  const appointments = getAppointments();

  return (
    <div className="space-y-6">
      <section className="glass-card p-8">
        <span className="eyebrow">Randevular</span>
        <h1 className="mt-5 font-display text-5xl tracking-tight text-espresso">
          Durum ve müşteri yönetimi
        </h1>
      </section>

      <section className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#fcf7f3] text-xs uppercase tracking-[0.22em] text-[#8c7376]">
              <tr>
                <th className="px-6 py-4">Müşteri</th>
                <th className="px-6 py-4">Hizmet</th>
                <th className="px-6 py-4">Uzman</th>
                <th className="px-6 py-4">Tarih</th>
                <th className="px-6 py-4">Tutar</th>
                <th className="px-6 py-4">Durum</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-t border-[#f0e7df] text-sm text-[#5d494b]">
                  <td className="px-6 py-5">
                    <p className="font-medium text-espresso">
                      {appointment.customer.firstName} {appointment.customer.lastName}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8c7376]">
                      {appointment.customer.phone}
                    </p>
                  </td>
                  <td className="px-6 py-5">{appointment.itemName}</td>
                  <td className="px-6 py-5">{getStaffById(appointment.staffId)?.name}</td>
                  <td className="px-6 py-5">
                    {formatLongDate(appointment.date)} • {appointment.startTime}
                  </td>
                  <td className="px-6 py-5">{formatCurrency(appointment.price)}</td>
                  <td className="px-6 py-5">
                    <StatusSelect
                      appointmentId={appointment.id}
                      currentStatus={appointment.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
