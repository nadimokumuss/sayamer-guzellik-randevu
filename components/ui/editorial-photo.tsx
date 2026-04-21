import { classNames } from "@/lib/utils";

type EditorialPhotoProps = {
  src: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  copy?: string;
  imageClassName?: string;
  className?: string;
  priority?: boolean;
};

export function EditorialPhoto({
  src,
  alt,
  eyebrow,
  title,
  copy,
  imageClassName,
  className,
  priority = false,
}: EditorialPhotoProps) {
  const hasCaption = Boolean(eyebrow || title || copy);

  return (
    <figure
      className={classNames(
        "overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition duration-500 ease-soft",
        hasCaption ? "" : "rounded-3xl",
        className,
      )}
    >
      <div className="relative">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={classNames(
            "h-full w-full object-cover",
            imageClassName ?? "aspect-[4/5] min-h-[320px]",
          )}
        />
        {hasCaption ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-espresso/50 via-espresso/10 to-transparent" />
        ) : null}
      </div>

      {hasCaption ? (
        <figcaption className="p-5">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          {title ? <h3 className="mt-4 font-display text-2xl text-espresso">{title}</h3> : null}
          {copy ? <p className="mt-3 text-sm leading-7 text-ink-500">{copy}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
