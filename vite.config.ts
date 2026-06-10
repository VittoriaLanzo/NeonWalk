/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three:  ["three"],
          r3f:    ["@react-three/fiber", "@react-three/drei"],
          vendor: ["react", "react-dom", "react-router-dom", "@tanstack/react-query"],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
