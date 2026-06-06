import Image from "next/image";
import Link from "next/link";

import { siteContent } from "@/lib/site";

type Props = {
  tone?: "light" | "dark";
  size?: "sm" | "md";
};

export function Wordmark({ tone = "dark", size = "md" }: Props) {
  const text = tone === "light" ? "text-white" : "text-ink-900";
  const wordmarkSize = size === "sm" ? "text-[15px]" : "text-[17px]";
  const iconSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label={siteContent.brand.name}
    >
      <span
        className={`relative ${iconSize} transition-transform duration-700 ease-soft group-hover:rotate-180 group-hover:scale-105`}
      >
        <Image
          src="/sayamer-icon.png"
          alt={siteContent.brand.name}
          fill
          sizes="32px"
          priority
          className="object-contain"
        />
      </span>
      <span className={`font-display font-extrabold tracking-tight ${wordmarkSize} ${text}`}>
        Sayamer Güzellik Merkezi
      </span>
    </Link>
  );
}
