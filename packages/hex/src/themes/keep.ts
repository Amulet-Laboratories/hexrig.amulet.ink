import type { HexTheme } from '../tokens/types'

/**
 * KEEP — Construction
 *
 * Steel and purpose — the raw made precise. The fourth act —
 * industry and discipline, where creation becomes infrastructure.
 * Neutral, powerful, utilitarian.
 */
export const keep: HexTheme = {
  id: 'keep',
  name: 'Keep',
  narrative:
    'Construction. Steel and purpose — the raw made precise. The fourth act — industry and discipline, where creation becomes infrastructure. Neutral, powerful, utilitarian.',

  motion: {
    duration: { fast: '100ms', normal: '200ms', slow: '350ms' },
    easing: {
      default: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0.0, 1, 1)',
      expressive: 'cubic-bezier(0.25, 0.1, 0.0, 1)',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '20px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '72px',
  },

  shape: {
    radius: '4px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'IBM Plex Serif',
      source: 'Google Fonts / IBM',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'Designed by Mike Abbink and Bold Monday for IBM\u0027s global rebrand. Structured, reliable, and industrial without being lifeless.',
    },
    body: {
      family: 'IBM Plex Sans',
      source: 'Google Fonts / IBM',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'The sans-serif face of the Plex superfamily. Geometric underpinnings with humanist details. Enterprise-grade UI legibility.',
    },
    sans: {
      family: 'IBM Plex Sans Condensed',
      source: 'Google Fonts / IBM',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'The condensed cut for data-dense interfaces, tables, and secondary UI. Same personality, tighter footprint.',
    },
    mono: {
      family: 'IBM Plex Mono',
      source: 'Google Fonts / IBM',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'Completes the Plex system. One superfamily, four cuts, total consistency. The most industrial monospace available.',
    },
  },

  dark: {
    surfaces: {
      base: '#121212',
      raised: '#1e1e1e',
      elevated: '#272727',
      sunken: '#0a0a0a',
      overlay: '#2e2e2e',
    },
    text: {
      primary: '#d0d8d9',
      secondary: '#8a9092',
      muted: '#6e7476',
      inverse: '#121212',
      link: '#ff8f2e',
      onAccent: '#1a0e04',
    },
    borders: { default: '#2e2e2e', subtle: '#222222', strong: '#404040' },
    accents: {
      primary: '#ff8f2e',
      secondary: '#d87a20',
      hover: '#ffaa55',
      active: '#c06e18',
      muted: '#1e1810',
    },
    status: { success: '#5acc6a', warning: '#e0c050', error: '#e85040', info: '#6a9ae0' },
    focus: { ring: 'rgba(255, 143, 46, 0.5)', outline: '#ff8f2e' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.4)',
      md: '0 4px 8px rgba(0, 0, 0, 0.5)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.6)',
    },
    syntax: {
      comment: '#6e7476',
      keyword: '#ea603e',
      storage: '#e0c050',
      string: '#8a9e78',
      number: '#cf7f8f',
      function: '#ff8f2e',
      operator: '#ff8f2e',
      punctuation: '#6e7476',
      type: '#d87a20',
    },
    terminal: {
      black: '#121212',
      red: '#e85040',
      green: '#5acc6a',
      yellow: '#e0c050',
      blue: '#6a9ae0',
      magenta: '#cf7f8f',
      cyan: '#40c0c8',
      white: '#d0d8d9',
      brightBlack: '#606668',
      brightRed: '#f86050',
      brightGreen: '#6adc7a',
      brightYellow: '#eacc60',
      brightBlue: '#7aaae8',
      brightMagenta: '#df8f9f',
      brightCyan: '#50d0d8',
      brightWhite: '#f0f0f0',
    },
  },

  light: {
    surfaces: {
      base: '#f0eeea',
      raised: '#fafafa',
      elevated: '#ffffff',
      sunken: '#e4e2dc',
      overlay: '#ffffff',
    },
    text: {
      primary: '#1a1a18',
      secondary: '#44443e',
      muted: '#7a7a72',
      inverse: '#f0eeea',
      link: '#9a5008',
      onAccent: '#ffffff',
    },
    borders: { default: '#ccccc4', subtle: '#d8d8d2', strong: '#a0a098' },
    accents: {
      primary: '#9a5008',
      secondary: '#844406',
      hover: '#884808',
      active: '#703c04',
      muted: '#ece4d8',
    },
    status: { success: '#2a7030', warning: '#9a7820', error: '#a83838', info: '#306898' },
    focus: { ring: 'rgba(184, 96, 16, 0.4)', outline: '#b86010' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
      md: '0 4px 8px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
    syntax: {
      comment: '#7a7a72',
      keyword: '#9a4020',
      storage: '#8a7020',
      string: '#3a6838',
      number: '#905060',
      function: '#9a5008',
      operator: '#9a5008',
      punctuation: '#7a7a72',
      type: '#a05010',
    },
    terminal: {
      black: '#1a1a18',
      red: '#a83838',
      green: '#2a7030',
      yellow: '#9a7820',
      blue: '#306898',
      magenta: '#885090',
      cyan: '#089098',
      white: '#f0eeea',
      brightBlack: '#7a7a72',
      brightRed: '#c04040',
      brightGreen: '#3a8a40',
      brightYellow: '#b08828',
      brightBlue: '#4078a8',
      brightMagenta: '#9860a0',
      brightCyan: '#18a0a8',
      brightWhite: '#ffffff',
    },
  },
}

export default keep
