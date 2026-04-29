"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { FloatingField } from "@/components/ui/floating-field";
import { Appointment, BookingType } from "@/lib/types";
import {
  EMAIL_FORMAT_MESSAGE,
  PHONE_FORMAT_MESSAGE,
  isValidEmail,
  normalizePhone,
} from "@/lib/validation";

type CustomerFormProps = {
  bookingType: BookingType;
  itemId: string;
  staffId: string;
  date: string;
  startTime: string;
};

export function CustomerForm({
  bookingType,
  itemId,
  staffId,
  date,
  startTime,
}: CustomerFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const phoneRaw = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const note = String(formData.get("note") || "").trim();

    if (!firstName || !lastName || !phoneRaw) {
      setError("Ad, soyad ve telefon alanları zorunlu.");
      return;
    }

    const normalizedPhone = normalizePhone(phoneRaw);
    if (!normalizedPhone) {
      setError(PHONE_FORMAT_MESSAGE);
      return;
    }

    if (!isValidEmail(email)) {
      setError(EMAIL_FORMAT_MESSAGE);
      return;
    }

    const payload = {
      bookingType,
      itemId,
      staffId,
      date,
      startTime,
      customer: { firstName, lastName, phone: normalizedPhone, email, note },
    };

    startTransition(() => {
      void (async () => {
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = (await response.json()) as { appointment?: Appointment; error?: string };
        if (!response.ok || !result.appointment) {
          setError(result.error || "Randevu oluşturulamadı.");
          return;
        }

        router.push(`/onay?id=${result.appointment.id}`);
        router.refresh();
      })();
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
          Bilgileriniz
        </p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-ash">
          Onay sonrası WhatsApp mesajı oluşturulur ve salon paneline randevu hemen düşer.
          Zorunlu alanlar: ad, soyad ve telefon.
        </p>
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <FloatingField label="Ad" name="firstName" autoComplete="given-name" />
        <FloatingField label="Soyad" name="lastName" autoComplete="family-name" />
        <FloatingField
          label="Telefon"
          name="phone"
          inputMode="numeric"
          maxLength={17}
          autoComplete="tel"
        />
        <FloatingField label="E-posta" name="email" type="email" autoComplete="email" />
      </div>

      <FloatingField multiline label="İsteğe bağlı not" name="note" />

      {error ? (
        <p
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <Magnetic>
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-4 text-sm font-semibold text-white transition hover:bg-mocha disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>{isPending ? "Randevu oluşturuluyor..." : "Randevuyu oluştur"}</span>
          {!isPending ? (
            <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white text-graphite transition group-hover:rotate-45">
              →
            </span>
          ) : (
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Magnetic>
    </form>
  );
}
