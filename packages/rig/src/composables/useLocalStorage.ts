import { ref, watch, onScopeDispose, type Ref } from 'vue'
import type { UseLocalStorageReturn } from '../types'

/**
 * useLocalStorage composable — reactive localStorage with cross-tab sync.
 */
export function useLocalStorage<T>(key: string, defaultValue: T): UseLocalStorageReturn<T> {
  const read = (): T => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const value: Ref<T> = ref(read()) as Ref<T>
  let skipWrite = false

  watch(
    value,
    (val) => {
      if (skipWrite || typeof window === 'undefined') return
      try {
        localStorage.setItem(key, JSON.stringify(val))
      } catch {
        // Storage full or unavailable — silently skip
      }
    },
    { deep: true, flush: 'sync' },
  )

  const onStorage = (event: StorageEvent) => {
    if (event.key !== key) return
    value.value = event.newValue !== null ? (JSON.parse(event.newValue) as T) : defaultValue
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage)
  }

  const remove = () => {
    skipWrite = true
    value.value = defaultValue
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
    skipWrite = false
  }

  onScopeDispose(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage)
    }
  })

  return { value, remove }
}
