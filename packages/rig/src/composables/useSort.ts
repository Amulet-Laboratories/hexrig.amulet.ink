import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { SortDirection, UseSortReturn } from '../types'

/**
 * useSort composable — reactive array sorting by key and direction.
 */
export function useSort<T extends Record<string, unknown>>(
  items: Ref<T[]> | ComputedRef<T[]>,
  defaultKey = '',
  defaultDir: SortDirection = 'asc',
): UseSortReturn<T> {
  const sortBy: Ref<string> = ref(defaultKey)
  const sortDir: Ref<SortDirection> = ref(defaultDir)

  const sorted = computed<T[]>(() => {
    const key = sortBy.value
    if (!key) return [...items.value]

    const dir = sortDir.value === 'asc' ? 1 : -1
    return [...items.value].sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1
      if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * dir
      return String(aVal).localeCompare(String(bVal)) * dir
    })
  })

  const toggleSort = (key: string) => {
    if (sortBy.value === key) {
      sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = key
      sortDir.value = 'asc'
    }
  }

  return { sorted, sortBy, sortDir, toggleSort }
}
