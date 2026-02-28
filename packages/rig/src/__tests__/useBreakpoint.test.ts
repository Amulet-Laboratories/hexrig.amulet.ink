import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { effectScope } from 'vue'
import { useBreakpoint } from '@rig/composables/useBreakpoint'

describe('useBreakpoint', () => {
  let scope: ReturnType<typeof effectScope>
  const originalInnerWidth = window.innerWidth

  beforeEach(() => {
    scope = effectScope()
    // Stub window.matchMedia for jsdom
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  afterEach(() => {
    scope.stop()
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true })
  })

  it('returns current breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true })
    let result: ReturnType<typeof useBreakpoint>
    scope.run(() => {
      result = useBreakpoint()
    })
    expect(result!.current.value).toBe('xl')
  })

  it('returns sm for small viewport', () => {
    Object.defineProperty(window, 'innerWidth', { value: 400, writable: true })
    let result: ReturnType<typeof useBreakpoint>
    scope.run(() => {
      result = useBreakpoint()
    })
    expect(result!.current.value).toBe('sm')
  })

  it('gte returns computed boolean', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
    let result: ReturnType<typeof useBreakpoint>
    scope.run(() => {
      result = useBreakpoint()
    })
    expect(result!.gte('lg').value).toBe(true)
    expect(result!.gte('xl').value).toBe(false)
  })

  it('lt returns computed boolean', () => {
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true })
    let result: ReturnType<typeof useBreakpoint>
    scope.run(() => {
      result = useBreakpoint()
    })
    expect(result!.lt('lg').value).toBe(true)
    expect(result!.lt('sm').value).toBe(false)
  })
})
