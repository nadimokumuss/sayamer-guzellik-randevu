"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";

import { AppIcon } from "@/components/ui/app-icon";
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
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="spotlight-panel">
          <div className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name="calendar" className="h-7 w-7" />
            </span>
            <div>
              <span className="eyebrow">Takvim</span>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-espresso">
                Tarih ve saat seçimi
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#6f5c5e]">
            Sistem 30 dakikalık ızgara üzerinde en uygun seansları gösterir. Dolu veya bloke
            saatler otomatik olarak dışarıda bırakılır.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="metric-card">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Seçili gün</p>
              <p className="mt-3 font-display text-3xl text-espresso">{formatDayShort(date)}</p>
            </div>
            <div className="metric-card">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">
                Uygun seans
              </p>
              <p className="mt-3 font-display text-3xl text-espresso">{availableSlots.length}</p>
            </div>
          </div>

          <label className="mt-6 block space-y-2">
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

        <div>
          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-[24px] border border-white/70 bg-white/70"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[24px] border border-rosewood/15 bg-[#fff4f4] p-5 text-sm text-rosewood">
              {error}
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
                      className="rounded-[26px] border border-white/70 bg-white/80 px-5 py-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:bg-white"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="icon-badge h-11 w-11 rounded-[18px] bg-[#f8efe9]">
                          <AppIcon name="clock" />
                        </span>
                        <span className="admin-chip">Boş</span>
                      </div>
                      <p className="mt-5 font-display text-3xl text-espresso">{slot.startTime}</p>
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
                <div className="mt-8 rounded-[26px] bg-[#fcf7f3] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
                    Sonraki uygun günler
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {data.nextAvailableDates.map((nextDate) => (
                      <button
                        key={nextDate}
                        type="button"
                        onClick={() => setDate(nextDate)}
                        className="soft-button-secondary"
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
      </div>
    </div>
  );
}
