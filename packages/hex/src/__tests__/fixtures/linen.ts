import type { HexTheme } from '../tokens/types'

/**
 * LINEN — Precision
 *
 * Off-white with warmth. Not snow — linen. Subtle warm neutrals,
 * muted accents that don't raise their voice. Crisp, invisible motion.
 * The professional default — secretly perfect.
 */
export const linen: HexTheme = {
  id: 'linen',
  name: 'Linen',
  narrative:
    'Precision. Off-white with warmth — not snow, linen. The professional default that looks boring until you realize every proportion is perfect.',

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
    md: '16px',
    lg: '24px',
    xl: '40px',
    '2xl': '64px',
    '3xl': '96px',
  },

  shape: {
    radius: '6px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'Manrope',
      source: 'Google Fonts / Mikhail Sharanda',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: false,
      rationale:
        'A modern geometric sans with optical-size variations and subtle warmth in its curves. The Söhne for everyone — professional without being cold.',
    },
    body: {
      family: 'Outfit',
      source: 'Google Fonts / Smartsheet Inc',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: false,
      rationale:
        'A geometric sans with just enough rounding to feel human. Clean enough for enterprise, warm enough for people. The neo-grotesque Linen deserves.',
    },
    sans: {
      family: 'Public Sans',
      source: 'Google Fonts / USWDS (U.S. Web Design System)',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale:
        'Designed by the U.S. government for maximum clarity and accessibility. A strong, neutral voice for UI elements — trustworthy by design.',
    },
    mono: {
      family: 'Red Hat Mono',
      source: 'Google Fonts / MCKL',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'Part of Red Hat\u0027s professional type system. Clean, modern, enterprise-grade — a monospace that belongs in boardrooms and build logs equally.',
    },
  },

  dark: {
    surfaces: {
      base: '#1a1816',
      raised: '#242220',
      elevated: '#2c2a28',
      sunken: '#121010',
      overlay: '#302e2c',
    },
    text: {
      primary: '#e8e4e0',
      secondary: '#b0aaa4',
      muted: '#706a64',
      inverse: '#1a1816',
      link: '#6098c8',
      onAccent: '#ffffff',
    },
    borders: { default: '#383430', subtle: '#282420', strong: '#504c48' },
    accents: {
      primary: '#4078a8',
      secondary: '#305880',
      hover: '#5088b8',
      active: '#285870',
      muted: '#1a2028',
    },
    status: { success: '#58b860', warning: '#d0a838', error: '#d05050', info: '#5088b8' },
    focus: { ring: 'rgba(80, 136, 184, 0.5)', outline: '#5088b8' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
      md: '0 4px 8px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    },
    syntax: {
      comment: '#706a64',
      keyword: '#6098c8',
      storage: '#d0a838',
      string: '#88a878',
      number: '#c08070',
      function: '#5088b8',
      operator: '#6098c8',
      punctuation: '#706a64',
      type: '#b0aaa4',
    },
    terminal: {
      black: '#1a1816',
      red: '#d05050',
      green: '#58b860',
      yellow: '#d0a838',
      blue: '#5088b8',
      magenta: '#a070a8',
      cyan: '#48a0b0',
      white: '#e8e4e0',
      brightBlack: '#706a64',
      brightRed: '#e06060',
      brightGreen: '#68c870',
      brightYellow: '#e0b848',
      brightBlue: '#6098c8',
      brightMagenta: '#b080b8',
      brightCyan: '#58b0c0',
      brightWhite: '#f4f0ec',
    },
  },

  light: {
    surfaces: {
      base: '#f8f5f0',
      raised: '#ffffff',
      elevated: '#ffffff',
      sunken: '#ece8e2',
      overlay: '#ffffff',
    },
    text: {
      primary: '#1a1816',
      secondary: '#484440',
      muted: '#807a74',
      inverse: '#f8f5f0',
      link: '#2a6090',
      onAccent: '#ffffff',
    },
    borders: { default: '#d4d0c8', subtle: '#e0dcd6', strong: '#a8a49c' },
    accents: {
      primary: '#2a6090',
      secondary: '#225080',
      hover: '#245480',
      active: '#1c4668',
      muted: '#e8eef4',
    },
    status: { success: '#2a6e30', warning: '#8a7418', error: '#a03838', info: '#2a6090' },
    focus: { ring: 'rgba(42, 96, 144, 0.4)', outline: '#2a6090' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
      md: '0 4px 12px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 28px rgba(0, 0, 0, 0.1)',
    },
    syntax: {
      comment: '#807a74',
      keyword: '#2a6090',
      storage: '#7a6a10',
      string: '#3a6430',
      number: '#905040',
      function: '#225080',
      operator: '#2a6090',
      punctuation: '#807a74',
      type: '#484440',
    },
    terminal: {
      black: '#1a1816',
      red: '#a03838',
      green: '#2a6e30',
      yellow: '#8a7418',
      blue: '#2a6090',
      magenta: '#7a5088',
      cyan: '#0a7888',
      white: '#f8f5f0',
      brightBlack: '#807a74',
      brightRed: '#b04848',
      brightGreen: '#3a7e40',
      brightYellow: '#9a8428',
      brightBlue: '#3a70a0',
      brightMagenta: '#8a6098',
      brightCyan: '#1a8898',
      brightWhite: '#ffffff',
    },
  },
}

export default linen
