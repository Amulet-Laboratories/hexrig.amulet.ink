import type { HexTheme } from '../tokens/types'

/**
 * GROVE — Approachability
 *
 * Soft neutral with sage green. Dappled light through leaves.
 * The friendly theme — warmth from serif, professionalism from sans.
 * The only serif+sans split in Series 2.
 */
export const grove: HexTheme = {
  id: 'grove',
  name: 'Grove',
  narrative:
    'Approachability. Soft neutral with sage green — dappled light through leaves. The friendly theme that says "I\'m a real person and I\'m good at what I do" without saying anything at all.',

  motion: {
    duration: { fast: '130ms', normal: '280ms', slow: '480ms' },
    easing: {
      default: 'cubic-bezier(0.34, 1.2, 0.64, 1)',
      entrance: 'cubic-bezier(0.0, 0.8, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0.0, 0.8, 0.2)',
      expressive: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },

  spacing: {
    xs: '4px',
    sm: '10px',
    md: '18px',
    lg: '28px',
    xl: '44px',
    '2xl': '68px',
    '3xl': '104px',
  },

  shape: {
    radius: '12px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'Libre Baskerville',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [400, 700],
      italic: true,
      rationale:
        'A warm, readable serif with generous x-height — the serif half of Grove\u0027s signature split. Approachable authority without stuffiness.',
    },
    body: {
      family: 'Plus Jakarta Sans',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: true,
      rationale:
        'A modern geometric sans with subtle warmth in its curves. The professional half of the serif+sans split — friendly without being casual.',
    },
    sans: {
      family: 'Plus Jakarta Sans',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: true,
      rationale:
        'Consistent with body for a unified UI voice. Warm enough to feel human, clean enough to disappear when needed.',
    },
    mono: {
      family: 'JetBrains Mono',
      source: 'Google Fonts / JetBrains',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: true,
      rationale:
        'Tall lowercase letters and increased letter-spacing make code feel open and breathable — the grove extending into the terminal.',
    },
  },

  dark: {
    surfaces: {
      base: '#0e1410',
      raised: '#182220',
      elevated: '#1e2c28',
      sunken: '#080e0a',
      overlay: '#202e28',
    },
    text: {
      primary: '#dce8de',
      secondary: '#a4b8a8',
      muted: '#5c7060',
      inverse: '#0e1410',
      link: '#7cba7e',
      onAccent: '#0a1208',
    },
    borders: { default: '#283a2e', subtle: '#1c2e22', strong: '#3c5840' },
    accents: {
      primary: '#7cba7e',
      secondary: '#5e9a60',
      hover: '#8ec890',
      active: '#4e8a50',
      muted: '#141e16',
    },
    status: { success: '#58c860', warning: '#d0b840', error: '#d05050', info: '#5a90c0' },
    focus: { ring: 'rgba(124, 186, 126, 0.5)', outline: '#7cba7e' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.25)',
      md: '0 4px 10px rgba(0, 0, 0, 0.35)',
      lg: '0 8px 28px rgba(0, 0, 0, 0.45)',
    },
    syntax: {
      comment: '#5c7060',
      keyword: '#8ec890',
      storage: '#d0b840',
      string: '#a4b8a8',
      number: '#d08080',
      function: '#7cba7e',
      operator: '#8ec890',
      punctuation: '#5c7060',
      type: '#5a90c0',
    },
    terminal: {
      black: '#0e1410',
      red: '#d05050',
      green: '#58c860',
      yellow: '#d0b840',
      blue: '#5a90c0',
      magenta: '#a878b0',
      cyan: '#40b0c0',
      white: '#dce8de',
      brightBlack: '#5c7060',
      brightRed: '#e06060',
      brightGreen: '#68d870',
      brightYellow: '#e0c850',
      brightBlue: '#6aa0d0',
      brightMagenta: '#b888c0',
      brightCyan: '#50c0d0',
      brightWhite: '#ecf4ee',
    },
  },

  light: {
    surfaces: {
      base: '#f2f0ea',
      raised: '#faf8f4',
      elevated: '#fdfcf9',
      sunken: '#e6e2da',
      overlay: '#faf8f4',
    },
    text: {
      primary: '#141a14',
      secondary: '#384038',
      muted: '#687868',
      inverse: '#f2f0ea',
      link: '#2c6830',
      onAccent: '#ffffff',
    },
    borders: { default: '#c8d0c0', subtle: '#d8dcd0', strong: '#98a890' },
    accents: {
      primary: '#2c6830',
      secondary: '#245a28',
      hover: '#286028',
      active: '#1e5020',
      muted: '#e0ecd8',
    },
    status: { success: '#2a6a30', warning: '#8a7420', error: '#a04040', info: '#2a6080' },
    focus: { ring: 'rgba(56, 120, 56, 0.4)', outline: '#387838' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
      md: '0 4px 12px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 28px rgba(0, 0, 0, 0.1)',
    },
    syntax: {
      comment: '#687868',
      keyword: '#2c6830',
      storage: '#7a6a10',
      string: '#3a5a28',
      number: '#904040',
      function: '#286028',
      operator: '#2c6830',
      punctuation: '#687868',
      type: '#2a6080',
    },
    terminal: {
      black: '#141a14',
      red: '#a04040',
      green: '#2a6a30',
      yellow: '#8a7420',
      blue: '#2a6080',
      magenta: '#7a5088',
      cyan: '#0a8090',
      white: '#f2f0ea',
      brightBlack: '#687868',
      brightRed: '#b05050',
      brightGreen: '#3a7a40',
      brightYellow: '#9a8430',
      brightBlue: '#3a7090',
      brightMagenta: '#8a6098',
      brightCyan: '#1a90a0',
      brightWhite: '#fdfcf9',
    },
  },
}

export default grove
