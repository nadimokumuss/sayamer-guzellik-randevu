type Props = {
  className?: string;
  flip?: boolean;
};

// Elaborate floral spray — main hero ornament. Multi-branch foliage with
// clustered leaves, blossoms and seedheads. Inherits color via currentColor.
export function BotanicalSpray({ className = "h-72 w-72", flip = false }: Props) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* main curved branch */}
      <path d="M30 220 C 60 180, 70 140, 90 100 C 110 60, 140 40, 175 25" strokeWidth="1.6" opacity="0.7" />
      {/* secondary branch */}
      <path d="M70 200 C 80 170, 65 140, 50 110" strokeWidth="1.2" opacity="0.55" />
      {/* tertiary branch */}
      <path d="M120 80 C 140 70, 155 60, 170 45" strokeWidth="1.1" opacity="0.55" />
      {/* upper offshoot */}
      <path d="M150 50 C 165 35, 180 30, 200 22" strokeWidth="1.1" opacity="0.5" />

      {/* leaf clusters along main branch — bottom group (large) */}
      <g opacity="0.7">
        <path d="M40 200 q -16 -2 -22 -16 q 14 -10 28 4 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.18" />
        <path d="M50 195 q 14 -10 28 -4 q -4 14 -22 16 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.12" />
      </g>

      {/* mid leaves */}
      <g opacity="0.7">
        <path d="M70 160 q -18 0 -24 -16 q 16 -8 28 6 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.18" />
        <path d="M80 155 q 16 -8 26 0 q -4 14 -22 18 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.12" />
        <path d="M55 150 q -10 -16 -2 -28 q 14 8 14 24 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.14" />
      </g>

      {/* upper leaves */}
      <g opacity="0.75">
        <path d="M105 110 q -16 -4 -20 -20 q 16 -6 24 8 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.18" />
        <path d="M115 100 q 14 -8 24 -2 q -2 14 -20 16 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.14" />
      </g>

      {/* tip leaves */}
      <g opacity="0.8">
        <path d="M150 60 q -10 -4 -14 -16 q 12 -6 18 6 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.18" />
        <path d="M160 50 q 12 -8 20 -2 q -2 10 -14 14 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.14" />
      </g>

      {/* secondary branch leaves */}
      <g opacity="0.6">
        <path d="M55 165 q -14 0 -16 -16 q 12 -4 18 8 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.12" />
        <path d="M58 130 q -10 0 -12 -14 q 10 -2 14 8 z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.12" />
      </g>

      {/* blossoms — clustered tips */}
      <g opacity="0.8">
        <circle cx="180" cy="22" r="5" fill="currentColor" />
        <circle cx="187" cy="14" r="3.2" fill="currentColor" opacity="0.7" />
        <circle cx="172" cy="14" r="2.6" fill="currentColor" opacity="0.55" />
        <circle cx="200" cy="20" r="2.4" fill="currentColor" opacity="0.55" />
      </g>

      {/* small seedheads scattered */}
      <g opacity="0.7">
        <circle cx="92" cy="105" r="2.2" fill="currentColor" />
        <circle cx="98" cy="98" r="1.6" fill="currentColor" opacity="0.7" />
        <circle cx="60" cy="140" r="1.8" fill="currentColor" opacity="0.7" />
        <circle cx="130" cy="75" r="1.8" fill="currentColor" opacity="0.7" />
      </g>
    </svg>
  );
}

// Simpler corner accent — used as section ornament where the larger spray
// would overpower the layout.
export function Botanical({ className = "h-32 w-32", flip = false }: Props) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 140 C 50 110, 80 90, 110 50" strokeWidth="1.4" opacity="0.6" />
      <path d="M40 130 q -10 -8 -8 -22 q 14 4 18 18 z" strokeWidth="1.2" opacity="0.55" fill="currentColor" fillOpacity="0.18" />
      <path d="M60 110 q -12 -6 -12 -22 q 16 2 20 18 z" strokeWidth="1.2" opacity="0.55" fill="currentColor" fillOpacity="0.18" />
      <path d="M82 90 q -14 -4 -16 -20 q 18 0 22 16 z" strokeWidth="1.2" opacity="0.55" fill="currentColor" fillOpacity="0.18" />
      <path d="M102 65 q -14 -2 -18 -18 q 18 -2 24 14 z" strokeWidth="1.2" opacity="0.55" fill="currentColor" fillOpacity="0.18" />
      <path d="M50 122 q 14 -2 22 -14 q -10 -10 -24 -4 z" strokeWidth="1.2" opacity="0.45" fill="currentColor" fillOpacity="0.12" />
      <path d="M72 100 q 16 -2 24 -14 q -10 -10 -26 -4 z" strokeWidth="1.2" opacity="0.45" fill="currentColor" fillOpacity="0.12" />
      <path d="M94 76 q 16 -2 22 -16 q -12 -8 -24 -2 z" strokeWidth="1.2" opacity="0.45" fill="currentColor" fillOpacity="0.12" />
      <circle cx="112" cy="48" r="4" fill="currentColor" opacity="0.55" />
      <circle cx="118" cy="42" r="2.4" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
