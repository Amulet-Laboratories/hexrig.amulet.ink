<script setup lang="ts">
import { computed } from 'vue'
import type { RigButtonProps } from '../types'

const props = withDefaults(defineProps<RigButtonProps>(), {
  variant: 'solid',
  tone: 'accent',
  size: 'md',
  disabled: false,
  loading: false,
  as: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Size classes — note optical centering: pt-[7px] pb-[9px] for md
const sizeClasses: Record<NonNullable<RigButtonProps['size']>, string> = {
  sm: 'px-3 pt-[5px] pb-[7px] text-sm min-h-[44px]',
  md: 'px-4 pt-[7px] pb-[9px] text-base min-h-[40px]',
  lg: 'px-6 pt-[9px] pb-[11px] text-lg min-h-[48px]',
}

// Variant × tone class combinations
const variantToneClasses = computed(() => {
  const { variant, tone } = props

  const base =
    'inline-flex items-center justify-center rounded font-body font-medium transition-colors duration-normal ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring'

  const map: Record<string, string> = {
    'solid-accent': `${base} bg-accent text-text-on-accent hover:bg-accent-hover active:bg-accent-active`,
    'solid-neutral': `${base} bg-surface-raised text-text-primary border border-border hover:bg-surface-overlay active:bg-border-strong`,
    'solid-danger': `${base} bg-status-error text-text-inverse hover:opacity-90 active:opacity-80`,

    'outline-accent': `${base} border-2 border-accent text-accent hover:bg-accent-muted active:bg-accent-muted`,
    'outline-neutral': `${base} border-2 border-border text-text-secondary hover:bg-surface-raised active:bg-surface-overlay`,
    'outline-danger': `${base} border-2 border-status-error text-status-error hover:bg-status-error/10 active:bg-status-error/20`,

    'ghost-accent': `${base} text-accent hover:bg-accent-muted active:bg-accent-muted`,
    'ghost-neutral': `${base} text-text-secondary hover:bg-surface-raised active:bg-surface-overlay`,
    'ghost-danger': `${base} text-status-error hover:bg-status-error/10 active:bg-status-error/20`,

    'link-accent': `inline-flex items-center font-body font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`,
    'link-neutral': `inline-flex items-center font-body font-medium text-text-secondary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`,
    'link-danger': `inline-flex items-center font-body font-medium text-status-error underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`,
  }

  return map[`${variant}-${tone}`] ?? map['solid-accent']
})

const classes = computed(() => {
  const parts = [variantToneClasses.value, sizeClasses[props.size]]
  if (props.disabled || props.loading) parts.push('opacity-50 pointer-events-none')
  return parts.join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :type="as === 'button' ? 'button' : undefined"
    :disabled="as === 'button' ? disabled || loading || undefined : undefined"
    :aria-disabled="as !== 'button' && (disabled || loading) ? 'true' : undefined"
    :href="as !== 'button' && (disabled || loading) ? undefined : href"
    :to="to"
    :aria-busy="loading || undefined"
    :tabindex="as !== 'button' && (disabled || loading) ? -1 : undefined"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="mr-2 h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    <span v-if="loading" class="sr-only">Loading</span>
    <slot />
  </component>
</template>
