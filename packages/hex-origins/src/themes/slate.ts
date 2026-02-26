import type { HexTheme } from '@amulet-laboratories/hex'

/**
 * SLATE — Nothing · Cool Neutral
 *
 * Neutral position: Cool. Near-achromatic with a blue-grey bias (~220°).
 * Monochrome with a cold edge — steel, concrete, institutional precision.
 * Near-zero motion. The theme that disappears so the content can exist.
 */
export const slate: HexTheme = {
  id: 'slate',
  name: 'Slate',
  narrative:
    'Nothing. Cool monochrome — blue-grey steel, one accent. The theme that disappears so the content can exist.',

  motion: {
    duration: { fast: '50ms', normal: '100ms', slow: '150ms' },
    easing: {
      default: 'cubic-bezier(0.0, 0.0, 1, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 1, 1)',
      exit: 'cubic-bezier(0.0, 0.0, 1, 1)',
      expressive: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    },
  },

  spacing: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '20px',
    '2xl': '32px',
    '3xl': '48px',
  },

  shape: {
    radius: '0px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'Sora',
      source: 'Google Fonts / Jonathan Barnbrook',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: false,
      rationale:
        'A clean geometric grotesque with no decorative features. The font equivalent of a clean white wall — nothing to notice, nothing to remember.',
    },
    body: {
      family: 'Work Sans',
      source: 'Google Fonts / Wei Huang',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale:
        'Optimized for on-screen reading at medium sizes. Neutral enough to disappear, good enough to last. The invisible workhorse.',
    },
    sans: {
      family: 'Sora',
      source: 'Google Fonts / Jonathan Barnbrook',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: false,
      rationale:
        'Consistent with display for a theme that has one opinion: have no opinions. Clean geometry, no character.',
    },
    mono: {
      family: 'Roboto Mono',
      source: 'Google Fonts / Christian Robertson',
      license: 'Apache License 2.0',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale:
        'The most neutral monospace available. Designed by Google for Android — ubiquitous, invisible, trustworthy.',
    },
  },

  dark: {
    surfaces: {
      base: '#060810',
      raised: '#10121a',
      elevated: '#181a22',
      sunken: '#030408',
      overlay: '#1c1e26',
    },
    text: {
      primary: '#e4e6ec',
      secondary: '#9a9ca8',
      muted: '#5c5e68',
      inverse: '#060810',
      link: '#8090a0',
      onAccent: '#060810',
    },
    borders: { default: '#262830', subtle: '#1a1c24', strong: '#3e4048' },
    accents: {
      primary: '#8090a0',
      secondary: '#687888',
      hover: '#90a0b0',
      active: '#586878',
      muted: '#101418',
    },
    status: { success: '#58c060', warning: '#d0b040', error: '#d04848', info: '#6090d0' },
    focus: { ring: 'rgba(128, 144, 160, 0.5)', outline: '#8090a0' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
      md: '0 4px 8px rgba(0, 0, 0, 0.6)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.7)',
    },
    syntax: {
      comment: '#5c5e68',
      keyword: '#90a0b0',
      storage: '#d0b040',
      string: '#9a9ca8',
      number: '#d08080',
      function: '#8090a0',
      operator: '#90a0b0',
      punctuation: '#5c5e68',
      type: '#9a9ca8',
    },
    terminal: {
      black: '#060810',
      red: '#d04848',
      green: '#58c060',
      yellow: '#d0b040',
      blue: '#6090d0',
      magenta: '#a070b8',
      cyan: '#48a8b8',
      white: '#e4e6ec',
      brightBlack: '#5c5e68',
      brightRed: '#e05858',
      brightGreen: '#68d070',
      brightYellow: '#e0c050',
      brightBlue: '#70a0e0',
      brightMagenta: '#b080c8',
      brightCyan: '#58b8c8',
      brightWhite: '#f4f6fa',
    },
  },

  light: {
    surfaces: {
      base: '#f4f5f8',
      raised: '#fafbfe',
      elevated: '#ffffff',
      sunken: '#e8eaee',
      overlay: '#fafbfe',
    },
    text: {
      primary: '#10121a',
      secondary: '#3c3e48',
      muted: '#70727c',
      inverse: '#f4f5f8',
      link: '#485868',
      onAccent: '#ffffff',
    },
    borders: { default: '#ccced6', subtle: '#dcdee4', strong: '#9c9ea8' },
    accents: {
      primary: '#485868',
      secondary: '#3c4c5c',
      hover: '#3a4a5a',
      active: '#303e4e',
      muted: '#e8eaee',
    },
    status: { success: '#287028', warning: '#887020', error: '#a03030', info: '#2952a3' },
    focus: { ring: 'rgba(72, 88, 104, 0.4)', outline: '#506070' },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
      md: '0 4px 8px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
    syntax: {
      comment: '#70727c',
      keyword: '#485868',
      storage: '#786810',
      string: '#287028',
      number: '#903030',
      function: '#3c4c5c',
      operator: '#485868',
      punctuation: '#70727c',
      type: '#3c3e48',
    },
    terminal: {
      black: '#10121a',
      red: '#a03030',
      green: '#287028',
      yellow: '#887020',
      blue: '#2952a3',
      magenta: '#804890',
      cyan: '#107080',
      white: '#f4f5f8',
      brightBlack: '#70727c',
      brightRed: '#b04040',
      brightGreen: '#388038',
      brightYellow: '#988030',
      brightBlue: '#3962b3',
      brightMagenta: '#9058a0',
      brightCyan: '#208090',
      brightWhite: '#ffffff',
    },
  },
}

export default slate
