<script setup lang="ts">
import { computed } from 'vue'
import type { RigTextProps } from '../types'

const props = withDefaults(defineProps<RigTextProps>(), {
  as: 'p',
  variant: 'body',
  color: 'primary',
  weight: undefined,
  align: undefined,
  truncate: false,
})

const variantClasses: Record<NonNullable<RigTextProps['variant']>, string> = {
  display: 'font-display text-5xl font-bold tracking-tight',
  heading: 'font-display text-2xl font-semibold',
  subheading: 'font-display text-lg font-medium',
  body: 'font-body text-base',
  caption: 'font-body text-sm',
  overline: 'font-mono text-xs font-medium uppercase tracking-widest',
  mono: 'font-mono text-sm',
}

const colorClasses: Record<NonNullable<RigTextProps['color']>, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  accent: 'text-accent',
  inverse: 'text-text-inverse',
  'on-accent': 'text-text-on-accent',
  success: 'text-status-success',
  warning: 'text-status-warning',
  error: 'text-status-error',
  info: 'text-status-info',
}

const weightClasses: Record<NonNullable<RigTextProps['weight']>, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const alignClasses: Record<NonNullable<RigTextProps['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const classes = computed(() => {
  const result = [
    variantClasses[props.variant],
    colorClasses[props.color],
  ]

  if (props.weight) result.push(weightClasses[props.weight])
  if (props.align) result.push(alignClasses[props.align])
  if (props.truncate) result.push('truncate')

  return result.join(' ')
})
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
