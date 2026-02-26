<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Icon } from '@iconify/vue'
import type { RigIconProps } from '../types'

const props = withDefaults(defineProps<RigIconProps>(), {
  size: 'md',
  color: 'current',
  decorative: true,
})

watchEffect(() => {
  if (import.meta.env.DEV && !props.decorative && !props.label) {
    console.warn(
      `[RigIcon] Non-decorative icon "${props.name}" is missing a "label" prop. ` +
        'This creates an inaccessible unlabeled image (WCAG 1.1.1). ' +
        'Either provide a label or set decorative=true.',
    )
  }
})

const sizeMap: Record<NonNullable<RigIconProps['size']>, string> = {
  xs: 'w-3.5 h-3.5', // 14px
  sm: 'w-4 h-4', // 16px
  md: 'w-5 h-5', // 20px
  lg: 'w-6 h-6', // 24px
  xl: 'w-8 h-8', // 32px
}

const colorMap: Record<NonNullable<RigIconProps['color']>, string> = {
  current: 'text-current',
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  accent: 'text-accent',
  success: 'text-status-success',
  warning: 'text-status-warning',
  error: 'text-status-error',
  info: 'text-status-info',
}

const classes = computed(() => {
  return `inline-flex items-center justify-center shrink-0 ${sizeMap[props.size]} ${colorMap[props.color]}`
})
</script>

<template>
  <span
    :class="classes"
    :aria-label="!decorative ? label : undefined"
    :aria-hidden="decorative ? 'true' : undefined"
    :role="decorative ? undefined : 'img'"
  >
    <Icon v-if="name" :icon="name" class="w-full h-full" />
    <slot v-else />
  </span>
</template>
