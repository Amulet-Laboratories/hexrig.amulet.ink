import type { Config } from 'tailwindcss'
import { amuletPreset } from '@amulet-laboratories/hex/tailwind'

export default {
  presets: [amuletPreset],
  content: [
    './src/**/*.{vue,ts}',
    './index.html',
    '../rig/src/**/*.{vue,ts}',
  ],
} satisfies Config
