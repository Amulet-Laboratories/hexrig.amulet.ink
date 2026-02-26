import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/themes/hearth.ts',
    'src/themes/abyss.ts',
    'src/themes/cove.ts',
    'src/themes/glyph.ts',
    'src/themes/ember.ts',
    'src/themes/keep.ts',
    'src/themes/slate.ts',
    'src/themes/linen.ts',
    'src/themes/cairn.ts',
    'src/themes/grove.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
})
