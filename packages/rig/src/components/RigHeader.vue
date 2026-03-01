<script setup lang="ts">
import { computed } from 'vue'
import type { RigHeaderProps } from '../types'

const props = withDefaults(defineProps<RigHeaderProps>(), {
  bordered: true,
})

const classes = computed(() => {
  const parts = ['sticky top-0 z-40 flex items-center gap-3 px-4 h-14 bg-surface-base font-body']
  if (props.bordered) parts.push('border-b border-border')
  return parts.join(' ')
})
</script>

<template>
  <header :class="classes">
    <div v-if="$slots.leading" class="shrink-0">
      <slot name="leading" />
    </div>

    <div class="shrink-0">
      <slot name="title">
        <h1 v-if="title" class="text-base font-semibold text-text-primary font-display truncate">
          {{ title }}
        </h1>
      </slot>
    </div>

    <div v-if="$slots.center" class="flex-1 min-w-0 px-4">
      <slot name="center" />
    </div>
    <div v-else class="flex-1" />

    <div v-if="$slots.trailing" class="shrink-0 flex items-center gap-2">
      <slot name="trailing" />
    </div>
  </header>
</template>
