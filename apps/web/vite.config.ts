import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 도커 컨테이너에서 외부 접근 허용
    port: 5173,
    watch: {
      usePolling: true, // 도커 볼륨 마운트에서 파일 변경 감지
    },
    hmr: {
      host: 'localhost', // HMR을 위한 호스트 설정
    },
  },
});
