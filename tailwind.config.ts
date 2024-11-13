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
          100: '#4FC3F7',
          200: '#29B6F6',
          300: '#00BCD4',
        },
        accent: {
          100: '#FFEB3B',
          200: '#FFD600',
          300: '#FF9800',
        },
        secondary: {
          100: '#66BB6A',
          200: '#43A047',
          300: '#C0CA33',
        },
        background: {
          light: '#FFFFFF',
          soft: '#F5F5F5',
        },
      },
      fontFamily: {
        travelyouu: ["var(--font-monserrat)"],
        tittle: ["var(--font-lexend)"],
        desc: ["var(--font-sans-narow)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
