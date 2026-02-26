import type { HexTheme } from '@amulet-laboratories/hex'

/**
 * LINEN — Precision · Warm Neutral
 *
 * Neutral position: Warm. Near-achromatic with a cream bias (~30°).
 * Off-white with warmth — not snow, linen. Subtle warm neutrals,
 * muted accents that don't raise their voice. Crisp, invisible motion.
 * The editorial default — quietly perfect.
 */
export const linen: HexTheme = {
  id: 'linen',
  name: 'Linen',
  narrative:
    'Precision. Off-white with warmth — not snow, linen. The editorial default whose every proportion is quietly perfect.',

  motion: {
    duration: { fast: '120ms', normal: '260ms', slow: '420ms' },
    easing: {
      default: 'cubic-bezier(0.35, 0.0, 0.15, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 0.3, 1)',
      exit: 'cubic-bezier(0.5, 0.0, 0.85, 0.2)',
      expressive: 'cubic-bezier(0.35, 0.0, 0.0, 1)',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '32px',
    '2xl': '52px',
    '3xl': '80px',
  },

  shape: {
    radius: '8px',
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
      link: '#c88050',
      onAccent: '#ffffff',
    },
    borders: { default: '#383430', subtle: '#282420', strong: '#504c48' },
    accents: {
      primary: '#b87040',
      secondary: '#9a5c30',
      hover: '#c88050',
      active: '#8a5028',
      muted: '#241c14',
    },
    status: { success: '#58b860', warning: '#d0a838', error: '#d05050', info: '#78a090' },
    focus: { ring: 'rgba(184, 112, 64, 0.5)', outline: '#b87040' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
      md: '0 4px 8px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    },
    syntax: {
      comment: '#706a64',
      keyword: '#c88050',
      storage: '#d0a838',
      string: '#88a878',
      number: '#c08070',
      function: '#b87040',
      operator: '#c88050',
      punctuation: '#706a64',
      type: '#b0aaa4',
    },
    terminal: {
      black: '#1a1816',
      red: '#d05050',
      green: '#58b860',
      yellow: '#d0a838',
      blue: '#78a090',
      magenta: '#a070a8',
      cyan: '#48a0b0',
      white: '#e8e4e0',
      brightBlack: '#706a64',
      brightRed: '#e06060',
      brightGreen: '#68c870',
      brightYellow: '#e0b848',
      brightBlue: '#88b0a0',
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
      link: '#8a5020',
      onAccent: '#ffffff',
    },
    borders: { default: '#d4d0c8', subtle: '#e0dcd6', strong: '#a8a49c' },
    accents: {
      primary: '#8a5020',
      secondary: '#7a4418',
      hover: '#7a4818',
      active: '#683c10',
      muted: '#f2ece4',
    },
    status: { success: '#2a6e30', warning: '#8a7418', error: '#a03838', info: '#4a7868' },
    focus: { ring: 'rgba(138, 80, 32, 0.4)', outline: '#8a5020' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
      md: '0 4px 12px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 28px rgba(0, 0, 0, 0.1)',
    },
    syntax: {
      comment: '#807a74',
      keyword: '#8a5020',
      storage: '#7a6a10',
      string: '#3a6430',
      number: '#905040',
      function: '#7a4418',
      operator: '#8a5020',
      punctuation: '#807a74',
      type: '#484440',
    },
    terminal: {
      black: '#1a1816',
      red: '#a03838',
      green: '#2a6e30',
      yellow: '#8a7418',
      blue: '#4a7868',
      magenta: '#7a5088',
      cyan: '#0a7888',
      white: '#f8f5f0',
      brightBlack: '#807a74',
      brightRed: '#b04848',
      brightGreen: '#3a7e40',
      brightYellow: '#9a8428',
      brightBlue: '#5a8878',
      brightMagenta: '#8a6098',
      brightCyan: '#1a8898',
      brightWhite: '#ffffff',
    },
  },
}

export default linen
