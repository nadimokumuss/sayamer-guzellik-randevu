import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reference brand palette — purple/magenta
        brand: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
          700: "#7E22CE",
          800: "#6B21A8",
          900: "#581C87",
        },
        accent: "#C026D3",
        ink: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        surface: {
          DEFAULT: "#F5F5F7",
          raised: "#FFFFFF",
          sunken: "#ECECEF",
          muted: "#FAFAFB",
        },
        line: {
          subtle: "rgba(17,24,39,0.06)",
          DEFAULT: "rgba(17,24,39,0.08)",
          strong: "rgba(17,24,39,0.14)",
        },
        night: "#0F0F12",
        // Legacy warm tokens (kept for non-rewritten pages, deprecated)
        bone: "#faf7f2",
        ivory: "#ffffff",
        graphite: "#111827",
        ash: "#6B7280",
        clay: "#A855F7",
        hairline: "rgba(17,24,39,0.08)",
        peach: "#F3E8FF",
        peachLight: "#FAF5FF",
        mocha: "#7E22CE",
        mochaDeep: "#0F0F12",
        rose: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
          700: "#7E22CE",
          800: "#6B21A8",
          900: "#581C87",
        },
        rosewood: "#9333EA",
        sand: "#F3E8FF",
        champagne: "#FAF5FF",
        espresso: "#0F0F12",
        sage: "#9CA3AF",
        blush: "#F3E8FF",
      },
      boxShadow: {
        card: "0 4px 24px rgba(168, 85, 247, 0.08)",
        cardHover: "0 12px 40px rgba(168, 85, 247, 0.18)",
        soft: "0 8px 24px rgba(17, 24, 39, 0.06)",
        elevated: "0 30px 80px -20px rgba(168, 85, 247, 0.20)",
        editorial: "0 40px 120px -30px rgba(168, 85, 247, 0.25)",
        subtle: "0 2px 12px rgba(17, 24, 39, 0.04)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "28px",
        pill: "9999px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #A855F7 0%, #C026D3 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, #C084FC 0%, #E879F9 100%)",
        "hero-glow":
          "radial-gradient(circle at top, rgba(168, 85, 247, 0.18), transparent 50%)",
        "rose-gradient":
          "linear-gradient(135deg, #A855F7 0%, #C026D3 100%)",
        "sheen":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 252, 249, 0.3))",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Manrope",
          "Inter",
          "Avenir Next",
          "Segoe UI",
          "Helvetica Neue",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "Inter",
          "Avenir Next",
          "Segoe UI",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-2xl": ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      letterSpacing: {
        eyebrow: "0.18em",
        wider: "0.12em",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "hue-pulse": {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(20deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.06)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "hue-pulse": "hue-pulse 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 8s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
