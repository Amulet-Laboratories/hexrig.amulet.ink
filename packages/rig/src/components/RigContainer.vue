<script setup lang="ts">
import { computed } from 'vue'
import type { RigContainerProps } from '../types'

const props = withDefaults(defineProps<RigContainerProps>(), {
  as: 'div',
  size: 'md',
  center: true,
  padding: true,
})

const sizeClasses: Record<NonNullable<RigContainerProps['size']>, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-full',
}

const classes = computed(() => {
  const parts = [sizeClasses[props.size]]
  if (props.center) parts.push('mx-auto')
  if (props.padding) parts.push('px-6')
  return parts.join(' ')
})
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
