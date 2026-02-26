<script setup lang="ts">
import { computed } from 'vue'
import type { RigDividerProps } from '../types'

const props = withDefaults(defineProps<RigDividerProps>(), {
  orientation: 'horizontal',
  variant: 'default',
})

const borderColor: Record<NonNullable<RigDividerProps['variant']>, string> = {
  subtle: 'border-border-subtle',
  default: 'border-border',
  strong: 'border-border-strong',
}

const classes = computed(() => {
  const color = borderColor[props.variant]

  if (props.orientation === 'vertical') {
    return `inline-block h-full border-l ${color}`
  }

  if (props.label) {
    return `flex items-center gap-3 ${color}`
  }

  return `border-t ${color}`
})
</script>

<template>
  <div v-if="label" :class="classes" role="separator" :aria-orientation="orientation">
    <div class="flex-1 border-t" :class="borderColor[variant]" />
    <span class="text-sm text-text-muted font-body">{{ label }}</span>
    <div class="flex-1 border-t" :class="borderColor[variant]" />
  </div>

  <hr v-else :class="classes" role="separator" :aria-orientation="orientation" />
</template>
