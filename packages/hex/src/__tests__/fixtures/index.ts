import type { HexThemeRegistry } from '../tokens/types'
import { hearth } from './hearth'
import { abyss } from './abyss'
import { cove } from './cove'
import { glyph } from './glyph'
import { ember } from './ember'
import { keep } from './keep'
import { slate } from './slate'
import { linen } from './linen'
import { cairn } from './cairn'
import { grove } from './grove'

export type OriginsThemeId =
  | 'hearth'
  | 'abyss'
  | 'cove'
  | 'glyph'
  | 'ember'
  | 'keep'
  | 'slate'
  | 'linen'
  | 'cairn'
  | 'grove'

export { hearth } from './hearth'
export { abyss } from './abyss'
export { cove } from './cove'
export { glyph } from './glyph'
export { ember } from './ember'
export { keep } from './keep'
export { slate } from './slate'
export { linen } from './linen'
export { cairn } from './cairn'
export { grove } from './grove'

export const themes: HexThemeRegistry = {
  hearth,
  abyss,
  cove,
  glyph,
  ember,
  keep,
  slate,
  linen,
  cairn,
  grove,
}

export const themeIds: OriginsThemeId[] = [
  'hearth',
  'abyss',
  'cove',
  'glyph',
  'ember',
  'keep',
  'slate',
  'linen',
  'cairn',
  'grove',
]
