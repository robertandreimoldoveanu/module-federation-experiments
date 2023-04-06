import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";
const dependencies = require("./package.json");
const shared = Object.keys(dependencies).map((dep) => ({
  [dep]: {
    singleton: true,
    eager: true,
    requiredVersion: dependencies[dep],
  },
}))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'ViteMFE',
      filename: 'remoteEntry.js',
      // Modules to expose
      exposes: {
        'bootstrapViteComponent': './src/main.tsx',
      },
      shared
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: 'assets/[name].js',
        minifyInternalExports: false,
      },
    },
  },
})
