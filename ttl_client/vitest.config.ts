import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      include: ['src/components/Header.tsx', 'src/utils/**/*.ts'],
      exclude: [
        'dist/**',
        'src/App.tsx',
        'src/main.tsx',
        'src/components/InputForm.tsx',
        'src/components/Login.tsx',
        'src/components/OrderLotMain.tsx',
        'src/components/ViewOrder.tsx'
      ]
    }
  }
});
