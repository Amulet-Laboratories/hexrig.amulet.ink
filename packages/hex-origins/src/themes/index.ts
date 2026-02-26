/**
 * Origins — Collection 1
 *
 * Nine themes in spectral order. Six chromatic hues evenly spaced
 * around the color wheel (~60° apart), plus three neutrals
 * (warm, pure, cool). Every theme has light + dark modes.
 *
 * Spectrum: Ember (10° Red), Hearth (45° Gold), Grove (120° Green),
 *           Reef (180° Cyan), Abyss (230° Blue), Cove (280° Purple)
 * Neutrals: Linen (warm), Keep (pure), Slate (cool)
 */

import type { HexThemeRegistry, HexCollection } from '@amulet-laboratories/hex'
import { ember } from './ember'
import { hearth } from './hearth'
import { grove } from './grove'
import { reef } from './reef'
import { abyss } from './abyss'
import { cove } from './cove'
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

export { ember } from './ember'
export { hearth } from './hearth'
export { grove } from './grove'
export { reef } from './reef'
export { abyss } from './abyss'
export { cove } from './cove'
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

export const origins: HexCollection = {
  id: 'origins',
  name: 'Origins',
  narrative:
    'Nine themes in spectral order. Six chromatic hues evenly spaced around the color wheel, plus three neutrals — warm, pure, and cool. Eighteen palettes. A rainbow that covers every client lane.',
  themes: [ember, hearth, grove, reef, abyss, cove, linen, keep, slate],
}
