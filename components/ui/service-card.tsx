import Link from "next/link";

import { formatCurrency } from "@/lib/utils";

type Props = {
  href: string;
  image: string;
  imageAlt?: string;
  category?: string;
  title: string;
  description?: string;
  price?: number;
  priceLabel?: string;
  detailLabel?: string;
  variant?: "default" | "circular";
};

export function ServiceCard({
  href,
  image,
  imageAlt,
  category,
  title,
  description,
  price,
  priceLabel,
  detailLabel = "Detaylı Bilgi",
  variant = "default",
}: Props) {
  if (variant === "circular") {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col items-center rounded-3xl bg-white px-6 pb-7 pt-10 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover"
      >
        <div className="relative mb-5">
          <span
            aria-hidden
            className="absolute inset-0 -m-2 rounded-full bg-brand-100 opacity-70 transition duration-500 group-hover:opacity-100"
          />
          <span className="relative block h-28 w-28 overflow-hidden rounded-full ring-4 ring-white sm:h-32 sm:w-32">
            <img
              src={image}
              alt={imageAlt ?? title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
          </span>
        </div>
        <p className="font-display text-[18px] font-bold tracking-tight text-ink-900">{title}</p>
        {description ? (
          <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-ink-500">{description}</p>
        ) : null}
        <span className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 transition group-hover:gap-2">
          {detailLabel}
          <span aria-hidden>→</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={image}
          alt={imageAlt ?? title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {category ? (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-brand-600 shadow-sm backdrop-blur">
            {category}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-[17px] font-bold tracking-tight text-ink-900">{title}</p>
        {description ? (
          <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-ink-500">{description}</p>
        ) : null}
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="font-display text-lg font-extrabold tracking-tight text-brand-600">
            {priceLabel ?? (typeof price === "number" ? formatCurrency(price) : "")}
          </p>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-600 transition group-hover:gap-2">
            {detailLabel}
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
