/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0B0F1A",
          900: "#12151C",
          800: "#1A1E2A",
          700: "#242938",
        },
        amber: {
          400: "#F5A623",
          500: "#E8940F",
          600: "#C97B00",
        },
      },
      fontFamily: {
        display: ["Rajdhani", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};