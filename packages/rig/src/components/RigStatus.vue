<script setup lang="ts">
import { computed } from 'vue'
import type { RigStatusProps } from '../types'

const props = withDefaults(defineProps<RigStatusProps>(), {
  size: 'md',
  pulse: false,
  glow: false,
})

const statusColorClasses: Record<RigStatusProps['status'], string> = {
  healthy: 'bg-status-success',
  active: 'bg-status-success',
  warning: 'bg-status-warning',
  wip: 'bg-status-warning',
  critical: 'bg-status-error',
  error: 'bg-status-error',
  info: 'bg-status-info',
  neutral: 'bg-text-muted',
  stub: 'bg-text-muted',
  pending: 'bg-text-muted',
  archived: 'bg-text-muted/50',
}

const pulseColorClasses: Record<RigStatusProps['status'], string> = {
  healthy: 'bg-status-success/40',
  active: 'bg-status-success/40',
  warning: 'bg-status-warning/40',
  wip: 'bg-status-warning/40',
  critical: 'bg-status-error/40',
  error: 'bg-status-error/40',
  info: 'bg-status-info/40',
  neutral: 'bg-text-muted/20',
  stub: 'bg-text-muted/20',
  pending: 'bg-text-muted/20',
  archived: 'bg-text-muted/20',
}

const sizeClasses: Record<NonNullable<RigStatusProps['size']>, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
}

const pulseSizeClasses: Record<NonNullable<RigStatusProps['size']>, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
}

const glowColorMap: Record<RigStatusProps['status'], string> = {
  healthy: 'var(--hex-success, #22C55E)',
  active: 'var(--hex-success, #22C55E)',
  warning: 'var(--hex-warning, #F59E0B)',
  wip: 'var(--hex-warning, #F59E0B)',
  critical: 'var(--hex-error, #EF4444)',
  error: 'var(--hex-error, #EF4444)',
  info: 'var(--hex-info, #3B82F6)',
  neutral: 'var(--hex-text-muted, #64748B)',
  stub: 'var(--hex-text-muted, #64748B)',
  pending: 'var(--hex-text-muted, #64748B)',
  archived: 'var(--hex-text-muted, #64748B)',
}

const glowStyle = computed(() => {
  if (!props.glow) return {}
  return { boxShadow: `0 0 6px ${glowColorMap[props.status]}` }
})

const dotClasses = computed(() => {
  return `rounded-full shrink-0 ${sizeClasses[props.size]} ${statusColorClasses[props.status]}`
})

const pulseClasses = computed(() => {
  return `absolute inset-0 rounded-full animate-ping motion-reduce:animate-none ${pulseSizeClasses[props.size]} ${pulseColorClasses[props.status]}`
})
</script>

<template>
  <span class="inline-flex items-center gap-1.5 font-body">
    <span class="relative inline-flex shrink-0">
      <span :class="dotClasses" :style="glowStyle" />
      <span v-if="pulse" :class="pulseClasses" />
    </span>
    <span v-if="label" class="text-sm text-text-secondary">{{ label }}</span>
  </span>
</template>
