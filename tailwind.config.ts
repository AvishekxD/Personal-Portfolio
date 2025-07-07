import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        printBg: "#f6f6f6",
        printDark: "#0f0f0f",
        accent: "#ff00ff",
      },
      keyframes: {
        "slide-out-to-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "slide-out-to-right": "slide-out-to-right 300ms ease-in-out",
      },
      fontFamily: {
        mono: ["'Space Mono'", "monospace"],
        printstream: ["var(--font-print)", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
