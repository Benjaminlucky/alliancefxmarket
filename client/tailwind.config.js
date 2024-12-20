import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
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
  plugins: [flowbitePlugin],
};
