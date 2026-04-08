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
        blush: "#f4d6d7",
        champagne: "#f7efe8",
        espresso: "#2b1d1b",
        sage: "#a9b3a6",
        rosewood: "#925c61",
        sand: "#d6c0ad",
      },
      boxShadow: {
        soft: "0 20px 55px rgba(125, 82, 87, 0.12)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(244, 214, 215, 0.86), transparent 42%), linear-gradient(135deg, rgba(247, 239, 232, 0.96), rgba(245, 229, 214, 0.9))",
      },
      fontFamily: {
        display: [
          "Iowan Old Style",
          "Palatino Linotype",
          "Book Antiqua",
          "Baskerville",
          "serif",
        ],
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
