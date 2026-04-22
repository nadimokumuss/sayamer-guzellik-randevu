"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

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
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimer.current) clearTimeout(errorTimer.current);
    };
  }, []);

  function showError(message: string) {
    setError(message);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setError(null), 4000);
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <select
        value={value}
        onChange={(event) => {
          const previous = value;
          const nextValue = event.target.value as AppointmentStatus;
          setValue(nextValue);
          setError(null);
          startTransition(() => {
            void (async () => {
              try {
                const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: nextValue }),
                });
                if (!response.ok) {
                  setValue(previous);
                  const result = (await response.json().catch(() => ({}))) as { error?: string };
                  showError(result.error || "Durum güncellenemedi.");
                  return;
                }
                router.refresh();
              } catch {
                setValue(previous);
                showError("Durum güncellenemedi.");
              }
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
      {error ? (
        <span className="text-xs text-rosewood" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
