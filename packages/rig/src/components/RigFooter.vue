<script setup lang="ts">
import type { RigFooterProps } from '../types'

withDefaults(defineProps<RigFooterProps>(), {
  bordered: true,
})
</script>

<template>
  <footer
    class="shrink-0 px-6 py-4 bg-surface-base font-body"
    :class="bordered && 'border-t border-border'"
  >
    <slot />
  </footer>
</template>
