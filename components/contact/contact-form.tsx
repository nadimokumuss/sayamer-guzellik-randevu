"use client";

import { FormEvent, useState } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { FloatingField } from "@/components/ui/floating-field";
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

    if (email && !isValidEmail(email)) {
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
    <form onSubmit={handleSubmit} noValidate className="space-y-9">
      <FloatingField label="Ad Soyad" name="name" autoComplete="name" />

      <div className="grid gap-9 sm:grid-cols-2">
        <FloatingField
          label="Telefon"
          name="phone"
          inputMode="numeric"
          maxLength={17}
          autoComplete="tel"
        />
        <FloatingField
          label="E-posta (opsiyonel)"
          name="email"
          type="email"
          autoComplete="email"
        />
      </div>

      <FloatingField multiline label="Mesajınız" name="message" />

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
          {error}
        </p>
      ) : null}

      <Magnetic>
        <button
          type="submit"
          className="group inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-4 text-sm font-semibold text-white transition hover:bg-mocha"
        >
          <span>WhatsApp ile gönder</span>
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white text-graphite transition group-hover:rotate-45">
            →
          </span>
        </button>
      </Magnetic>
    </form>
  );
}
