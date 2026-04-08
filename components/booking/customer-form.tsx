"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { Appointment, BookingType } from "@/lib/types";

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
    const payload = {
      bookingType,
      itemId,
      staffId,
      date,
      startTime,
      customer: {
        firstName: String(formData.get("firstName") || "").trim(),
        lastName: String(formData.get("lastName") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        note: String(formData.get("note") || "").trim(),
      },
    };

    if (!payload.customer.firstName || !payload.customer.lastName || !payload.customer.phone) {
      setError("Ad, soyad ve telefon alanları zorunlu.");
      return;
    }

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
    <form onSubmit={handleSubmit} className="glass-card space-y-5 p-6 sm:p-8">
      <div>
        <span className="eyebrow">Bilgileriniz</span>
        <h2 className="mt-4 font-display text-3xl tracking-tight text-espresso">
          Randevunu tamamla
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[#6f5c5e]">
          Onay sonrası demo WhatsApp mesajı oluşturulur ve salon paneline randevu hemen düşer.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="firstName" placeholder="Ad" className="field" />
        <input name="lastName" placeholder="Soyad" className="field" />
        <input name="phone" placeholder="Telefon" className="field" />
        <input name="email" placeholder="E-posta" type="email" className="field" />
      </div>
      <textarea
        name="note"
        placeholder="İsteğe bağlı not"
        className="field min-h-[132px] resize-none"
      />

      {error ? (
        <div className="rounded-[20px] border border-rosewood/15 bg-[#fff4f4] px-4 py-3 text-sm text-rosewood">
          {error}
        </div>
      ) : null}

      <button type="submit" disabled={isPending} className="soft-button w-full disabled:opacity-70">
        {isPending ? "Randevu oluşturuluyor..." : "Randevuyu Oluştur"}
      </button>
    </form>
  );
}
