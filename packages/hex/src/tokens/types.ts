/**
 * Hex Token Types
 *
 * Five themes, five places. A journey from hearth to cove.
 * Hearth (creation) → Abyss (void) → Hollow (growth) → Keep (construction) → Cove (shelter)
 */

// ---------------------------------------------------------------------------
// Theme identifiers
// ---------------------------------------------------------------------------

export type ThemeId = 'hearth' | 'abyss' | 'hollow' | 'keep' | 'cove'
export type ModeId = 'dark' | 'light'

/** @deprecated use ModeId instead */
export type SchemeId = ModeId

// ---------------------------------------------------------------------------
// Token group interfaces
// ---------------------------------------------------------------------------

export interface HexSurfaces {
  base: string
  raised: string
  elevated: string
  sunken: string
  overlay: string
}

export interface HexText {
  primary: string
  secondary: string
  muted: string
  inverse: string
  link: string
  onAccent: string
}

export interface HexBorders {
  default: string
  subtle: string
  strong: string
}

export interface HexAccents {
  primary: string
  secondary: string
  hover: string
  active: string
  muted: string
}

export interface HexStatus {
  success: string
  warning: string
  error: string
  info: string
}

export interface HexFocus {
  ring: string
  outline: string
}

export interface HexSyntaxTokens {
  comment: string
  keyword: string
  storage: string
  string: string
  number: string
  function: string
  operator: string
  punctuation: string
  type: string
}

export interface HexTerminalColors {
  black: string
  red: string
  green: string
  yellow: string
  blue: string
  magenta: string
  cyan: string
  white: string
  brightBlack: string
  brightRed: string
  brightGreen: string
  brightYellow: string
  brightBlue: string
  brightMagenta: string
  brightCyan: string
  brightWhite: string
}

// ---------------------------------------------------------------------------
// Motion tokens
// ---------------------------------------------------------------------------

export interface HexMotion {
  duration: { fast: string; normal: string; slow: string }
  easing: { default: string; entrance: string; exit: string }
}

// ---------------------------------------------------------------------------
// Font metadata
// ---------------------------------------------------------------------------

export interface HexFont {
  family: string
  source: string
  license: string
  weights: number[]
  italic: boolean
  rationale: string
}

export interface HexFonts {
  display: HexFont
  body: HexFont
  sans: HexFont
  mono: HexFont
}

// ---------------------------------------------------------------------------
// Complete mode (all tokens for one mode)
// ---------------------------------------------------------------------------

export interface HexModeTokens {
  surfaces: HexSurfaces
  text: HexText
  borders: HexBorders
  accents: HexAccents
  status: HexStatus
  focus: HexFocus
  syntax: HexSyntaxTokens
  terminal: HexTerminalColors
}

// ---------------------------------------------------------------------------
// Complete theme definition
// ---------------------------------------------------------------------------

export interface HexTheme {
  id: ThemeId
  name: string
  narrative: string
  motion: HexMotion
  fonts: HexFonts
  dark: HexModeTokens
  light: HexModeTokens
}

// ---------------------------------------------------------------------------
// Theme registry
// ---------------------------------------------------------------------------

export type HexThemeRegistry = Record<ThemeId, HexTheme>

// ---------------------------------------------------------------------------
// Data attribute names
// ---------------------------------------------------------------------------

export const HEX_THEME_ATTR = 'data-theme' as const
export const HEX_MODE_ATTR = 'data-mode' as const

/** @deprecated use HEX_MODE_ATTR instead */
export const HEX_SCHEME_ATTR = HEX_MODE_ATTR

// ---------------------------------------------------------------------------
// All required token keys (for validation)
// ---------------------------------------------------------------------------

export const SURFACE_KEYS: readonly (keyof HexSurfaces)[] = [
  'base', 'raised', 'elevated', 'sunken', 'overlay',
] as const

export const TEXT_KEYS: readonly (keyof HexText)[] = [
  'primary', 'secondary', 'muted', 'inverse', 'link', 'onAccent',
] as const

export const BORDER_KEYS: readonly (keyof HexBorders)[] = [
  'default', 'subtle', 'strong',
] as const

export const ACCENT_KEYS: readonly (keyof HexAccents)[] = [
  'primary', 'secondary', 'hover', 'active', 'muted',
] as const

export const STATUS_KEYS: readonly (keyof HexStatus)[] = [
  'success', 'warning', 'error', 'info',
] as const

export const FOCUS_KEYS: readonly (keyof HexFocus)[] = [
  'ring', 'outline',
] as const

export const SYNTAX_TOKEN_KEYS: readonly (keyof HexSyntaxTokens)[] = [
  'comment', 'keyword', 'storage', 'string', 'number',
  'function', 'operator', 'punctuation', 'type',
] as const

export const TERMINAL_KEYS: readonly (keyof HexTerminalColors)[] = [
  'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
  'brightBlack', 'brightRed', 'brightGreen', 'brightYellow',
  'brightBlue', 'brightMagenta', 'brightCyan', 'brightWhite',
] as const
