<script setup lang="ts">
import { computed } from 'vue'
import type { RigSkeletonProps } from '../types'

const props = withDefaults(defineProps<RigSkeletonProps>(), {
  variant: 'text',
  lines: 1,
  animated: true,
})

const variantClasses: Record<NonNullable<RigSkeletonProps['variant']>, string> = {
  text: 'h-4 rounded',
  heading: 'h-7 w-3/4 rounded',
  circle: 'h-10 w-10 rounded-full',
  rect: 'h-24 rounded',
  card: 'h-48 rounded',
}

const baseClasses = computed(() => {
  const parts = ['bg-surface-raised', variantClasses[props.variant]]
  if (props.animated) parts.push('animate-pulse')
  return parts.join(' ')
})

const lineWidths = ['w-full', 'w-11/12', 'w-4/5', 'w-10/12', 'w-3/4'] as const
</script>

<template>
  <div
    v-if="variant === 'text' && lines > 1"
    class="space-y-2"
    role="status"
    aria-label="Loading content"
  >
    <div
      v-for="i in lines"
      :key="i"
      :class="[baseClasses, lineWidths[(i - 1) % lineWidths.length]]"
      aria-hidden="true"
    />
  </div>

  <div v-else :class="baseClasses" role="status" aria-label="Loading content" aria-hidden="true" />
</template>
