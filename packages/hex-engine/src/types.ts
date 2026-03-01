/**
 * Hex Engine — Type Definitions
 *
 * All public TypeScript interfaces for the generative token engine.
 */

// ---------------------------------------------------------------------------
// Primitive keys
// ---------------------------------------------------------------------------

export type Mode = 'day' | 'night'
export type WeightKey = 'light' | 'standard' | 'heavy'
export type AttitudeKey = 'kinetic' | 'tranquil' | 'intimate' | 'luminous'
export type ArchetypeKey =
  | 'command'
  | 'ledger'
  | 'journal'
  | 'market'
  | 'gallery'
  | 'signal'
  | 'stage'
  | 'guide'

// ---------------------------------------------------------------------------
// Token interfaces
// ---------------------------------------------------------------------------

export interface ColorTokens {
  /** Page / document background */
  surface: string
  /** Card / panel background */
  surfaceAlt: string
  /** Brand color — primary interactive */
  primary: string
  /** Primary hover / active state */
  primaryHover: string
  /** Muted brand — secondary elements */
  secondary: string
  /** Contrasting accent (CTAs, highlights) — different hue from primary */
  accent: string
  /** Accent hover / active state */
  accentHover: string
  /** Body text */
  text: string
  /** Secondary / caption text */
  textMuted: string
  /** Placeholder / disabled / very muted */
  muted: string
  /** Dividers, outlines, input borders */
  border: string
  /** Positive / success semantic */
  success: string
  /** Caution / warning semantic */
  warning: string
  /** Negative / error semantic */
  error: string
  /** Informational semantic */
  info: string
}

export interface ShadowTokens {
  /** Subtle elevation — cards, inputs */
  shadowSm: string
  /** Medium elevation — dropdowns, popovers */
  shadowMd: string
  /** High elevation — dialogs, sheets */
  shadowLg: string
  /** Dramatic elevation — floating elements */
  shadowXl: string
  /** Inset shadow — sunken surfaces (inputs, wells) */
  shadowInner: string
}

export interface TypographyTokens {
  /** Display / heading font stack */
  fontDisplay: string
  /** Body copy font stack */
  fontBody: string
  /** Code / data / label font stack */
  fontMono: string
  /** 0.75rem × ratio^-2 */
  textXs: string
  /** 0.875rem × ratio^-1 */
  textSm: string
  /** 1rem base */
  textBase: string
  textLg: string
  textXl: string
  text2xl: string
  text3xl: string
  text4xl: string
  /** Tight line height (1.15–1.25) */
  leadingTight: string
  /** Normal line height (1.4–1.6) */
  leadingNormal: string
  /** Relaxed line height (1.65–1.8) */
  leadingRelaxed: string
  trackingTight: string
  trackingNormal: string
  trackingWide: string
}

export interface SpacingTokens {
  space1: string
  space2: string
  space3: string
  space4: string
  space6: string
  space8: string
  space12: string
  space16: string
}

export interface RadiusTokens {
  radiusSm: string
  radiusMd: string
  radiusLg: string
  radiusFull: string
}

export interface MotionTokens {
  durationFast: string
  durationNormal: string
  durationSlow: string
  easingDefault: string
  easingEnter: string
  easingExit: string
}

/** Complete token set — output of generate() */
export interface TokenSet
  extends ColorTokens,
    ShadowTokens,
    TypographyTokens,
    SpacingTokens,
    RadiusTokens,
    MotionTokens {
  /** Resolved archetype key */
  archetype: string
  mode: Mode
  weight: WeightKey
  attitude: AttitudeKey
}

// ---------------------------------------------------------------------------
// Archetype & modifier definitions (internal, also exported for consumers)
// ---------------------------------------------------------------------------

export interface TypographyProfile {
  fontDisplay: string
  fontBody: string
  fontMono: string
  /** Modular scale ratio (e.g. 1.25 = minor third, 1.333 = perfect fourth) */
  scaleRatio: number
  /** Preferred reading rhythm */
  leading: 'tight' | 'normal' | 'relaxed'
  /** Display letter spacing */
  trackingDisplay: string
}

export interface ArchetypeDefinition {
  key: ArchetypeKey | string
  name: string
  baseHue: number
  accentHue: number
  chroma: number
  /** Surface lightness: d = day mode, n = night mode */
  surfL: { d: number; n: number }
  /** Primary lightness: d = day mode, n = night mode */
  primL: { d: number; n: number }
  typography: TypographyProfile
}

/** Custom archetype — user-defined, passed inline in ThemeConfig */
export interface CustomArchetype {
  key: string
  name: string
  baseHue: number
  accentHue: number
  chroma: number
  surfL?: { d: number; n: number }
  primL?: { d: number; n: number }
  /** Borrow typography from a named archetype key */
  typography?: ArchetypeKey | TypographyProfile
}

export interface WeightDefinition {
  key: WeightKey
  /** Multiplier applied to base chroma */
  chromaMultiplier: number
  /** Shift applied to primary lightness */
  lightnessShift: number
}

export interface AttitudeDefinition {
  key: AttitudeKey
  chromaShift: number
  lightnessShift: number
  hueShift: number
}

// ---------------------------------------------------------------------------
// Input config
// ---------------------------------------------------------------------------

export interface ThemeConfig {
  archetype: ArchetypeKey | CustomArchetype
  mode?: Mode
  weight?: WeightKey
  attitude?: AttitudeKey
}

// ---------------------------------------------------------------------------
// Contrast / audit types
// ---------------------------------------------------------------------------

export interface ContrastResult {
  ratio: number
  /** WCAG AA — 4.5:1 normal text, 3:1 large/UI */
  aa: boolean
  /** WCAG AA large text / UI components (3:1) */
  aaLarge: boolean
  /** WCAG AAA — 7:1 */
  aaa: boolean
}

export interface AuditPair {
  name: string
  foreground: string
  background: string
  contrast: ContrastResult
  pass: boolean
}

export interface AuditResult {
  config: ThemeConfig
  pairs: AuditPair[]
  passing: boolean
}
