import type { HexTheme, ModeId } from '../tokens/types'
import {
  SURFACE_KEYS, TEXT_KEYS, BORDER_KEYS, ACCENT_KEYS,
  STATUS_KEYS, FOCUS_KEYS, SYNTAX_TOKEN_KEYS, TERMINAL_KEYS,
} from '../tokens/types'

// ---------------------------------------------------------------------------
// Validation types
// ---------------------------------------------------------------------------

export interface ValidationError {
  theme: string
  mode: ModeId
  category: 'missing' | 'contrast' | 'format'
  token: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: string[]
}

// ---------------------------------------------------------------------------
// Color utilities
// ---------------------------------------------------------------------------

/** Parse a hex color string to RGB. Supports #RGB, #RRGGBB, #RRGGBBAA. */
function hexToRgb(hex: string): [number, number, number] | null {
  const cleaned = hex.replace('#', '')
  if (cleaned.length === 3) {
    return [
      parseInt(cleaned[0] + cleaned[0], 16),
      parseInt(cleaned[1] + cleaned[1], 16),
      parseInt(cleaned[2] + cleaned[2], 16),
    ]
  }
  if (cleaned.length === 6 || cleaned.length === 8) {
    return [
      parseInt(cleaned.substring(0, 2), 16),
      parseInt(cleaned.substring(2, 4), 16),
      parseInt(cleaned.substring(4, 6), 16),
    ]
  }
  return null
}

/** Calculate relative luminance per WCAG 2.1 */
function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/** Calculate contrast ratio between two colors */
function contrastRatio(color1: string, color2: string): number | null {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  if (!rgb1 || !rgb2) return null

  const l1 = relativeLuminance(...rgb1)
  const l2 = relativeLuminance(...rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/** Check if a string is a valid CSS color (hex or rgba) */
function isValidColor(value: string): boolean {
  // #RGB, #RRGGBB, #RRGGBBAA
  if (/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3}([0-9a-fA-F]{2})?)?$/.test(value)) return true
  // rgb(r, g, b) or rgba(r, g, b, a) — numeric values only
  if (/^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/.test(value)) return true
  return false
}

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

function validateStructure(theme: HexTheme, mode: ModeId, errors: ValidationError[]): void {
  const tokens = theme[mode]

  // Surfaces
  for (const key of SURFACE_KEYS) {
    if (!(key in tokens.surfaces) || !tokens.surfaces[key]) {
      errors.push({ theme: theme.id, mode, category: 'missing', token: `surfaces.${key}`, message: `Missing token --surface-${key} in ${mode} mode` })
    }
  }

  // Text
  for (const key of TEXT_KEYS) {
    if (!(key in tokens.text) || !tokens.text[key]) {
      errors.push({ theme: theme.id, mode, category: 'missing', token: `text.${key}`, message: `Missing token --text-${key} in ${mode} mode` })
    }
  }

  // Borders
  for (const key of BORDER_KEYS) {
    if (!(key in tokens.borders) || !tokens.borders[key]) {
      errors.push({ theme: theme.id, mode, category: 'missing', token: `borders.${key}`, message: `Missing token --border-${key} in ${mode} mode` })
    }
  }

  // Accents
  for (const key of ACCENT_KEYS) {
    if (!(key in tokens.accents) || !tokens.accents[key]) {
      errors.push({ theme: theme.id, mode, category: 'missing', token: `accents.${key}`, message: `Missing token --accent-${key} in ${mode} mode` })
    }
  }

  // Status
  for (const key of STATUS_KEYS) {
    if (!(key in tokens.status) || !tokens.status[key]) {
      errors.push({ theme: theme.id, mode, category: 'missing', token: `status.${key}`, message: `Missing token --status-${key} in ${mode} mode` })
    }
  }

  // Focus
  for (const key of FOCUS_KEYS) {
    if (!(key in tokens.focus) || !tokens.focus[key]) {
      errors.push({ theme: theme.id, mode, category: 'missing', token: `focus.${key}`, message: `Missing token --focus-${key} in ${mode} mode` })
    }
  }

  // Syntax
  for (const key of SYNTAX_TOKEN_KEYS) {
    if (!(key in tokens.syntax) || !tokens.syntax[key]) {
      errors.push({ theme: theme.id, mode, category: 'missing', token: `syntax.${key}`, message: `Missing syntax token ${key} in ${mode} mode` })
    }
  }

  // Terminal
  for (const key of TERMINAL_KEYS) {
    if (!(key in tokens.terminal) || !tokens.terminal[key]) {
      errors.push({ theme: theme.id, mode, category: 'missing', token: `terminal.${key}`, message: `Missing terminal color ${key} in ${mode} mode` })
    }
  }
}

/** Safely cast a typed token group to Record<string, string> for iteration */
function toRecord(obj: object): Record<string, string> {
  return obj as Record<string, string>
}

function validateFormats(theme: HexTheme, mode: ModeId, errors: ValidationError[]): void {
  const tokens = theme[mode]

  // Validate all color groups
  const groups: Record<string, Record<string, string>> = {
    surfaces: toRecord(tokens.surfaces),
    text: toRecord(tokens.text),
    borders: toRecord(tokens.borders),
    accents: toRecord(tokens.accents),
    status: toRecord(tokens.status),
    focus: toRecord(tokens.focus),
    syntax: toRecord(tokens.syntax),
    terminal: toRecord(tokens.terminal),
  }

  for (const [group, values] of Object.entries(groups)) {
    for (const [key, value] of Object.entries(values)) {
      if (!isValidColor(value)) {
        errors.push({ theme: theme.id, mode, category: 'format', token: `${group}.${key}`, message: `Invalid color format "${value}" for --${group === 'surfaces' ? 'surface' : group === 'borders' ? 'border' : group === 'accents' ? 'accent' : group}-${key}` })
      }
    }
  }
}

/**
 * Text/surface contrast pairs that must satisfy WCAG 2.1 thresholds.
 * AAA body text: 7:1 | AAA large text / AA body text: 4.5:1 | AA large text / UI: 3:1
 */
interface ContrastPair {
  text: string
  textGroup: 'text' | 'accents' | 'status'
  surface: string
  surfaceGroup: 'surfaces' | 'accents'
  label: string
  minRatio: number
}

const REQUIRED_CONTRASTS: ContrastPair[] = [
  // Primary text — AAA body (7:1) on main surfaces
  { text: 'primary', textGroup: 'text', surface: 'base', surfaceGroup: 'surfaces', label: 'primary text on base', minRatio: 7 },
  { text: 'primary', textGroup: 'text', surface: 'raised', surfaceGroup: 'surfaces', label: 'primary text on raised', minRatio: 7 },
  { text: 'primary', textGroup: 'text', surface: 'elevated', surfaceGroup: 'surfaces', label: 'primary text on elevated', minRatio: 7 },

  // Secondary text — AA body (4.5:1)
  { text: 'secondary', textGroup: 'text', surface: 'base', surfaceGroup: 'surfaces', label: 'secondary text on base', minRatio: 4.5 },
  { text: 'secondary', textGroup: 'text', surface: 'raised', surfaceGroup: 'surfaces', label: 'secondary text on raised', minRatio: 4.5 },

  // Muted text — AA large / UI (3:1)
  { text: 'muted', textGroup: 'text', surface: 'base', surfaceGroup: 'surfaces', label: 'muted text on base', minRatio: 3 },

  // Text on accent — AA body (4.5:1)
  { text: 'onAccent', textGroup: 'text', surface: 'primary', surfaceGroup: 'accents', label: 'text on accent', minRatio: 4.5 },

  // Link text on surfaces — AA body (4.5:1)
  { text: 'link', textGroup: 'text', surface: 'base', surfaceGroup: 'surfaces', label: 'link text on base', minRatio: 4.5 },
  { text: 'link', textGroup: 'text', surface: 'raised', surfaceGroup: 'surfaces', label: 'link text on raised', minRatio: 4.5 },

  // Status colors on their typical surfaces — UI/large text (3:1)
  { text: 'success', textGroup: 'status', surface: 'base', surfaceGroup: 'surfaces', label: 'status-success on base', minRatio: 3 },
  { text: 'warning', textGroup: 'status', surface: 'base', surfaceGroup: 'surfaces', label: 'status-warning on base', minRatio: 3 },
  { text: 'error', textGroup: 'status', surface: 'base', surfaceGroup: 'surfaces', label: 'status-error on base', minRatio: 3 },
  { text: 'info', textGroup: 'status', surface: 'base', surfaceGroup: 'surfaces', label: 'status-info on base', minRatio: 3 },

  // Text on overlay surface — AA (4.5:1)
  { text: 'primary', textGroup: 'text', surface: 'overlay', surfaceGroup: 'surfaces', label: 'primary text on overlay', minRatio: 4.5 },
]

function validateContrast(theme: HexTheme, mode: ModeId, errors: ValidationError[], warnings: string[]): void {
  const tokens = theme[mode]

  for (const pair of REQUIRED_CONTRASTS) {
    const textTokens = pair.textGroup === 'status' ? tokens.status : tokens[pair.textGroup]
    const textColor = toRecord(textTokens)[pair.text]
    const surfaceColor = toRecord(tokens[pair.surfaceGroup])[pair.surface]

    if (!textColor || !surfaceColor) continue

    const ratio = contrastRatio(textColor, surfaceColor)
    if (ratio === null) {
      if (textColor.startsWith('rgba') || surfaceColor.startsWith('rgba')) {
        warnings.push(`${theme.id}/${mode}: Cannot compute contrast for ${pair.label} (rgba value)`)
      }
      continue
    }

    if (ratio < pair.minRatio) {
      errors.push({
        theme: theme.id,
        mode,
        category: 'contrast',
        token: `${pair.text}/${pair.surface}`,
        message: `${pair.label}: contrast ratio ${ratio.toFixed(2)}:1 is below ${pair.minRatio}:1`,
      })
    }
  }
}

// ---------------------------------------------------------------------------
// Motion & font validation
// ---------------------------------------------------------------------------

const DURATION_RE = /^\d+(\.\d+)?(ms|s)$/
const EASING_RE = /^(ease|linear|ease-in|ease-out|ease-in-out|cubic-bezier\(.+\))$/

function validateMotionAndFonts(theme: HexTheme, errors: ValidationError[], warnings: string[]): void {
  // Duration values
  for (const [key, value] of Object.entries(theme.motion.duration)) {
    if (!DURATION_RE.test(value)) {
      warnings.push(`${theme.id}: motion.duration.${key} "${value}" is not a valid CSS duration (e.g. "150ms")`)
    }
  }

  // Easing values
  for (const [key, value] of Object.entries(theme.motion.easing)) {
    if (!EASING_RE.test(value)) {
      warnings.push(`${theme.id}: motion.easing.${key} "${value}" is not a recognized CSS timing function`)
    }
  }

  // Font definitions
  for (const [slot, font] of Object.entries(theme.fonts)) {
    if (!font.family || font.family.trim() === '') {
      errors.push({ theme: theme.id, mode: 'dark', category: 'missing', token: `fonts.${slot}.family`, message: `Font slot "${slot}" has no family name` })
    }
    if (!font.weights || font.weights.length === 0) {
      warnings.push(`${theme.id}: fonts.${slot} has no weights defined`)
    }
  }
}

// ---------------------------------------------------------------------------
// Main validate function
// ---------------------------------------------------------------------------

/**
 * Validate a complete HexTheme for structural completeness, format correctness,
 * and WCAG AAA contrast compliance (7:1 for primary text, 4.5:1 for secondary, 3:1 for UI).
 */
export function validateTheme(theme: HexTheme): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: string[] = []

  for (const mode of ['dark', 'light'] as const) {
    validateStructure(theme, mode, errors)
    validateFormats(theme, mode, errors)
    validateContrast(theme, mode, errors, warnings)
  }

  validateMotionAndFonts(theme, errors, warnings)

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}
