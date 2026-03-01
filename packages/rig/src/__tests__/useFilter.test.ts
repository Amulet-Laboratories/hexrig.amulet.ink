import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, effectScope, nextTick } from 'vue'
import { useFilter } from '@rig/composables/useFilter'

const data = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' },
  { name: 'Dave', role: 'user' },
]

describe('useFilter', () => {
  let scope: ReturnType<typeof effectScope>

  beforeEach(() => {
    scope = effectScope()
    vi.useFakeTimers()
  })

  afterEach(() => {
    scope.stop()
    vi.useRealTimers()
  })

  it('returns all items when no filter applied', () => {
    let result: ReturnType<typeof useFilter<(typeof data)[0]>>
    scope.run(() => {
      result = useFilter(ref(data), ['name'])
    })
    expect(result!.filtered.value).toHaveLength(4)
  })

  it('filters by text query', async () => {
    let result: ReturnType<typeof useFilter<(typeof data)[0]>>
    scope.run(() => {
      result = useFilter(ref(data), ['name'])
    })
    result!.query.value = 'alice'
    await nextTick()
    expect(result!.filtered.value).toHaveLength(1)
    expect(result!.filtered.value[0].name).toBe('Alice')
  })

  it('filters case-insensitively', async () => {
    let result: ReturnType<typeof useFilter<(typeof data)[0]>>
    scope.run(() => {
      result = useFilter(ref(data), ['name'])
    })
    result!.query.value = 'BOB'
    await nextTick()
    expect(result!.filtered.value).toHaveLength(1)
  })

  it('searches across multiple keys', async () => {
    let result: ReturnType<typeof useFilter<(typeof data)[0]>>
    scope.run(() => {
      result = useFilter(ref(data), ['name', 'role'])
    })
    result!.query.value = 'admin'
    await nextTick()
    expect(result!.filtered.value).toHaveLength(2)
  })

  it('debounces query when debounceMs > 0', async () => {
    let result: ReturnType<typeof useFilter<(typeof data)[0]>>
    scope.run(() => {
      result = useFilter(ref(data), ['name'], 200)
    })
    result!.query.value = 'alice'
    await nextTick()
    // Before debounce fires, should still show all items
    expect(result!.filtered.value).toHaveLength(4)

    vi.advanceTimersByTime(200)
    await nextTick()
    expect(result!.filtered.value).toHaveLength(1)
  })

  it('tracks activeCount', async () => {
    let result: ReturnType<typeof useFilter<(typeof data)[0]>>
    scope.run(() => {
      result = useFilter(ref(data), ['name'])
    })
    expect(result!.activeCount.value).toBe(0)
    result!.query.value = 'alice'
    await nextTick()
    expect(result!.activeCount.value).toBe(1)
  })

  it('resets all filters', async () => {
    let result: ReturnType<typeof useFilter<(typeof data)[0]>>
    scope.run(() => {
      result = useFilter(ref(data), ['name'])
    })
    result!.query.value = 'alice'
    await nextTick()
    result!.reset()
    await nextTick()
    expect(result!.query.value).toBe('')
    expect(result!.filtered.value).toHaveLength(4)
  })

  it('applies additional filter configs', async () => {
    let result: ReturnType<typeof useFilter<(typeof data)[0]>>
    scope.run(() => {
      result = useFilter(ref(data), ['name'])
    })
    result!.filters.value = [{ key: 'role', value: 'admin', match: 'exact' }]
    await nextTick()
    expect(result!.filtered.value).toHaveLength(2)
    expect(result!.filtered.value.every((item) => item.role === 'admin')).toBe(true)
  })
})
