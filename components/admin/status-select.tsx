"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { AppointmentStatus } from "@/lib/types";

type StatusSelectProps = {
  appointmentId: string;
  currentStatus: AppointmentStatus;
};

const options: AppointmentStatus[] = ["confirmed", "checked_in", "completed", "cancelled"];

const labelMap: Record<AppointmentStatus, string> = {
  confirmed: "Onaylandı",
  checked_in: "Geldi",
  completed: "Tamamlandı",
  cancelled: "İptal",
};

export function StatusSelect({ appointmentId, currentStatus }: StatusSelectProps) {
  const router = useRouter();
  const [value, setValue] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={value}
      onChange={(event) => {
        const nextValue = event.target.value as AppointmentStatus;
        setValue(nextValue);
        startTransition(() => {
          void (async () => {
            await fetch(`/api/admin/appointments/${appointmentId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: nextValue }),
            });
            router.refresh();
          })();
        });
      }}
      disabled={isPending}
      className="rounded-full border border-rosewood/15 bg-white/80 px-4 py-2 text-sm text-espresso"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {labelMap[option]}
        </option>
      ))}
    </select>
  );
}
