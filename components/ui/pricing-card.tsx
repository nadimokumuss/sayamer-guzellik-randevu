import Link from "next/link";

type Props = {
  title: string;
  description: string;
  oldPrice?: string;
  price: string;
  detail?: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: string;
  rating?: number;
  ctaLabel?: string;
};

export function PricingCard({
  title,
  description,
  oldPrice,
  price,
  detail,
  href,
  imageSrc,
  imageAlt,
  category,
  rating,
  ctaLabel = "Randevu Al",
}: Props) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-cardHover">
      {imageSrc ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          {category ? (
            <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700 shadow-card">
              {category}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        {typeof rating === "number" ? (
          <div className="mb-3 flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(rating) ? "text-amber-400" : "text-ink-200"
                  }`}
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] font-semibold text-ink-500">
              {rating.toFixed(1)}
            </span>
          </div>
        ) : null}

        <p className="font-display text-[18px] font-bold tracking-tight text-ink-900">
          {title}
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-ink-500">
          {description}
        </p>

        <div className="mt-5 flex items-baseline gap-2">
          {oldPrice ? (
            <span className="text-[13px] text-ink-400 line-through">{oldPrice}</span>
          ) : null}
          <span className="font-display text-2xl font-extrabold tracking-tight text-brand-700">
            {price}
          </span>
        </div>

        {detail ? (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            {detail}
          </p>
        ) : null}

        <Link
          href={href}
          className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 transition group-hover:gap-3"
        >
          {ctaLabel} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
