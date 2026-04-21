import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, classNames } from "@/lib/utils";

type PriceCardProps = {
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  durationMinutes?: number;
  savingsLabel?: string;
  imageUrl?: string;
  href?: string;
  ctaLabel?: string;
  highlight?: boolean;
  categoryLabel?: string;
  className?: string;
};

export function PriceCard({
  name,
  description,
  price,
  originalPrice,
  durationMinutes,
  savingsLabel,
  imageUrl,
  href,
  ctaLabel = "Randevu Oluştur",
  highlight,
  categoryLabel,
  className,
}: PriceCardProps) {
  return (
    <article
      className={classNames(
        "group flex flex-col overflow-hidden rounded-3xl border bg-white shadow-soft transition duration-500 ease-soft hover:-translate-y-1 hover:shadow-elevated",
        highlight ? "ring-2 ring-rosewood/20" : undefined,
        className,
      )}
      style={{ borderColor: "rgba(214, 192, 173, 0.36)" }}
    >
      {imageUrl ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition duration-700 ease-soft group-hover:scale-105"
          />
          {savingsLabel ? (
            <div className="absolute left-4 top-4">
              <Badge variant="dark">{savingsLabel}</Badge>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {categoryLabel ? (
          <p className="eyebrow-text">{categoryLabel}</p>
        ) : null}
        <h3 className="mt-2 font-display text-2xl leading-tight text-espresso">{name}</h3>
        {description ? (
          <p className="mt-3 text-sm leading-7 text-ink-500">{description}</p>
        ) : null}

        <div className="mt-6 flex items-end justify-between gap-3 border-t border-line-subtle pt-5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-espresso">
                {formatCurrency(price)}
              </span>
              {originalPrice && originalPrice > price ? (
                <span className="text-sm text-ink-400 line-through">
                  {formatCurrency(originalPrice)}
                </span>
              ) : null}
            </div>
            {durationMinutes ? (
              <p className="mt-1 text-xs uppercase tracking-wider text-ink-400">
                {durationMinutes} dk
              </p>
            ) : null}
          </div>

          {href ? (
            <LinkButton href={href} variant="primary" size="sm">
              {ctaLabel}
            </LinkButton>
          ) : null}
        </div>
      </div>
    </article>
  );
}
