import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: { port: 4000, host: true },
  build: {
    outDir: '../backend/Public'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
})
