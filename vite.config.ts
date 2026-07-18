import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('reactflow')) return 'reactflow';
          if (id.includes('recharts')) return 'recharts';
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
})
