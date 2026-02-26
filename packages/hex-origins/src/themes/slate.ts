import type { HexTheme } from '@amulet-laboratories/hex'

/**
 * SLATE — Nothing
 *
 * Monochrome. Black, white, greys, and exactly one accent.
 * No warmth. No personality hiding in the neutrals. Near-zero motion.
 * The nothing theme — the one that disappears so the content can exist.
 */
export const slate: HexTheme = {
  id: 'slate',
  name: 'Slate',
  narrative:
    'Nothing. Monochrome — black, white, greys, and exactly one accent. The theme that disappears so the content can exist.',

  motion: {
    duration: { fast: '50ms', normal: '100ms', slow: '150ms' },
    easing: {
      default: 'cubic-bezier(0.0, 0.0, 1, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 1, 1)',
      exit: 'cubic-bezier(0.0, 0.0, 1, 1)',
      expressive: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
    '2xl': '64px',
    '3xl': '96px',
  },

  shape: {
    radius: '0px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'Sora',
      source: 'Google Fonts / Jonathan Barnbrook',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: false,
      rationale:
        'A clean geometric grotesque with no decorative features. The font equivalent of a clean white wall — nothing to notice, nothing to remember.',
    },
    body: {
      family: 'Work Sans',
      source: 'Google Fonts / Wei Huang',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale:
        'Optimized for on-screen reading at medium sizes. Neutral enough to disappear, good enough to last. The invisible workhorse.',
    },
    sans: {
      family: 'Sora',
      source: 'Google Fonts / Jonathan Barnbrook',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: false,
      rationale:
        'Consistent with display for a theme that has one opinion: have no opinions. Clean geometry, no character.',
    },
    mono: {
      family: 'Roboto Mono',
      source: 'Google Fonts / Christian Robertson',
      license: 'Apache License 2.0',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'The most neutral monospace available. Designed by Google for Android — ubiquitous, invisible, trustworthy.',
    },
  },

  dark: {
    surfaces: {
      base: '#000000',
      raised: '#111111',
      elevated: '#1a1a1a',
      sunken: '#000000',
      overlay: '#1e1e1e',
    },
    text: {
      primary: '#e8e8e8',
      secondary: '#a0a0a0',
      muted: '#606060',
      inverse: '#000000',
      link: '#6090d0',
      onAccent: '#000000',
    },
    borders: { default: '#282828', subtle: '#1a1a1a', strong: '#404040' },
    accents: {
      primary: '#6090d0',
      secondary: '#4870a8',
      hover: '#78a0e0',
      active: '#3a6090',
      muted: '#101820',
    },
    status: { success: '#58c060', warning: '#d0b040', error: '#d04848', info: '#6090d0' },
    focus: { ring: 'rgba(96, 144, 208, 0.5)', outline: '#6090d0' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
      md: '0 4px 8px rgba(0, 0, 0, 0.6)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.7)',
    },
    syntax: {
      comment: '#606060',
      keyword: '#78a0e0',
      storage: '#d0b040',
      string: '#a0a0a0',
      number: '#d08080',
      function: '#6090d0',
      operator: '#78a0e0',
      punctuation: '#606060',
      type: '#a0a0a0',
    },
    terminal: {
      black: '#000000',
      red: '#d04848',
      green: '#58c060',
      yellow: '#d0b040',
      blue: '#6090d0',
      magenta: '#a070b8',
      cyan: '#48a8b8',
      white: '#e8e8e8',
      brightBlack: '#606060',
      brightRed: '#e05858',
      brightGreen: '#68d070',
      brightYellow: '#e0c050',
      brightBlue: '#70a0e0',
      brightMagenta: '#b080c8',
      brightCyan: '#58b8c8',
      brightWhite: '#ffffff',
    },
  },

  light: {
    surfaces: {
      base: '#ffffff',
      raised: '#ffffff',
      elevated: '#ffffff',
      sunken: '#f0f0f0',
      overlay: '#ffffff',
    },
    text: {
      primary: '#111111',
      secondary: '#444444',
      muted: '#767676',
      inverse: '#ffffff',
      link: '#2952a3',
      onAccent: '#ffffff',
    },
    borders: { default: '#d0d0d0', subtle: '#e0e0e0', strong: '#a0a0a0' },
    accents: {
      primary: '#2952a3',
      secondary: '#1e4088',
      hover: '#203a88',
      active: '#183070',
      muted: '#e8eef6',
    },
    status: { success: '#287028', warning: '#887020', error: '#a03030', info: '#2952a3' },
    focus: { ring: 'rgba(41, 82, 163, 0.4)', outline: '#2952a3' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
      md: '0 4px 8px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
    syntax: {
      comment: '#767676',
      keyword: '#2952a3',
      storage: '#786810',
      string: '#287028',
      number: '#903030',
      function: '#1e4088',
      operator: '#2952a3',
      punctuation: '#767676',
      type: '#444444',
    },
    terminal: {
      black: '#111111',
      red: '#a03030',
      green: '#287028',
      yellow: '#887020',
      blue: '#2952a3',
      magenta: '#804890',
      cyan: '#107080',
      white: '#ffffff',
      brightBlack: '#767676',
      brightRed: '#b04040',
      brightGreen: '#388038',
      brightYellow: '#988030',
      brightBlue: '#3962b3',
      brightMagenta: '#9058a0',
      brightCyan: '#208090',
      brightWhite: '#ffffff',
    },
  },
}

export default slate
