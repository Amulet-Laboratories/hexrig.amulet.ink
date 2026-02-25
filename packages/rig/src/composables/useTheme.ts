import { ref, inject, provide, onScopeDispose, type InjectionKey } from 'vue'
import type { ThemeId, SchemeId, UseThemeReturn } from '../types'

export const THEME_INJECTION_KEY: InjectionKey<UseThemeReturn> = Symbol('hex-theme')

/**
 * useTheme composable — reactive theme/scheme state.
 *
 * When called inside a RigThemeProvider, returns its injected state.
 * When called standalone (root setup), creates new state.
 */
export function useTheme(defaults?: { theme?: ThemeId; scheme?: SchemeId | 'auto' }): UseThemeReturn {
  // Try to inject from parent ThemeProvider
  const injected = inject(THEME_INJECTION_KEY, null)
  if (injected) return injected

  // Standalone usage — create new state
  const theme = ref<ThemeId>(defaults?.theme ?? 'hearth')

  // Resolve 'auto' scheme via prefers-color-scheme
  const resolveScheme = (): SchemeId => {
    if (defaults?.scheme && defaults.scheme !== 'auto') return defaults.scheme
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  }

  const scheme = ref<SchemeId>(resolveScheme())

  // Track whether the user has explicitly set a scheme
  const userExplicitScheme = ref(false)

  // Listen for system scheme changes when 'auto'
  if (typeof window !== 'undefined' && defaults?.scheme === 'auto') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't explicitly overridden
      if (!userExplicitScheme.value) {
        scheme.value = e.matches ? 'dark' : 'light'
      }
    }
    mq.addEventListener('change', handler)
    onScopeDispose(() => mq.removeEventListener('change', handler))
  }

  const setTheme = (id: ThemeId) => { theme.value = id }
  const setScheme = (s: SchemeId) => {
    userExplicitScheme.value = true
    scheme.value = s
  }
  const toggleScheme = () => {
    scheme.value = scheme.value === 'dark' ? 'light' : 'dark'
  }

  const api: UseThemeReturn = {
    theme,
    scheme,
    setTheme,
    setScheme,
    toggleScheme,
  }

  return api
}

/**
 * Provide theme state to child components via injection.
 */
export function provideTheme(api: UseThemeReturn): void {
  provide(THEME_INJECTION_KEY, api)
}
