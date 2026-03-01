<script setup lang="ts">
import type { RigStatusBarProps } from '../types'

withDefaults(defineProps<RigStatusBarProps>(), {
  as: 'footer',
  height: 28,
  bordered: true,
})
</script>

<template>
  <component
    :is="as"
    class="shrink-0 flex items-center font-mono text-[11px] text-text-secondary bg-surface-base overflow-hidden"
    :class="[bordered ? 'border-t border-border' : '']"
    :style="{ height: `${height}px` }"
  >
    <div class="flex items-center flex-1 min-w-0">
      <slot name="left" />
    </div>

    <div class="flex items-center">
      <slot />
    </div>

    <div class="flex items-center flex-1 min-w-0 justify-end">
      <slot name="right" />
    </div>
  </component>
</template>
