"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useDeferredValue, startTransition } from "react";

import { AvailabilityResponse, BookingType } from "@/lib/types";
import { buildBookingHref, formatDayShort } from "@/lib/utils";

type AvailabilityPickerProps = {
  bookingType: BookingType;
  itemId: string;
  staffId: string;
  initialDate: string;
};

export function AvailabilityPicker({
  bookingType,
  itemId,
  staffId,
  initialDate,
}: AvailabilityPickerProps) {
  const [date, setDate] = useState(initialDate);
  const [data, setData] = useState<AvailabilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const deferredDate = useDeferredValue(date);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(
      `/api/availability?bookingType=${bookingType}&itemId=${itemId}&staffId=${staffId}&date=${deferredDate}`,
      { signal: controller.signal },
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Uygunluk bilgisi alınamadı.");
        }
        const payload = (await response.json()) as AvailabilityResponse;
        setData(payload);
      })
      .catch((reason: Error) => {
        if (controller.signal.aborted) {
          return;
        }
        setError(reason.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [bookingType, itemId, staffId, deferredDate]);

  const availableSlots = useMemo(
    () => data?.slots.filter((slot) => slot.available) ?? [],
    [data],
  );

  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Takvim</span>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-espresso">
            Tarih ve saat seçimi
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[#6f5c5e]">
            Sistem 30 dakikalık ızgara üzerinde en uygun seansları gösterir. Dolu veya bloke
            saatler otomatik olarak dışarıda bırakılır.
          </p>
        </div>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
            Tarih
          </span>
          <input
            type="date"
            value={date}
            onChange={(event) => {
              const nextDate = event.target.value;
              startTransition(() => setDate(nextDate));
            }}
            className="field min-w-[220px]"
          />
        </label>
      </div>

      {loading ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-14 animate-pulse rounded-2xl border border-white/70 bg-white/70"
            />
          ))}
        </div>
      ) : error ? (
        <div className="mt-8 rounded-[24px] border border-rosewood/15 bg-[#fff4f4] p-5 text-sm text-rosewood">
          {error}
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {availableSlots.length ? (
              availableSlots.map((slot) => (
                <Link
                  key={slot.startTime}
                  href={buildBookingHref("/bilgilerim", {
                    bookingType,
                    itemId,
                    staffId,
                    date: deferredDate,
                    startTime: slot.startTime,
                  })}
                  className="rounded-[24px] border border-white/70 bg-white/75 px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:bg-white"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c7376]">
                    {slot.startTime}
                  </p>
                  <p className="mt-2 text-sm text-[#5d494b]">{slot.label}</p>
                </Link>
              ))
            ) : (
              <div className="col-span-full rounded-[24px] border border-dashed border-rosewood/20 bg-white/60 p-6">
                <p className="font-medium text-espresso">Bu gün için uygun saat görünmüyor.</p>
                <p className="mt-2 text-sm leading-7 text-[#6f5c5e]">
                  Alternatif tarihlerden birini seçebilir veya panel tarafında bloke saatleri
                  güncelleyebilirsin.
                </p>
              </div>
            )}
          </div>

          {data?.nextAvailableDates.length ? (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
                Sonraki uygun günler
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {data.nextAvailableDates.map((nextDate) => (
                  <button
                    key={nextDate}
                    type="button"
                    onClick={() => setDate(nextDate)}
                    className="rounded-full border border-rosewood/15 bg-white/80 px-4 py-2 text-sm text-[#5d494b] transition hover:bg-white"
                  >
                    {formatDayShort(nextDate)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
