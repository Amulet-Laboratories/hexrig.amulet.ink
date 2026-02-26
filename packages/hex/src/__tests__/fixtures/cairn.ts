import type { HexTheme } from '../tokens/types'

/**
 * CAIRN — Trust
 *
 * Warm stone. Sun-heated granite with lichen growing in the cracks.
 * Olive and moss accents that feel like they grew there. Motion that settles —
 * things ease into place with slight deceleration, like a stone placed on the pile.
 */
export const cairn: HexTheme = {
  id: 'cairn',
  name: 'Cairn',
  narrative:
    'Trust. Warm stone — sun-heated granite with lichen growing in the cracks. The sturdy theme that makes you feel like your data is safe.',

  motion: {
    duration: { fast: '120ms', normal: '260ms', slow: '440ms' },
    easing: {
      default: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      entrance: 'cubic-bezier(0.0, 0.6, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0.0, 0.8, 0.4)',
      expressive: 'cubic-bezier(0.25, 1.2, 0.25, 1)',
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
    radius: '8px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'Libre Franklin',
      source: 'Google Fonts / Impallari Type',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale:
        'A humanist sans with the warmth of hand drawing and the structure of engineering. Trustworthy without performing trust — the cairn itself.',
    },
    body: {
      family: 'Rubik',
      source: 'Google Fonts / Hubert & Fischer',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale:
        'Slightly rounded corners soften the geometry without weakening it. Accessible, warm, and immediately comfortable — text that puts people at ease.',
    },
    sans: {
      family: 'Libre Franklin',
      source: 'Google Fonts / Impallari Type',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale:
        'Consistent with display for a unified, trustworthy voice. Humanist proportions and warm curves.',
    },
    mono: {
      family: 'Fira Code',
      source: 'Google Fonts / Nikita Prokopov',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: false,
      rationale:
        'Programming ligatures and warm, slightly rounded letter shapes. Code that feels approachable — the technical face of a theme built on trust.',
    },
  },

  dark: {
    surfaces: {
      base: '#141210',
      raised: '#1e1c18',
      elevated: '#282420',
      sunken: '#0c0a08',
      overlay: '#2a2620',
    },
    text: {
      primary: '#e4dcd4',
      secondary: '#b0a898',
      muted: '#6e6458',
      inverse: '#141210',
      link: '#8aaa68',
      onAccent: '#0c1008',
    },
    borders: { default: '#322e28', subtle: '#242018', strong: '#4a4438' },
    accents: {
      primary: '#8aaa68',
      secondary: '#6e8e50',
      hover: '#98b878',
      active: '#5e7e40',
      muted: '#181c14',
    },
    status: { success: '#60b860', warning: '#c8a838', error: '#d05050', info: '#6090b8' },
    focus: { ring: 'rgba(138, 170, 104, 0.5)', outline: '#8aaa68' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
      md: '0 4px 8px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    },
    syntax: {
      comment: '#6e6458',
      keyword: '#8aaa68',
      storage: '#c8a838',
      string: '#b0a898',
      number: '#c88070',
      function: '#98b878',
      operator: '#8aaa68',
      punctuation: '#6e6458',
      type: '#6090b8',
    },
    terminal: {
      black: '#141210',
      red: '#d05050',
      green: '#60b860',
      yellow: '#c8a838',
      blue: '#6090b8',
      magenta: '#a070a0',
      cyan: '#48a0a8',
      white: '#e4dcd4',
      brightBlack: '#6e6458',
      brightRed: '#e06060',
      brightGreen: '#70c870',
      brightYellow: '#d8b848',
      brightBlue: '#70a0c8',
      brightMagenta: '#b080b0',
      brightCyan: '#58b0b8',
      brightWhite: '#f0e8e0',
    },
  },

  light: {
    surfaces: {
      base: '#f4f0e8',
      raised: '#faf8f2',
      elevated: '#fdfcf8',
      sunken: '#e8e4da',
      overlay: '#faf8f2',
    },
    text: {
      primary: '#1a1814',
      secondary: '#44403a',
      muted: '#787068',
      inverse: '#f4f0e8',
      link: '#3e6828',
      onAccent: '#ffffff',
    },
    borders: { default: '#d0c8bc', subtle: '#dcd6cc', strong: '#a8a090' },
    accents: {
      primary: '#3e6828',
      secondary: '#345a20',
      hover: '#345c22',
      active: '#2a4e18',
      muted: '#e4ecd8',
    },
    status: { success: '#2a6e2a', warning: '#887020', error: '#a03838', info: '#2a6088' },
    focus: { ring: 'rgba(62, 104, 40, 0.4)', outline: '#3e6828' },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.07)',
      md: '0 4px 12px rgba(0, 0, 0, 0.09)',
      lg: '0 8px 28px rgba(0, 0, 0, 0.11)',
    },
    syntax: {
      comment: '#787068',
      keyword: '#3e6828',
      storage: '#786810',
      string: '#385820',
      number: '#884840',
      function: '#345a20',
      operator: '#3e6828',
      punctuation: '#787068',
      type: '#2a6088',
    },
    terminal: {
      black: '#1a1814',
      red: '#a03838',
      green: '#2a6e2a',
      yellow: '#887020',
      blue: '#2a6088',
      magenta: '#785080',
      cyan: '#087888',
      white: '#f4f0e8',
      brightBlack: '#787068',
      brightRed: '#b04848',
      brightGreen: '#3a7e3a',
      brightYellow: '#988030',
      brightBlue: '#3a7098',
      brightMagenta: '#886090',
      brightCyan: '#188898',
      brightWhite: '#fdfcf8',
    },
  },
}

export default cairn
