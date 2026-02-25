import type { HexTheme } from '../tokens/types'

/**
 * HOLLOW — Growth
 *
 * Life pushing through stone, roots finding water in darkness.
 * The third act — organic persistence, the quiet power of things
 * that grow slowly and never stop.
 */
export const hollow: HexTheme = {
  id: 'hollow',
  name: 'Hollow',
  narrative: 'Growth. Life pushing through stone, roots finding water in darkness. The third act — organic persistence, the quiet power of things that grow slowly and never stop.',

  motion: {
    duration: { fast: '120ms', normal: '280ms', slow: '480ms' },
    easing: {
      default: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      entrance: 'cubic-bezier(0.0, 0.8, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0.0, 0.8, 0.2)',
      expressive: 'cubic-bezier(0.34, 1.8, 0.64, 1)',
    },
  },

  spacing: {
    xs: '4px',
    sm: '10px',
    md: '18px',
    lg: '28px',
    xl: '44px',
    '2xl': '72px',
    '3xl': '112px',
  },

  shape: {
    radius: '12px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'Fraunces',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800, 900],
      italic: true,
      rationale: 'A variable old-style serif with axes for weight, optical size, softness, and "wonk." It introduces organic irregularity into the letterforms, as if the type itself is growing.',
    },
    body: {
      family: 'Vollkorn',
      source: 'Google Fonts / Font Squirrel',
      license: 'SIL OFL 1.1',
      weights: [400, 500, 600, 700, 800, 900],
      italic: true,
      rationale: 'Friedrich Althausen\u0027s "quiet and modest" serif designed for everyday reading. Its name means "whole grain" in German — earthy, nourishing, substantial.',
    },
    sans: {
      family: 'DM Sans',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: true,
      rationale: 'Low-contrast geometric sans from Colophon Foundry. Soft, grounded, and designed for small sizes.',
    },
    mono: {
      family: 'Commit Mono',
      source: 'GitHub (github.com/eigilnikolajsen/commit-mono)',
      license: 'SIL OFL 1.1',
      weights: [400, 700],
      italic: true,
      rationale: 'A neutral monospace that uses "smart kerning" — optically adjusts spacing without breaking monospace alignment. Quiet, precise, and surprisingly organic in feel.',
    },
  },

  dark: {
    surfaces: { base: '#0a100e', raised: '#12201a', elevated: '#182820', sunken: '#060c08', overlay: '#1a2a22' },
    text: { primary: '#d8ece4', secondary: '#a0c0b0', muted: '#5a7a6a', inverse: '#0a100e', link: '#40b8a0', onAccent: '#0a100e' },
    borders: { default: '#1e3828', subtle: '#162a1e', strong: '#3a5848' },
    accents: { primary: '#40b8a0', secondary: '#308a78', hover: '#50c8b0', active: '#2a7868', muted: '#0e1c18' },
    status: { success: '#5acc6a', warning: '#c8b060', error: '#d05858', info: '#5a90c0' },
    focus: { ring: 'rgba(64, 184, 160, 0.5)', outline: '#40b8a0' },
    shadows: { sm: '0 1px 2px rgba(0, 0, 0, 0.25)', md: '0 4px 10px rgba(0, 0, 0, 0.35)', lg: '0 10px 30px rgba(0, 0, 0, 0.45)' },
    syntax: { comment: '#5a7a6a', keyword: '#50c8b0', storage: '#c8b060', string: '#a0c0b0', number: '#d05858', function: '#40b8a0', operator: '#50c8b0', punctuation: '#5a7a6a', type: '#5a90c0' },
    terminal: { black: '#0a100e', red: '#d05858', green: '#5acc6a', yellow: '#c8b060', blue: '#5a90c0', magenta: '#a080b0', cyan: '#30c0d8', white: '#d8ece4', brightBlack: '#5a7a6a', brightRed: '#e06868', brightGreen: '#6adc7a', brightYellow: '#d8c070', brightBlue: '#6aa0d0', brightMagenta: '#b090c0', brightCyan: '#40d0e8', brightWhite: '#e8f8f0' },
  },

  light: {
    surfaces: { base: '#e4f0ec', raised: '#f0f8f6', elevated: '#f4faf8', sunken: '#d0e4dc', overlay: '#f4faf8' },
    text: { primary: '#0a100e', secondary: '#1a3028', muted: '#5a7a6a', inverse: '#e4f0ec', link: '#14685a', onAccent: '#ffffff' },
    borders: { default: '#a8c8bc', subtle: '#bcd8cc', strong: '#78a090' },
    accents: { primary: '#14685a', secondary: '#105a4c', hover: '#125c50', active: '#0e5044', muted: '#d4e8e0' },
    status: { success: '#2a7030', warning: '#8a7018', error: '#a03030', info: '#2a6080' },
    focus: { ring: 'rgba(26, 122, 104, 0.4)', outline: '#1a7a68' },
    shadows: { sm: '0 1px 3px rgba(0, 0, 0, 0.06)', md: '0 4px 12px rgba(0, 0, 0, 0.08)', lg: '0 10px 32px rgba(0, 0, 0, 0.1)' },
    syntax: { comment: '#5a7a6a', keyword: '#14685a', storage: '#8a7018', string: '#2a4a38', number: '#a03030', function: '#1a6a58', operator: '#14685a', punctuation: '#5a7a6a', type: '#2a6080' },
    terminal: { black: '#0a100e', red: '#a03030', green: '#2a7030', yellow: '#8a7018', blue: '#2a6080', magenta: '#705080', cyan: '#008890', white: '#e4f0ec', brightBlack: '#5a7a6a', brightRed: '#b04040', brightGreen: '#3a8040', brightYellow: '#9a8028', brightBlue: '#3a7090', brightMagenta: '#806090', brightCyan: '#1098a0', brightWhite: '#f4faf8' },
  },
}

export default hollow
