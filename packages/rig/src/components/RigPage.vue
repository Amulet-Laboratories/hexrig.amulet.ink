<script setup lang="ts">
import { computed } from 'vue'
import type { RigPageProps } from '../types'

const props = withDefaults(defineProps<RigPageProps>(), {
  maxWidth: 'full',
  padding: true,
})

const maxWidthClasses: Record<NonNullable<RigPageProps['maxWidth']>, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

const containerClasses = computed(() => {
  const parts = ['mx-auto w-full font-body', maxWidthClasses[props.maxWidth]]
  if (props.padding) parts.push('px-6 py-6')
  return parts.join(' ')
})
</script>

<template>
  <div class="flex-1 overflow-y-auto overflow-x-hidden">
    <div :class="containerClasses">
      <div v-if="title || $slots.header || $slots.actions">
        <slot name="header">
          <div class="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 class="text-xl font-semibold text-text-primary font-display">
                {{ title }}
              </h1>
              <p v-if="description" class="mt-1 text-sm text-text-muted">
                {{ description }}
              </p>
            </div>
            <div v-if="$slots.actions" class="shrink-0 flex items-center gap-2">
              <slot name="actions" />
            </div>
          </div>
        </slot>
      </div>

      <slot />
    </div>
  </div>
</template>
