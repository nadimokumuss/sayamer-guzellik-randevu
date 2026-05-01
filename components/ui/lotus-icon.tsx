type Props = {
  className?: string;
  tone?: "brand" | "light";
};

export function LotusIcon({ className = "h-5 w-5", tone = "brand" }: Props) {
  const fill = tone === "light" ? "#ffffff" : "url(#lotus-gradient)";
  const accent = tone === "light" ? "rgba(255,255,255,0.55)" : "#C026D3";

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lotus-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A855F7" />
          <stop offset="1" stopColor="#C026D3" />
        </linearGradient>
      </defs>
      {/* center petal */}
      <path
        d="M16 4c2 3 3 6 3 10s-1 6-3 8c-2-2-3-4-3-8s1-7 3-10z"
        fill={fill}
      />
      {/* left outer */}
      <path
        d="M5 14c2-2 5-3 8-2-1 3-3 6-6 8-2 1-4 1-5 0 0-2 1-4 3-6z"
        fill={fill}
        opacity="0.85"
      />
      {/* right outer */}
      <path
        d="M27 14c-2-2-5-3-8-2 1 3 3 6 6 8 2 1 4 1 5 0 0-2-1-4-3-6z"
        fill={fill}
        opacity="0.85"
      />
      {/* left inner */}
      <path
        d="M9 9c2 0 4 1 5 3-2 3-3 6-3 10-3-2-5-5-5-9 0-2 1-3 3-4z"
        fill={fill}
        opacity="0.7"
      />
      {/* right inner */}
      <path
        d="M23 9c-2 0-4 1-5 3 2 3 3 6 3 10 3-2 5-5 5-9 0-2-1-3-3-4z"
        fill={fill}
        opacity="0.7"
      />
      {/* center seed dot */}
      <circle cx="16" cy="22" r="1.4" fill={accent} />
    </svg>
  );
}
