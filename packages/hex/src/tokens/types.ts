/**
 * Hex Token Types
 *
 * Five themes, five places. A journey from hearth to cove.
 * Hearth (creation) → Abyss (void) → Hollow (growth) → Keep (construction) → Cove (shelter)
 */

// ---------------------------------------------------------------------------
// Theme identifiers
// ---------------------------------------------------------------------------

/**
 * Theme identifier — any string. Collections define their own literal unions
 * (e.g. OriginsThemeId in hex-origins) for narrower typing.
 */
export type ThemeId = string
export type ModeId = 'dark' | 'light'

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
  easing: { default: string; entrance: string; exit: string; expressive: string }
}

// ---------------------------------------------------------------------------
// Spacing tokens
// ---------------------------------------------------------------------------

export interface HexSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
}

// ---------------------------------------------------------------------------
// Shape tokens
// ---------------------------------------------------------------------------

export interface HexShape {
  radius: string
  radiusFull: string
}

// ---------------------------------------------------------------------------
// Elevation tokens (per-mode — shadows differ by dark/light)
// ---------------------------------------------------------------------------

export interface HexElevation {
  sm: string
  md: string
  lg: string
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
  shadows: HexElevation
  syntax: HexSyntaxTokens
  terminal: HexTerminalColors
}

// ---------------------------------------------------------------------------
// Complete theme definition
// ---------------------------------------------------------------------------

export interface HexTheme {
  id: string
  name: string
  narrative: string
  motion: HexMotion
  spacing: HexSpacing
  shape: HexShape
  fonts: HexFonts
  dark: HexModeTokens
  light: HexModeTokens
}

// ---------------------------------------------------------------------------
// Theme registry
// ---------------------------------------------------------------------------

/**
 * A record of themes keyed by their ID.
 * Collections can narrow the key type via their own union.
 */
export type HexThemeRegistry = Record<string, HexTheme>

// ---------------------------------------------------------------------------
// Collection — a named set of themes
// ---------------------------------------------------------------------------

export interface HexCollection {
  id: string
  name: string
  narrative: string
  themes: HexTheme[]
}

// ---------------------------------------------------------------------------
// Data attribute names
// ---------------------------------------------------------------------------

export const HEX_THEME_ATTR = 'data-theme' as const
export const HEX_MODE_ATTR = 'data-mode' as const

// ---------------------------------------------------------------------------
// All required token keys (for validation)
// ---------------------------------------------------------------------------

export const SURFACE_KEYS: readonly (keyof HexSurfaces)[] = [
  'base',
  'raised',
  'elevated',
  'sunken',
  'overlay',
] as const

export const TEXT_KEYS: readonly (keyof HexText)[] = [
  'primary',
  'secondary',
  'muted',
  'inverse',
  'link',
  'onAccent',
] as const

export const BORDER_KEYS: readonly (keyof HexBorders)[] = ['default', 'subtle', 'strong'] as const

export const ACCENT_KEYS: readonly (keyof HexAccents)[] = [
  'primary',
  'secondary',
  'hover',
  'active',
  'muted',
] as const

export const STATUS_KEYS: readonly (keyof HexStatus)[] = [
  'success',
  'warning',
  'error',
  'info',
] as const

export const FOCUS_KEYS: readonly (keyof HexFocus)[] = ['ring', 'outline'] as const

export const ELEVATION_KEYS: readonly (keyof HexElevation)[] = ['sm', 'md', 'lg'] as const

export const SPACING_KEYS: readonly (keyof HexSpacing)[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
] as const

export const SHAPE_KEYS: readonly (keyof HexShape)[] = ['radius', 'radiusFull'] as const

export const SYNTAX_TOKEN_KEYS: readonly (keyof HexSyntaxTokens)[] = [
  'comment',
  'keyword',
  'storage',
  'string',
  'number',
  'function',
  'operator',
  'punctuation',
  'type',
] as const

export const TERMINAL_KEYS: readonly (keyof HexTerminalColors)[] = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'brightBlack',
  'brightRed',
  'brightGreen',
  'brightYellow',
  'brightBlue',
  'brightMagenta',
  'brightCyan',
  'brightWhite',
] as const
