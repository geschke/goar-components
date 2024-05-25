// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
//import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';
import dts from 'vite-plugin-dts'; // Für Typendefinitionen

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    }),
    dts()
  ],
  /*resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },*/
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'], // ES-Modul und UMD-Format erstellen war: umd
      name: 'goar-components', // Name der Komponentensammlung
      fileName: (format) => `goar-components.${format}.js`,
    },
    rollupOptions: {
      external: ['vue','pinia'], // Externes Modul
      output: {
        globals: {
          vue: 'Vue', // Globale Variable für Vue
          pinia: 'Pinia'
        },
      },
    },
  },
});
