/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2f9f9",
          100: "#e6f2f2",
          200: "#bfdfdf",
          300: "#99cccc",
          400: "#4da6a6",
          500: "#339999",
          600: "#008080",
          700: "#006060",
          800: "#004d4d",
          900: "#003f3f",
          950: "#003333",
          DEFAULT: "#008080"
        },
        secondary: {
          50: "#f8ffff",
          100: "#f2ffff",
          200: "#ddffff",
          300: "#c9ffff",
          400: "#a1ffff",
          500: "#93ffff",
          600: "#78FFFF",
          700: "#5abfbf",
          800: "#489999",
          900: "#3b7d7d",
          950: "#306666",
          DEFAULT: "#78FFFF"
        },
        tertiary: {
          50: "#f3fdfd",
          100: "#e7fcfc",
          200: "#c2f7f7",
          300: "#9df3f3",
          400: "#54e9e9",
          500: "#3be6e6",
          600: "#0AE0E0",
          700: "#08a8a8",
          800: "#068686",
          900: "#056e6e",
          950: "#045a5a",
          DEFAULT: "#0AE0E0"
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
          DEFAULT: "#475569"
        }
      },
    },
  },
  plugins: []
};