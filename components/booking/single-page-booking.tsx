"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, startTransition, useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";

import { AvailabilityResponse, BookingType, Catalog, StaffMember } from "@/lib/types";
import { formatCurrency, formatLongDate, toIsoDate } from "@/lib/utils";
import { PHONE_FORMAT_MESSAGE, normalizePhone } from "@/lib/validation";

type SelectedService = {
  bookingType: BookingType;
  itemId: string;
  itemName: string;
  price: number;
  durationMinutes: number;
  staffIds: string[];
};

type SelectedSlot = {
  date: string;
  startTime: string;
};

type PaymentMethod = "card" | "transfer" | "onsite";

function StepHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-graphite text-[11px] font-bold text-white">
        {number}
      </span>
      <p className="font-display text-base font-semibold tracking-tight text-graphite">{title}</p>
    </div>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-peachLight px-4 py-5 text-sm text-graphite/70">
      {children}
    </div>
  );
}

function ServiceSection({
  catalog,
  selected,
  onSelect,
}: {
  catalog: Catalog;
  selected: SelectedService | null;
  onSelect: (s: SelectedService) => void;
}) {
  const [tab, setTab] = useState<"service" | "package">("service");

  return (
    <div className="rounded-[28px] border border-hairline bg-white p-6">
      <StepHeader number="1" title="Hizmet Seçin" />

      <div className="mb-5 flex gap-2">
        {(["service", "package"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
              tab === t
                ? "bg-graphite text-white"
                : "border border-hairline bg-white text-ash hover:border-graphite/30"
            }`}
          >
            {t === "service" ? "Hizmetler" : "Paketler"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tab === "service"
          ? catalog.services.map((service) => {
              const isSelected =
                selected?.bookingType === "service" && selected.itemId === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() =>
                    onSelect({
                      bookingType: "service",
                      itemId: service.id,
                      itemName: service.name,
                      price: service.price,
                      durationMinutes: service.durationMinutes,
                      staffIds: service.staffIds,
                    })
                  }
                  className={`flex flex-col rounded-2xl p-4 text-left transition hover:-translate-y-0.5 ${
                    isSelected
                      ? "bg-graphite text-white"
                      : "bg-peachLight hover:bg-peach"
                  }`}
                >
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                      isSelected ? "text-white/70" : "text-mocha"
                    }`}
                  >
                    {service.durationMinutes} dk
                  </span>
                  <span
                    className={`mt-2 font-display text-sm font-normal tracking-tight leading-tight ${
                      isSelected ? "text-white" : "text-graphite"
                    }`}
                  >
                    {service.name}
                  </span>
                  <span
                    className={`mt-2 font-display text-base font-semibold tabular-nums ${
                      isSelected ? "text-white" : "text-graphite"
                    }`}
                  >
                    {formatCurrency(service.price)}
                  </span>
                </button>
              );
            })
          : catalog.packages.map((pkg) => {
              const isSelected =
                selected?.bookingType === "package" && selected.itemId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() =>
                    onSelect({
                      bookingType: "package",
                      itemId: pkg.id,
                      itemName: pkg.name,
                      price: pkg.price,
                      durationMinutes: pkg.durationMinutes,
                      staffIds: pkg.staffIds,
                    })
                  }
                  className={`flex flex-col rounded-2xl p-4 text-left transition hover:-translate-y-0.5 ${
                    isSelected
                      ? "bg-graphite text-white"
                      : "border border-hairline bg-white hover:border-graphite/25 hover:shadow-subtle"
                  }`}
                >
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                      isSelected ? "text-white/70" : "text-mocha"
                    }`}
                  >
                    {pkg.durationMinutes} dk · {pkg.savingsLabel}
                  </span>
                  <span
                    className={`mt-2 font-display text-sm font-normal tracking-tight leading-tight ${
                      isSelected ? "text-white" : "text-graphite"
                    }`}
                  >
                    {pkg.name}
                  </span>
                  <span
                    className={`mt-2 font-display text-base font-semibold tabular-nums ${
                      isSelected ? "text-white" : "text-graphite"
                    }`}
                  >
                    {formatCurrency(pkg.price)}
                  </span>
                </button>
              );
            })}
      </div>
    </div>
  );
}

function StaffSection({
  catalog,
  selectedService,
  selectedStaffId,
  onSelect,
}: {
  catalog: Catalog;
  selectedService: SelectedService | null;
  selectedStaffId: string | null;
  onSelect: (staff: StaffMember) => void;
}) {
  const eligibleStaff = useMemo(
    () =>
      selectedService
        ? catalog.staff.filter((s) => selectedService.staffIds.includes(s.id))
        : [],
    [catalog.staff, selectedService],
  );

  return (
    <div className="rounded-[28px] border border-hairline bg-white p-6">
      <StepHeader number="2" title="Uzman Seçin" />
      {selectedService ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {eligibleStaff.map((staff) => {
            const isSelected = selectedStaffId === staff.id;
            const initials = staff.name
              .split(" ")
              .slice(0, 2)
              .map((p) => p[0])
              .join("");
            return (
              <button
                key={staff.id}
                onClick={() => onSelect(staff)}
                className={`flex flex-col items-center gap-2 rounded-2xl p-4 text-center transition hover:-translate-y-0.5 ${
                  isSelected
                    ? "bg-graphite text-white"
                    : "bg-peachLight hover:bg-peach"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold ${
                    isSelected ? "bg-white/20 text-white" : "bg-mocha/15 text-mocha"
                  }`}
                >
                  {initials}
                </span>
                <span
                  className={`font-display text-sm font-semibold tracking-tight ${
                    isSelected ? "text-white" : "text-graphite"
                  }`}
                >
                  {staff.name}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                    isSelected ? "text-white/70" : "text-ash"
                  }`}
                >
                  {staff.title}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <EmptyHint>Önce yukarıdan bir hizmet seçin.</EmptyHint>
      )}
    </div>
  );
}

function CalendarSection({
  selectedService,
  selectedStaffId,
  onSelect,
  selectedSlot,
}: {
  selectedService: SelectedService | null;
  selectedStaffId: string | null;
  onSelect: (slot: SelectedSlot) => void;
  selectedSlot: SelectedSlot | null;
}) {
  const initialDate = useMemo(() => {
    const today = new Date();
    const candidate = new Date(today);
    while (candidate.getDay() === 0) {
      candidate.setDate(candidate.getDate() + 1);
    }
    return toIsoDate(candidate);
  }, []);

  const [date, setDate] = useState(initialDate);
  const [data, setData] = useState<AvailabilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const deferredDate = useDeferredValue(date);

  const ready = !!selectedService && !!selectedStaffId;

  useEffect(() => {
    if (!ready) {
      setData(null);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(
      `/api/availability?bookingType=${selectedService.bookingType}&itemId=${selectedService.itemId}&staffId=${selectedStaffId}&date=${deferredDate}`,
      { signal: controller.signal },
    )
      .then(async (r) => {
        if (!r.ok) throw new Error("Uygunluk bilgisi alınamadı.");
        const payload = (await r.json()) as AvailabilityResponse;
        setData(payload);
      })
      .catch((err: Error) => {
        if (!controller.signal.aborted) setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [ready, selectedService, selectedStaffId, deferredDate]);

  const availableSlots = useMemo(
    () => data?.slots.filter((s) => s.available) ?? [],
    [data],
  );

  return (
    <div className="rounded-[28px] border border-hairline bg-white p-6">
      <StepHeader number="3" title="Tarih ve Saat Seçin" />

      {!ready ? (
        <EmptyHint>Hizmet ve uzman seçimini tamamlayın, uygun saatler burada görünecek.</EmptyHint>
      ) : (
        <>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-lg font-semibold tracking-tight text-graphite">
              {loading ? "Yükleniyor…" : `${availableSlots.length} uygun seans`}
            </p>
            <label className="relative block">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ash mb-1">
                Tarih seç
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  const v = e.target.value;
                  startTransition(() => setDate(v));
                }}
                className="block w-full min-w-[200px] rounded-full border border-hairline bg-white px-4 py-2 text-sm font-semibold text-graphite transition focus:border-graphite focus:outline-none focus:ring-2 focus:ring-graphite/15"
              />
            </label>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-3 gap-2 sm:grid-cols-4"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-[60px] animate-pulse rounded-2xl bg-peachLight/60" />
                ))}
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                {error}
              </motion.div>
            ) : availableSlots.length ? (
              <motion.div
                key="slots"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {availableSlots.map((slot, idx) => {
                    const isSelected =
                      selectedSlot?.date === deferredDate &&
                      selectedSlot?.startTime === slot.startTime;
                    return (
                      <motion.li
                        key={slot.startTime}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.02 }}
                      >
                        <button
                          onClick={() => onSelect({ date: deferredDate, startTime: slot.startTime })}
                          className={`group flex w-full flex-col items-start justify-center gap-0.5 rounded-2xl border px-3 py-3 transition hover:-translate-y-0.5 ${
                            isSelected
                              ? "border-graphite bg-graphite text-white"
                              : "border-hairline bg-white hover:border-graphite hover:bg-graphite hover:text-white"
                          }`}
                        >
                          <span className="font-display text-lg font-semibold tabular-nums leading-tight">
                            {slot.startTime}
                          </span>
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-[0.14em] transition ${
                              isSelected ? "text-white/70" : "text-ash group-hover:text-white/70"
                            }`}
                          >
                            {slot.label}
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl bg-peachLight p-5"
              >
                <p className="font-display text-base font-semibold tracking-tight text-graphite">
                  Bu gün için uygun saat yok.
                </p>
                <p className="mt-1 text-sm text-graphite/70">Aşağıdan başka bir tarih seçin.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && !error && data?.nextAvailableDates.length ? (
            <div className="mt-6 border-t border-hairline pt-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-rosewood">
                Sonraki uygun günler
              </p>
              <div className="flex flex-wrap gap-2">
                {data.nextAvailableDates.map((d) => (
                  <button
                    key={d}
                    onClick={() => startTransition(() => setDate(d))}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5 text-[11px] font-semibold tracking-tight text-graphite transition hover:border-graphite/30 hover:bg-peachLight/40"
                  >
                    {formatLongDate(d)}
                    <span className="text-rosewood">↗</span>
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

function PillField({
  icon,
  ...rest
}: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ash">
        {icon}
      </span>
      <input
        {...rest}
        className="block w-full rounded-full border border-hairline bg-white px-4 py-3 pl-11 text-sm text-graphite transition placeholder:text-ash/70 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
      />
    </label>
  );
}

function PillTextarea({
  icon,
  ...rest
}: { icon: React.ReactNode } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-4 top-4 text-ash">{icon}</span>
      <textarea
        {...rest}
        className="block min-h-[88px] w-full resize-none rounded-2xl border border-hairline bg-white px-4 py-3 pl-11 text-sm text-graphite transition placeholder:text-ash/70 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
      />
    </label>
  );
}

function PaymentOption({
  value,
  current,
  onChange,
  title,
  description,
}: {
  value: PaymentMethod;
  current: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
  title: string;
  description: string;
}) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
        active
          ? "border-violet-500 bg-violet-50/60"
          : "border-hairline bg-white hover:border-violet-300"
      }`}
    >
      <span
        className={`mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition ${
          active ? "border-violet-600" : "border-ash/40"
        }`}
      >
        {active && <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />}
      </span>
      <span className="flex flex-col">
        <span className="font-display text-sm font-semibold tracking-tight text-graphite">
          {title}
        </span>
        <span className="text-[11px] text-ash">{description}</span>
      </span>
    </button>
  );
}

function BookingSidebar({
  selectedService,
  selectedStaff,
  selectedSlot,
}: {
  selectedService: SelectedService | null;
  selectedStaff: StaffMember | null;
  selectedSlot: SelectedSlot | null;
}) {
  const router = useRouter();
  const [isPending, startTrans] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentMethod>("card");

  const todayLong = useMemo(() => formatLongDate(toIsoDate(new Date())), []);

  const canSubmit = !!selectedService && !!selectedStaff && !!selectedSlot && !isPending;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!selectedService || !selectedStaff || !selectedSlot) {
      setError("Lütfen hizmet, uzman ve saat seçimini tamamlayın.");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get("fullName") ?? "").trim().replace(/\s+/g, " ");
    const phoneRaw = String(fd.get("phone") ?? "").trim();
    const note = String(fd.get("note") ?? "").trim();

    if (!fullName) {
      setError("Lütfen ad ve soyadınızı girin.");
      return;
    }
    const parts = fullName.split(" ");
    if (parts.length < 2) {
      setError("Lütfen hem adınızı hem soyadınızı girin.");
      return;
    }
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    if (!phoneRaw) {
      setError("Telefon alanı zorunlu.");
      return;
    }
    const normalizedPhone = normalizePhone(phoneRaw);
    if (!normalizedPhone) {
      setError(PHONE_FORMAT_MESSAGE);
      return;
    }

    const payload = {
      bookingType: selectedService.bookingType,
      itemId: selectedService.itemId,
      staffId: selectedStaff.id,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      customer: { firstName, lastName, phone: normalizedPhone, email: "", note },
    };

    startTrans(() => {
      void (async () => {
        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = (await res.json()) as { appointment?: { id: string }; error?: string };
        if (!res.ok || !result.appointment) {
          setError(result.error ?? "Randevu oluşturulamadı.");
          return;
        }
        router.push(`/onay?id=${result.appointment.id}`);
        router.refresh();
      })();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[28px] border border-hairline bg-white p-6 lg:sticky lg:top-24"
    >
      <p className="mb-5 font-display text-base font-semibold tracking-tight text-graphite">
        Randevu Bilgileri
      </p>

      <div className="space-y-3">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ash">
            Ad Soyad
          </p>
          <PillField
            name="fullName"
            autoComplete="name"
            placeholder="Ad Soyad"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ash">
            Telefon
          </p>
          <PillField
            name="phone"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={17}
            placeholder="5XX XXX XX XX"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
            }
          />
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ash">
            Not
          </p>
          <PillTextarea
            name="note"
            placeholder="İsteğe bağlı not"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            }
          />
        </div>
      </div>

      <p className="mt-8 mb-4 font-display text-base font-semibold tracking-tight text-graphite">
        Randevu Özeti
      </p>

      <div className="flex items-center gap-3 rounded-2xl border border-hairline bg-white px-3 py-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-peach text-mocha">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-semibold tracking-tight text-graphite">
            {selectedService ? selectedService.itemName : "Henüz hizmet seçilmedi"}
          </p>
          <p className="text-[11px] text-ash">
            {selectedService ? `${selectedService.durationMinutes} dakika` : "—"}
          </p>
        </div>
        <span className="font-display text-sm font-semibold tabular-nums text-graphite">
          {selectedService ? formatCurrency(selectedService.price) : "—"}
        </span>
      </div>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-ash">Uzman</dt>
          <dd className="font-semibold text-graphite">
            {selectedStaff ? selectedStaff.name : "Fark etmez"}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ash">Tarih</dt>
          <dd className="font-semibold text-graphite">
            {selectedSlot ? formatLongDate(selectedSlot.date) : todayLong}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ash">Saat</dt>
          <dd className="font-semibold text-graphite">
            {selectedSlot ? selectedSlot.startTime : "Seçilmedi"}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between border-t border-hairline pt-4">
        <span className="font-display text-lg font-semibold tracking-tight text-graphite">
          Toplam
        </span>
        <span className="font-display text-xl font-semibold tabular-nums text-graphite">
          {selectedService ? formatCurrency(selectedService.price) : formatCurrency(0)}
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3">
        <p className="font-display text-sm font-semibold tracking-tight text-violet-900">
          Güvenli Ödeme
        </p>
        <p className="mt-0.5 text-[11px] text-violet-900/70">
          Ödemeniz güvenli bağlantı ile korunur.
        </p>
      </div>

      <p className="mt-6 mb-3 font-display text-sm font-semibold tracking-tight text-graphite">
        Ödeme Yöntemi
      </p>
      <div className="space-y-2">
        <PaymentOption
          value="card"
          current={payment}
          onChange={setPayment}
          title="Kart ile Öde"
          description="Kredi kartı ile güvenli ödeme"
        />
        <PaymentOption
          value="transfer"
          current={payment}
          onChange={setPayment}
          title="Havale / EFT"
          description="Ödeme sonrası randevunuz onaylanır"
        />
        <PaymentOption
          value="onsite"
          current={payment}
          onChange={setPayment}
          title="Salonda Öde"
          description="Randevu sırasında ödeme yap"
        />
      </div>

      {error && (
        <p
          className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition ${
          canSubmit
            ? "bg-violet-700 hover:bg-violet-800"
            : "cursor-not-allowed bg-violet-700/60"
        }`}
      >
        {isPending ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span>Oluşturuluyor…</span>
          </>
        ) : (
          <span>Randevuyu Oluştur</span>
        )}
      </button>
    </form>
  );
}

export function SinglePageBooking({ catalog }: { catalog: Catalog }) {
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);

  function handleServiceSelect(service: SelectedService) {
    setSelectedService(service);
    setSelectedStaff(null);
    setSelectedSlot(null);
  }

  function handleStaffSelect(staff: StaffMember) {
    setSelectedStaff(staff);
    setSelectedSlot(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      {/* Left: steps */}
      <div className="space-y-4">
        <ServiceSection
          catalog={catalog}
          selected={selectedService}
          onSelect={handleServiceSelect}
        />

        <StaffSection
          catalog={catalog}
          selectedService={selectedService}
          selectedStaffId={selectedStaff?.id ?? null}
          onSelect={handleStaffSelect}
        />

        <CalendarSection
          selectedService={selectedService}
          selectedStaffId={selectedStaff?.id ?? null}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
        />
      </div>

      {/* Right: sidebar */}
      <BookingSidebar
        selectedService={selectedService}
        selectedStaff={selectedStaff}
        selectedSlot={selectedSlot}
      />
    </div>
  );
}
