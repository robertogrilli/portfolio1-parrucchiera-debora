import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/portfolio1-parrucchiera-debora/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
