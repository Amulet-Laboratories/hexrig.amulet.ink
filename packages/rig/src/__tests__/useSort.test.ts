import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { ref, effectScope } from 'vue'
import { useSort } from '@rig/composables/useSort'

const data = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
]

describe('useSort', () => {
  let scope: ReturnType<typeof effectScope>

  beforeEach(() => {
    scope = effectScope()
  })

  afterEach(() => {
    scope.stop()
  })

  it('returns unsorted array when no sort key', () => {
    let result: ReturnType<typeof useSort<(typeof data)[0]>>
    scope.run(() => {
      result = useSort(ref(data))
    })
    expect(result!.sorted.value).toEqual(data)
  })

  it('sorts by string key ascending', () => {
    let result: ReturnType<typeof useSort<(typeof data)[0]>>
    scope.run(() => {
      result = useSort(ref(data), 'name', 'asc')
    })
    expect(result!.sorted.value.map((r) => r.name)).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('sorts by string key descending', () => {
    let result: ReturnType<typeof useSort<(typeof data)[0]>>
    scope.run(() => {
      result = useSort(ref(data), 'name', 'desc')
    })
    expect(result!.sorted.value.map((r) => r.name)).toEqual(['Charlie', 'Bob', 'Alice'])
  })

  it('sorts by numeric key', () => {
    let result: ReturnType<typeof useSort<(typeof data)[0]>>
    scope.run(() => {
      result = useSort(ref(data), 'age', 'asc')
    })
    expect(result!.sorted.value.map((r) => r.age)).toEqual([25, 30, 35])
  })

  it('toggleSort switches between asc and desc', () => {
    let result: ReturnType<typeof useSort<(typeof data)[0]>>
    scope.run(() => {
      result = useSort(ref(data), 'name', 'asc')
    })
    result!.toggleSort('name')
    expect(result!.sortDir.value).toBe('desc')
  })

  it('toggleSort on new key resets to asc', () => {
    let result: ReturnType<typeof useSort<(typeof data)[0]>>
    scope.run(() => {
      result = useSort(ref(data), 'name', 'desc')
    })
    result!.toggleSort('age')
    expect(result!.sortBy.value).toBe('age')
    expect(result!.sortDir.value).toBe('asc')
  })
})
