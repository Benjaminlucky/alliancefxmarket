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
  build: {
    target: "esnext", // Ensure modern JS is used
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust chunk size warning if necessary
  },
  server: {
    mimeTypes: {
      "application/javascript": ["js", "jsx"], // Ensure JS and JSX are served correctly
    },
  },
});
