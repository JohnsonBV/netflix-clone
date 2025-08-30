import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      // Fallbacks for Node core modules (needed by some npm libs like movie-trailer)
      util: "util/",
      stream: "stream-browserify",
      path: "path-browserify"
    }
  },
  define: {
    "process.env": {}
  }
});
