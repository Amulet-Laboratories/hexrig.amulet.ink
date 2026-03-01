import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@amulet-laboratories/hex-engine': resolve(__dirname, 'packages/hex-engine/src/index.ts'),
      '@amulet-laboratories/hex': resolve(__dirname, 'packages/hex/src/index.ts'),
      '@hex-engine': resolve(__dirname, 'packages/hex-engine/src'),
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
      include: [
        'packages/hex-engine/src/**/*.{ts,vue}',
        'packages/hex/src/**/*.{ts,vue}',
        'packages/rig/src/**/*.{ts,vue}',
      ],
      exclude: [
        'packages/*/src/**/*.test.ts',
        'packages/*/src/**/*.stories.ts',
        'packages/*/src/build/**',
      ],
      thresholds: {
        statements: 65,
        branches: 60,
        functions: 68,
        lines: 68,
      },
    },
  },
})
