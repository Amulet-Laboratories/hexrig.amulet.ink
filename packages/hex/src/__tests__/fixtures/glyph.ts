import type { HexTheme } from '../tokens/types'

/**
 * GLYPH — Inscription
 *
 * Parchment and ink. Red-black marginalia in a medieval manuscript.
 * The slowest, most ceremonial theme — things don't animate, they're revealed.
 * The only parchment-base theme. The only red ink accent.
 */
export const glyph: HexTheme = {
  id: 'glyph',
  name: 'Glyph',
  narrative:
    'Inscription. Parchment and ink — red-black marginalia in a medieval manuscript. Things don\u0027t animate. They\u0027re revealed.',

  motion: {
    duration: { fast: '200ms', normal: '450ms', slow: '800ms' },
    easing: {
      default: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 0.1, 1)',
      exit: 'cubic-bezier(0.4, 0.0, 1, 1)',
      expressive: 'cubic-bezier(0.2, 0.0, 0.0, 1)',
    },
  },

  spacing: {
    xs: '6px',
    sm: '12px',
    md: '20px',
    lg: '32px',
    xl: '52px',
    '2xl': '80px',
    '3xl': '120px',
  },

  shape: {
    radius: '2px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'IM Fell English',
      source: 'Google Fonts / Igino Marini',
      license: 'SIL OFL 1.1',
      weights: [400],
      italic: true,
      rationale:
        'Digitized from punches cut by John Fell in the 17th century. Rough edges, ink traps, the feeling of metal pressed into paper. The manuscript speaks.',
    },
    body: {
      family: 'EB Garamond',
      source: 'Google Fonts / Georg Duffner',
      license: 'SIL OFL 1.1',
      weights: [400, 500, 600, 700, 800],
      italic: true,
      rationale:
        'A faithful revival of Claude Garamond\u0027s original 16th-century types. The most historically rooted text face available — old-style figures, ligatures, and centuries of trust.',
    },
    sans: {
      family: 'Alegreya Sans',
      source: 'Google Fonts / Huerta Tipográfica',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 700, 800, 900],
      italic: true,
      rationale:
        'The sans companion to Alegreya — a humanist design with calligraphic DNA. UI text that doesn\u0027t break the spell.',
    },
    mono: {
      family: 'Courier Prime',
      source: 'Google Fonts / Quote-Unquote Apps',
      license: 'SIL OFL 1.1',
      weights: [400, 700],
      italic: true,
      rationale:
        'A Courier redesigned for the screen age by Alan Dague-Greene. The typewriter heritage fits the manuscript theme — code as marginalia.',
    },
  },

  dark: {
    surfaces: {
      base: '#1a1410',
      raised: '#241e18',
      elevated: '#2c2620',
      sunken: '#120e0a',
      overlay: '#2e2820',
    },
    text: {
      primary: '#e8dcc8',
      secondary: '#c0b098',
      muted: '#7a6c58',
      inverse: '#1a1410',
      link: '#da6252',
      onAccent: '#ffffff',
    },
    borders: { default: '#3a3028', subtle: '#2a221a', strong: '#584a3a' },
    accents: {
      primary: '#c44030',
      secondary: '#a03828',
      hover: '#d44a38',
      active: '#8c3020',
      muted: '#221814',
    },
    status: { success: '#6aa858', warning: '#c8a840', error: '#c44030', info: '#6888b0' },
    focus: { ring: 'rgba(196, 64, 48, 0.5)', outline: '#c44030' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
      md: '0 4px 8px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    },
    syntax: {
      comment: '#7a6c58',
      keyword: '#c44030',
      storage: '#c8a840',
      string: '#8a9a68',
      number: '#c08060',
      function: '#d44a38',
      operator: '#c44030',
      punctuation: '#7a6c58',
      type: '#6888b0',
    },
    terminal: {
      black: '#1a1410',
      red: '#c44030',
      green: '#6aa858',
      yellow: '#c8a840',
      blue: '#6888b0',
      magenta: '#a06890',
      cyan: '#488898',
      white: '#e8dcc8',
      brightBlack: '#7a6c58',
      brightRed: '#d45040',
      brightGreen: '#7ab868',
      brightYellow: '#d8b850',
      brightBlue: '#7898c0',
      brightMagenta: '#b078a0',
      brightCyan: '#5898a8',
      brightWhite: '#f0e8d8',
    },
  },

  light: {
    surfaces: {
      base: '#f0e6d0',
      raised: '#f8f2e4',
      elevated: '#fcf8f0',
      sunken: '#e4d8c0',
      overlay: '#f8f2e4',
    },
    text: {
      primary: '#1a1410',
      secondary: '#3e3428',
      muted: '#7a6c58',
      inverse: '#f0e6d0',
      link: '#8a2818',
      onAccent: '#f0e8d8',
    },
    borders: { default: '#d0c4a8', subtle: '#dcd0b8', strong: '#a89878' },
    accents: {
      primary: '#8a2818',
      secondary: '#742214',
      hover: '#7c2418',
      active: '#641e10',
      muted: '#e8dcc4',
    },
    status: { success: '#2e6e30', warning: '#8a7420', error: '#8a2818', info: '#2a5a80' },
    focus: { ring: 'rgba(138, 40, 24, 0.4)', outline: '#8a2818' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
      md: '0 4px 12px rgba(0, 0, 0, 0.1)',
      lg: '0 8px 28px rgba(0, 0, 0, 0.12)',
    },
    syntax: {
      comment: '#7a6c58',
      keyword: '#8a2818',
      storage: '#7a6410',
      string: '#3a5a28',
      number: '#885040',
      function: '#742214',
      operator: '#8a2818',
      punctuation: '#7a6c58',
      type: '#2a5a80',
    },
    terminal: {
      black: '#1a1410',
      red: '#8a2818',
      green: '#2e6e30',
      yellow: '#8a7420',
      blue: '#2a5a80',
      magenta: '#704860',
      cyan: '#186878',
      white: '#f0e6d0',
      brightBlack: '#7a6c58',
      brightRed: '#9a3828',
      brightGreen: '#3e7e40',
      brightYellow: '#9a8430',
      brightBlue: '#3a6a90',
      brightMagenta: '#805870',
      brightCyan: '#287888',
      brightWhite: '#fcf8f0',
    },
  },
}

export default glyph
