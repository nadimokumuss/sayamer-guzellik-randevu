type SvgProps = {
  className?: string;
  flip?: boolean;
  style?: React.CSSProperties;
};

function flipStyle(flip?: boolean, style?: React.CSSProperties): React.CSSProperties | undefined {
  if (flip) return { ...style, transform: "scaleX(-1)" };
  return style;
}

export function PinkBlossom({ className = "h-16 w-16", style }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id="petal" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#FCD8DF" />
          <stop offset="60%" stopColor="#E8A4B6" />
          <stop offset="100%" stopColor="#B5708A" />
        </radialGradient>
      </defs>
      <g>
        {[0, 60, 120, 180, 240, 300].map((rot) => (
          <ellipse
            key={rot}
            cx="40"
            cy="22"
            rx="10"
            ry="18"
            fill="url(#petal)"
            transform={`rotate(${rot} 40 40)`}
            opacity="0.92"
          />
        ))}
        <circle cx="40" cy="40" r="6" fill="#F5D69A" />
        <circle cx="40" cy="40" r="2.4" fill="#9B6730" />
      </g>
    </svg>
  );
}

export function TinyDaisy({ className = "h-8 w-8", style }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden>
      <g>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rot) => (
          <ellipse
            key={rot}
            cx="20"
            cy="9"
            rx="3"
            ry="7"
            fill="#FFEDE3"
            stroke="#D9A878"
            strokeWidth="0.6"
            transform={`rotate(${rot} 20 20)`}
            opacity="0.95"
          />
        ))}
        <circle cx="20" cy="20" r="3" fill="#C8956D" />
      </g>
    </svg>
  );
}

export function MonsteraLeaf({ className = "h-24 w-24", flip, style }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={flipStyle(flip, style)} aria-hidden>
      <defs>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3F7A4A" />
          <stop offset="100%" stopColor="#1E4A2A" />
        </linearGradient>
      </defs>
      <path
        d="M60 110 C 30 100, 12 75, 14 50 C 16 25, 35 8, 60 8 C 85 8, 104 25, 106 50 C 108 75, 90 100, 60 110 Z"
        fill="url(#leafGrad)"
      />
      {/* Cutouts (monstera fenestrations) */}
      <path d="M50 25 q -10 8 -12 18 q 6 4 18 0 z" fill="#FAF6F1" opacity="0.95" />
      <path d="M70 35 q 12 4 14 16 q -8 4 -18 -2 z" fill="#FAF6F1" opacity="0.95" />
      <path d="M40 55 q -14 4 -14 14 q 10 6 22 0 z" fill="#FAF6F1" opacity="0.95" />
      <path d="M76 65 q 14 6 12 18 q -10 4 -22 -4 z" fill="#FAF6F1" opacity="0.95" />
      {/* Center vein */}
      <path
        d="M60 14 L 60 108"
        stroke="#0F2A18"
        strokeWidth="1.4"
        opacity="0.45"
      />
    </svg>
  );
}

export function OrchidBranch({ className = "h-32 w-24", flip, style }: SvgProps) {
  return (
    <svg viewBox="0 0 120 160" className={className} style={flipStyle(flip, style)} aria-hidden>
      <defs>
        <radialGradient id="orchidPetal" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#FBE3EC" />
          <stop offset="70%" stopColor="#E3A4BC" />
          <stop offset="100%" stopColor="#A66782" />
        </radialGradient>
      </defs>
      {/* Stem */}
      <path
        d="M60 158 C 56 130, 68 100, 60 70 C 52 40, 62 18, 60 6"
        stroke="#7A5A3A"
        strokeWidth="1.6"
        fill="none"
        opacity="0.6"
      />
      {/* Two orchid blooms */}
      <g transform="translate(60 30)">
        {[0, 72, 144, 216, 288].map((rot) => (
          <ellipse
            key={rot}
            cx="0"
            cy="-12"
            rx="6"
            ry="11"
            fill="url(#orchidPetal)"
            transform={`rotate(${rot})`}
          />
        ))}
        <circle r="3.6" fill="#F5C28A" />
      </g>
      <g transform="translate(60 90)">
        {[0, 72, 144, 216, 288].map((rot) => (
          <ellipse
            key={rot}
            cx="0"
            cy="-10"
            rx="5"
            ry="9"
            fill="url(#orchidPetal)"
            transform={`rotate(${rot})`}
            opacity="0.92"
          />
        ))}
        <circle r="3" fill="#F5C28A" />
      </g>
    </svg>
  );
}

export function BigBeigeBranch({ className = "h-96 w-96", flip, style }: SvgProps) {
  return (
    <svg viewBox="0 0 320 360" className={className} style={flipStyle(flip, style)} aria-hidden>
      <defs>
        <linearGradient id="beigeLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F1D9BE" />
          <stop offset="100%" stopColor="#D9A878" />
        </linearGradient>
      </defs>
      {/* Main stem */}
      <path
        d="M40 340 C 80 280, 120 220, 130 160 C 138 100, 170 60, 220 30"
        stroke="#C8956D"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      {/* Large drooping leaves */}
      <path
        d="M60 320 C 30 300, 14 260, 30 220 C 60 230, 84 270, 80 310 Z"
        fill="url(#beigeLeaf)"
        opacity="0.6"
      />
      <path
        d="M100 250 C 60 240, 50 200, 70 165 C 110 170, 130 210, 120 245 Z"
        fill="url(#beigeLeaf)"
        opacity="0.55"
      />
      <path
        d="M140 180 C 100 170, 100 130, 130 100 C 170 110, 180 150, 160 175 Z"
        fill="url(#beigeLeaf)"
        opacity="0.5"
      />
      <path
        d="M180 110 C 150 90, 160 50, 200 36 C 230 50, 230 90, 200 110 Z"
        fill="url(#beigeLeaf)"
        opacity="0.5"
      />
      {/* Small leaves */}
      <path d="M210 60 q -16 -6 -20 -22 q 16 -4 24 12 z" fill="url(#beigeLeaf)" opacity="0.55" />
      <path d="M150 200 q -16 6 -14 22 q 16 0 22 -16 z" fill="url(#beigeLeaf)" opacity="0.5" />
      {/* Small blossoms */}
      <circle cx="225" cy="32" r="6" fill="#E8A4B6" opacity="0.7" />
      <circle cx="218" cy="20" r="3" fill="#E8A4B6" opacity="0.55" />
    </svg>
  );
}
