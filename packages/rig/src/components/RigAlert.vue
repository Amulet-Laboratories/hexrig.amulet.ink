<script setup lang="ts">
import { computed } from 'vue'
import type { RigAlertProps } from '../types'

const props = withDefaults(defineProps<RigAlertProps & { visible?: boolean }>(), {
  tone: 'info',
  dismissible: false,
  icon: true,
  visible: true,
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  dismiss: []
}>()

const isVisible = computed(() => props.visible)

const handleDismiss = () => {
  emit('dismiss')
  emit('update:visible', false)
}

const toneClasses: Record<NonNullable<RigAlertProps['tone']>, string> = {
  success: 'border-status-success/30 bg-status-success/10 text-text-primary',
  warning: 'border-status-warning/30 bg-status-warning/10 text-text-primary',
  error: 'border-status-error/30 bg-status-error/10 text-text-primary',
  info: 'border-border bg-surface-raised text-text-primary',
}

const iconColorClasses: Record<NonNullable<RigAlertProps['tone']>, string> = {
  success: 'text-status-success',
  warning: 'text-status-warning',
  error: 'text-status-error',
  info: 'text-status-info',
}

// Auto-select icon SVG paths by tone
const iconPaths: Record<NonNullable<RigAlertProps['tone']>, string> = {
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',          // check-circle
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5c-.77.833.192 2.5 1.732 2.5z', // alert-triangle
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', // x-circle
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',  // info
}

const showIcon = computed(() => props.icon !== false)

const classes = computed(() => {
  return `flex gap-3 rounded-theme border p-4 font-body ${toneClasses[props.tone]}`
})
</script>

<template>
  <div v-if="isVisible" :class="classes" role="alert">
    <!-- Icon -->
    <svg
      v-if="showIcon"
      class="h-5 w-5 shrink-0 mt-0.5"
      :class="iconColorClasses[tone]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path :d="iconPaths[tone]" />
    </svg>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p v-if="title" class="font-medium text-sm">{{ title }}</p>
      <div class="text-sm text-text-secondary mt-1">
        <slot />
      </div>
    </div>

    <!-- Dismiss button -->
    <button
      v-if="dismissible"
      type="button"
      class="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded text-text-muted hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring -mr-3 -mt-3"
      aria-label="Dismiss"
      @click="handleDismiss"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
