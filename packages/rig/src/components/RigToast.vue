<script setup lang="ts">
import { useToast } from '../composables/useToast'

const { toasts, dismiss } = useToast()

const toneClasses: Record<string, string> = {
  success: 'border-status-success/30 bg-surface-raised',
  warning: 'border-status-warning/30 bg-surface-raised',
  error: 'border-status-error/30 bg-surface-raised',
  info: 'border-border bg-surface-raised',
  neutral: 'border-border bg-surface-raised',
}

const iconColorClasses: Record<string, string> = {
  success: 'text-status-success',
  warning: 'text-status-warning',
  error: 'text-status-error',
  info: 'text-status-info',
  neutral: 'text-text-muted',
}

const iconPaths: Record<string, string> = {
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5c-.77.833.192 2.5 1.732 2.5z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  neutral: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-4 end-4 z-[100] flex w-full max-w-sm flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      <TransitionGroup
        enter-active-class="transition-all duration-normal ease-entrance"
        enter-from-class="opacity-0 translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-fast ease-exit"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-2 scale-95"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto w-full rounded-theme border shadow-lg p-4 font-body"
          :class="toneClasses[toast.tone]"
          role="status"
        >
          <div class="flex gap-3">
            <!-- Icon -->
            <svg
              class="h-5 w-5 shrink-0 mt-0.5"
              :class="iconColorClasses[toast.tone]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path :d="iconPaths[toast.tone]" />
            </svg>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-text-primary">{{ toast.title }}</p>
              <p v-if="toast.description" class="mt-1 text-xs text-text-muted">{{ toast.description }}</p>
              <button
                v-if="toast.action"
                type="button"
                class="mt-2 text-xs font-medium text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
                @click="toast.action.onClick()"
              >
                {{ toast.action.label }}
              </button>
            </div>

            <!-- Dismiss -->
            <button
              v-if="toast.dismissible"
              type="button"
              class="shrink-0 inline-flex h-11 w-11 -mr-3 -mt-3 items-center justify-center rounded text-text-muted hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              aria-label="Dismiss notification"
              @click="dismiss(toast.id)"
            >
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
