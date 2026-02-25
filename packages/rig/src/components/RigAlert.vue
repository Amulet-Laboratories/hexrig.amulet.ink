<script setup lang="ts">
import { computed } from 'vue'
import type { RigAlertProps } from '../types'
import { ICON_PATHS, ICON_COLOR_CLASSES, ICON_DISMISS, ALERT_TONE_CLASSES } from './shared'

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

const showIcon = computed(() => props.icon !== false)

const classes = computed(() => {
  return `flex gap-3 rounded border p-4 font-body ${ALERT_TONE_CLASSES[props.tone]}`
})
</script>

<template>
  <div v-if="isVisible" :class="classes" :role="tone === 'error' || tone === 'warning' ? 'alert' : 'status'">
    <!-- Icon -->
    <svg
      v-if="showIcon"
      class="h-5 w-5 shrink-0 mt-0.5"
      :class="ICON_COLOR_CLASSES[tone]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path :d="ICON_PATHS[tone]" />
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
        <path :d="ICON_DISMISS" />
      </svg>
    </button>
  </div>
</template>
