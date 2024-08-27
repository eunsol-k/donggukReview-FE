import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite 서버가 실행될 포트
//    proxy: {
//      '/api': {
//        target: 'http://localhost:8080', // Spring Boot 서버 주소
//        changeOrigin: true,
//        secure: false,
//        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 접두사를 제거
//      },
//    },
  },
});