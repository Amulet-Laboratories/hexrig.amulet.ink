<script setup lang="ts">
import { computed, watch, watchEffect, ref, onUnmounted, nextTick, useId, inject } from 'vue'
import type { RigDialogProps } from '../types'
import { THEME_INJECTION_KEY } from '../composables/useTheme'
import { ICON_DISMISS } from './shared'

const props = withDefaults(defineProps<RigDialogProps>(), {
  modelValue: false,
  size: 'md',
  dismissible: true,
  persistent: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const dialogRef = ref<HTMLElement | null>(null)
const previousActiveElement = ref<Element | null>(null)

/** Ref-counted scroll lock for concurrent dialogs */
const scrollLockCount = (() => {
  if (typeof globalThis !== 'undefined') {
    const key = Symbol.for('rig-scroll-lock')
    const g = globalThis as unknown as Record<
      symbol,
      { value: number; savedOverflow: string } | undefined
    >
    if (!g[key]) {
      g[key] = { value: 0, savedOverflow: '' }
    }
    return g[key]!
  }
  return { value: 0, savedOverflow: '' }
})()

const descriptionId = useId()
const titleId = useId()
const themeState = inject(THEME_INJECTION_KEY, null)

const sizeClasses: Record<NonNullable<RigDialogProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

const classes = computed(() => {
  return `relative w-full ${sizeClasses[props.size]} rounded bg-surface-raised shadow-xl p-6 font-body text-text-primary`
})

const close = () => {
  if (!props.dismissible) return
  emit('update:modelValue', false)
}

const onBackdropClick = (event: MouseEvent) => {
  if (props.persistent) return
  if (event.target === event.currentTarget) {
    close()
  }
}

/** Get all focusable elements within the dialog */
function getFocusableElements(): HTMLElement[] {
  if (!dialogRef.value) return []
  return Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  )
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.dismissible) {
    close()
    return
  }

  // Focus trap
  if (event.key === 'Tab') {
    const focusable = getFocusableElements()
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === first || document.activeElement === dialogRef.value) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}

// Lock body scroll when open
watch(
  () => props.modelValue,
  (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      previousActiveElement.value = document.activeElement
      if (scrollLockCount.value === 0) {
        scrollLockCount.savedOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      }
      scrollLockCount.value++
      nextTick(() => {
        // Focus dialog
        dialogRef.value?.focus()
      })
    } else {
      scrollLockCount.value = Math.max(0, scrollLockCount.value - 1)
      if (scrollLockCount.value === 0) {
        document.body.style.overflow = scrollLockCount.savedOverflow
      }
      // Restore focus
      if (previousActiveElement.value instanceof HTMLElement) {
        previousActiveElement.value.focus()
      }
    }
  },
)

if (import.meta.env.DEV) {
  watchEffect(() => {
    if (props.modelValue && !props.title) {
      console.warn(
        '[RigDialog] No title prop provided. ' +
          'The dialog falls back to aria-label="Dialog" which is not descriptive (WCAG 2.4.6). ' +
          "Provide a title prop with a meaningful description of the dialog's purpose.",
      )
    }
  })
}

onUnmounted(() => {
  if (typeof document !== 'undefined' && props.modelValue) {
    scrollLockCount.value = Math.max(0, scrollLockCount.value - 1)
    if (scrollLockCount.value === 0) {
      document.body.style.overflow = scrollLockCount.savedOverflow
    }
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-normal ease-entrance"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-fast ease-exit"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        :data-theme="themeState?.theme.value"
        :data-mode="themeState?.mode.value"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="onBackdropClick"
      >
        <Transition
          appear
          enter-active-class="transition-[opacity,transform] duration-normal ease-entrance"
          enter-from-class="opacity-0 scale-95 translate-y-3"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-[opacity,transform] duration-fast ease-exit"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-3"
        >
          <div
            v-if="modelValue"
            ref="dialogRef"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="title ? titleId : undefined"
            :aria-label="!title ? 'Dialog' : undefined"
            :aria-describedby="description ? descriptionId : undefined"
            :class="classes"
            tabindex="-1"
            @keydown="onKeydown"
          >
            <!-- Header -->
            <div v-if="title" class="mb-4">
              <h2 :id="titleId" class="font-display text-lg font-semibold text-text-primary">
                {{ title }}
              </h2>
              <p v-if="description" :id="descriptionId" class="mt-1 text-sm text-text-muted">
                {{ description }}
              </p>
            </div>

            <!-- Close button -->
            <button
              v-if="dismissible"
              type="button"
              class="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded text-text-muted hover:text-text-primary hover:bg-surface-overlay focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              aria-label="Close dialog"
              @click="close"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path :d="ICON_DISMISS" />
              </svg>
            </button>

            <!-- Body -->
            <div>
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="mt-6 flex justify-end gap-3">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
