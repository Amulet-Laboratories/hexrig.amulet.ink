import { ref, inject, provide, onScopeDispose, type InjectionKey } from 'vue'
import type { ThemeId, ModeId } from '@amulet-laboratories/hex'
import type { UseThemeReturn } from '../types'

export const THEME_INJECTION_KEY: InjectionKey<UseThemeReturn> = Symbol('hex-theme')

/**
 * useTheme composable — reactive theme/mode state.
 *
 * When called inside a RigThemeProvider, returns its injected state.
 * When called standalone (root setup), creates new state.
 */
export function useTheme(defaults?: { theme?: ThemeId; mode?: ModeId | 'auto' }): UseThemeReturn {
  // Try to inject from parent ThemeProvider
  const injected = inject(THEME_INJECTION_KEY, null)
  if (injected) return injected

  // Standalone usage — create new state
  const theme = ref<ThemeId>(defaults?.theme ?? 'hearth')

  // Resolve 'auto' mode via prefers-color-scheme
  const resolveMode = (): ModeId => {
    if (defaults?.mode && defaults.mode !== 'auto') return defaults.mode
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  }

  const mode = ref<ModeId>(resolveMode())

  // Track whether the user has explicitly set a mode
  const userExplicitMode = ref(false)

  // Always register MQ listener — auto-updates only apply when user hasn't overridden
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!userExplicitMode.value) {
        mode.value = e.matches ? 'dark' : 'light'
      }
    }
    mq.addEventListener('change', handler)
    onScopeDispose(() => mq.removeEventListener('change', handler))
  }

  const setTheme = (id: ThemeId) => { theme.value = id }
  const setMode = (m: ModeId) => {
    userExplicitMode.value = true
    mode.value = m
  }
  const toggleMode = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  const api: UseThemeReturn = {
    theme,
    mode,
    setTheme,
    setMode,
    toggleMode,
  }

  return api
}

/**
 * Provide theme state to child components via injection.
 */
export function provideTheme(api: UseThemeReturn): void {
  provide(THEME_INJECTION_KEY, api)
}
