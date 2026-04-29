"use client";

import { useEffect, useState } from "react";

import { siteContent } from "@/lib/site";

type Tone = "light" | "dark";

function parseRange(value: string): { start: number; end: number } | null {
  const m = value.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
  if (!m) return null;
  return {
    start: Number(m[1]) * 60 + Number(m[2]),
    end: Number(m[3]) * 60 + Number(m[4]),
  };
}

const dayMap: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 0: 2 };

export function LiveClock({ tone = "light", compact = false }: { tone?: Tone; compact?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const t = () => setNow(new Date());
    t();
    const id = window.setInterval(t, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className={tone === "light" ? "text-white/70" : "text-ash"} aria-hidden>
        ··:··
      </span>
    );
  }

  const minutes = now.getHours() * 60 + now.getMinutes();
  const idx = dayMap[now.getDay()];
  const slot = siteContent.contact.hours[idx];
  const range = parseRange(slot.value);
  const isOpen = !!range && minutes >= range.start && minutes <= range.end;

  const time = now.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dotBg = isOpen ? "bg-emerald-400" : "bg-rose-400";
  const dotPing = isOpen ? "bg-emerald-400/70" : "bg-rose-400/60";
  const labelColor = tone === "light" ? "text-white" : "text-graphite";
  const subColor = tone === "light" ? "text-white/65" : "text-ash";

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-tight ${labelColor}`}>
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dotPing}`} />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${dotBg}`} />
        </span>
        <span>{isOpen ? "Açık" : "Kapalı"}</span>
        <span className={`tabular-nums ${subColor}`}>· {time}</span>
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-2.5 w-2.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dotPing}`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dotBg}`} />
      </span>
      <div className="leading-tight">
        <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${labelColor}`}>
          {isOpen ? "Şu an açık" : "Şu an kapalı"}
        </p>
        <p className={`text-[11px] tabular-nums ${subColor}`}>
          {slot.label} · {slot.value} · {time}
        </p>
      </div>
    </div>
  );
}
