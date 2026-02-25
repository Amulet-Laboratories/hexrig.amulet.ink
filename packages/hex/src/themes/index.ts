import type { HexThemeRegistry } from '../tokens/types'
import { hearth } from './hearth'
import { abyss } from './abyss'
import { hollow } from './hollow'
import { keep } from './keep'
import { cove } from './cove'

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

export const themeIds = Object.keys(themes) as (keyof HexThemeRegistry)[]
