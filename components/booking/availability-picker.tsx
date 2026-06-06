"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
      {/* Date selector header */}
      <div className="flex flex-col gap-6 border-b border-hairline pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
            Takvim
          </p>
          <motion.p
            key={date}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-2xl font-extrabold tracking-tight text-graphite lg:text-3xl"
          >
            {formatDayShort(date)}
          </motion.p>
          <p className="mt-1 text-sm tabular-nums text-ash">
            {loading ? "Hesaplanıyor…" : `${availableSlots.length} uygun seans`}
          </p>
        </div>

        <label className="relative block">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-ash">
            Tarih seç
          </span>
          <input
            type="date"
            value={date}
            onChange={(event) => {
              const nextDate = event.target.value;
              startTransition(() => setDate(nextDate));
            }}
            className="mt-2 block w-full min-w-0 rounded-full border border-hairline bg-white px-4 py-2.5 text-sm font-semibold text-graphite transition focus:border-graphite focus:outline-none focus:ring-2 focus:ring-graphite/15"
          />
        </label>
      </div>

      {/* Slots */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[78px] animate-pulse rounded-2xl bg-peachLight/60"
                />
              ))}
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {error}
            </motion.div>
          ) : availableSlots.length ? (
            <motion.div key="slots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                Uygun saatler
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                {availableSlots.map((slot, idx) => (
                  <motion.li
                    key={slot.startTime}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.025, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={buildBookingHref("/bilgilerim", {
                        bookingType,
                        itemId,
                        staffId,
                        date: deferredDate,
                        startTime: slot.startTime,
                      })}
                      className="group flex h-full flex-col items-start justify-center gap-1 rounded-2xl border border-hairline bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:border-graphite hover:bg-graphite hover:text-white"
                    >
                      <span className="font-display text-xl font-extrabold tabular-nums">
                        {slot.startTime}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash transition group-hover:text-white/70">
                        {slot.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-[28px] bg-peachLight p-6"
            >
              <p className="font-display text-xl font-extrabold tracking-tight text-graphite">
                Bu gün için uygun saat görünmüyor.
              </p>
              <p className="mt-2 text-sm leading-7 text-graphite/75">
                Aşağıdaki alternatif tarihlerden birini deneyin.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !error && data?.nextAvailableDates.length ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 border-t border-hairline pt-8"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
              Sonraki uygun günler
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {data.nextAvailableDates.map((nextDate) => (
                <button
                  key={nextDate}
                  type="button"
                  onClick={() => setDate(nextDate)}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-[12px] font-semibold tracking-tight text-graphite transition hover:border-graphite/30 hover:bg-peachLight/40"
                >
                  <span>{formatDayShort(nextDate)}</span>
                  <span aria-hidden className="text-rosewood">↗</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
