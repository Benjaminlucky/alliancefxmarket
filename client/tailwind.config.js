/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
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
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
