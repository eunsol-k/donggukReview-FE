import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SERVER_ROOT } from 'config/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
  { include: /\.(mdx|js|jsx|ts|tsx)$/ }
  ),
  ],

// Workaround before renaming .js to .jsx
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    proxy: {
        '/api': {
        target: `${SERVER_ROOT}/register`, // Spring Boot 서버 주소
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 접두사를 제거
       },
    },
  },
})
