import type { Config } from 'tailwindcss'
import { resolve } from 'path'
import { amuletPreset } from '@amulet-laboratories/hex/tailwind'

const src = resolve(__dirname, 'src')

export default {
  presets: [amuletPreset],
  content: [`${src}/**/*.vue`, `${src}/**/!(*.stories).ts`],
} satisfies Config
