import { ref, readonly, inject, provide, onScopeDispose, type InjectionKey, type Ref } from 'vue'
import type { ToastOptions, ToastInstance, UseToastReturn } from '../types'

interface ToastState {
  toasts: Ref<ToastInstance[]>
  timers: Map<string, ReturnType<typeof setTimeout>>
  idCounter: number
}

const TOAST_INJECTION_KEY: InjectionKey<ToastState> = Symbol('hex-toast')

/** HMR-safe client singleton — survives module re-evaluation */
const CLIENT_STATE_KEY = Symbol.for('hex-toast-client')

function getClientState(): ToastState {
  const g = globalThis as unknown as Record<symbol, ToastState | undefined>
  if (!g[CLIENT_STATE_KEY]) {
    g[CLIENT_STATE_KEY] = {
      toasts: ref<ToastInstance[]>([]),
      timers: new Map(),
      idCounter: 0,
    }
  }
  return g[CLIENT_STATE_KEY]!
}

function getState(): ToastState {
  // In a component context, try injection first
  const injected = inject(TOAST_INJECTION_KEY, null)
  if (injected) return injected

  // Client-side singleton (safe because browser is inherently single-tenant)
  if (typeof window !== 'undefined') {
    return getClientState()
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
  const localTimerIds: string[] = []

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
      localTimerIds.push(id)
    }

    return id
  }

  const dismiss = (id: string): void => {
    const timer = state.timers.get(id)
    if (timer) {
      clearTimeout(timer)
      state.timers.delete(id)
    }
    const idx = localTimerIds.indexOf(id)
    if (idx !== -1) localTimerIds.splice(idx, 1)
    state.toasts.value = state.toasts.value.filter((t) => t.id !== id)
  }

  const dismissAll = (): void => {
    for (const timer of state.timers.values()) {
      clearTimeout(timer)
    }
    state.timers.clear()
    localTimerIds.length = 0
    state.toasts.value = []
  }

  // Clean up timers created by this composable instance on scope dispose
  onScopeDispose(() => {
    for (const id of localTimerIds) {
      const timer = state.timers.get(id)
      if (timer) {
        clearTimeout(timer)
        state.timers.delete(id)
      }
    }
    localTimerIds.length = 0
  })

  return {
    show,
    dismiss,
    dismissAll,
    toasts: readonly(state.toasts),
  }
}
