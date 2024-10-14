/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // This includes all JS/JSX/TS/TSX files in src folder
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite-react content
    "./node_modules/flowbite/**/*.js", // Flowbite's vanilla JS components (optional)
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#2F0BB4",
          DEFAULT: "#0B0033",
          dark: "#000000",
        },
        secondary: {
          light: "#EAF27C",
          DEFAULT: "#CE8964",
          dark: "#565C03",
        },
        accent: {
          light: "#242424",
          DEFAULT: "#1E1E1E",
          dark: "#1E1F1A",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
