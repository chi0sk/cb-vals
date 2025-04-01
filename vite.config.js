import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // Add this line to ensure correct asset paths
  server: {
    host: '0.0.0.0',
  },
})
