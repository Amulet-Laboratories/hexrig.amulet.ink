import type { HexTheme } from '@amulet-laboratories/hex'

/**
 * EMBER — Intensity
 *
 * High saturation. Bold reds and oranges against the deep black of cooling lava.
 * The punchiest motion — fast with hard stops, things snapping into place
 * like pixels locking to a grid. The loudest theme. The one that doesn't apologize.
 */
export const ember: HexTheme = {
  id: 'ember',
  name: 'Ember',
  narrative:
    'Intensity. Bold reds and oranges against the deep black of cooling lava. The loudest theme — the one that doesn\u0027t apologize.',

  motion: {
    duration: { fast: '60ms', normal: '120ms', slow: '200ms' },
    easing: {
      default: 'cubic-bezier(0.0, 0.0, 1, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 1, 1)',
      exit: 'cubic-bezier(0.0, 0.0, 1, 1)',
      expressive: 'cubic-bezier(0.0, 0.0, 1, 1)',
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
    radius: '2px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'Bungee',
      source: 'Google Fonts / David Jonathan Ross',
      license: 'SIL OFL 1.1',
      weights: [400],
      italic: false,
      rationale:
        'A chunky, chromatic display face designed for signage and vertical text. Bold, geometric, and unapologetically loud — the cartridge-label font.',
    },
    body: {
      family: 'Exo 2',
      source: 'Google Fonts / Natanael Gama',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale:
        'A geometric sans with a technological edge. Readable at body sizes while maintaining the hard-edged, mechanical character Ember demands.',
    },
    sans: {
      family: 'Chakra Petch',
      source: 'Google Fonts / Cadson Demak',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'Angular, condensed, with sharp terminals that feel stamped rather than drawn. The UI face for anything that should feel like a heads-up display.',
    },
    mono: {
      family: 'Share Tech Mono',
      source: 'Google Fonts / Carrois Type Design',
      license: 'SIL OFL 1.1',
      weights: [400],
      italic: false,
      rationale:
        'A monospace with CRT character — slightly condensed, slightly rough, the kind of font that looks right on a green-phosphor terminal.',
    },
  },

  dark: {
    surfaces: {
      base: '#0c0606',
      raised: '#1c0e0e',
      elevated: '#261414',
      sunken: '#060202',
      overlay: '#2a1818',
    },
    text: {
      primary: '#f0dcd4',
      secondary: '#c8a8a0',
      muted: '#7a5850',
      inverse: '#0c0606',
      link: '#e84820',
      onAccent: '#0c0606',
    },
    borders: { default: '#3a2020', subtle: '#2a1414', strong: '#5a3030' },
    accents: {
      primary: '#e84820',
      secondary: '#c03c18',
      hover: '#f05830',
      active: '#a83010',
      muted: '#201010',
    },
    status: { success: '#58c050', warning: '#e0a830', error: '#e84820', info: '#5888c0' },
    focus: { ring: 'rgba(232, 72, 32, 0.5)', outline: '#e84820' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.4)',
      md: '0 4px 8px rgba(0, 0, 0, 0.5)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.6)',
    },
    syntax: {
      comment: '#7a5850',
      keyword: '#e84820',
      storage: '#e0a830',
      string: '#c8a8a0',
      number: '#f08060',
      function: '#f05830',
      operator: '#e84820',
      punctuation: '#7a5850',
      type: '#5888c0',
    },
    terminal: {
      black: '#0c0606',
      red: '#e84820',
      green: '#58c050',
      yellow: '#e0a830',
      blue: '#5888c0',
      magenta: '#c060a0',
      cyan: '#40a8b8',
      white: '#f0dcd4',
      brightBlack: '#7a5850',
      brightRed: '#f86040',
      brightGreen: '#68d060',
      brightYellow: '#f0b840',
      brightBlue: '#6898d0',
      brightMagenta: '#d070b0',
      brightCyan: '#50b8c8',
      brightWhite: '#f8ece8',
    },
  },

  light: {
    surfaces: {
      base: '#f8f0e8',
      raised: '#fcf6f0',
      elevated: '#fefaf6',
      sunken: '#ece4da',
      overlay: '#fcf6f0',
    },
    text: {
      primary: '#1a1010',
      secondary: '#442820',
      muted: '#7a6058',
      inverse: '#f8f0e8',
      link: '#a83010',
      onAccent: '#ffffff',
    },
    borders: { default: '#d8c8bc', subtle: '#e4d8d0', strong: '#b0a090' },
    accents: {
      primary: '#a83010',
      secondary: '#90280c',
      hover: '#98280e',
      active: '#80200a',
      muted: '#f0e0d4',
    },
    status: { success: '#2a6e28', warning: '#8a7018', error: '#a83010', info: '#2a5880' },
    focus: { ring: 'rgba(168, 48, 16, 0.4)', outline: '#a83010' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.08)',
      md: '0 4px 8px rgba(0, 0, 0, 0.1)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
    syntax: {
      comment: '#7a6058',
      keyword: '#a83010',
      storage: '#806008',
      string: '#3a6828',
      number: '#884030',
      function: '#90280c',
      operator: '#a83010',
      punctuation: '#7a6058',
      type: '#2a5880',
    },
    terminal: {
      black: '#1a1010',
      red: '#a83010',
      green: '#2a6e28',
      yellow: '#8a7018',
      blue: '#2a5880',
      magenta: '#884870',
      cyan: '#087888',
      white: '#f8f0e8',
      brightBlack: '#7a6058',
      brightRed: '#b84020',
      brightGreen: '#3a7e38',
      brightYellow: '#9a8028',
      brightBlue: '#3a6890',
      brightMagenta: '#985880',
      brightCyan: '#188898',
      brightWhite: '#fefaf6',
    },
  },
}

export default ember
