import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4100,
    proxy: {
      '/api': 'http://localhost:8400',
      '/uploads': 'http://localhost:8400'
    }
  },
  preview: {
    proxy: {
      '/api': 'http://localhost:8400',
      '/uploads': 'http://localhost:8400'
    }
  }
})
