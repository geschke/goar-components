// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'; // Für Typendefinitionen

export default defineConfig({
  plugins: [
    vue(),
    dts()
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'umd'], // ES-Modul und UMD-Format erstellen
      name: 'goar-components', // Name der Komponentensammlung
      fileName: (format) => `goar-components.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'], // Externes Modul
      output: {
        globals: {
          vue: 'Vue', // Globale Variable für Vue
        },
      },
    },
  },
});
