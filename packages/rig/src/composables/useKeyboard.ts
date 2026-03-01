import { ref, readonly, onScopeDispose, type Ref } from 'vue'
import type { KeyboardShortcut, UseKeyboardReturn } from '../types'

const isMac =
  typeof navigator !== 'undefined' ? /mac|iphone|ipad|ipod/i.test(navigator.userAgent) : false

function parseKeys(keys: string): { mod: boolean; shift: boolean; alt: boolean; key: string } {
  const parts = keys
    .toLowerCase()
    .split('+')
    .map((p) => p.trim())
  return {
    mod: parts.includes('mod'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
    key: parts.filter((p) => p !== 'mod' && p !== 'shift' && p !== 'alt' && p !== 'ctrl')[0] ?? '',
  }
}

function matchesEvent(event: KeyboardEvent, parsed: ReturnType<typeof parseKeys>): boolean {
  const modKey = isMac ? event.metaKey : event.ctrlKey
  if (parsed.mod && !modKey) return false
  if (!parsed.mod && modKey) return false
  if (parsed.shift !== event.shiftKey) return false
  if (parsed.alt !== event.altKey) return false

  const eventKey = event.key.toLowerCase()
  return eventKey === parsed.key || event.code.toLowerCase() === `key${parsed.key}`
}

function isInputElement(el: Element | null): boolean {
  if (!el) return false
  const tag = el.tagName.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return true
  if ((el as HTMLElement).isContentEditable) return true
  return false
}

/**
 * useKeyboard composable — global keyboard shortcut registration.
 */
export function useKeyboard(): UseKeyboardReturn {
  const shortcuts: Ref<KeyboardShortcut[]> = ref([])

  const handler = (event: KeyboardEvent) => {
    for (const shortcut of shortcuts.value) {
      const parsed = parseKeys(shortcut.keys)
      if (!matchesEvent(event, parsed)) continue

      // Skip if focused on input and not global
      if (!shortcut.global && isInputElement(document.activeElement)) continue

      event.preventDefault()
      shortcut.handler()
      return
    }
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', handler)
  }

  const register = (
    keys: string,
    handlerFn: () => void,
    options?: { description?: string; global?: boolean },
  ) => {
    shortcuts.value = [
      ...shortcuts.value,
      {
        keys,
        handler: handlerFn,
        description: options?.description,
        global: options?.global ?? false,
      },
    ]
  }

  const unregister = (keys: string) => {
    shortcuts.value = shortcuts.value.filter((s) => s.keys !== keys)
  }

  onScopeDispose(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', handler)
    }
    shortcuts.value = []
  })

  return {
    register,
    unregister,
    shortcuts: readonly(shortcuts),
  }
}
