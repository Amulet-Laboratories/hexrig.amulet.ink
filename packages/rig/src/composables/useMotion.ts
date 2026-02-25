import { computed, ref, onScopeDispose, watch } from 'vue'
import type { UseMotionReturn } from '../types'

/**
 * useMotion composable — returns theme-appropriate motion values.
 *
 * Reads CSS custom properties from the DOM and respects prefers-reduced-motion.
 * Uses a MutationObserver to reactively track theme changes on the root element.
 */
export function useMotion(): UseMotionReturn {
  const prefersReducedMotion = ref(false)

  // Trigger reactivity when data-theme or data-mode attributes change
  const themeRevision = ref(0)

  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches
    }
    mq.addEventListener('change', handler)

    // Observe root element attribute mutations for theme/mode changes
    const observer = new MutationObserver(() => {
      themeRevision.value++
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-mode'],
    })

    onScopeDispose(() => {
      mq.removeEventListener('change', handler)
      observer.disconnect()
    })
  }

  const getVar = (name: string, fallback: string): string => {
    if (typeof document === 'undefined') return fallback
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  }

  const duration = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    themeRevision.value // subscribe to theme changes
    if (prefersReducedMotion.value) return '0ms'
    return getVar('--duration-normal', '200ms')
  })

  const durationSlow = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    themeRevision.value
    if (prefersReducedMotion.value) return '0ms'
    return getVar('--duration-slow', '500ms')
  })

  const easing = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    themeRevision.value
    return getVar('--easing-default', 'cubic-bezier(0.4, 0, 0.2, 1)')
  })

  return {
    duration,
    durationSlow,
    easing,
    prefersReducedMotion,
  }
}
