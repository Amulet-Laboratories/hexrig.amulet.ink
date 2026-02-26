import type { HexTheme } from '../tokens/types'

/**
 * COVE — Shelter
 *
 * The hidden chamber at the end of the journey — warm, intimate, otherworldly.
 * The fifth act — where the profane becomes sacred and transformation is complete.
 */
export const cove: HexTheme = {
  id: 'cove',
  name: 'Cove',
  narrative:
    'Shelter. The hidden chamber at the end of the journey — warm, intimate, otherworldly. The fifth act — where the profane becomes sacred and transformation is complete.',

  motion: {
    duration: { fast: '100ms', normal: '250ms', slow: '450ms' },
    easing: {
      default: 'cubic-bezier(0.22, 1.0, 0.36, 1)',
      entrance: 'cubic-bezier(0.0, 0.7, 0.3, 1)',
      exit: 'cubic-bezier(0.5, 0.0, 1, 0.5)',
      expressive: 'cubic-bezier(0.22, 1.4, 0.36, 1)',
    },
  },

  spacing: {
    xs: '6px',
    sm: '10px',
    md: '18px',
    lg: '28px',
    xl: '44px',
    '2xl': '68px',
    '3xl': '100px',
  },

  shape: {
    radius: '16px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'Crimson Pro',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale:
        'Jacques Le Bailly\u0027s redesign of Crimson Text — warmer, slightly condensed, with beautiful old-style figures and elegant italics. A literary, intimate quality.',
    },
    body: {
      family: 'Nunito Sans',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: true,
      rationale:
        'Rounded terminals give it inherent warmth — the typographic equivalent of smooth, worn stone. Soft without being childish.',
    },
    sans: {
      family: 'Nunito',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale:
        'The rounder sibling of Nunito Sans — more personality, more warmth. The playful counterpart.',
    },
    mono: {
      family: 'Victor Mono',
      source: 'GitHub (github.com/rubjo/victor-mono)',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'A free monospace with beautiful cursive italics — code comments become calligraphy. The Cove\u0027s code whispers in italic.',
    },
  },

  dark: {
    surfaces: {
      base: '#331f3c',
      raised: '#3e2848',
      elevated: '#463050',
      sunken: '#271832',
      overlay: '#4a3255',
    },
    text: {
      primary: '#f7d7b9',
      secondary: '#f9b0a2',
      muted: '#9a7a8a',
      inverse: '#331f3c',
      link: '#fa6a7c',
      onAccent: '#ffffff',
    },
    borders: { default: '#5a3a60', subtle: '#4a3055', strong: '#7a5080' },
    accents: {
      primary: '#d43050',
      secondary: '#a82844',
      hover: '#e0485e',
      active: '#a02840',
      muted: '#3e2038',
    },
    status: { success: '#5cc06a', warning: '#e0b848', error: '#e04848', info: '#7a8ec8' },
    focus: { ring: 'rgba(235, 73, 99, 0.5)', outline: '#eb4963' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.2)',
      md: '0 4px 10px rgba(0, 0, 0, 0.3)',
      lg: '0 8px 28px rgba(0, 0, 0, 0.4)',
    },
    syntax: {
      comment: '#9a7a8a',
      keyword: '#e0485e',
      storage: '#5cc06a',
      string: '#d8e8c3',
      number: '#f58384',
      function: '#d43050',
      operator: '#f99c94',
      punctuation: '#9a7a8a',
      type: '#7a8ec8',
    },
    terminal: {
      black: '#331f3c',
      red: '#d43050',
      green: '#5cc06a',
      yellow: '#e0b848',
      blue: '#7a8ec8',
      magenta: '#c850a0',
      cyan: '#40c0c0',
      white: '#f7d7b9',
      brightBlack: '#8a6a7a',
      brightRed: '#f58384',
      brightGreen: '#6cd07a',
      brightYellow: '#eac858',
      brightBlue: '#8a9ed8',
      brightMagenta: '#d860b0',
      brightCyan: '#50d0d0',
      brightWhite: '#fff5ec',
    },
  },

  light: {
    surfaces: {
      base: '#f7d7b9',
      raised: '#fff5ec',
      elevated: '#fffaf5',
      sunken: '#f0ccaa',
      overlay: '#fff5ec',
    },
    text: {
      primary: '#331f3c',
      secondary: '#5a3a60',
      muted: '#8a6a7a',
      inverse: '#f7d7b9',
      link: '#922840',
      onAccent: '#ffffff',
    },
    borders: { default: '#d8b8a8', subtle: '#e4ccc0', strong: '#b09888' },
    accents: {
      primary: '#922840',
      secondary: '#7a2236',
      hover: '#80242e',
      active: '#6a1e30',
      muted: '#f0d8cc',
    },
    status: { success: '#2e7a38', warning: '#8a7040', error: '#a03038', info: '#4a5088' },
    focus: { ring: 'rgba(172, 57, 84, 0.4)', outline: '#ac3954' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
      md: '0 4px 12px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 28px rgba(0, 0, 0, 0.1)',
    },
    syntax: {
      comment: '#8a6a7a',
      keyword: '#922840',
      storage: '#2e7a38',
      string: '#3a6a3a',
      number: '#a03838',
      function: '#7a2236',
      operator: '#922840',
      punctuation: '#8a6a7a',
      type: '#4a5088',
    },
    terminal: {
      black: '#331f3c',
      red: '#a03038',
      green: '#2e7a38',
      yellow: '#8a7040',
      blue: '#4a5088',
      magenta: '#983888',
      cyan: '#1a7888',
      white: '#f7d7b9',
      brightBlack: '#8a6a7a',
      brightRed: '#b04048',
      brightGreen: '#3e8a48',
      brightYellow: '#9a8050',
      brightBlue: '#5a6098',
      brightMagenta: '#a84898',
      brightCyan: '#2a8898',
      brightWhite: '#fff5ec',
    },
  },
}

export default cove
