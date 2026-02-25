<script setup lang="ts">
import { computed } from 'vue'
import type { RigSpinnerProps } from '../types'

const props = withDefaults(defineProps<RigSpinnerProps>(), {
  size: 'md',
  tone: 'accent',
  label: 'Loading',
})

const sizeClasses: Record<NonNullable<RigSpinnerProps['size']>, string> = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
}

const strokeWidth: Record<NonNullable<RigSpinnerProps['size']>, number> = {
  xs: 4,
  sm: 3.5,
  md: 3,
  lg: 2.5,
  xl: 2,
}

const toneClasses: Record<NonNullable<RigSpinnerProps['tone']>, string> = {
  accent: 'text-accent',
  current: 'text-current',
  muted: 'text-text-muted',
}

const classes = computed(() => {
  return `animate-spin ${sizeClasses[props.size]} ${toneClasses[props.tone]}`
})
</script>

<template>
  <svg
    :class="classes"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="status"
    :aria-label="label"
  >
    <circle
      class="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      :stroke-width="strokeWidth[size]"
    />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke="currentColor"
      :stroke-width="strokeWidth[size]"
      stroke-linecap="round"
    />
  </svg>
</template>
