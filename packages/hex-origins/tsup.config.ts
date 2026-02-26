import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/themes/ember.ts',
    'src/themes/hearth.ts',
    'src/themes/grove.ts',
    'src/themes/reef.ts',
    'src/themes/abyss.ts',
    'src/themes/cove.ts',
    'src/themes/linen.ts',
    'src/themes/keep.ts',
    'src/themes/slate.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
})
