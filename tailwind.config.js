/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1d4ed8", // Base primary color
          light: "#3b82f6", // Lighter variant
          dark: "#1e40af", // Darker variant
        },
        secondary: {
          DEFAULT: "#6b7280", // Base secondary color
          light: "#d1d5db", // Lighter variant
          dark: "#4b5563", // Darker variant
        },
        danger: {
          DEFAULT: "#dc2626", // Base danger color
          light: "#f87171", // Lighter variant
          dark: "#b91c1c", // Darker variant
        },
      },
    },
  },
  plugins: [],
};
