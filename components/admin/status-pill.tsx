import { AppointmentStatus } from "@/lib/types";
import { classNames } from "@/lib/utils";

export const appointmentStatusLabelMap: Record<AppointmentStatus, string> = {
  confirmed: "Onaylandı",
  checked_in: "Geldi",
  completed: "Tamamlandı",
  cancelled: "İptal",
};

const appointmentStatusToneMap: Record<AppointmentStatus, string> = {
  confirmed: "bg-graphite text-white",
  checked_in: "bg-peach text-mocha",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-700",
};

const appointmentStatusDotMap: Record<AppointmentStatus, string> = {
  confirmed: "bg-white",
  checked_in: "bg-mocha",
  completed: "bg-emerald-500",
  cancelled: "bg-rose-500",
};

export function getAppointmentStatusTone(status: AppointmentStatus) {
  return appointmentStatusToneMap[status];
}

export function StatusPill({ status, withDot = true }: { status: AppointmentStatus; withDot?: boolean }) {
  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-tight",
        appointmentStatusToneMap[status],
      )}
    >
      {withDot ? (
        <span aria-hidden className={classNames("h-1.5 w-1.5 rounded-full", appointmentStatusDotMap[status])} />
      ) : null}
      {appointmentStatusLabelMap[status]}
    </span>
  );
}
