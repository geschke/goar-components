import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    target: "esnext",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "goar-components",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "cjs" ? "goar-components.cjs" : "goar-components.es.js"),
    },
    rollupOptions: {
      external: ["vue", "pinia", "bootstrap", "@popperjs/core"],
      output: {
        globals: {
          vue: "Vue",
          pinia: "Pinia"

        }
      }
    }
  }
});
