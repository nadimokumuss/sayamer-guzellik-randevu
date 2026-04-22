"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

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
      customer: {
        firstName,
        lastName,
        phone: normalizedPhone,
        email,
        note,
      },
    };

    startTransition(() => {
      void (async () => {
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        <p className="eyebrow-tag">Bilgileriniz</p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-ash">
          Onay sonrası demo WhatsApp mesajı oluşturulur ve salon paneline randevu hemen
          düşer. Zorunlu alanlar: ad, soyad ve telefon.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">Ad</span>
          <input name="firstName" placeholder="Ad" className="form-line mt-3" />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">Soyad</span>
          <input name="lastName" placeholder="Soyad" className="form-line mt-3" />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">Telefon</span>
          <input
            name="phone"
            placeholder="05XX XXX XX XX"
            inputMode="numeric"
            maxLength={17}
            autoComplete="tel"
            className="form-line mt-3"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">E-posta</span>
          <input
            name="email"
            placeholder="E-posta"
            type="email"
            autoComplete="email"
            className="form-line mt-3"
          />
        </label>
      </div>

      <label className="block">
        <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">
          İsteğe bağlı not
        </span>
        <textarea
          name="note"
          placeholder="Sessiz oda, hassasiyet, kısa notlar..."
          className="form-line mt-3 min-h-[120px] resize-none"
        />
      </label>

      {error ? (
        <p className="text-sm text-clay" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={isPending} className="btn-minimal-solid disabled:opacity-70">
        {isPending ? "Randevu oluşturuluyor..." : "Randevuyu oluştur"}
      </button>
    </form>
  );
}
