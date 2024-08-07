// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
//import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';
import dts from 'vite-plugin-dts'; // Für Typendefinitionen
//import commonjs from '@rollup/plugin-commonjs';

//import { cjsInterop } from "vite-plugin-cjs-interop";
 

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    }),
    dts(),
    //commonjs(),
  /*  cjsInterop({
      // Add broken npm package here
      dependencies: [
        // Apply patch to root import:
        //   import someImport from 'some-package'
        "bootstrap",
 
        // Apply patch to all sub imports:
        //   import someImport from 'some-package/path'
        //   import someImport from 'some-package/sub/path'
        //   ...
        //"bootstrap/**",
      ]
    })
*/
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
    //just tested... transpile: ['bootstrap'],
    lib: {
      entry: 'src/index.ts',
      formats: ['es','cjs'], // create es format only, was: cjs and umd formats, was: umd
      name: 'goar-components', 
      fileName: (format) => `goar-components.${format}.js`,
    },
    rollupOptions: {
      external: ['vue','pinia','bootstrap'], // External modules
      output: {
        globals: {
          vue: 'Vue', // Global variable for vue
          pinia: 'Pinia'
        },
      },
    },
  },
});
