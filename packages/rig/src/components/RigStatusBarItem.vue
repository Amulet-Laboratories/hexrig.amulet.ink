<script setup lang="ts">
import type { RigStatusBarItemProps } from '../types'

withDefaults(defineProps<RigStatusBarItemProps>(), {
  separator: false,
})
</script>

<template>
  <div
    class="inline-flex items-center gap-1.5 px-2 h-full"
    :class="[separator ? 'border-r border-border' : '']"
  >
    <slot />
  </div>
</template>
