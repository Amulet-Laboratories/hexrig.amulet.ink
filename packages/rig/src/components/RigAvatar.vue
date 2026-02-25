<script setup lang="ts">
import { computed } from 'vue'
import type { RigAvatarProps } from '../types'

const props = withDefaults(defineProps<RigAvatarProps>(), {
  size: 'md',
  shape: 'circle',
})

const sizeClasses: Record<NonNullable<RigAvatarProps['size']>, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
}

const shapeClasses: Record<NonNullable<RigAvatarProps['shape']>, string> = {
  circle: 'rounded-full',
  square: 'rounded',
}

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const classes = computed(() => {
  return `inline-flex items-center justify-center overflow-hidden bg-accent-muted text-accent font-body font-medium select-none ${sizeClasses[props.size]} ${shapeClasses[props.shape]}`
})
</script>

<template>
  <span
    :class="classes"
    role="img"
    :aria-label="name ?? 'Avatar'"
  >
    <img
      v-if="src"
      :src="src"
      :alt="name ?? 'Avatar'"
      class="h-full w-full object-cover"
    />
    <span v-else aria-hidden="true">{{ initials }}</span>
  </span>
</template>
