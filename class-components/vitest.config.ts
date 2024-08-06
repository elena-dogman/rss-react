/// <reference types="vitest" />

import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__tests__/setup.jsdom.ts'],
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './tests/unit/coverage',
      include: ['src/**'],
      exclude: [...coverageConfigDefaults.exclude,
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/contexts/TestSearchProvider.tsx',
        'src/app/metadata.ts',
        'src/app/layout.tsx',
        'src/__mocks__'],
    },
    css: false,
  },
   plugins: [
    react()
  ],
});
