<script setup lang="ts">
import { computed, inject } from 'vue'
import type { RigSidebarSectionProps } from '../types'
import { SIDEBAR_COLLAPSED_KEY } from './shared'

defineProps<RigSidebarSectionProps>()

const collapsedRef = inject(SIDEBAR_COLLAPSED_KEY, undefined)
const isCollapsed = computed(() => collapsedRef?.value ?? false)
</script>

<template>
  <div class="py-1">
    <p
      v-if="title && !isCollapsed"
      class="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted font-body"
    >
      {{ title }}
    </p>
    <div v-else-if="title && isCollapsed" class="px-4 py-1.5">
      <div class="border-t border-border-subtle" />
    </div>
    <div role="group" :aria-label="title">
      <slot />
    </div>
  </div>
</template>
