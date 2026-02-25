import { ref, readonly, inject, provide, type InjectionKey, type Ref } from 'vue'
import type { ToastOptions, ToastInstance, UseToastReturn } from '../types'

interface ToastState {
  toasts: Ref<ToastInstance[]>
  timers: Map<string, ReturnType<typeof setTimeout>>
  idCounter: number
}

const TOAST_INJECTION_KEY: InjectionKey<ToastState> = Symbol('hex-toast')

let clientState: ToastState | null = null

function getState(): ToastState {
  // In a component context, try injection first
  const injected = inject(TOAST_INJECTION_KEY, null)
  if (injected) return injected

  // Client-side singleton (safe because browser is inherently single-tenant)
  if (typeof window !== 'undefined') {
    if (!clientState) {
      clientState = {
        toasts: ref<ToastInstance[]>([]),
        timers: new Map(),
        idCounter: 0,
      }
    }
    return clientState
  }

  // SSR fallback — fresh state per call (avoids cross-request leaks)
  return {
    toasts: ref<ToastInstance[]>([]),
    timers: new Map(),
    idCounter: 0,
  }
}

/**
 * Provide toast state for SSR isolation. Call once in your app root.
 */
export function provideToast(): void {
  const state: ToastState = {
    toasts: ref<ToastInstance[]>([]),
    timers: new Map(),
    idCounter: 0,
  }
  provide(TOAST_INJECTION_KEY, state)
}

/**
 * useToast composable — notification queue with auto-dismiss.
 */
export function useToast(): UseToastReturn {
  const state = getState()

  const show = (options: ToastOptions): string => {
    const id = `toast-${++state.idCounter}-${Date.now()}`
    const instance: ToastInstance = {
      id,
      tone: options.tone ?? 'neutral',
      title: options.title,
      description: options.description,
      duration: options.duration ?? 5000,
      action: options.action,
      dismissible: options.dismissible ?? true,
      createdAt: Date.now(),
    }

    state.toasts.value = [...state.toasts.value, instance]

    // Auto-dismiss
    if (instance.duration > 0) {
      const timer = setTimeout(() => {
        dismiss(id)
      }, instance.duration)
      state.timers.set(id, timer)
    }

    return id
  }

  const dismiss = (id: string): void => {
    const timer = state.timers.get(id)
    if (timer) {
      clearTimeout(timer)
      state.timers.delete(id)
    }
    state.toasts.value = state.toasts.value.filter((t) => t.id !== id)
  }

  const dismissAll = (): void => {
    for (const timer of state.timers.values()) {
      clearTimeout(timer)
    }
    state.timers.clear()
    state.toasts.value = []
  }

  return {
    show,
    dismiss,
    dismissAll,
    toasts: readonly(state.toasts),
  }
}
