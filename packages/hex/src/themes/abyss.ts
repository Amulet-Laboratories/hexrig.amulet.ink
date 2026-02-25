import type { HexTheme } from '../tokens/types'

/**
 * ABYSS — Nothingness
 *
 * The space between stars — vast, electric, and alive with potential.
 * Cold cosmos humming with latent energy. The second act —
 * the emptiness from which everything emerges.
 */
export const abyss: HexTheme = {
  id: 'abyss',
  name: 'Abyss',
  narrative: 'Nothingness. The space between stars — vast, electric, and alive with potential. Cold cosmos humming with latent energy.',

  motion: {
    duration: { fast: '80ms', normal: '150ms', slow: '250ms' },
    easing: {
      default: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      entrance: 'cubic-bezier(0.0, 0.0, 0.1, 1)',
      exit: 'cubic-bezier(0.2, 0.0, 1, 1)',
      expressive: 'cubic-bezier(0.0, 0.0, 0.0, 1)',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '14px',
    lg: '22px',
    xl: '36px',
    '2xl': '56px',
    '3xl': '80px',
  },

  shape: {
    radius: '4px',
    radiusFull: '9999px',
  },

  fonts: {
    display: {
      family: 'League Gothic',
      source: 'Google Fonts / League of Moveable Type',
      license: 'SIL OFL 1.1',
      weights: [400],
      italic: true,
      rationale: 'A revival of Alternate Gothic No. 1 — tall, condensed, and imposing. The Void speaks in headlines that feel like transmissions.',
    },
    body: {
      family: 'Inter',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: true,
      rationale: 'Designed by Rasmus Andersson specifically for computer interfaces. Cold, precise, functional — the Void demands clarity above all.',
    },
    sans: {
      family: 'Space Grotesk',
      source: 'Google Fonts',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700],
      italic: false,
      rationale: 'Derived from Space Mono with proportional spacing. Angular, geometric, slightly alien.',
    },
    mono: {
      family: 'Monaspace Neon',
      source: 'GitHub (github.com/githubnext/monaspace)',
      license: 'SIL OFL 1.1',
      weights: [300, 400, 500, 600, 700, 800],
      italic: true,
      rationale: 'From GitHub\u0027s Monaspace superfamily — Neon is the sans-serif variant with texture healing. The most technically advanced free monospace available.',
    },
  },

  dark: {
    surfaces: { base: '#060d2b', raised: '#0d1b56', elevated: '#102068', sunken: '#040920', overlay: '#132881' },
    text: { primary: '#cad3f7', secondary: '#a0b2ff', muted: '#5a6aaa', inverse: '#060d2b', link: '#aef66d', onAccent: '#060d2b' },
    borders: { default: '#132881', subtle: '#0d1b56', strong: '#2d4fe0' },
    accents: { primary: '#aef66d', secondary: '#8ad050', hover: '#c2ff8a', active: '#90d858', muted: '#0c1a2e' },
    status: { success: '#5acc6a', warning: '#e0c050', error: '#f06060', info: '#6a9ae0' },
    focus: { ring: 'rgba(174, 246, 109, 0.5)', outline: '#aef66d' },
    shadows: { sm: '0 1px 3px rgba(0, 0, 0, 0.5)', md: '0 4px 12px rgba(0, 0, 0, 0.6)', lg: '0 12px 36px rgba(0, 0, 0, 0.7)' },
    syntax: { comment: '#5a6aaa', keyword: '#2d4fe0', storage: '#aef66d', string: '#dff081', number: '#f06060', function: '#a0b2ff', operator: '#aef66d', punctuation: '#5a6aaa', type: '#cad3f7' },
    terminal: { black: '#060d2b', red: '#f06060', green: '#5acc6a', yellow: '#e0c050', blue: '#2d4fe0', magenta: '#a0b2ff', cyan: '#40c8d8', white: '#cad3f7', brightBlack: '#4a5a9a', brightRed: '#ff7070', brightGreen: '#6adc7a', brightYellow: '#eacc60', brightBlue: '#5a70f0', brightMagenta: '#b8c4ff', brightCyan: '#50d8e8', brightWhite: '#e8ecfa' },
  },

  light: {
    surfaces: { base: '#e0e4f8', raised: '#eef0ff', elevated: '#f4f6ff', sunken: '#d0d6ea', overlay: '#f4f6ff' },
    text: { primary: '#060d2b', secondary: '#0d1b56', muted: '#4a5a9a', inverse: '#e0e4f8', link: '#1a5a10', onAccent: '#ffffff' },
    borders: { default: '#a8b0d8', subtle: '#bcc4e4', strong: '#7a84b8' },
    accents: { primary: '#1a5a10', secondary: '#164a0c', hover: '#144a0e', active: '#103c08', muted: '#dce6d8' },
    status: { success: '#2a7030', warning: '#8a7020', error: '#b03030', info: '#1a3a90' },
    focus: { ring: 'rgba(26, 90, 16, 0.4)', outline: '#1a5a10' },
    shadows: { sm: '0 1px 2px rgba(0, 0, 0, 0.06)', md: '0 4px 8px rgba(0, 0, 0, 0.08)', lg: '0 8px 24px rgba(0, 0, 0, 0.1)' },
    syntax: { comment: '#5a6aaa', keyword: '#1a3a90', storage: '#1a5a10', string: '#6a7a10', number: '#b03030', function: '#0d1b56', operator: '#1a5a10', punctuation: '#5a6aaa', type: '#2040a0' },
    terminal: { black: '#060d2b', red: '#b03030', green: '#2a7030', yellow: '#8a7020', blue: '#1a3a90', magenta: '#6a50b0', cyan: '#0a7868', white: '#e0e4f8', brightBlack: '#4a5a9a', brightRed: '#c04040', brightGreen: '#3a8040', brightYellow: '#9a8030', brightBlue: '#2a4aa0', brightMagenta: '#7a60c0', brightCyan: '#1a8878', brightWhite: '#f4f6ff' },
  },
}

export default abyss
