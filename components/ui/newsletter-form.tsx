"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("sent");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
      <label className="block">
        <span className="sr-only">E-posta adresi</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="E-posta adresiniz"
          className="block w-full rounded-full border border-brand-200 bg-white px-5 py-3 text-sm text-ink-800 placeholder:text-ink-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </label>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-card transition hover:shadow-cardHover"
      >
        <span>Abone Ol</span>
        <span aria-hidden>→</span>
      </button>
      {status === "sent" ? (
        <p className="text-[12px] text-brand-700">
          Teşekkürler — abonelik kaydınız alındı.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-[12px] text-rose-700">
          Lütfen geçerli bir e-posta adresi girin.
        </p>
      ) : null}
    </form>
  );
}
