import type { HexThemeRegistry } from '../tokens/types'

// Spectrum (chromatic, ~60° apart)
import { ember } from './ember'
import { hearth } from './hearth'
import { grove } from './grove'
import { reef } from './reef'
import { abyss } from './abyss'
import { cove } from './cove'

// Neutrals (warm → pure → cool)
import { linen } from './linen'
import { keep } from './keep'
import { slate } from './slate'

export type OriginsThemeId =
  | 'ember'
  | 'hearth'
  | 'grove'
  | 'reef'
  | 'abyss'
  | 'cove'
  | 'linen'
  | 'keep'
  | 'slate'

// Spectrum
export { ember } from './ember'
export { hearth } from './hearth'
export { grove } from './grove'
export { reef } from './reef'
export { abyss } from './abyss'
export { cove } from './cove'

// Neutrals
export { linen } from './linen'
export { keep } from './keep'
export { slate } from './slate'

export const themes: HexThemeRegistry = {
  ember,
  hearth,
  grove,
  reef,
  abyss,
  cove,
  linen,
  keep,
  slate,
}

export const themeIds: OriginsThemeId[] = [
  'ember',
  'hearth',
  'grove',
  'reef',
  'abyss',
  'cove',
  'linen',
  'keep',
  'slate',
]
