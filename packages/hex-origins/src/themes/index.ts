/**
 * Origins — Collection 1
 *
 * Ten themes in two series. Every theme has light + dark modes.
 *
 * Environments: Hearth, Abyss, Cove, Glyph, Ember
 * Materials:    Keep, Slate, Linen, Cairn, Grove
 */

import type { HexThemeRegistry, HexCollection } from '@amulet-laboratories/hex'
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

export const origins: HexCollection = {
  id: 'origins',
  name: 'Origins',
  narrative:
    'Ten themes in two series. Environments are places you could stand in. Materials are things you could hold. Twenty palettes. No two themes want the same thing.',
  themes: [hearth, abyss, cove, glyph, ember, keep, slate, linen, cairn, grove],
}
