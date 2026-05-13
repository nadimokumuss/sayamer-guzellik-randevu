import Link from "next/link";

type Props = {
  title: string;
  description: string;
  oldPrice?: string;
  price: string;
  detail?: string;
  href: string;
};

export function PricingCard({
  title,
  description,
  oldPrice,
  price,
  detail,
  href,
}: Props) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-brand-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-cardHover">
      <p className="font-display text-[18px] font-bold tracking-tight text-ink-900">
        {title}
      </p>
      <p className="mt-2 text-[13px] leading-6 text-ink-500">
        {description}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        {oldPrice ? (
          <span className="text-[13px] text-ink-400 line-through">
            {oldPrice}
          </span>
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
        Randevu Al <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
