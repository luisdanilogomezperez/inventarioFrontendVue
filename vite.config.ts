import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
   build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
  },
  preview: {
    allowedHosts: ["100-razones-para-amarte.up.railway.app"]
  }
})
