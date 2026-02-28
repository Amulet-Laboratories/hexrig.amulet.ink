import { ref, computed, onScopeDispose, type ComputedRef, type Ref } from 'vue'
import type { Breakpoint, UseBreakpointReturn } from '../types'

const breakpointValues: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

const breakpointOrder: Breakpoint[] = ['sm', 'md', 'lg', 'xl', '2xl']

function resolveBreakpoint(width: number): Breakpoint {
  for (let i = breakpointOrder.length - 1; i >= 0; i--) {
    if (width >= breakpointValues[breakpointOrder[i]]) return breakpointOrder[i]
  }
  return 'sm'
}

/**
 * useBreakpoint composable — reactive Tailwind breakpoint tracking.
 */
export function useBreakpoint(): UseBreakpointReturn {
  const current: Ref<Breakpoint> = ref(
    typeof window !== 'undefined' ? resolveBreakpoint(window.innerWidth) : 'md',
  )

  const queries: { mql: MediaQueryList; handler: (e: MediaQueryListEvent) => void }[] = []

  if (typeof window !== 'undefined') {
    for (const bp of breakpointOrder) {
      const mql = window.matchMedia(`(min-width: ${breakpointValues[bp]}px)`)
      const handler = () => {
        current.value = resolveBreakpoint(window.innerWidth)
      }
      mql.addEventListener('change', handler)
      queries.push({ mql, handler })
    }
  }

  const indexOf = (bp: Breakpoint): number => breakpointOrder.indexOf(bp)

  const gte = (bp: Breakpoint): ComputedRef<boolean> => {
    return computed(() => indexOf(current.value) >= indexOf(bp))
  }

  const lt = (bp: Breakpoint): ComputedRef<boolean> => {
    return computed(() => indexOf(current.value) < indexOf(bp))
  }

  onScopeDispose(() => {
    for (const { mql, handler } of queries) {
      mql.removeEventListener('change', handler)
    }
  })

  return { current, gte, lt }
}
