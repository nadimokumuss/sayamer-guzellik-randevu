import { classNames, getInitials } from "@/lib/utils";

type TestimonialCardProps = {
  quote: string;
  author: string;
  role?: string;
  className?: string;
};

export function TestimonialCard({ quote, author, role, className }: TestimonialCardProps) {
  const initials = getInitials(author);

  return (
    <figure className={classNames("card p-7", className)}>
      <blockquote className="font-display text-xl leading-relaxed text-espresso">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-gradient text-xs font-medium text-white">
          {initials}
        </span>
        <div>
          <p className="text-sm font-medium text-espresso">{author}</p>
          {role ? <p className="text-xs text-ink-400">{role}</p> : null}
        </div>
      </figcaption>
    </figure>
  );
}
