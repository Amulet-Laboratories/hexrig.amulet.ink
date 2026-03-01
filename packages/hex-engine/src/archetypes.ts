/**
 * Hex Engine — Archetype Definitions
 *
 * Eight archetypes describing site use cases, not aesthetic moods.
 * Each archetype carries a hue pair, chroma target, surface/primary lightness
 * per mode, and a typography profile.
 */

import type { ArchetypeDefinition, ArchetypeKey, TypographyProfile } from './types'

// ---------------------------------------------------------------------------
// Typography profiles
// ---------------------------------------------------------------------------

const TYPOGRAPHY: Record<ArchetypeKey, TypographyProfile> = {
  command: {
    fontDisplay:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontBody:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono:
      '"Cascadia Code", "Fira Code", "JetBrains Mono", "Courier New", monospace',
    scaleRatio: 1.2,
    leading: 'tight',
    trackingDisplay: '-0.01em',
  },
  ledger: {
    fontDisplay:
      '"Source Serif 4", Georgia, "Times New Roman", "Palatino Linotype", serif',
    fontBody:
      '"Source Serif 4", Georgia, "Times New Roman", serif',
    fontMono:
      '"Cascadia Mono", "Courier New", Courier, monospace',
    scaleRatio: 1.25,
    leading: 'normal',
    trackingDisplay: '-0.01em',
  },
  journal: {
    fontDisplay:
      '"Playfair Display", Georgia, "Palatino Linotype", "Book Antiqua", serif',
    fontBody:
      '"Lora", "Source Serif 4", Georgia, "Times New Roman", serif',
    fontMono:
      '"iA Writer Mono", "Fira Code", "JetBrains Mono", monospace',
    scaleRatio: 1.333,
    leading: 'relaxed',
    trackingDisplay: '0em',
  },
  market: {
    fontDisplay:
      '"Inter", "Helvetica Neue", Arial, system-ui, sans-serif',
    fontBody:
      '"Inter", "Helvetica Neue", Arial, system-ui, sans-serif',
    fontMono:
      '"JetBrains Mono", "Fira Code", "Courier New", monospace',
    scaleRatio: 1.25,
    leading: 'normal',
    trackingDisplay: '-0.02em',
  },
  gallery: {
    fontDisplay:
      '"Helvetica Neue", Helvetica, Arial, system-ui, sans-serif',
    fontBody:
      '"Helvetica Neue", Helvetica, Arial, system-ui, sans-serif',
    fontMono:
      '"Courier New", Courier, "Lucida Console", monospace',
    scaleRatio: 1.414,
    leading: 'tight',
    trackingDisplay: '0.04em',
  },
  signal: {
    fontDisplay:
      '"Nunito", "Rounded Mplus 1c", system-ui, -apple-system, sans-serif',
    fontBody:
      '"Inter", "Nunito", system-ui, -apple-system, sans-serif',
    fontMono:
      '"JetBrains Mono", "Fira Code", "Courier New", monospace',
    scaleRatio: 1.2,
    leading: 'normal',
    trackingDisplay: '0em',
  },
  stage: {
    fontDisplay:
      '"Big Shoulders Display", Impact, "Arial Narrow", Arial, sans-serif',
    fontBody:
      '"Inter", "Helvetica Neue", Arial, system-ui, sans-serif',
    fontMono:
      '"Fragment Mono", "JetBrains Mono", "Fira Code", monospace',
    scaleRatio: 1.5,
    leading: 'normal',
    trackingDisplay: '-0.03em',
  },
  guide: {
    fontDisplay:
      '"Nunito", "Poppins", system-ui, -apple-system, sans-serif',
    fontBody:
      '"Open Sans", "Nunito", system-ui, -apple-system, sans-serif',
    fontMono:
      '"JetBrains Mono", "Fira Code", "Courier New", monospace',
    scaleRatio: 1.25,
    leading: 'relaxed',
    trackingDisplay: '0em',
  },
}

// ---------------------------------------------------------------------------
// Archetype definitions
// ---------------------------------------------------------------------------

export const ARCHETYPES: Record<ArchetypeKey, ArchetypeDefinition> = {
  command: {
    key: 'command',
    name: 'Command',
    baseHue: 195,
    accentHue: 25,
    chroma: 0.12,
    surfL: { d: 0.97, n: 0.09 },
    primL: { d: 0.42, n: 0.68 },
    typography: TYPOGRAPHY.command,
  },
  ledger: {
    key: 'ledger',
    name: 'Ledger',
    baseHue: 230,
    accentHue: 50,
    chroma: 0.08,
    surfL: { d: 0.98, n: 0.10 },
    primL: { d: 0.38, n: 0.65 },
    typography: TYPOGRAPHY.ledger,
  },
  journal: {
    key: 'journal',
    name: 'Journal',
    baseHue: 90,
    accentHue: 20,
    chroma: 0.10,
    surfL: { d: 0.97, n: 0.10 },
    primL: { d: 0.40, n: 0.65 },
    typography: TYPOGRAPHY.journal,
  },
  market: {
    key: 'market',
    name: 'Market',
    baseHue: 35,
    accentHue: 345,
    chroma: 0.14,
    surfL: { d: 0.97, n: 0.09 },
    primL: { d: 0.42, n: 0.70 },
    typography: TYPOGRAPHY.market,
  },
  gallery: {
    key: 'gallery',
    name: 'Gallery',
    baseHue: 0,
    accentHue: 0,
    chroma: 0.00,
    surfL: { d: 0.99, n: 0.08 },
    primL: { d: 0.35, n: 0.72 },
    typography: TYPOGRAPHY.gallery,
  },
  signal: {
    key: 'signal',
    name: 'Signal',
    baseHue: 30,
    accentHue: 275,
    chroma: 0.13,
    surfL: { d: 0.97, n: 0.09 },
    primL: { d: 0.44, n: 0.68 },
    typography: TYPOGRAPHY.signal,
  },
  stage: {
    key: 'stage',
    name: 'Stage',
    baseHue: 280,
    accentHue: 155,
    chroma: 0.20,
    surfL: { d: 0.95, n: 0.07 },
    primL: { d: 0.38, n: 0.72 },
    typography: TYPOGRAPHY.stage,
  },
  guide: {
    key: 'guide',
    name: 'Guide',
    baseHue: 175,
    accentHue: 50,
    chroma: 0.11,
    surfL: { d: 0.98, n: 0.10 },
    primL: { d: 0.40, n: 0.65 },
    typography: TYPOGRAPHY.guide,
  },
}

/** Ordered array of all archetypes */
export const archetypes: ArchetypeDefinition[] = Object.values(ARCHETYPES)

/** Mapping of old archetype names (artifact) to new names */
export const ARCHETYPE_ALIASES: Record<string, ArchetypeKey> = {
  reef: 'command',
  summit: 'ledger',
  grove: 'journal',
  bazaar: 'market',
  studio: 'gallery',
  campfire: 'signal',
  aurora: 'stage',
  tidepool: 'guide',
}
