"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { appointmentStatusLabelMap, getAppointmentStatusTone } from "@/components/admin/status-pill";
import { AppointmentStatus } from "@/lib/types";
import { classNames } from "@/lib/utils";

type StatusSelectProps = {
  appointmentId: string;
  currentStatus: AppointmentStatus;
};

const options: AppointmentStatus[] = ["confirmed", "checked_in", "completed", "cancelled"];

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
      className={classNames(
        "rounded-full border px-4 py-2 text-sm font-medium transition disabled:opacity-70",
        getAppointmentStatusTone(value),
      )}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {appointmentStatusLabelMap[option]}
        </option>
      ))}
    </select>
  );
}
