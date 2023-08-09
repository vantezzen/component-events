import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      name: "component-events",
      fileName: "component-events",
    },
  },
  plugins: [react(), dts()],
});
