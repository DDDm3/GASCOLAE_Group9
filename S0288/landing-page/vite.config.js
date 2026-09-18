import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: './',
  server: {
    port: 5288,
    open: true,
    watch: { ignored: ['**/dist/**', '**/.*-profile/**'] }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
