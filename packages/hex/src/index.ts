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
  SchemeId,
  HexSurfaces,
  HexText,
  HexBorders,
  HexAccents,
  HexStatus,
  HexFocus,
  HexSyntaxTokens,
  HexTerminalColors,
  HexMotion,
  HexFont,
  HexFonts,
  HexModeTokens,
  HexTheme,
  HexThemeRegistry,
} from './tokens/types'

export {
  HEX_THEME_ATTR,
  HEX_MODE_ATTR,
  HEX_SCHEME_ATTR,
  SURFACE_KEYS,
  TEXT_KEYS,
  BORDER_KEYS,
  ACCENT_KEYS,
  STATUS_KEYS,
  FOCUS_KEYS,
  SYNTAX_TOKEN_KEYS,
  TERMINAL_KEYS,
} from './tokens/types'

// Themes
export { themes, themeIds, hearth, abyss, hollow, keep, cove } from './themes/index'

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

import type { HexTheme, ModeId } from './tokens/types'
import { HEX_THEME_ATTR, HEX_MODE_ATTR } from './tokens/types'

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
  element.setAttribute(HEX_THEME_ATTR, theme.id)
  element.setAttribute(HEX_MODE_ATTR, mode)
}

/** Validate that a string is a valid ModeId */
function asModeId(value: string | null): ModeId | null {
  return value === 'dark' || value === 'light' ? value : null
}

/**
 * Toggle between dark and light modes on an element.
 * Returns the new mode.
 */
export function toggleMode(element: HTMLElement): ModeId {
  if (typeof document === 'undefined') return 'dark'
  const current = asModeId(element.getAttribute(HEX_MODE_ATTR))
  const next: ModeId = current === 'dark' ? 'light' : 'dark'
  element.setAttribute(HEX_MODE_ATTR, next)
  return next
}

/**
 * Read the current theme id and mode from an element.
 */
export function getThemeState(element: HTMLElement): { themeId: string | null; mode: ModeId | null } {
  if (typeof document === 'undefined') return { themeId: null, mode: null }
  return {
    themeId: element.getAttribute(HEX_THEME_ATTR),
    mode: asModeId(element.getAttribute(HEX_MODE_ATTR)),
  }
}
