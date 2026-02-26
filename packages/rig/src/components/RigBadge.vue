<script setup lang="ts">
import { computed } from 'vue'
import type { RigBadgeProps } from '../types'
import { ICON_DISMISS } from './shared'

const props = withDefaults(defineProps<RigBadgeProps>(), {
  variant: 'soft',
  tone: 'accent',
  size: 'md',
  dot: false,
  removable: false,
})

const emit = defineEmits<{
  remove: []
}>()

const sizeClasses: Record<NonNullable<RigBadgeProps['size']>, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
}

// Variant × tone classes
const variantToneClasses = computed(() => {
  const { variant, tone } = props

  const map: Record<string, string> = {
    'solid-accent': 'bg-accent text-text-on-accent',
    'solid-success': 'bg-status-success text-text-inverse',
    'solid-warning': 'bg-status-warning text-text-inverse',
    'solid-error': 'bg-status-error text-text-inverse',
    'solid-info': 'bg-status-info text-text-inverse',
    'solid-neutral': 'bg-surface-raised text-text-secondary border border-border',

    'soft-accent': 'bg-accent-muted text-accent',
    'soft-success': 'bg-status-success/10 text-status-success',
    'soft-warning': 'bg-status-warning/10 text-status-warning',
    'soft-error': 'bg-status-error/10 text-status-error',
    'soft-info': 'bg-status-info/10 text-status-info',
    'soft-neutral': 'bg-surface-raised text-text-muted',

    'outline-accent': 'border border-accent text-accent',
    'outline-success': 'border border-status-success text-status-success',
    'outline-warning': 'border border-status-warning text-status-warning',
    'outline-error': 'border border-status-error text-status-error',
    'outline-info': 'border border-status-info text-status-info',
    'outline-neutral': 'border border-border text-text-muted',
  }

  return map[`${variant}-${tone}`] ?? map['soft-accent']
})

const classes = computed(() => {
  return `inline-flex items-center gap-1 rounded-full font-body font-medium ${sizeClasses[props.size]} ${variantToneClasses.value}`
})
</script>

<template>
  <span :class="classes">
    <span v-if="dot" class="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
    <slot />
    <button
      v-if="removable"
      type="button"
      class="relative ml-0.5 inline-flex h-4 w-4 -mr-1 items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring before:absolute before:inset-[-10px] before:content-['']"
      aria-label="Remove"
      @click="emit('remove')"
    >
      <svg
        class="h-3 w-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path :d="ICON_DISMISS" />
      </svg>
    </button>
  </span>
</template>
