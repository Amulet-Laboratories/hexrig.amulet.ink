import { ref, computed, watch, onScopeDispose, type Ref, type ComputedRef } from 'vue'
import type { FilterConfig, UseFilterReturn } from '../types'

/**
 * useFilter composable — reactive array filtering with text search and debounce.
 */
export function useFilter<T extends Record<string, unknown>>(
  items: Ref<T[]> | ComputedRef<T[]>,
  searchKeys: string[] = [],
  debounceMs = 0,
): UseFilterReturn<T> {
  const query: Ref<string> = ref('')
  const filters: Ref<FilterConfig[]> = ref([])
  const debouncedQuery: Ref<string> = ref('')

  let timeout: ReturnType<typeof setTimeout> | undefined

  watch(query, (val) => {
    if (debounceMs <= 0) {
      debouncedQuery.value = val
      return
    }
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedQuery.value = val
    }, debounceMs)
  })

  const filtered = computed<T[]>(() => {
    let result = items.value

    // Text search
    const q = debouncedQuery.value.trim().toLowerCase()
    if (q && searchKeys.length > 0) {
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const val = item[key]
          return val != null && String(val).toLowerCase().includes(q)
        }),
      )
    }

    // Additional filters
    for (const filter of filters.value) {
      const filterVal = filter.value.trim().toLowerCase()
      if (!filterVal) continue

      result = result.filter((item) => {
        const val = item[filter.key]
        if (val == null) return false
        const str = String(val).toLowerCase()
        switch (filter.match ?? 'contains') {
          case 'exact':
            return str === filterVal
          case 'startsWith':
            return str.startsWith(filterVal)
          default:
            return str.includes(filterVal)
        }
      })
    }

    return result
  })

  const activeCount = computed(() => {
    let count = 0
    if (debouncedQuery.value.trim()) count++
    count += filters.value.filter((f) => f.value.trim()).length
    return count
  })

  const reset = () => {
    query.value = ''
    debouncedQuery.value = ''
    filters.value = []
  }

  onScopeDispose(() => {
    if (timeout) clearTimeout(timeout)
  })

  return { filtered, query, filters, activeCount, reset }
}
