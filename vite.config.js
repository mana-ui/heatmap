import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.js',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    // css: true,
  },
})