type IconProps = {
  className?: string;
};

const baseProps = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.6 as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HairIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...baseProps} aria-hidden>
      <path d="M9 22c-1-6 0-12 4-15s9-3 11 1" />
      <path d="M11 22c0-5 1-9 4-12" opacity="0.65" />
      <path d="M14 22c0-3 1-6 3-9" opacity="0.45" />
      <path d="M7 25h18" />
      <circle cx="22" cy="9" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function SkinIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...baseProps} aria-hidden>
      <path d="M16 5c5 0 9 4 9 9 0 6-4 12-9 13-5-1-9-7-9-13 0-5 4-9 9-9z" />
      <path d="M11 14c2-2 4-2 5 0" opacity="0.7" />
      <path d="M16 14c1-2 3-2 5 0" opacity="0.7" />
      <path d="M14 21c1 1 3 1 4 0" opacity="0.7" />
    </svg>
  );
}

export function NailIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...baseProps} aria-hidden>
      <path d="M12 6h8c1 0 2 1 2 2v12c0 3-2 6-6 6s-6-3-6-6V8c0-1 1-2 2-2z" />
      <path d="M12 14h10" opacity="0.6" />
      <path d="M14 9c0 1 1 2 2 2s2-1 2-2" opacity="0.65" />
    </svg>
  );
}

export function MassageIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...baseProps} aria-hidden>
      <path d="M5 22c4-2 7-3 11-3s7 1 11 3" />
      <path d="M9 19c0-3 2-5 4-5" opacity="0.7" />
      <path d="M19 14c2 0 4 2 4 5" opacity="0.7" />
      <circle cx="13" cy="10" r="2.4" />
      <path d="M11 12c-1 1-1 3 0 4" opacity="0.55" />
      <path d="M19 12c-1 1-1 3 0 4" opacity="0.55" />
    </svg>
  );
}

export function WaxIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...baseProps} aria-hidden>
      <path d="M16 5c-2 4-2 7 0 10s2 6 0 10" />
      <path d="M11 9c-1 3-1 6 1 9s2 6 0 9" opacity="0.7" />
      <path d="M21 9c1 3 1 6-1 9s-2 6 0 9" opacity="0.7" />
      <circle cx="16" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function BodyIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...baseProps} aria-hidden>
      <circle cx="16" cy="9" r="3" />
      <path d="M9 26c0-5 3-8 7-8s7 3 7 8" />
      <path d="M12 21h8" opacity="0.55" />
      <path d="M5 16c2-1 3-1 4 0" opacity="0.55" />
      <path d="M23 16c1-1 2-1 4 0" opacity="0.55" />
    </svg>
  );
}

export function FootIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...baseProps} aria-hidden>
      <path d="M9 22c-1-3 0-7 3-9s7-2 9 1c2 4 1 8-2 9l-3 1c-3 1-6 1-7-2z" />
      <circle cx="13" cy="9" r="1.2" fill="currentColor" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
      <circle cx="21" cy="9" r="1" fill="currentColor" />
      <circle cx="22" cy="13" r="0.9" fill="currentColor" />
    </svg>
  );
}

// Map category id to icon — picks a sensible default for any category not
// listed.
export function CategoryIcon({
  categoryId,
  className,
}: {
  categoryId: string;
  className?: string;
}) {
  switch (categoryId) {
    case "kuafor":
    case "sac-taramasi":
      return <HairIcon className={className} />;
    case "cilt-bakimi":
      return <SkinIcon className={className} />;
    case "tirnak-bakimi":
      return <NailIcon className={className} />;
    case "masaj":
    case "kafa-masaji":
      return <MassageIcon className={className} />;
    case "epilasyon":
      return <WaxIcon className={className} />;
    case "g5":
      return <BodyIcon className={className} />;
    case "ayak-bakimi":
      return <FootIcon className={className} />;
    default:
      return <SkinIcon className={className} />;
  }
}
