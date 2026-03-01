<script setup lang="ts">
import { ref, computed } from 'vue'
import type { RigSplitProps } from '../types'

const props = withDefaults(defineProps<RigSplitProps>(), {
  orientation: 'horizontal',
  initialSize: 300,
  minSize: 100,
  maxSize: 800,
})

const emit = defineEmits<{
  resize: [size: number]
}>()

const size = ref(props.initialSize)
const dragging = ref(false)

const isHorizontal = computed(() => props.orientation === 'horizontal')

const gridStyle = computed(() => {
  if (isHorizontal.value) {
    return { gridTemplateColumns: `${size.value}px 6px 1fr` }
  }
  return { gridTemplateRows: `${size.value}px 6px 1fr` }
})

const gutterClasses = computed(() => {
  const base =
    'flex items-center justify-center bg-surface-base transition-colors duration-fast ease-standard'
  const cursor = isHorizontal.value ? 'cursor-col-resize' : 'cursor-row-resize'
  const hover = dragging.value ? 'bg-accent/20' : 'hover:bg-surface-raised'
  return `${base} ${cursor} ${hover}`
})

const onPointerDown = (event: PointerEvent) => {
  const target = event.currentTarget as HTMLElement
  target.setPointerCapture(event.pointerId)
  dragging.value = true

  const startPos = isHorizontal.value ? event.clientX : event.clientY
  const startSize = size.value

  const onPointerMove = (e: PointerEvent) => {
    const delta = (isHorizontal.value ? e.clientX : e.clientY) - startPos
    const newSize = Math.min(props.maxSize, Math.max(props.minSize, startSize + delta))
    size.value = newSize
    emit('resize', newSize)
  }

  const onPointerUp = () => {
    dragging.value = false
    target.removeEventListener('pointermove', onPointerMove)
    target.removeEventListener('pointerup', onPointerUp)
  }

  target.addEventListener('pointermove', onPointerMove)
  target.addEventListener('pointerup', onPointerUp)
}

const onDoubleClick = () => {
  size.value = props.initialSize
  emit('resize', props.initialSize)
}
</script>

<template>
  <div class="grid h-full font-body" :style="gridStyle">
    <div class="overflow-auto">
      <slot name="first"></slot>
    </div>

    <div
      :class="gutterClasses"
      role="separator"
      :aria-orientation="orientation"
      :aria-valuenow="size"
      :aria-valuemin="minSize"
      :aria-valuemax="maxSize"
      tabindex="0"
      @pointerdown="onPointerDown"
      @dblclick="onDoubleClick"
    >
      <div :class="['rounded-full bg-border', isHorizontal ? 'h-8 w-1' : 'w-8 h-1']"></div>
    </div>

    <div class="overflow-auto">
      <slot name="second"></slot>
    </div>
  </div>
</template>
