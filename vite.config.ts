/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,

    environment: 'jsdom',

    setupFiles: './src/setupTests.ts',

    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],

      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        '**/interface.ts',
        '**/interfaces.ts',
        'src/**/*.d.ts',
      ],

      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },

      reporter: ['text', 'json', 'html'],
    },
  },
});
