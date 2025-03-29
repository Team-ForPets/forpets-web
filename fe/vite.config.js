import { defineConfig } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'window', // ✅ global을 window로 설정
  },
  // server:{
  //     proxy: {
  //     '/api': {
  //       target: 'https://apis.data.go.kr',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       secure: false,
  //       ws: true
  //     }
  //   }
  // }
});
