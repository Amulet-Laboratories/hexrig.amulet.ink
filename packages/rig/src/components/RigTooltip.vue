<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { RigTooltipProps } from '../types'

const props = withDefaults(defineProps<RigTooltipProps>(), {
  placement: 'top',
  delay: 200,
  disabled: false,
})

const visible = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
let showTimeout: ReturnType<typeof setTimeout> | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const placementClasses: Record<NonNullable<RigTooltipProps['placement']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const tooltipClasses = computed(() => {
  return `absolute z-50 px-3 py-1.5 text-sm font-body rounded bg-surface-overlay text-text-primary shadow-lg border border-border-subtle whitespace-nowrap pointer-events-none transition-opacity duration-fast ease-standard ${placementClasses[props.placement]} ${visible.value ? 'opacity-100' : 'opacity-0'}`
})

const show = () => {
  if (props.disabled) return
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  showTimeout = setTimeout(() => {
    visible.value = true
  }, props.delay)
}

const hide = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  hideTimeout = setTimeout(() => {
    visible.value = false
  }, 100)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && visible.value) {
    visible.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (showTimeout) clearTimeout(showTimeout)
  if (hideTimeout) clearTimeout(hideTimeout)
})
</script>

<template>
  <div
    ref="triggerRef"
    class="relative inline-flex"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <div
      v-if="content && !disabled"
      :class="tooltipClasses"
      role="tooltip"
      aria-hidden="true"
    >
      {{ content }}
    </div>
  </div>
</template>
