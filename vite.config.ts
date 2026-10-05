import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Fallback proxy if browser CORS blocks direct GREEN-API calls
      '/green-api': {
        target: 'https://api.green-api.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/green-api/, ''),
        timeout: 65000,
        proxyTimeout: 65000,
      },
    },
  },
})
