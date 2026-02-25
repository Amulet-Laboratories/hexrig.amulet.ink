<script setup lang="ts">
import { computed } from 'vue'
import type { RigSpacerProps } from '../types'

const props = withDefaults(defineProps<RigSpacerProps>(), {
  size: 'md',
  axis: 'vertical',
})

const sizeMap: Record<NonNullable<RigSpacerProps['size']>, string> = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
}

const style = computed(() => {
  const value = sizeMap[props.size]
  return props.axis === 'horizontal'
    ? { width: value, minWidth: value }
    : { height: value, minHeight: value }
})
</script>

<template>
  <div :style="style" aria-hidden="true" />
</template>
