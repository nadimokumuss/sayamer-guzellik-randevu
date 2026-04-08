"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { AppIcon } from "@/components/ui/app-icon";
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
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name="shield" className="h-7 w-7" />
            </span>
            <div>
              <span className="eyebrow">Bilgileriniz</span>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-espresso">
                Randevunu tamamla
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6f5c5e]">
            Onay sonrası demo WhatsApp mesajı oluşturulur ve salon paneline randevu hemen düşer.
          </p>
        </div>

        <div className="spotlight-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
            Bu adımda
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { icon: "phone", title: "İletişim", copy: "Doğrulama için telefon alınır." },
              { icon: "message", title: "Not", copy: "Opsiyonel müşteri notu eklenir." },
              { icon: "check", title: "Onay", copy: "Kayıt panelde anında görünür." },
            ].map((item) => (
              <div key={item.title} className="metric-card">
                <span className="icon-badge h-10 w-10 rounded-[16px]">
                  <AppIcon name={item.icon as "phone" | "message" | "check"} />
                </span>
                <p className="mt-4 font-medium text-espresso">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#6f5c5e]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
            Ad
          </span>
          <input name="firstName" placeholder="Ad" className="field" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
            Soyad
          </span>
          <input name="lastName" placeholder="Soyad" className="field" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
            Telefon
          </span>
          <input name="phone" placeholder="Telefon" className="field" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
            E-posta
          </span>
          <input name="email" placeholder="E-posta" type="email" className="field" />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
          İsteğe bağlı not
        </span>
        <textarea
          name="note"
          placeholder="Sessiz oda, hassasiyet, kısa notlar..."
          className="field min-h-[132px] resize-none"
        />
      </label>

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
