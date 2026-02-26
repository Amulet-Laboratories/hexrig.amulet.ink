/**
 * Custom Storybook theme for the Amulet Design System.
 *
 * Derives from the Hearth dark palette so the Storybook chrome
 * itself feels like part of the design system.
 */
import { create } from 'storybook/internal/theming'

export const amuletTheme = create({
  base: 'dark',

  // Brand
  brandTitle: 'Amulet Design System',
  brandUrl: 'https://hexrig.amulet.ink',

  // Typography
  fontBase: '"Source Sans 3", system-ui, sans-serif',
  fontCode: '"Source Code Pro", "Courier New", monospace',

  // Palette — Hearth dark
  colorPrimary: '#c9956d', // accent-primary
  colorSecondary: '#c9956d', // accent-primary

  // UI chrome
  appBg: '#0f0d0a', // surface-base
  appContentBg: '#0f0d0a', // surface-base
  appPreviewBg: '#0f0d0a', // surface-base
  appBorderColor: '#2a2620', // border-subtle
  appBorderRadius: 8,

  // Text
  textColor: '#f5f1ed', // text-primary
  textInverseColor: '#0f0d0a', // text-inverse
  textMutedColor: '#7a746d', // text-muted

  // Toolbar & tabs
  barTextColor: '#bfb8b0', // text-secondary
  barSelectedColor: '#c9956d', // accent-primary
  barHoverColor: '#d4a57a', // accent-hover
  barBg: '#1a1714', // surface-raised

  // Form elements
  inputBg: '#1a1714', // surface-raised
  inputBorder: '#3d3935', // border-default
  inputTextColor: '#f5f1ed', // text-primary
  inputBorderRadius: 8,

  // Buttons
  buttonBg: '#c9956d', // accent-primary
  buttonBorder: '#a87b56', // accent-secondary

  // Boolean controls
  booleanBg: '#1a1714', // surface-raised
  booleanSelectedBg: '#c9956d', // accent-primary
})
