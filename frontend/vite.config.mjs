import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      '^/cable': {
        target: 'ws://backend:3000',
        ws: true,
      },
      '^/api|^/rails': {
        target: 'http://backend:3000',
      },
    },
  },
});
