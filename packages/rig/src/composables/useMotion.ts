import { computed, ref, onScopeDispose, inject, type Ref } from 'vue'
import type { UseMotionReturn } from '../types'
import { THEME_INJECTION_KEY } from './useTheme'

/**
 * useMotion composable — returns theme-appropriate motion values.
 *
 * Reads CSS custom properties from the nearest themed element and respects
 * prefers-reduced-motion. Accepts an optional element ref; if none is provided,
 * it searches upward for the closest element with `data-theme`, falling back to
 * `document.documentElement`.
 */
export function useMotion(elementRef?: Ref<HTMLElement | null | undefined>): UseMotionReturn {
  const prefersReducedMotion = ref(false)

  // Trigger reactivity when data-theme or data-mode attributes change
  const themeRevision = ref(0)

  // Also subscribe to injected theme state so we re-evaluate when the provider changes
  const injectedTheme = inject(THEME_INJECTION_KEY, null)

  /** Find the closest ancestor (or self) that has data-theme set */
  function findThemedElement(): HTMLElement {
    if (elementRef?.value) return elementRef.value
    const themed = document.querySelector<HTMLElement>('[data-theme]')
    return themed ?? document.documentElement
  }

  /** Read a CSS var with reactive tracking on theme/mode changes */
  function trackedVar(name: string, fallback: string): string {
    // Subscribe to DOM attribute mutations and injected theme state
    void themeRevision.value
    if (injectedTheme) {
      void injectedTheme.theme.value
      void injectedTheme.mode.value
    }
    if (typeof document === 'undefined') return fallback
    return getComputedStyle(findThemedElement()).getPropertyValue(name).trim() || fallback
  }

  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches
    }
    mq.addEventListener('change', handler)

    const observer = new MutationObserver(() => {
      themeRevision.value++
    })
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-mode'],
      subtree: true,
    })

    onScopeDispose(() => {
      mq.removeEventListener('change', handler)
      observer.disconnect()
    })
  }

  const duration = computed(() => {
    if (prefersReducedMotion.value) return '0ms'
    return trackedVar('--duration-normal', '200ms')
  })

  const durationSlow = computed(() => {
    if (prefersReducedMotion.value) return '0ms'
    return trackedVar('--duration-slow', '500ms')
  })

  const easing = computed(() => {
    return trackedVar('--easing-default', 'cubic-bezier(0.4, 0, 0.2, 1)')
  })

  return {
    duration,
    durationSlow,
    easing,
    prefersReducedMotion,
  }
}
