import type { HexTheme } from '@amulet-laboratories/hex'

/**
 * HEARTH — Creation · ~45° Gold
 *
 * Spectral position: Gold/Amber. The color of firelight and intention.
 * Raw material shaped by heat — pulling form from formlessness.
 * Heavy, warm, deliberate. Amber surfaces, golden accents.
 */
export const hearth: HexTheme = {
  id: 'hearth',
  name: 'Hearth',
  narrative:
    'Creation. Raw material shaped by heat and intention — amber light, golden purpose. Heavy, warm, deliberate.',

  motion: {
    duration: { fast: '150ms', normal: '300ms', slow: '500ms' },
    easing: {
      default: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0.0, 1, 1)',
      expressive: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
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
    radius: '10px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'Sorts Mill Goudy',
      source: 'Google Fonts / League of Moveable Type',
      license: 'SIL OFL 1.1',
      weights: [400],
      italic: true,
      rationale:
        'A revival of Frederic Goudy\u0027s Kennerley Old Style by Barry Schwartz for the League of Moveable Type. Warm, hand-cut, and deeply human.',
    },
    body: {
      family: 'Lora',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [400, 500, 600, 700],
      italic: true,
      rationale:
        'Brushed curves and warm, calligraphic serifs optimized for screens. Readable across long sessions, with just enough personality to feel intentional.',
    },
    sans: {
      family: 'Source Sans 3',
      source: 'Google Fonts / Adobe',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'Adobe\u0027s first open-source typeface. Humanist warmth with excellent small-size legibility — the UI workhorse.',
    },
    mono: {
      family: 'Source Code Pro',
      source: 'Google Fonts / Adobe',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'Natural companion to Source Sans. Designed specifically for code with careful 0/O/l/1 differentiation.',
    },
  },

  dark: {
    surfaces: {
      base: '#110e06',
      raised: '#1c1810',
      elevated: '#242018',
      sunken: '#0a0904',
      overlay: '#282214',
    },
    text: {
      primary: '#f5f0e4',
      secondary: '#c0b898',
      muted: '#7a7460',
      inverse: '#110e06',
      link: '#d4a840',
      onAccent: '#12100a',
    },
    borders: { default: '#3d3620', subtle: '#2a2416', strong: '#5c5038' },
    accents: {
      primary: '#d4a840',
      secondary: '#b89030',
      hover: '#e0b850',
      active: '#a07828',
      muted: '#1e1a10',
    },
    status: { success: '#5a9a66', warning: '#d4a03c', error: '#c75c5c', info: '#6a90b0' },
    focus: { ring: 'rgba(212, 168, 64, 0.5)', outline: '#d4a840' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
      md: '0 4px 8px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    },
    syntax: {
      comment: '#7a7460',
      keyword: '#c08040',
      storage: '#d4a840',
      string: '#8a9a70',
      number: '#b07878',
      function: '#e0b850',
      operator: '#d4a840',
      punctuation: '#7a7460',
      type: '#c0b898',
    },
    terminal: {
      black: '#110e06',
      red: '#c75c5c',
      green: '#5a9a66',
      yellow: '#d4a03c',
      blue: '#6a90b0',
      magenta: '#b068a0',
      cyan: '#48b0c8',
      white: '#f5f0e4',
      brightBlack: '#7a7460',
      brightRed: '#d06a6a',
      brightGreen: '#6aaa76',
      brightYellow: '#e0b050',
      brightBlue: '#7aa0c0',
      brightMagenta: '#c078b0',
      brightCyan: '#58c0d8',
      brightWhite: '#ffffff',
    },
  },

  light: {
    surfaces: {
      base: '#f6f2e8',
      raised: '#fdfaf0',
      elevated: '#fffdf6',
      sunken: '#eae6da',
      overlay: '#fdfaf0',
    },
    text: {
      primary: '#1a1710',
      secondary: '#4a4430',
      muted: '#8a8270',
      inverse: '#f6f2e8',
      link: '#7a5c10',
      onAccent: '#ffffff',
    },
    borders: { default: '#d8d0bc', subtle: '#e4dcd0', strong: '#b0a890' },
    accents: {
      primary: '#7a5c10',
      secondary: '#654c0a',
      hover: '#6a4e0c',
      active: '#5a4008',
      muted: '#f0eadc',
    },
    status: { success: '#2e6e38', warning: '#9a7a28', error: '#a04040', info: '#3a6888' },
    focus: { ring: 'rgba(122, 92, 16, 0.4)', outline: '#7a5c10' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
      md: '0 4px 12px rgba(0, 0, 0, 0.1)',
      lg: '0 8px 32px rgba(0, 0, 0, 0.12)',
    },
    syntax: {
      comment: '#8a8270',
      keyword: '#9a5a18',
      storage: '#8a6a10',
      string: '#4a7040',
      number: '#905060',
      function: '#7a5c10',
      operator: '#7a5c10',
      punctuation: '#8a8270',
      type: '#7a6020',
    },
    terminal: {
      black: '#1a1710',
      red: '#a04040',
      green: '#2e6e38',
      yellow: '#9a7a28',
      blue: '#3a6888',
      magenta: '#885090',
      cyan: '#0a8098',
      white: '#f6f2e8',
      brightBlack: '#8a8270',
      brightRed: '#b05050',
      brightGreen: '#3e7e48',
      brightYellow: '#aa8a38',
      brightBlue: '#4a7898',
      brightMagenta: '#986098',
      brightCyan: '#1a90a8',
      brightWhite: '#fffdf6',
    },
  },
}

export default hearth
