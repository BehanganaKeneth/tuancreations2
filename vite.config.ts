import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Treat these modules as external to avoid Rollup resolution issues on Netlify
      external: ['react-select', 'react-select-country-list'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          select: ['react-select', 'react-select-country-list'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react', 'react-select', 'react-select-country-list'],
  },
});
