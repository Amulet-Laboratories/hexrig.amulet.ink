/**
 * Origins — Collection 1
 *
 * The foundational spaces. Where you are.
 * Hearth (creation) → Abyss (void) → Hollow (growth) → Keep (construction) → Cove (shelter)
 */

import type { HexThemeRegistry, HexCollection } from '@amulet-laboratories/hex'
import { hearth } from './hearth'
import { abyss } from './abyss'
import { hollow } from './hollow'
import { keep } from './keep'
import { cove } from './cove'

export type OriginsThemeId = 'hearth' | 'abyss' | 'hollow' | 'keep' | 'cove'

export { hearth } from './hearth'
export { abyss } from './abyss'
export { hollow } from './hollow'
export { keep } from './keep'
export { cove } from './cove'

export const themes: HexThemeRegistry = {
  hearth,
  abyss,
  hollow,
  keep,
  cove,
}

export const themeIds: OriginsThemeId[] = ['hearth', 'abyss', 'hollow', 'keep', 'cove']

export const origins: HexCollection = {
  id: 'origins',
  name: 'Origins',
  narrative: 'The foundational spaces. Where you are. Fire, void, forest, forge, inlet.',
  themes: [hearth, abyss, hollow, keep, cove],
}
