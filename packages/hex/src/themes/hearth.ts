import type { HexTheme } from '../tokens/types'

/**
 * HEARTH — Creation
 *
 * Raw material shaped by heat and intention. The first act —
 * pulling form from formlessness. Heavy, warm, deliberate.
 */
export const hearth: HexTheme = {
  id: 'hearth',
  name: 'Hearth',
  narrative: 'Creation. Raw material shaped by heat and intention. The first act — pulling form from formlessness. Heavy, warm, deliberate.',

  motion: {
    duration: { fast: '150ms', normal: '300ms', slow: '500ms' },
    easing: {
      default: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0.0, 1, 1)',
    },
  },

  fonts: {
    display: {
      family: 'Sorts Mill Goudy',
      source: 'Google Fonts / League of Moveable Type',
      license: 'SIL OFL 1.1',
      weights: [400],
      italic: true,
      rationale: 'A revival of Frederic Goudy\u0027s Kennerley Old Style by Barry Schwartz for the League of Moveable Type. Warm, hand-cut, and deeply human.',
    },
    body: {
      family: 'Lora',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [400, 500, 600, 700],
      italic: true,
      rationale: 'Brushed curves and warm, calligraphic serifs optimized for screens. Readable across long sessions, with just enough personality to feel intentional.',
    },
    sans: {
      family: 'Source Sans 3',
      source: 'Google Fonts / Adobe',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale: 'Adobe\u0027s first open-source typeface. Humanist warmth with excellent small-size legibility — the UI workhorse.',
    },
    mono: {
      family: 'Source Code Pro',
      source: 'Google Fonts / Adobe',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale: 'Natural companion to Source Sans. Designed specifically for code with careful 0/O/l/1 differentiation.',
    },
  },

  dark: {
    surfaces: { base: '#0f0d0a', raised: '#1a1714', elevated: '#221f1a', sunken: '#0a0907', overlay: '#1e1b17' },
    text: { primary: '#f5f1ed', secondary: '#bfb8b0', muted: '#7a746d', inverse: '#0f0d0a', link: '#c9956d', onAccent: '#1a1108' },
    borders: { default: '#3d3935', subtle: '#2a2620', strong: '#5c554e' },
    accents: { primary: '#c9956d', secondary: '#a87b56', hover: '#d4a57a', active: '#b08050', muted: '#1f1a14' },
    status: { success: '#5a9a66', warning: '#d4a03c', error: '#c75c5c', info: '#6a90b0' },
    focus: { ring: 'rgba(201, 149, 109, 0.5)', outline: '#c9956d' },
    syntax: { comment: '#7a746d', keyword: '#c07050', storage: '#c9a050', string: '#8a9a70', number: '#b07878', function: '#c9956d', operator: '#c9956d', punctuation: '#7a746d', type: '#d4a57a' },
    terminal: { black: '#0f0d0a', red: '#c75c5c', green: '#5a9a66', yellow: '#d4a03c', blue: '#6a90b0', magenta: '#b068a0', cyan: '#48b0c8', white: '#f5f1ed', brightBlack: '#7a746d', brightRed: '#d06a6a', brightGreen: '#6aaa76', brightYellow: '#e0b050', brightBlue: '#7aa0c0', brightMagenta: '#c078b0', brightCyan: '#58c0d8', brightWhite: '#ffffff' },
  },

  light: {
    surfaces: { base: '#f5f1ed', raised: '#ffffff', elevated: '#ffffff', sunken: '#e8e3dc', overlay: '#ffffff' },
    text: { primary: '#1a1714', secondary: '#4a443e', muted: '#8a8279', inverse: '#f5f1ed', link: '#7a5530', onAccent: '#ffffff' },
    borders: { default: '#d8d0c4', subtle: '#e4ddd4', strong: '#b0a89c' },
    accents: { primary: '#7a5530', secondary: '#654525', hover: '#6a4a28', active: '#5a3e20', muted: '#f0e8de' },
    status: { success: '#2e6e38', warning: '#9a7a28', error: '#a04040', info: '#3a6888' },
    focus: { ring: 'rgba(154, 111, 66, 0.4)', outline: '#9a6f42' },
    syntax: { comment: '#8a8279', keyword: '#9a4a30', storage: '#8a6a20', string: '#4a7040', number: '#905060', function: '#7a5530', operator: '#7a5530', punctuation: '#8a8279', type: '#7a5a30' },
    terminal: { black: '#1a1714', red: '#a04040', green: '#2e6e38', yellow: '#9a7a28', blue: '#3a6888', magenta: '#885090', cyan: '#0a8098', white: '#f5f1ed', brightBlack: '#8a8279', brightRed: '#b05050', brightGreen: '#3e7e48', brightYellow: '#aa8a38', brightBlue: '#4a7898', brightMagenta: '#986098', brightCyan: '#1a90a8', brightWhite: '#ffffff' },
  },
}

export default hearth
