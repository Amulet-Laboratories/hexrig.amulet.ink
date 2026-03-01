<script setup lang="ts">
import { computed } from 'vue'
import type { RigTagProps } from '../types'

const props = withDefaults(defineProps<RigTagProps>(), {
  variant: 'soft',
  size: 'md',
  removable: false,
  disabled: false,
})

const emit = defineEmits<{
  remove: []
}>()

const tagClasses = computed(() => {
  const base =
    'inline-flex items-center gap-1.5 font-body transition-colors duration-fast ease-standard'

  const sizes: Record<string, string> = {
    sm: 'px-2 py-0.5 text-xs rounded-hex-sm',
    md: 'px-2.5 py-1 text-sm rounded',
    lg: 'px-3 py-1.5 text-sm rounded',
  }

  const variants: Record<string, string> = {
    solid: 'bg-accent text-surface-base',
    soft: 'bg-accent/15 text-accent',
    outline: 'border border-border text-text-primary',
    technical: 'font-mono text-xs bg-border/50 text-text-secondary px-1.5 py-0.5 rounded-sm tracking-wide',
  }

  const disabled = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

  return [base, sizes[props.size], variants[props.variant], disabled].filter(Boolean).join(' ')
})

const onRemove = () => {
  if (!props.disabled) {
    emit('remove')
  }
}
</script>

<template>
  <span :class="tagClasses" role="status">
    <slot>{{ label }}</slot>

    <button
      v-if="removable"
      type="button"
      :aria-label="`Remove ${label}`"
      :disabled="disabled"
      class="inline-flex items-center justify-center rounded-full p-0.5 transition-colors duration-fast ease-standard hover:bg-surface-base/20 focus:outline-none focus:ring-1 focus:ring-focus-ring"
      :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
      @click.stop="onRemove"
    >
      <svg
        class="h-3 w-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>
