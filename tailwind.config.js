/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          950: "#111111",
          900: "#ffffff",
          850: "#f5f5f3",
        },
        earth: {
          clay: "#b47d5a",
          moss: "#6f7957",
          sand: "#e7d7ba",
          olive: "#85866b",
        },
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
      },
    },
  },
  plugins: [],
};
