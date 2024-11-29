import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        primary: {
          100: "#4FC3F7",
          200: "#29B6F6",
          300: "#00BCD4",
        },
        accent: {
          100: "#FFEB3B",
          200: "#FFD600",
          300: "#FF9800",
        },
        secondary: {
          100: "#66BB6A",
          200: "#43A047",
          300: "#C0CA33",
        },
        background: {
          light: "#FFFFFF",
          soft: "#F5F5F5",
        },
      },
      fontFamily: {
        travelyouu: ["var(--font-monserrat)"],
        tittle: ["var(--font-lexend)"],
        desc: ["var(--font-sans-narow)"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        zoomIn: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        zoomOut: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-in-out",
        slideDown: "slideDown 0.5s ease-in-out",
        zoomIn: "zoomIn 0.5s ease-in-out",
        zoomOut: "zoomOut 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
