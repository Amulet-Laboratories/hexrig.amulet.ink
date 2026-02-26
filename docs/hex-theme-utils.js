// Hex Design System — Theme Utility
// v2.0.0

const HEX_THEMES = ['hearth', 'abyss', 'hollow', 'keep', 'cove']
const HEX_MODES = ['dark', 'light']

/**
 * Apply a Hex theme and mode to the document.
 * @param {string} theme - One of: hearth, abyss, hollow, keep, cove
 * @param {string} mode - One of: dark, light
 */
export function applyTheme(theme, mode) {
  if (!HEX_THEMES.includes(theme)) throw new Error(`Invalid theme: ${theme}`)
  if (!HEX_MODES.includes(mode)) throw new Error(`Invalid mode: ${mode}`)
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.setAttribute('data-mode', mode)
}

/**
 * Get the current theme and mode.
 * @returns {{ theme: string, mode: string }}
 */
export function getTheme() {
  return {
    theme: document.documentElement.getAttribute('data-theme') || 'hearth',
    mode: document.documentElement.getAttribute('data-mode') || 'dark',
  }
}

/**
 * Toggle between dark and light mode.
 */
export function toggleMode() {
  const { theme, mode } = getTheme()
  applyTheme(theme, mode === 'dark' ? 'light' : 'dark')
}

/**
 * Cycle to the next theme.
 */
export function nextTheme() {
  const { theme, mode } = getTheme()
  const idx = HEX_THEMES.indexOf(theme)
  const next = HEX_THEMES[(idx + 1) % HEX_THEMES.length]
  applyTheme(next, mode)
}

export { HEX_THEMES, HEX_MODES }
