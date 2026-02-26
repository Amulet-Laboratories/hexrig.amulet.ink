import type { HexTheme } from '@amulet-laboratories/hex'

/**
 * REEF — Clarity · ~180° Cyan
 *
 * Spectral position: Cyan. The color of shallow tropical water —
 * clear, transparent, trustworthy. Cool without being cold, modern
 * without being mechanical. The clinical precision of a scalpel
 * wrapped in the calm of open water.
 */
export const reef: HexTheme = {
  id: 'reef',
  name: 'Reef',
  narrative:
    'Clarity. Shallow water over white sand — the wavelength that means transparency. Cool precision wrapped in open calm.',

  motion: {
    duration: { fast: '100ms', normal: '220ms', slow: '380ms' },
    easing: {
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      entrance: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0.0, 0.7, 0.2)',
      expressive: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '14px',
    lg: '22px',
    xl: '36px',
    '2xl': '56px',
    '3xl': '84px',
  },

  shape: {
    radius: '6px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'DM Sans',
      source: 'Google Fonts / Colophon Foundry',
      license: 'SIL OFL 1.1',
      weights: [400, 500, 600, 700],
      italic: true,
      rationale:
        'A low-contrast geometric sans with optical sizing. Clean and modern without being sterile — clarity distilled into letterforms.',
    },
    body: {
      family: 'Libre Franklin',
      source: 'Google Fonts / Impallari Type',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: true,
      rationale:
        'A geometric interpretation of Franklin Gothic — authoritative, clean, utilitarian. Clinical precision for body text.',
    },
    sans: {
      family: 'Libre Franklin',
      source: 'Google Fonts / Impallari Type',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: true,
      rationale:
        'Consistent with body for a unified, crystal-clear UI voice. Every glyph designed for maximum legibility.',
    },
    mono: {
      family: 'Fira Code',
      source: 'Google Fonts / Nikita Prokopov',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: false,
      rationale:
        'A monospace with programming ligatures — designed for code with a focus on readability and precision. Clear enough for clinical contexts.',
    },
  },

  dark: {
    surfaces: {
      base: '#06100f',
      raised: '#0c1e1c',
      elevated: '#122824',
      sunken: '#030a09',
      overlay: '#163028',
    },
    text: {
      primary: '#d4ece8',
      secondary: '#98c4be',
      muted: '#507870',
      inverse: '#06100f',
      link: '#40c0b8',
      onAccent: '#06100f',
    },
    borders: { default: '#1e3c38', subtle: '#143028', strong: '#2e5850' },
    accents: {
      primary: '#40c0b8',
      secondary: '#30a098',
      hover: '#50d0c8',
      active: '#288880',
      muted: '#0e1e1c',
    },
    status: { success: '#50c060', warning: '#d0b040', error: '#d05050', info: '#50a0d0' },
    focus: { ring: 'rgba(64, 192, 184, 0.5)', outline: '#40c0b8' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
      md: '0 4px 8px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    },
    syntax: {
      comment: '#507870',
      keyword: '#40c0b8',
      storage: '#d0b040',
      string: '#98c4be',
      number: '#d08080',
      function: '#50d0c8',
      operator: '#40c0b8',
      punctuation: '#507870',
      type: '#50a0d0',
    },
    terminal: {
      black: '#06100f',
      red: '#d05050',
      green: '#50c060',
      yellow: '#d0b040',
      blue: '#50a0d0',
      magenta: '#a070b0',
      cyan: '#40c0b8',
      white: '#d4ece8',
      brightBlack: '#507870',
      brightRed: '#e06060',
      brightGreen: '#60d070',
      brightYellow: '#e0c050',
      brightBlue: '#60b0e0',
      brightMagenta: '#b080c0',
      brightCyan: '#50d0c8',
      brightWhite: '#e8f6f4',
    },
  },

  light: {
    surfaces: {
      base: '#eef6f4',
      raised: '#f6fcfa',
      elevated: '#fafffe',
      sunken: '#e0ecea',
      overlay: '#f6fcfa',
    },
    text: {
      primary: '#0a1816',
      secondary: '#283e3c',
      muted: '#5a7874',
      inverse: '#eef6f4',
      link: '#147068',
      onAccent: '#ffffff',
    },
    borders: { default: '#b8d4d0', subtle: '#cce0dc', strong: '#88aca8' },
    accents: {
      primary: '#147068',
      secondary: '#106058',
      hover: '#0e5850',
      active: '#0a4a44',
      muted: '#dceee8',
    },
    status: { success: '#287030', warning: '#8a7420', error: '#a04040', info: '#2a6888' },
    focus: { ring: 'rgba(20, 112, 104, 0.4)', outline: '#147068' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
      md: '0 4px 12px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 28px rgba(0, 0, 0, 0.1)',
    },
    syntax: {
      comment: '#5a7874',
      keyword: '#147068',
      storage: '#7a6a10',
      string: '#2a6a38',
      number: '#904040',
      function: '#106058',
      operator: '#147068',
      punctuation: '#5a7874',
      type: '#2a6888',
    },
    terminal: {
      black: '#0a1816',
      red: '#a04040',
      green: '#287030',
      yellow: '#8a7420',
      blue: '#2a6888',
      magenta: '#7a5088',
      cyan: '#147068',
      white: '#eef6f4',
      brightBlack: '#5a7874',
      brightRed: '#b05050',
      brightGreen: '#388040',
      brightYellow: '#9a8430',
      brightBlue: '#3a7898',
      brightMagenta: '#8a6098',
      brightCyan: '#1a8078',
      brightWhite: '#fafffe',
    },
  },
}

export default reef
