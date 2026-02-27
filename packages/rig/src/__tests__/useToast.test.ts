import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { effectScope, type EffectScope } from 'vue'
import { useToast } from '@rig/composables/useToast'

describe('useToast', () => {
  let scope: EffectScope
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    scope = effectScope()
    // Suppress expected Vue warn for inject() outside setup — composable handles this gracefully
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.useFakeTimers()
  })

  afterEach(() => {
    scope.run(() => {
      const { dismissAll } = useToast()
      dismissAll()
    })
    scope.stop()
    warnSpy.mockRestore()
    vi.useRealTimers()
  })

  it('returns show, dismiss, dismissAll, and toasts', () => {
    scope.run(() => {
      const toast = useToast()
      expect(typeof toast.show).toBe('function')
      expect(typeof toast.dismiss).toBe('function')
      expect(typeof toast.dismissAll).toBe('function')
      expect(toast.toasts).toBeDefined()
    })
  })

  it('show() adds a toast and returns an id', () => {
    scope.run(() => {
      const { show, toasts } = useToast()
      const id = show({ title: 'Test toast' })
      expect(typeof id).toBe('string')
      expect(toasts.value).toHaveLength(1)
      expect(toasts.value[0].title).toBe('Test toast')
    })
  })

  it('dismiss() removes a specific toast', () => {
    scope.run(() => {
      const { show, dismiss, toasts } = useToast()
      const id = show({ title: 'A' })
      show({ title: 'B' })
      expect(toasts.value).toHaveLength(2)
      dismiss(id)
      expect(toasts.value).toHaveLength(1)
      expect(toasts.value[0].title).toBe('B')
    })
  })

  it('dismissAll() clears all toasts', () => {
    scope.run(() => {
      const { show, dismissAll, toasts } = useToast()
      show({ title: 'A' })
      show({ title: 'B' })
      expect(toasts.value).toHaveLength(2)
      dismissAll()
      expect(toasts.value).toHaveLength(0)
    })
  })

  it('auto-dismisses after duration', () => {
    scope.run(() => {
      const { show, toasts } = useToast()
      show({ title: 'Auto', duration: 3000 })
      expect(toasts.value).toHaveLength(1)
      vi.advanceTimersByTime(3000)
      expect(toasts.value).toHaveLength(0)
    })
  })

  it('defaults to neutral tone', () => {
    scope.run(() => {
      const { show, toasts } = useToast()
      show({ title: 'Neutral' })
      expect(toasts.value[0].tone).toBe('neutral')
    })
  })

  it('defaults to dismissible: true', () => {
    scope.run(() => {
      const { show, toasts } = useToast()
      show({ title: 'Dismiss me' })
      expect(toasts.value[0].dismissible).toBe(true)
    })
  })

  it('does not auto-dismiss when duration is 0', () => {
    scope.run(() => {
      const { show, toasts } = useToast()
      show({ title: 'Persistent', duration: 0 })
      expect(toasts.value).toHaveLength(1)
      // Advancing time should not remove a duration:0 toast
      vi.advanceTimersByTime(10000)
      expect(toasts.value).toHaveLength(1)
    })
  })
})
