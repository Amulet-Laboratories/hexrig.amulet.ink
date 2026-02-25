import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@hex': resolve(__dirname, 'packages/hex/src'),
      '@rig': resolve(__dirname, 'packages/rig/src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/*/src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**/*.{ts,vue}'],
      exclude: [
        'packages/*/src/**/*.test.ts',
        'packages/*/src/**/*.stories.ts',
        'packages/*/src/build/**',
      ],
    },
  },
})
