import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/chinese-cultural-gallery/',
  server: {
    port: 3000,
    open: true
  }
})
