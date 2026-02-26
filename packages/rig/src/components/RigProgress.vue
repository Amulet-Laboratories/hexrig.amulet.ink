<script setup lang="ts">
import { computed } from 'vue'
import type { RigProgressProps } from '../types'

const props = withDefaults(defineProps<RigProgressProps>(), {
  value: 0,
  max: 100,
  size: 'md',
  tone: 'accent',
  label: undefined,
  indeterminate: false,
})

const sizeClasses: Record<NonNullable<RigProgressProps['size']>, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

const toneClasses: Record<NonNullable<RigProgressProps['tone']>, string> = {
  accent: 'bg-accent',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  error: 'bg-status-error',
  info: 'bg-status-info',
}

const percentage = computed(() => {
  if (props.indeterminate) return 0
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})

const trackClasses = computed(() => {
  return `w-full overflow-hidden rounded-full bg-surface-raised ${sizeClasses[props.size]}`
})

const barClasses = computed(() => {
  const base = `${sizeClasses[props.size]} rounded-full transition-all duration-normal ease-standard ${toneClasses[props.tone]}`
  if (props.indeterminate) return `${base} animate-progress-indeterminate`
  return base
})

const barStyle = computed(() => {
  if (props.indeterminate) return {}
  return { width: `${percentage.value}%` }
})

const ariaLabel = computed(() => {
  if (props.label) return props.label
  if (props.indeterminate) return 'Loading'
  return `${Math.round(percentage.value)}% complete`
})
</script>

<template>
  <div
    :class="trackClasses"
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : value"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : max"
    :aria-label="ariaLabel"
  >
    <div :class="barClasses" :style="barStyle" />
  </div>
</template>
