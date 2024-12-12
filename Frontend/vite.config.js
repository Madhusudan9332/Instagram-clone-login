import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

const _dirname = path.resolve();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(_dirname, "./src"),
    },
  },
  server: {
    port: 3300,
    proxy: {
      '/api': {
        target: 'http://localhost:10000',
        changeOrigin: true,
      },
    }
  }
})
