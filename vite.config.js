import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // Port tetap, tidak berubah
    open: false,     // <=== UBAH KE FALSE agar tidak buka tab otomatis
  },
})