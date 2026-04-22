"use client";

import { FormEvent, useState } from "react";

import { AppIcon } from "@/components/ui/app-icon";
import { siteContent } from "@/lib/site";
import {
  EMAIL_FORMAT_MESSAGE,
  PHONE_FORMAT_MESSAGE,
  isValidEmail,
  normalizePhone,
} from "@/lib/validation";

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const phoneRaw = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phoneRaw || !message) {
      setError("Ad, telefon ve mesaj alanları zorunlu.");
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

    const lines = [
      `Merhaba Sayamer Güzellik,`,
      `Ad: ${name}`,
      `Telefon: ${normalizedPhone}`,
    ];
    if (email) lines.push(`E-posta: ${email}`);
    lines.push("", message);

    const url = `${siteContent.contact.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-4 p-7">
      <div className="flex items-center gap-3">
        <span className="icon-badge icon-badge-sm">
          <AppIcon name="message" className="h-5 w-5" />
        </span>
        <div>
          <span className="eyebrow">Bize ulaşın</span>
          <h3 className="mt-2 font-display text-xl text-espresso">Hızlı iletişim formu</h3>
        </div>
      </div>
      <p className="text-sm leading-7 text-ink-500">
        Formu doldurun, mesajınız WhatsApp üzerinden salona iletilsin.
      </p>

      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">Ad Soyad</span>
        <input name="name" placeholder="Ad Soyad" autoComplete="name" className="field" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">Telefon</span>
          <input
            name="phone"
            placeholder="05XX XXX XX XX"
            inputMode="numeric"
            maxLength={17}
            autoComplete="tel"
            className="field"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">E-posta (opsiyonel)</span>
          <input
            name="email"
            type="email"
            placeholder="E-posta"
            autoComplete="email"
            className="field"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">Mesajınız</span>
        <textarea
          name="message"
          placeholder="Soru veya notunuz..."
          className="field min-h-[120px] resize-none"
        />
      </label>

      {error ? (
        <div
          className="rounded-[20px] border border-rosewood/15 bg-[#fff4f4] px-4 py-3 text-sm text-rosewood"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <button type="submit" className="soft-button w-full">
        WhatsApp ile Gönder
      </button>
    </form>
  );
}
