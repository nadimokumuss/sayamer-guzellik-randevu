import { AppointmentStatus } from "@/lib/types";
import { classNames } from "@/lib/utils";

export const appointmentStatusLabelMap: Record<AppointmentStatus, string> = {
  confirmed: "Onaylandı",
  checked_in: "Geldi",
  completed: "Tamamlandı",
  cancelled: "İptal",
};

const appointmentStatusToneMap: Record<AppointmentStatus, string> = {
  confirmed: "border-[#eadfca] bg-[#fff7ea] text-[#7f5f2f]",
  checked_in: "border-[#d7eadf] bg-[#f3fbf6] text-[#476856]",
  completed: "border-[#dfe4ef] bg-[#f5f7fc] text-[#4f5d7a]",
  cancelled: "border-[#f0d7d7] bg-[#fff4f4] text-rosewood",
};

export function getAppointmentStatusTone(status: AppointmentStatus) {
  return appointmentStatusToneMap[status];
}

export function StatusPill({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        appointmentStatusToneMap[status],
      )}
    >
      {appointmentStatusLabelMap[status]}
    </span>
  );
}
