/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "#dd8833",
          hover: "#B05C1D",
        },
        muted: {
          DEFAULT: "#888888",
          foreground: "#666666",
        },
      },
    },
  },
  plugins: [],
};
