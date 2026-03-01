/**
 * useHexEngine — Generate and cache themes from hex-engine
 *
 * Provides recommended theme combinations and generates themes
 * on-demand for the interactive theme builder.
 */

import { generate, archetypes, toCSS } from '@amulet-laboratories/hex-engine'
import type { TokenSet, ThemeConfig, ArchetypeKey, WeightKey, AttitudeKey, Mode } from '@amulet-laboratories/hex-engine'
import { computed, ref } from 'vue'

// ---------------------------------------------------------------------------
// Curated recommendations — 8 hand-picked combinations
// ---------------------------------------------------------------------------

export interface RecommendedTheme {
  id: string
  archetype: ArchetypeKey
  weight: WeightKey
  attitude: AttitudeKey
  mode: Mode
  name: string
  narrative: string
  tokens?: TokenSet
}

export const RECOMMENDED_THEMES: RecommendedTheme[] = [
  {
    id: 'command-kinetic',
    archetype: 'command',
    weight: 'standard',
    attitude: 'kinetic',
    mode: 'night',
    name: 'Command',
    narrative: 'Precise, utilitarian. For control panels and dashboards.',
  },
  {
    id: 'journal-intimate',
    archetype: 'journal',
    weight: 'standard',
    attitude: 'intimate',
    mode: 'night',
    name: 'Journal',
    narrative: 'Warm, reflective. For writing and documentation.',
  },
  {
    id: 'market-luminous',
    archetype: 'market',
    weight: 'standard',
    attitude: 'luminous',
    mode: 'night',
    name: 'Market',
    narrative: 'Energetic, engaging. For commerce and e-commerce.',
  },
  {
    id: 'gallery-tranquil',
    archetype: 'gallery',
    weight: 'standard',
    attitude: 'tranquil',
    mode: 'night',
    name: 'Gallery',
    narrative: 'Minimal, neutral. For visual-focused interfaces.',
  },
  {
    id: 'signal-kinetic',
    archetype: 'signal',
    weight: 'standard',
    attitude: 'kinetic',
    mode: 'night',
    name: 'Signal',
    narrative: 'Vibrant, friendly. For playful or social interfaces.',
  },
  {
    id: 'ledger-tranquil',
    archetype: 'ledger',
    weight: 'standard',
    attitude: 'tranquil',
    mode: 'night',
    name: 'Ledger',
    narrative: 'Professional, structured. For financial and data apps.',
  },
  {
    id: 'stage-luminous',
    archetype: 'stage',
    weight: 'heavy',
    attitude: 'luminous',
    mode: 'night',
    name: 'Stage',
    narrative: 'Bold, dramatic. For storytelling and presentations.',
  },
  {
    id: 'guide-intimate',
    archetype: 'guide',
    weight: 'light',
    attitude: 'intimate',
    mode: 'night',
    name: 'Guide',
    narrative: 'Welcoming, supportive. For education and onboarding.',
  },
]

// ---------------------------------------------------------------------------
// Theme cache & generation
// ---------------------------------------------------------------------------

const themeCache = new Map<string, TokenSet>()

export function generateTheme(config: ThemeConfig): TokenSet {
  const cacheKey = JSON.stringify(config)
  if (themeCache.has(cacheKey)) {
    return themeCache.get(cacheKey)!
  }

  const tokens = generate(config)
  themeCache.set(cacheKey, tokens)
  return tokens
}

/**
 * Generate all recommended themes
 */
export function generateRecommendedThemes(): RecommendedTheme[] {
  return RECOMMENDED_THEMES.map((theme) => ({
    ...theme,
    tokens: generateTheme({
      archetype: theme.archetype,
      weight: theme.weight,
      attitude: theme.attitude,
      mode: theme.mode,
    }),
  }))
}

/**
 * Generate CSS for a theme and inject it into the document.
 */
export function applyThemeCSS(config: ThemeConfig, elementId: string = 'hex-theme-builder'): void {
  if (typeof document === 'undefined') return

  const tokens = generateTheme(config)

  // Remove existing style if present
  const existing = document.getElementById(elementId)
  if (existing) {
    existing.remove()
  }

  // Generate CSS with unique selector
  const css = toCSS(tokens, `#${elementId}`)

  // Create and inject style element
  const style = document.createElement('style')
  style.id = elementId
  style.textContent = css

  // Add aliases for hex-origins token names (for backward compatibility)
  const aliasCSS = createTokenAliases(tokens, elementId)
  style.textContent += aliasCSS

  document.head.appendChild(style)
}

/**
 * Create CSS aliases to map hex-engine tokens to hex-origins/Tailwind names
 */
function createTokenAliases(tokens: TokenSet, elementId: string): string {
  const mapping: Record<string, string> = {
    '--accent': tokens.accent,
    '--accent-muted': tokens.secondary,
    '--surface-base': tokens.surface,
    '--surface-raised': tokens.surfaceAlt,
    '--surface-sunken': tokens.surface,
    '--text-primary': tokens.text,
    '--text-secondary': tokens.textMuted,
    '--text-muted': tokens.muted,
    '--text-on-accent': '#ffffff',
    '--border-subtle': tokens.border,
    '--border-strong': tokens.border,
    '--status-success': tokens.success,
    '--status-warning': tokens.warning,
    '--status-error': tokens.error,
    '--status-info': tokens.info,
  }

  const lines = Object.entries(mapping)
    .map(([name, value]) => `  ${name}: ${value};`)

  return `\n#${elementId} {\n${lines.join('\n')}\n}\n`
}

// ---------------------------------------------------------------------------
// Composable for theme exploration
// ---------------------------------------------------------------------------

export function useHexEngine() {
  const selectedArchetype = ref<ArchetypeKey>('command')
  const selectedWeight = ref<WeightKey>('standard')
  const selectedAttitude = ref<AttitudeKey>('kinetic')
  const selectedMode = ref<Mode>('night')

  const currentTheme = computed(() =>
    generateTheme({
      archetype: selectedArchetype.value,
      weight: selectedWeight.value,
      attitude: selectedAttitude.value,
      mode: selectedMode.value,
    }),
  )

  const currentArchetype = computed(() =>
    archetypes.find((a) => a.key === selectedArchetype.value),
  )

  return {
    // Selected axes
    selectedArchetype,
    selectedWeight,
    selectedAttitude,
    selectedMode,

    // Generated theme
    currentTheme,
    currentArchetype,

    // All available options
    archetypes,
    weights: ['light', 'standard', 'heavy'] as const,
    attitudes: ['kinetic', 'tranquil', 'intimate', 'luminous'] as const,
    modes: ['day', 'night'] as const,

    // Generate on demand
    generateTheme,
  }
}
