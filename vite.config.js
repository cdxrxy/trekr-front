import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname
    }
  },
  plugins: [react(), svgrPlugin()],
})
