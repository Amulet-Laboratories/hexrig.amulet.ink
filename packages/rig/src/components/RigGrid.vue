<script setup lang="ts">
import { computed } from 'vue'
import type { RigGridProps } from '../types'

const props = withDefaults(defineProps<RigGridProps>(), {
  as: 'div',
  cols: 1,
  gap: 'md',
  align: 'stretch',
})

const gapClasses: Record<NonNullable<RigGridProps['gap']>, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
  '3xl': 'gap-16',
}

const colClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
}

const alignClasses: Record<NonNullable<RigGridProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const classes = computed(() => {
  const parts = [
    'grid',
    colClasses[props.cols] ?? `grid-cols-${props.cols}`,
    gapClasses[props.gap],
    alignClasses[props.align],
  ]
  return parts.join(' ')
})
</script>

<template>
  <component :is="as" :class="classes" role="group">
    <slot />
  </component>
</template>
