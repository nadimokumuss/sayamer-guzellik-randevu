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
        bone: "#faf7f2",
        ivory: "#ffffff",
        graphite: "#1a1a18",
        ash: "#6b6660",
        clay: "#a8645a",
        hairline: "rgba(26,26,24,0.10)",
        blush: "#f4d6d7",
        champagne: "#f7efe8",
        espresso: "#2b1d1b",
        sage: "#a9b3a6",
        rosewood: "#925c61",
        sand: "#d6c0ad",
        ink: {
          50: "#f8f4f0",
          100: "#ece3da",
          200: "#d8c7b9",
          300: "#b9a092",
          400: "#8e7067",
          500: "#6f5c5e",
          600: "#4e3a39",
          700: "#3a2826",
          800: "#2b1d1b",
          900: "#1a1110",
        },
        rose: {
          50: "#fbf3f1",
          100: "#f4dfdd",
          200: "#e8bebb",
          300: "#d69a98",
          400: "#b87677",
          500: "#925c61",
          600: "#77474d",
          700: "#5c363c",
          800: "#3e2327",
          900: "#241416",
        },
        surface: {
          DEFAULT: "#fbf5ee",
          raised: "#ffffff",
          sunken: "#f5ece3",
          muted: "#fcf7f3",
        },
        line: {
          subtle: "rgba(146, 92, 97, 0.12)",
          DEFAULT: "rgba(146, 92, 97, 0.18)",
          strong: "rgba(146, 92, 97, 0.28)",
        },
      },
      boxShadow: {
        soft: "0 20px 55px rgba(125, 82, 87, 0.12)",
        elevated: "0 30px 80px -20px rgba(43, 29, 27, 0.22)",
        editorial: "0 40px 120px -30px rgba(43, 29, 27, 0.35)",
        subtle: "0 8px 24px rgba(125, 82, 87, 0.06)",
      },
      borderRadius: {
        "2xl": "18px",
        "3xl": "24px",
        "4xl": "32px",
        pill: "9999px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(244, 214, 215, 0.86), transparent 42%), linear-gradient(135deg, rgba(247, 239, 232, 0.96), rgba(245, 229, 214, 0.9))",
        "sheen":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 252, 249, 0.3))",
        "rose-gradient":
          "linear-gradient(135deg, #2b1d1b 0%, #925c61 100%)",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Playfair Display",
          "Iowan Old Style",
          "Palatino Linotype",
          "Book Antiqua",
          "Baskerville",
          "serif",
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
        "display-2xl": ["clamp(3.5rem, 9vw, 7.5rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-xl": ["clamp(3rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.875rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      letterSpacing: {
        eyebrow: "0.28em",
        wider: "0.18em",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
