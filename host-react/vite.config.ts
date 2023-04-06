import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
const { dependencies } = require("./package.json");
const shared = Object.keys(dependencies).map((dep) => ({
  [dep]: {
    singleton: true,
    // eager: true,
    requiredVersion: dependencies[dep],
  },
}));
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "hostReact",
      filename: "remoteEntry.js",
      remotes: {
        ngMicrofrontendTwo: {
          external: "http://localhost:4203/remoteEntry.js",
          externalType: "url",
          format: "var",
          from: "webpack",
        },
      },
      shared,
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        format: "esm",
        entryFileNames: "assets/[name].js",
        minifyInternalExports: false,
      },
      external: ['ngMicrofrontendTwo']
    },
  },
});
