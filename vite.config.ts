import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // S'assurer que le port est 3000 dans le conteneur pour le développement
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
})