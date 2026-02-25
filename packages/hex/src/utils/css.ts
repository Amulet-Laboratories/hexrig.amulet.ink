import type { HexTheme, ModeId } from '../tokens/types'

/** Sanitize a CSS value to prevent injection (strips semicolons, braces, comments, url(), expression(), and newlines) */
function sanitizeCSSValue(value: string): string {
  return value
    .replace(/[{};\r\n]/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/url\s*\(/gi, '')
    .replace(/expression\s*\(/gi, '')
}

/**
 * Generate CSS custom properties for a single theme mode.
 *
 * Output format:
 * ```css
 * [data-theme="hearth"][data-mode="dark"] {
 *   color-scheme: dark;
 *   --font-display: 'Sorts Mill Goudy', Georgia, serif;
 *   --surface-base: #0f0d0a;
 *   ...
 * }
 * ```
 */
function generateModeCSS(theme: HexTheme, mode: ModeId): string {
  const tokens = theme[mode]
  const lines: string[] = []

  lines.push(`[data-theme="${theme.id}"][data-mode="${mode}"] {`)
  lines.push(`  color-scheme: ${mode};`)
  lines.push('')

  // Typography (font stacks)
  const fontFallbacks: Record<string, string> = {
    display: 'Georgia, serif',
    body: 'Georgia, serif',
    sans: 'system-ui, sans-serif',
    mono: "'Courier New', monospace",
  }
  for (const [slot, fallback] of Object.entries(fontFallbacks)) {
    const font = theme.fonts[slot as keyof typeof theme.fonts]
    lines.push(`  --font-${slot}: '${font.family}', ${fallback};`)
  }
  lines.push('')

  // Motion
  for (const [key, value] of Object.entries(theme.motion.duration)) {
    lines.push(`  --duration-${key}: ${sanitizeCSSValue(value)};`)
  }
  for (const [key, value] of Object.entries(theme.motion.easing)) {
    lines.push(`  --easing-${key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Spacing
  for (const [key, value] of Object.entries(theme.spacing)) {
    lines.push(`  --spacing-${key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Shape
  const shapeKeyMap: Record<string, string> = { radius: 'radius', radiusFull: 'radius-full' }
  for (const [key, value] of Object.entries(theme.shape)) {
    lines.push(`  --${shapeKeyMap[key] ?? key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Surfaces
  for (const [key, value] of Object.entries(tokens.surfaces)) {
    lines.push(`  --surface-${key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Text
  for (const [key, value] of Object.entries(tokens.text)) {
    const cssKey = key === 'onAccent' ? 'on-accent' : key
    lines.push(`  --text-${cssKey}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Borders
  for (const [key, value] of Object.entries(tokens.borders)) {
    lines.push(`  --border-${key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Accents
  for (const [key, value] of Object.entries(tokens.accents)) {
    lines.push(`  --accent-${key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Status
  for (const [key, value] of Object.entries(tokens.status)) {
    lines.push(`  --status-${key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Focus
  for (const [key, value] of Object.entries(tokens.focus)) {
    lines.push(`  --focus-${key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Shadows (elevation)
  for (const [key, value] of Object.entries(tokens.shadows)) {
    lines.push(`  --shadow-${key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Syntax
  for (const [key, value] of Object.entries(tokens.syntax)) {
    lines.push(`  --syntax-${key}: ${sanitizeCSSValue(value)};`)
  }
  lines.push('')

  // Terminal
  for (const [key, value] of Object.entries(tokens.terminal)) {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    lines.push(`  --terminal-${cssKey}: ${sanitizeCSSValue(value)};`)
  }

  lines.push('}')

  return lines.join('\n')
}

/**
 * Generate a complete CSS file for a theme (both dark and light modes).
 */
export function generateThemeCSS(theme: HexTheme): string {
  const header = `/**
 * Hex Theme: ${theme.name}
 * ${theme.narrative}
 *
 * Generated — do not edit manually.
 * @see https://github.com/apassanisi/hexrig.amulet.ink
 */

`

  const darkCSS = generateModeCSS(theme, 'dark')
  const lightCSS = generateModeCSS(theme, 'light')

  return header + darkCSS + '\n\n' + lightCSS + '\n'
}
