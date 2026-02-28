import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { effectScope, nextTick } from 'vue'
import { useLocalStorage } from '@rig/composables/useLocalStorage'

describe('useLocalStorage', () => {
  let scope: ReturnType<typeof effectScope>

  beforeEach(() => {
    scope = effectScope()
    localStorage.clear()
  })

  afterEach(() => {
    scope.stop()
  })

  it('returns default value when key does not exist', () => {
    let result: ReturnType<typeof useLocalStorage<string>>
    scope.run(() => {
      result = useLocalStorage('test-key', 'default')
    })
    expect(result!.value.value).toBe('default')
  })

  it('reads existing value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'))
    let result: ReturnType<typeof useLocalStorage<string>>
    scope.run(() => {
      result = useLocalStorage('test-key', 'default')
    })
    expect(result!.value.value).toBe('stored')
  })

  it('writes changes back to localStorage', async () => {
    let result: ReturnType<typeof useLocalStorage<string>>
    scope.run(() => {
      result = useLocalStorage('test-key', 'default')
    })
    result!.value.value = 'updated'
    await nextTick()
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('updated')
  })

  it('removes key from localStorage', async () => {
    localStorage.setItem('test-key', JSON.stringify('stored'))
    let result: ReturnType<typeof useLocalStorage<string>>
    scope.run(() => {
      result = useLocalStorage('test-key', 'default')
    })
    result!.remove()
    await nextTick()
    expect(localStorage.getItem('test-key')).toBeNull()
    expect(result!.value.value).toBe('default')
  })

  it('handles complex objects', async () => {
    let result: ReturnType<typeof useLocalStorage<{ count: number }>>
    scope.run(() => {
      result = useLocalStorage('test-obj', { count: 0 })
    })
    result!.value.value = { count: 42 }
    await nextTick()
    expect(JSON.parse(localStorage.getItem('test-obj')!)).toEqual({ count: 42 })
  })
})
