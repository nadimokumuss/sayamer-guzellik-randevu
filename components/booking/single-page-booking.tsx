"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, startTransition, useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";

import { FloatingField } from "@/components/ui/floating-field";
import { AvailabilityResponse, BookingType, Catalog, StaffMember } from "@/lib/types";
import { formatCurrency, formatLongDate, getNextOpenDate, toIsoDate } from "@/lib/utils";
import { EMAIL_FORMAT_MESSAGE, PHONE_FORMAT_MESSAGE, isValidEmail, normalizePhone } from "@/lib/validation";

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

function StepHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-graphite text-[11px] font-bold text-white">
        {number}
      </span>
      <p className="font-display text-base font-extrabold tracking-tight text-graphite">{title}</p>
    </div>
  );
}

function Section({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
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
                    className={`mt-2 font-display text-sm font-extrabold tracking-tight leading-tight ${
                      isSelected ? "text-white" : "text-graphite"
                    }`}
                  >
                    {service.name}
                  </span>
                  <span
                    className={`mt-2 font-display text-base font-extrabold tabular-nums ${
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
                    className={`mt-2 font-display text-sm font-extrabold tracking-tight leading-tight ${
                      isSelected ? "text-white" : "text-graphite"
                    }`}
                  >
                    {pkg.name}
                  </span>
                  <span
                    className={`mt-2 font-display text-base font-extrabold tabular-nums ${
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
  selectedService: SelectedService;
  selectedStaffId: string | null;
  onSelect: (staff: StaffMember) => void;
}) {
  const eligibleStaff = useMemo(
    () =>
      catalog.staff.filter((s) => selectedService.staffIds.includes(s.id)),
    [catalog.staff, selectedService.staffIds],
  );

  return (
    <div className="rounded-[28px] border border-hairline bg-white p-6">
      <StepHeader number="2" title="Uzman Seçin" />
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
                className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-extrabold ${
                  isSelected ? "bg-white/20 text-white" : "bg-mocha/15 text-mocha"
                }`}
              >
                {initials}
              </span>
              <span
                className={`font-display text-sm font-extrabold tracking-tight ${
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
    </div>
  );
}

function CalendarSection({
  selectedService,
  selectedStaffId,
  onSelect,
}: {
  selectedService: SelectedService;
  selectedStaffId: string;
  onSelect: (slot: SelectedSlot) => void;
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
  const [loading, setLoading] = useState(true);
  const deferredDate = useDeferredValue(date);

  useEffect(() => {
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
  }, [selectedService.bookingType, selectedService.itemId, selectedStaffId, deferredDate]);

  const availableSlots = useMemo(
    () => data?.slots.filter((s) => s.available) ?? [],
    [data],
  );

  return (
    <div className="rounded-[28px] border border-hairline bg-white p-6">
      <StepHeader number="3" title="Tarih ve Saat Seçin" />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg font-extrabold tracking-tight text-graphite">
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
              {availableSlots.map((slot, idx) => (
                <motion.li
                  key={slot.startTime}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.02 }}
                >
                  <button
                    onClick={() => onSelect({ date: deferredDate, startTime: slot.startTime })}
                    className="group flex w-full flex-col items-start justify-center gap-0.5 rounded-2xl border border-hairline bg-white px-3 py-3 transition hover:-translate-y-0.5 hover:border-graphite hover:bg-graphite hover:text-white"
                  >
                    <span className="font-display text-lg font-extrabold tabular-nums leading-tight">
                      {slot.startTime}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ash transition group-hover:text-white/70">
                      {slot.label}
                    </span>
                  </button>
                </motion.li>
              ))}
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
            <p className="font-display text-base font-extrabold tracking-tight text-graphite">
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
    </div>
  );
}

function CustomerSection({
  selectedService,
  selectedStaffId,
  selectedSlot,
}: {
  selectedService: SelectedService;
  selectedStaffId: string;
  selectedSlot: SelectedSlot;
}) {
  const router = useRouter();
  const [isPending, startTrans] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const fd = new FormData(e.currentTarget);
    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const phoneRaw = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const note = String(fd.get("note") ?? "").trim();

    if (!firstName || !lastName || !phoneRaw) {
      setError("Ad, soyad ve telefon alanları zorunlu.");
      return;
    }

    const normalizedPhone = normalizePhone(phoneRaw);
    if (!normalizedPhone) { setError(PHONE_FORMAT_MESSAGE); return; }
    if (!isValidEmail(email)) { setError(EMAIL_FORMAT_MESSAGE); return; }

    const payload = {
      bookingType: selectedService.bookingType,
      itemId: selectedService.itemId,
      staffId: selectedStaffId,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      customer: { firstName, lastName, phone: normalizedPhone, email, note },
    };

    startTrans(() => {
      void (async () => {
        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await res.json() as { appointment?: { id: string }; error?: string };
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
    <div className="rounded-[28px] border border-hairline bg-white p-6">
      <StepHeader number="4" title="Bilgileriniz" />
      <p className="mb-6 text-sm leading-7 text-ash">
        Onay sonrası WhatsApp mesajı oluşturulur ve salon paneline randevu hemen düşer.
        Zorunlu alanlar: ad, soyad ve telefon.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <FloatingField label="Ad" name="firstName" autoComplete="given-name" />
          <FloatingField label="Soyad" name="lastName" autoComplete="family-name" />
          <FloatingField label="Telefon" name="phone" inputMode="numeric" maxLength={17} autoComplete="tel" />
          <FloatingField label="E-posta" name="email" type="email" autoComplete="email" />
        </div>
        <FloatingField multiline label="İsteğe bağlı not" name="note" />

        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-4 text-sm font-semibold text-white transition hover:bg-mocha disabled:opacity-70"
        >
          <span>{isPending ? "Oluşturuluyor…" : "Randevuyu Oluştur"}</span>
          {!isPending ? (
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-graphite">→</span>
          ) : (
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}

function SummaryCard({
  selectedService,
  selectedStaff,
  selectedSlot,
}: {
  selectedService: SelectedService | null;
  selectedStaff: StaffMember | null;
  selectedSlot: SelectedSlot | null;
}) {
  const rows = [
    {
      label: "Hizmet",
      value: selectedService ? selectedService.itemName : null,
      sub: selectedService ? formatCurrency(selectedService.price) : null,
    },
    {
      label: "Uzman",
      value: selectedStaff ? selectedStaff.name : null,
      sub: selectedStaff ? selectedStaff.title : null,
    },
    {
      label: "Tarih",
      value: selectedSlot ? formatLongDate(selectedSlot.date) : null,
      sub: selectedSlot ? selectedSlot.startTime : null,
    },
  ];

  return (
    <div className="rounded-[28px] border border-hairline bg-white p-6 lg:sticky lg:top-24">
      <p className="mb-5 font-display text-base font-extrabold tracking-tight text-graphite">
        Randevu Bilgileri
      </p>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-peachLight">
              <span className="text-[10px] font-bold text-mocha">{row.label[0]}</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ash">{row.label}</p>
              {row.value ? (
                <>
                  <p className="mt-0.5 text-sm font-semibold text-graphite">{row.value}</p>
                  {row.sub && <p className="text-xs text-ash">{row.sub}</p>}
                </>
              ) : (
                <p className="mt-0.5 text-sm text-ash/50">—</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="mt-6 border-t border-hairline pt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ash">Toplam</span>
            <span className="font-display text-xl font-extrabold tabular-nums text-graphite">
              {formatCurrency(selectedService.price)}
            </span>
          </div>
        </div>
      )}
    </div>
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
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      {/* Left: steps */}
      <div className="space-y-4">
        <ServiceSection
          catalog={catalog}
          selected={selectedService}
          onSelect={handleServiceSelect}
        />

        <Section visible={!!selectedService}>
          {selectedService && (
            <StaffSection
              catalog={catalog}
              selectedService={selectedService}
              selectedStaffId={selectedStaff?.id ?? null}
              onSelect={handleStaffSelect}
            />
          )}
        </Section>

        <Section visible={!!selectedStaff && !!selectedService}>
          {selectedStaff && selectedService && (
            <CalendarSection
              selectedService={selectedService}
              selectedStaffId={selectedStaff.id}
              onSelect={setSelectedSlot}
            />
          )}
        </Section>

        <Section visible={!!selectedSlot && !!selectedStaff && !!selectedService}>
          {selectedSlot && selectedStaff && selectedService && (
            <CustomerSection
              selectedService={selectedService}
              selectedStaffId={selectedStaff.id}
              selectedSlot={selectedSlot}
            />
          )}
        </Section>
      </div>

      {/* Right: summary */}
      <SummaryCard
        selectedService={selectedService}
        selectedStaff={selectedStaff}
        selectedSlot={selectedSlot}
      />
    </div>
  );
}
