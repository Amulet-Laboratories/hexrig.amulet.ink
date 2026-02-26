import type { HexTheme } from '@amulet-laboratories/hex'

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
    duration: { fast: '80ms', normal: '180ms', slow: '300ms' },
    easing: {
      default: 'cubic-bezier(0.2, 0.0, 0.4, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 0.1, 1)',
      exit: 'cubic-bezier(0.3, 0.0, 1, 1)',
      expressive: 'cubic-bezier(0.2, 0.0, 0.0, 1)',
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
        "Designed by Mike Abbink and Bold Monday for IBM's global rebrand. Structured, reliable, and industrial without being lifeless.",
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
      primary: '#d4d4d4',
      secondary: '#8c8c8c',
      muted: '#6e6e6e',
      inverse: '#121212',
      link: '#90a088',
      onAccent: '#101410',
    },
    borders: { default: '#303030', subtle: '#242424', strong: '#444444' },
    accents: {
      primary: '#90a088',
      secondary: '#788870',
      hover: '#a0b098',
      active: '#687860',
      muted: '#141814',
    },
    status: { success: '#5acc6a', warning: '#e0c050', error: '#e85040', info: '#6a9ae0' },
    focus: { ring: 'rgba(144, 160, 136, 0.5)', outline: '#90a088' },
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
      function: '#90a088',
      operator: '#90a088',
      punctuation: '#6e6e6e',
      type: '#788870',
    },
    terminal: {
      black: '#121212',
      red: '#e85040',
      green: '#5acc6a',
      yellow: '#e0c050',
      blue: '#6a9ae0',
      magenta: '#cf7f8f',
      cyan: '#40c0c8',
      white: '#d4d4d4',
      brightBlack: '#666666',
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
      base: '#f0f0f0',
      raised: '#fafafa',
      elevated: '#ffffff',
      sunken: '#e4e4e4',
      overlay: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#444444',
      muted: '#7a7a7a',
      inverse: '#f0f0f0',
      link: '#506048',
      onAccent: '#ffffff',
    },
    borders: { default: '#cccccc', subtle: '#d8d8d8', strong: '#a0a0a0' },
    accents: {
      primary: '#506048',
      secondary: '#445040',
      hover: '#485838',
      active: '#384830',
      muted: '#e4e8e0',
    },
    status: { success: '#2a7030', warning: '#9a7820', error: '#a83838', info: '#306898' },
    focus: { ring: 'rgba(80, 96, 72, 0.4)', outline: '#586850' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
      md: '0 4px 8px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
    syntax: {
      comment: '#7a7a7a',
      keyword: '#9a4020',
      storage: '#8a7020',
      string: '#3a6838',
      number: '#905060',
      function: '#506048',
      operator: '#506048',
      punctuation: '#7a7a7a',
      type: '#5a6a50',
    },
    terminal: {
      black: '#1a1a1a',
      red: '#a83838',
      green: '#2a7030',
      yellow: '#9a7820',
      blue: '#306898',
      magenta: '#885090',
      cyan: '#089098',
      white: '#f0f0f0',
      brightBlack: '#7a7a7a',
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
