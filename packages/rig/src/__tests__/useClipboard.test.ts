import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { effectScope } from 'vue'
import { useClipboard } from '@rig/composables/useClipboard'

describe('useClipboard', () => {
  let scope: ReturnType<typeof effectScope>

  beforeEach(() => {
    scope = effectScope()
    vi.useFakeTimers()
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  afterEach(() => {
    scope.stop()
    vi.useRealTimers()
  })

  it('returns copy, copied, and isSupported', () => {
    let result: ReturnType<typeof useClipboard>
    scope.run(() => {
      result = useClipboard()
    })
    expect(result!.copy).toBeInstanceOf(Function)
    expect(result!.copied.value).toBe(false)
    expect(result!.isSupported).toBe(true)
  })

  it('sets copied to true after copying', async () => {
    let result: ReturnType<typeof useClipboard>
    scope.run(() => {
      result = useClipboard()
    })
    await result!.copy('hello')
    expect(result!.copied.value).toBe(true)
  })

  it('resets copied after delay', async () => {
    let result: ReturnType<typeof useClipboard>
    scope.run(() => {
      result = useClipboard(1000)
    })
    await result!.copy('hello')
    expect(result!.copied.value).toBe(true)
    vi.advanceTimersByTime(1000)
    expect(result!.copied.value).toBe(false)
  })

  it('calls navigator.clipboard.writeText', async () => {
    let result: ReturnType<typeof useClipboard>
    scope.run(() => {
      result = useClipboard()
    })
    await result!.copy('test-text')
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test-text')
  })
})
