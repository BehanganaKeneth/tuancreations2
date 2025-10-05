import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
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
    // Only exclude modules that cause hot reload issues, keep react-select bundled
    exclude: ['lucide-react'],
  },
});
