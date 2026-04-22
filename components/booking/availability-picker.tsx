"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";

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
    <div>
      <div className="flex flex-col gap-6 border-b border-hairline pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow-tag">Takvim</p>
          <p className="mt-3 font-display text-2xl text-graphite">
            {formatDayShort(date)}
          </p>
          <p className="mt-1 text-sm text-ash">
            {availableSlots.length} uygun seans
          </p>
        </div>

        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">
            Tarih
          </span>
          <input
            type="date"
            value={date}
            onChange={(event) => {
              const nextDate = event.target.value;
              startTransition(() => setDate(nextDate));
            }}
            className="form-line mt-2 min-w-[220px]"
          />
        </label>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="grid gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-20 animate-pulse bg-bone" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-clay">{error}</p>
        ) : availableSlots.length ? (
          <>
            <p className="eyebrow-tag">Uygun saatler</p>
            <ul className="mt-6 grid grid-cols-3 gap-px bg-hairline sm:grid-cols-4 lg:grid-cols-6">
              {availableSlots.map((slot) => (
                <li key={slot.startTime} className="bg-bone">
                  <Link
                    href={buildBookingHref("/bilgilerim", {
                      bookingType,
                      itemId,
                      staffId,
                      date: deferredDate,
                      startTime: slot.startTime,
                    })}
                    className="flex h-full flex-col items-start justify-center gap-1 px-4 py-5 transition hover:bg-graphite hover:text-bone"
                  >
                    <span className="font-display text-xl tabular-nums">
                      {slot.startTime}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] opacity-70">
                      {slot.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div>
            <p className="font-display text-xl text-graphite">
              Bu gün için uygun saat görünmüyor.
            </p>
            <p className="mt-2 text-sm leading-7 text-ash">
              Alternatif tarihlerden birini deneyin.
            </p>
          </div>
        )}

        {!loading && !error && data?.nextAvailableDates.length ? (
          <div className="mt-12 border-t border-hairline pt-8">
            <p className="eyebrow-tag">Sonraki uygun günler</p>
            <div className="mt-6 flex flex-wrap gap-6">
              {data.nextAvailableDates.map((nextDate) => (
                <button
                  key={nextDate}
                  type="button"
                  onClick={() => setDate(nextDate)}
                  className="link-underline"
                >
                  {formatDayShort(nextDate)}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
