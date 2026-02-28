import { ref, onScopeDispose } from 'vue'
import type { UseClipboardReturn } from '../types'

/**
 * useClipboard composable — copy text to clipboard with feedback state.
 */
export function useClipboard(resetDelay = 2000): UseClipboardReturn {
  const copied = ref(false)
  const isSupported = typeof navigator !== 'undefined' && !!navigator.clipboard

  let timeout: ReturnType<typeof setTimeout> | undefined

  const copy = async (text: string): Promise<void> => {
    if (!isSupported) return
    await navigator.clipboard.writeText(text)
    copied.value = true
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      copied.value = false
    }, resetDelay)
  }

  onScopeDispose(() => {
    if (timeout) clearTimeout(timeout)
  })

  return {
    copy,
    copied,
    isSupported,
  }
}
