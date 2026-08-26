import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5288,
    open: true,
    // Không theo dõi thư mục build và hồ sơ trình duyệt dùng để kiểm thử:
    // các file bị khoá (vd. Cookies) sẽ làm file watcher của Vite lỗi EBUSY.
    watch: { ignored: ['**/dist/**', '**/.*-profile/**'] }
  }
});
