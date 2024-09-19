import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        presets: ["@babel/preset-react"], // Enable JSX in .js files
      },
      extensions: [".js", ".jsx"], // Enable JSX syntax in .js files
    }),
  ],
});
