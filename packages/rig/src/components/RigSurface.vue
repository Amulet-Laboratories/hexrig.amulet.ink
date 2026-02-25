<script setup lang="ts">
import { computed } from 'vue'
import type { RigSurfaceProps } from '../types'

const props = withDefaults(defineProps<RigSurfaceProps>(), {
  as: 'div',
  elevation: 'base',
  border: false,
  padding: 'md',
  rounded: true,
})

const elevationClasses: Record<NonNullable<RigSurfaceProps['elevation']>, string> = {
  sunken: 'bg-surface-sunken shadow-inner',
  base: 'bg-surface-base',
  raised: 'bg-surface-raised shadow-md',
  overlay: 'bg-surface-overlay shadow-xl',
}

const paddingClasses: Record<NonNullable<RigSurfaceProps['padding']>, string> = {
  none: '',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
}

const borderClasses = computed(() => {
  if (props.border === false) return ''
  if (props.border === true || props.border === 'default') return 'border border-border'
  if (props.border === 'subtle') return 'border border-border-subtle'
  if (props.border === 'strong') return 'border border-border-strong'
  return ''
})

const classes = computed(() => {
  const parts = [
    elevationClasses[props.elevation],
    paddingClasses[props.padding],
    borderClasses.value,
  ]
  if (props.rounded) parts.push('rounded')
  return parts.filter(Boolean).join(' ')
})
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
