<script setup lang="ts">
import { inject } from 'vue'
import { useToast } from '../composables/useToast'
import { THEME_INJECTION_KEY } from '../composables/useTheme'
import { ICON_PATHS, ICON_COLOR_CLASSES, ICON_DISMISS, TOAST_TONE_CLASSES } from './shared'

const themeState = inject(THEME_INJECTION_KEY, null)

const { toasts, dismiss } = useToast()
</script>

<template>
  <Teleport to="body">
    <div
      :data-theme="themeState?.theme.value"
      :data-mode="themeState?.mode.value"
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
          class="pointer-events-auto w-full rounded border shadow-lg p-4 font-body"
          :class="TOAST_TONE_CLASSES[toast.tone]"
          :role="toast.tone === 'error' ? 'alert' : 'status'"
        >
          <div class="flex gap-3">
            <!-- Icon -->
            <svg
              class="h-5 w-5 shrink-0 mt-0.5"
              :class="ICON_COLOR_CLASSES[toast.tone]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path :d="ICON_PATHS[toast.tone]" />
            </svg>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-text-primary">{{ toast.title }}</p>
              <p v-if="toast.description" class="mt-1 text-xs text-text-muted">
                {{ toast.description }}
              </p>
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
              <svg
                class="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path :d="ICON_DISMISS" />
              </svg>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
