type Props = {
  number: string;
  label: string;
  tone?: "dark" | "light";
  className?: string;
};

export function NumberedEyebrow({ number, label, tone = "dark", className = "" }: Props) {
  const isLight = tone === "light";
  return (
    <p
      className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${
        isLight ? "text-peach" : "text-graphite"
      } ${className}`}
    >
      <span className={`font-display text-base font-extrabold ${isLight ? "text-peach" : "text-rosewood"}`}>
        {number}
      </span>
      <span className={`h-[1px] w-10 ${isLight ? "bg-peach" : "bg-graphite"}`} />
      {label}
    </p>
  );
}
