import type { HexTheme } from '@amulet-laboratories/hex'

/**
 * EMBER — Intensity · ~10° Red
 *
 * Spectral position: Red. The warmest visible wavelength.
 * Bold crimson against deep charred surfaces. The punchiest motion —
 * fast with hard stops, things snapping into place like pixels locking
 * to a grid. The loudest theme. The one that doesn't apologize.
 */
export const ember: HexTheme = {
  id: 'ember',
  name: 'Ember',
  narrative:
    'Intensity. Crimson against char — the warmest wavelength, the loudest voice. The theme that doesn\u0027t apologize.',

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
    xs: '2px',
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    '2xl': '36px',
    '3xl': '52px',
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
      base: '#100606',
      raised: '#1e0c0c',
      elevated: '#281212',
      sunken: '#080303',
      overlay: '#2e1616',
    },
    text: {
      primary: '#f2dad4',
      secondary: '#c8a09a',
      muted: '#7e5650',
      inverse: '#100606',
      link: '#e44836',
      onAccent: '#100606',
    },
    borders: { default: '#3c1e1e', subtle: '#2c1212', strong: '#5c2e2e' },
    accents: {
      primary: '#e04030',
      secondary: '#c03428',
      hover: '#ec5244',
      active: '#a82c22',
      muted: '#201010',
    },
    status: { success: '#58c050', warning: '#e0a830', error: '#e04030', info: '#5888c0' },
    focus: { ring: 'rgba(224, 64, 48, 0.5)', outline: '#e04030' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.4)',
      md: '0 4px 8px rgba(0, 0, 0, 0.5)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.6)',
    },
    syntax: {
      comment: '#7a524c',
      keyword: '#e04030',
      storage: '#e0a830',
      string: '#c8a09a',
      number: '#f07060',
      function: '#ec5244',
      operator: '#e04030',
      punctuation: '#7a524c',
      type: '#5888c0',
    },
    terminal: {
      black: '#100606',
      red: '#e04030',
      green: '#58c050',
      yellow: '#e0a830',
      blue: '#5888c0',
      magenta: '#c060a0',
      cyan: '#40a8b8',
      white: '#f2dad4',
      brightBlack: '#7a524c',
      brightRed: '#f05242',
      brightGreen: '#68d060',
      brightYellow: '#f0b840',
      brightBlue: '#6898d0',
      brightMagenta: '#d070b0',
      brightCyan: '#50b8c8',
      brightWhite: '#f8ecea',
    },
  },

  light: {
    surfaces: {
      base: '#f8f0ee',
      raised: '#fcf6f4',
      elevated: '#fefaf8',
      sunken: '#ece4e0',
      overlay: '#fcf6f4',
    },
    text: {
      primary: '#1a0e0e',
      secondary: '#44241e',
      muted: '#7a5854',
      inverse: '#f8f0ee',
      link: '#a82820',
      onAccent: '#ffffff',
    },
    borders: { default: '#d8c4c0', subtle: '#e4d4d0', strong: '#b09890' },
    accents: {
      primary: '#a82820',
      secondary: '#90201a',
      hover: '#981c18',
      active: '#801410',
      muted: '#f0e0dc',
    },
    status: { success: '#2a6e28', warning: '#8a7018', error: '#a82820', info: '#2a5880' },
    focus: { ring: 'rgba(168, 40, 32, 0.4)', outline: '#a82820' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.08)',
      md: '0 4px 8px rgba(0, 0, 0, 0.1)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
    syntax: {
      comment: '#7a5854',
      keyword: '#a82820',
      storage: '#806008',
      string: '#3a6828',
      number: '#884030',
      function: '#90201a',
      operator: '#a82820',
      punctuation: '#7a5854',
      type: '#2a5880',
    },
    terminal: {
      black: '#1a0e0e',
      red: '#a82820',
      green: '#2a6e28',
      yellow: '#8a7018',
      blue: '#2a5880',
      magenta: '#884870',
      cyan: '#087888',
      white: '#f8f0ee',
      brightBlack: '#7a5854',
      brightRed: '#b83828',
      brightGreen: '#3a7e38',
      brightYellow: '#9a8028',
      brightBlue: '#3a6890',
      brightMagenta: '#985880',
      brightCyan: '#188898',
      brightWhite: '#fefaf8',
    },
  },
}

export default ember
