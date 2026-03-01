<script setup lang="ts">
import { computed } from 'vue'
import type { RigStatProps } from '../types'
import RigIcon from './RigIcon.vue'

const props = withDefaults(defineProps<RigStatProps>(), {
  size: 'md',
  mono: false,
})

const valueSizeClass = computed(() => {
  if (props.mono) {
    const monoMap: Record<string, string> = {
      sm: 'text-lg font-semibold',
      md: 'text-2xl font-bold',
      lg: 'text-3xl font-bold',
    }
    return monoMap[props.size] ?? monoMap.md
  }
  const map: Record<string, string> = {
    sm: 'text-xl font-semibold',
    md: 'text-3xl font-bold',
    lg: 'text-4xl font-bold',
  }
  return map[props.size] ?? map.md
})

const trendColor = computed(() => {
  if (props.trend === 'up') return 'text-status-success'
  if (props.trend === 'down') return 'text-status-error'
  return 'text-text-muted'
})

const trendIcon = computed(() => {
  if (props.trend === 'up') return 'M7 14l5-5 5 5'
  if (props.trend === 'down') return 'M7 10l5 5 5-5'
  return 'M5 12h14'
})
</script>

<template>
  <div class="flex flex-col gap-1 font-body">
    <div class="flex items-center gap-2">
      <RigIcon v-if="icon" :name="icon" size="sm" color="muted" />
      <span class="text-sm font-medium text-text-muted uppercase tracking-wider">
        {{ label }}
      </span>
    </div>

    <div class="flex items-baseline gap-2">
      <span :class="['text-text-primary', mono ? 'font-mono' : 'font-display', valueSizeClass]">
        {{ value }}
      </span>

      <span
        v-if="trend"
        :class="['inline-flex items-center gap-0.5 text-sm font-medium', trendColor]"
      >
        <svg
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path :d="trendIcon" />
        </svg>
        <span v-if="trendLabel">{{ trendLabel }}</span>
      </span>
    </div>

    <p v-if="description" class="text-sm text-text-muted">
      {{ description }}
    </p>
  </div>
</template>
