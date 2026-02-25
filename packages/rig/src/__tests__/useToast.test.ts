import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useToast } from '@rig/composables/useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    const { dismissAll } = useToast()
    dismissAll()
    vi.useRealTimers()
  })

  it('returns show, dismiss, dismissAll, and toasts', () => {
    const toast = useToast()
    expect(typeof toast.show).toBe('function')
    expect(typeof toast.dismiss).toBe('function')
    expect(typeof toast.dismissAll).toBe('function')
    expect(toast.toasts).toBeDefined()
  })

  it('show() adds a toast and returns an id', () => {
    const { show, toasts } = useToast()
    const id = show({ title: 'Test toast' })
    expect(typeof id).toBe('string')
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].title).toBe('Test toast')
  })

  it('dismiss() removes a specific toast', () => {
    const { show, dismiss, toasts } = useToast()
    const id = show({ title: 'A' })
    show({ title: 'B' })
    expect(toasts.value).toHaveLength(2)
    dismiss(id)
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].title).toBe('B')
  })

  it('dismissAll() clears all toasts', () => {
    const { show, dismissAll, toasts } = useToast()
    show({ title: 'A' })
    show({ title: 'B' })
    expect(toasts.value).toHaveLength(2)
    dismissAll()
    expect(toasts.value).toHaveLength(0)
  })

  it('auto-dismisses after duration', () => {
    const { show, toasts } = useToast()
    show({ title: 'Auto', duration: 3000 })
    expect(toasts.value).toHaveLength(1)
    vi.advanceTimersByTime(3000)
    expect(toasts.value).toHaveLength(0)
  })

  it('defaults to neutral tone', () => {
    const { show, toasts } = useToast()
    show({ title: 'Neutral' })
    expect(toasts.value[0].tone).toBe('neutral')
  })

  it('defaults to dismissible: true', () => {
    const { show, toasts } = useToast()
    show({ title: 'Dismiss me' })
    expect(toasts.value[0].dismissible).toBe(true)
  })
})
