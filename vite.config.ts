import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.', // Root directory
  publicDir: 'public', // Public assets directory
  server: {
    port: 3000,
    open: true, // Automatically open browser
    hmr: {
      overlay: true, // Show errors as overlay
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});
