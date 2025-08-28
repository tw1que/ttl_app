import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { testTimeout: 30000, 
    environment: 'jsdom',
    setupFiles: [],
    include: [],
    coverage: {
      enabled: false
    }
  }
});
