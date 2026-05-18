"use client";

import { FormEvent, useState } from "react";

import { getCatalog } from "@/lib/catalog";
import { siteContent } from "@/lib/site";
import {
  EMAIL_FORMAT_MESSAGE,
  PHONE_FORMAT_MESSAGE,
  isValidEmail,
  normalizePhone,
} from "@/lib/validation";

const inputClass =
  "w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[14px] text-ink-900 placeholder:text-ink-400 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100";

const labelClass = "block text-[12px] font-semibold text-ink-700";

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const catalog = getCatalog();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const phoneRaw = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
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

    const email = String(formData.get("email") || "").trim();
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
    if (service) lines.push(`İlgi alanı: ${service}`);
    lines.push("", message);

    const url = `${siteContent.contact.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          Adınız Soyadınız
        </label>
        <div className="relative mt-2">
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Örn: Ayşe Yılmaz"
            className={`${inputClass} pr-11`}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <circle cx="12" cy="8" r="3.6" />
              <path d="M5 20c1-3.3 4-5 7-5s6 1.7 7 5" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Telefon Numarası
          </label>
          <div className="relative mt-2">
            <input
              id="phone"
              name="phone"
              inputMode="numeric"
              maxLength={17}
              autoComplete="tel"
              placeholder="05XX XXX XX XX"
              className={`${inputClass} pr-11`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                <rect x="7" y="3" width="10" height="18" rx="2" />
                <path d="M11 18h2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>
            İlgilendiğiniz Hizmet
          </label>
          <div className="relative mt-2">
            <select
              id="service"
              name="service"
              defaultValue=""
              className={`${inputClass} appearance-none pr-11`}
            >
              <option value="">Hizmet Seçiniz</option>
              {catalog.categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              <option value="Genel Bilgi">Genel Bilgi</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          E-posta (opsiyonel)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ornek@sayamer.com"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Sorunuzu veya notunuzu buraya yazabilirsiniz..."
          className={`mt-2 ${inputClass} min-h-[120px] resize-none`}
        />
      </div>

      {error ? (
        <p
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn-pill-brand w-full justify-center py-4">
        Gönder
      </button>
    </form>
  );
}
