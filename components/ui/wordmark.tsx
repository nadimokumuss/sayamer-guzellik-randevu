import Link from "next/link";

import { siteContent } from "@/lib/site";

type Props = {
  tone?: "light" | "dark";
  size?: "sm" | "md";
};

export function Wordmark({ tone = "dark", size = "md" }: Props) {
  const text = tone === "light" ? "text-white" : "text-graphite";
  const dim = tone === "light" ? "text-white/55" : "text-ash";
  const stroke = tone === "light" ? "rgba(255,255,255,0.45)" : "rgba(26,26,24,0.55)";

  const monoSize = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const wordmarkSize = size === "sm" ? "text-[15px]" : "text-[17px]";

  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={siteContent.brand.name}>
      <span
        className={`relative grid ${monoSize} place-items-center rounded-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-180`}
        style={{ border: `1px solid ${stroke}` }}
      >
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${text}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M5 14c0-3 2.5-5 7-5s7 2 7 5" strokeLinecap="round" />
          <path d="M5 18c0-3 2.5-5 7-5s7 2 7 5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display ${wordmarkSize} font-extrabold tracking-[-0.01em] ${text}`}>
          Sayamer
        </span>
        <span className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] ${dim}`}>
          Güzellik · İST
        </span>
      </span>
    </Link>
  );
}
