type Props = {
  className?: string;
  align?: "center" | "left";
};

export function SectionTitleMark({ className = "", align = "center" }: Props) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center gap-2 ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className}`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-400" />
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 text-brand-500"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2 14 10l8 2-8 2-2 8-2-8-8-2 8-2z" />
      </svg>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-400" />
    </span>
  );
}
