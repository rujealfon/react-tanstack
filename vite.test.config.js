import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // Use testApp.tsx as the entry point
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/testApp.tsx'),
      },
    },
  },
});
