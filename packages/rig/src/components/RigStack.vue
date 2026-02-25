<script setup lang="ts">
import { computed } from 'vue'
import type { RigStackProps } from '../types'

const props = withDefaults(defineProps<RigStackProps>(), {
  as: 'div',
  direction: 'vertical',
  gap: 'md',
  align: 'stretch',
  justify: 'start',
  wrap: false,
})

const gapClasses: Record<NonNullable<RigStackProps['gap']>, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
  '3xl': 'gap-16',
}

const alignClasses: Record<NonNullable<RigStackProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyClasses: Record<NonNullable<RigStackProps['justify']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const classes = computed(() => {
  const parts = [
    'flex',
    props.direction === 'horizontal' ? 'flex-row' : 'flex-col',
    gapClasses[props.gap],
    alignClasses[props.align],
    justifyClasses[props.justify],
  ]
  if (props.wrap) parts.push('flex-wrap')
  return parts.join(' ')
})
</script>

<template>
  <component :is="as" :class="classes" role="group">
    <slot />
  </component>
</template>
