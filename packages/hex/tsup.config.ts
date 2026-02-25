import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/themes/hearth.ts',
    'src/themes/abyss.ts',
    'src/themes/hollow.ts',
    'src/themes/keep.ts',
    'src/themes/cove.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
})
