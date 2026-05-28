import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/2mo/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        resume: path.resolve(__dirname, 'resume.html'),
        garden: path.resolve(__dirname, 'garden.html'),
      },
    },
  },
});
