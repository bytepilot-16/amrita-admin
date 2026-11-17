/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#FAF6F0",
          50: "#FAF6F0",
        },
        surface: {
          DEFAULT: "#F3ECE2",
        },
        ink: {
          charcoal: "#1C1613",
          slate: "#524741",
          muted: "#8A7B72",
        },
        tuscan: {
          rust: "#8A2B0E",
          terracotta: "#E35336",
          peach: "#FFD3AC",
          hairline: "#E6D7C8",
        },
        emerald: {
          amrita: "#15803D",
          light: "#F0F7F2",
          border: "#D0E6D6",
        },
      },
      fontFamily: {
        heading: ["'DM Sans'", "'Outfit'", "system-ui", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "paper-sm": "0 1px 2px 0 rgba(28, 22, 19, 0.04)",
        paper: "0 4px 16px -2px rgba(28, 22, 19, 0.05), 0 2px 4px -1px rgba(28, 22, 19, 0.03)",
        "paper-lg": "0 12px 32px -4px rgba(28, 22, 19, 0.08), 0 4px 8px -2px rgba(28, 22, 19, 0.04)",
      },
    },
  },
  plugins: [],
};
