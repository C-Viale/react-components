import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@functions": path.resolve(__dirname, "./src/utils/functions"),
      "@hooks": path.resolve(__dirname, "./src/utils/hooks"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
