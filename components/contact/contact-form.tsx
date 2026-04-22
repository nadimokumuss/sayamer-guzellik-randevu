"use client";

import { FormEvent, useState } from "react";

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
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <label className="block">
        <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">
          Ad Soyad
        </span>
        <input
          name="name"
          placeholder="Ad Soyad"
          autoComplete="name"
          className="form-line mt-3"
        />
      </label>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">
            Telefon
          </span>
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
          <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">
            E-posta (opsiyonel)
          </span>
          <input
            name="email"
            type="email"
            placeholder="E-posta"
            autoComplete="email"
            className="form-line mt-3"
          />
        </label>
      </div>

      <label className="block">
        <span className="block text-[11px] uppercase tracking-[0.22em] text-ash">
          Mesajınız
        </span>
        <textarea
          name="message"
          placeholder="Soru veya notunuz..."
          className="form-line mt-3 min-h-[120px] resize-none"
        />
      </label>

      {error ? (
        <p className="text-sm text-clay" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn-minimal-solid">
        WhatsApp ile gönder
      </button>
    </form>
  );
}
