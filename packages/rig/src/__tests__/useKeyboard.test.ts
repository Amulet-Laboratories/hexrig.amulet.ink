import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { effectScope } from 'vue'
import { useKeyboard } from '@rig/composables/useKeyboard'

describe('useKeyboard', () => {
  let scope: ReturnType<typeof effectScope>

  beforeEach(() => {
    scope = effectScope()
  })

  afterEach(() => {
    scope.stop()
  })

  const createKeyEvent = (key: string, options: Partial<KeyboardEvent> = {}): KeyboardEvent => {
    return new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
      ...options,
    })
  }

  it('returns register, unregister, and shortcuts', () => {
    let result: ReturnType<typeof useKeyboard>
    scope.run(() => {
      result = useKeyboard()
    })
    expect(result!.register).toBeInstanceOf(Function)
    expect(result!.unregister).toBeInstanceOf(Function)
    expect(result!.shortcuts).toBeDefined()
  })

  it('registers a shortcut and fires handler on keydown', () => {
    const handler = vi.fn()
    scope.run(() => {
      const { register } = useKeyboard()
      register('k', handler)
    })

    document.dispatchEvent(createKeyEvent('k'))
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does not fire handler for non-matching keys', () => {
    const handler = vi.fn()
    scope.run(() => {
      const { register } = useKeyboard()
      register('k', handler)
    })

    document.dispatchEvent(createKeyEvent('j'))
    expect(handler).not.toHaveBeenCalled()
  })

  it('respects mod key (ctrl on non-mac)', () => {
    const handler = vi.fn()
    scope.run(() => {
      const { register } = useKeyboard()
      register('mod+k', handler)
    })

    // Without ctrl — should NOT fire
    document.dispatchEvent(createKeyEvent('k'))
    expect(handler).not.toHaveBeenCalled()

    // With ctrl — should fire
    document.dispatchEvent(createKeyEvent('k', { ctrlKey: true }))
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does not fire when focus is on input (non-global)', () => {
    const handler = vi.fn()
    scope.run(() => {
      const { register } = useKeyboard()
      register('k', handler)
    })

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    document.dispatchEvent(createKeyEvent('k'))
    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(input)
  })

  it('fires when focus is on input if global option is true', () => {
    const handler = vi.fn()
    scope.run(() => {
      const { register } = useKeyboard()
      register('escape', handler, { global: true })
    })

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    document.dispatchEvent(createKeyEvent('Escape'))
    expect(handler).toHaveBeenCalledOnce()

    document.body.removeChild(input)
  })

  it('unregisters a shortcut', () => {
    const handler = vi.fn()
    scope.run(() => {
      const { register, unregister } = useKeyboard()
      register('k', handler)
      unregister('k')
    })

    document.dispatchEvent(createKeyEvent('k'))
    expect(handler).not.toHaveBeenCalled()
  })

  it('cleans up on scope dispose', () => {
    const handler = vi.fn()
    scope.run(() => {
      const { register } = useKeyboard()
      register('k', handler)
    })

    scope.stop()
    document.dispatchEvent(createKeyEvent('k'))
    expect(handler).not.toHaveBeenCalled()
  })

  it('tracks registered shortcuts in the shortcuts ref', () => {
    let result: ReturnType<typeof useKeyboard>
    scope.run(() => {
      result = useKeyboard()
      result.register('mod+k', () => {}, { description: 'Focus search' })
      result.register('escape', () => {}, { description: 'Close panel' })
    })

    expect(result!.shortcuts.value).toHaveLength(2)
    expect(result!.shortcuts.value[0].keys).toBe('mod+k')
    expect(result!.shortcuts.value[0].description).toBe('Focus search')
    expect(result!.shortcuts.value[1].keys).toBe('escape')
  })

  it('supports multiple shortcuts coexisting', () => {
    const handler1 = vi.fn()
    const handler2 = vi.fn()
    scope.run(() => {
      const { register } = useKeyboard()
      register('k', handler1)
      register('j', handler2)
    })

    document.dispatchEvent(createKeyEvent('k'))
    expect(handler1).toHaveBeenCalledOnce()
    expect(handler2).not.toHaveBeenCalled()

    document.dispatchEvent(createKeyEvent('j'))
    expect(handler2).toHaveBeenCalledOnce()
  })
})
