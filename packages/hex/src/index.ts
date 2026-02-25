/**
 * Hex — Design Token System
 *
 * @amulet-laboratories/hex
 *
 * Five-theme system with dark and light modes (10 total).
 * VSCode extension + CSS custom properties + TypeScript.
 */

// Types
export type {
  ThemeId,
  ModeId,
  HexSurfaces,
  HexText,
  HexBorders,
  HexAccents,
  HexStatus,
  HexFocus,
  HexSyntaxTokens,
  HexTerminalColors,
  HexMotion,
  HexSpacing,
  HexShape,
  HexElevation,
  HexFont,
  HexFonts,
  HexModeTokens,
  HexTheme,
  HexThemeRegistry,
  HexCollection,
} from './tokens/types'

export {
  HEX_THEME_ATTR,
  HEX_MODE_ATTR,
  SURFACE_KEYS,
  TEXT_KEYS,
  BORDER_KEYS,
  ACCENT_KEYS,
  STATUS_KEYS,
  FOCUS_KEYS,
  ELEVATION_KEYS,
  SPACING_KEYS,
  SHAPE_KEYS,
  SYNTAX_TOKEN_KEYS,
  TERMINAL_KEYS,
} from './tokens/types'

// Validation
export { validateTheme } from './utils/validate'
export type { ValidationResult, ValidationError } from './utils/validate'

// CSS generation
export { generateThemeCSS } from './utils/css'

// VSCode theme generation
export { generateVSCodeTheme } from './utils/vscode'

// ---------------------------------------------------------------------------
// Runtime helpers
// ---------------------------------------------------------------------------

import type { HexTheme, ModeId, ThemeId } from './tokens/types'
import { HEX_THEME_ATTR, HEX_MODE_ATTR } from './tokens/types'

/** All valid theme IDs */
const VALID_THEME_IDS: ReadonlySet<string> = new Set<string>(['hearth', 'abyss', 'hollow', 'keep', 'cove'])

/** Validate that a string is a valid ThemeId */
function asThemeId(value: string | null): ThemeId | null {
  return value && VALID_THEME_IDS.has(value) ? (value as ThemeId) : null
}

/**
 * Apply a Hex theme to a DOM element by setting data attributes.
 * Typically called on `document.documentElement`.
 */
export function applyTheme(
  element: HTMLElement,
  theme: HexTheme,
  mode: ModeId
): void {
  if (typeof document === 'undefined') return
  if (!element) {
    throw new Error('applyTheme: element must be a valid HTMLElement')
  }
  element.setAttribute(HEX_THEME_ATTR, theme.id)
  element.setAttribute(HEX_MODE_ATTR, mode)
}

/** Validate that a string is a valid ModeId */
function asModeId(value: string | null): ModeId | null {
  return value === 'dark' || value === 'light' ? value : null
}

/**
 * Toggle between dark and light modes on an element.
 * Returns the new mode. Treats absent/invalid mode as 'dark' (the default).
 */
export function toggleMode(element: HTMLElement): ModeId {
  if (typeof document === 'undefined') return 'dark'
  const current = asModeId(element.getAttribute(HEX_MODE_ATTR))
  // If no valid mode is set, assume dark so toggling goes to light
  const next: ModeId = (current ?? 'dark') === 'dark' ? 'light' : 'dark'
  element.setAttribute(HEX_MODE_ATTR, next)
  return next
}

/**
 * Read the current theme id and mode from an element.
 */
export function getThemeState(element: HTMLElement): { themeId: ThemeId | null; mode: ModeId | null } {
  if (typeof document === 'undefined') return { themeId: null, mode: null }
  return {
    themeId: asThemeId(element.getAttribute(HEX_THEME_ATTR)),
    mode: asModeId(element.getAttribute(HEX_MODE_ATTR)),
  }
}
