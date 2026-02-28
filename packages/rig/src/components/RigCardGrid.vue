<script setup lang="ts">
import { computed } from 'vue'
import type { RigCardGridProps } from '../types'

const props = withDefaults(defineProps<RigCardGridProps>(), {
  minCardWidth: '280px',
  gap: 'md',
  masonry: false,
})

const gapValues: Record<NonNullable<RigCardGridProps['gap']>, string> = {
  none: '0px',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
}

const gapClasses: Record<NonNullable<RigCardGridProps['gap']>, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const gridStyle = computed(() => {
  const gapVal = gapValues[props.gap]
  let minWidth = props.minCardWidth

  if (props.maxColumns) {
    minWidth = `max(${props.minCardWidth}, calc((100% - ${gapVal} * ${props.maxColumns - 1}) / ${props.maxColumns}))`
  }

  const style: Record<string, string> = {
    gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
  }

  if (props.masonry) {
    style.gridTemplateRows = 'masonry'
  }

  return style
})
</script>

<template>
  <div :class="['grid', gapClasses[gap]]" :style="gridStyle" role="group">
    <slot />
  </div>
</template>
