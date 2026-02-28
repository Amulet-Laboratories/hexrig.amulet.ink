<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import type { RigSidebarProps } from '../types'
import { SIDEBAR_COLLAPSED_KEY } from './shared'

const props = withDefaults(defineProps<RigSidebarProps>(), {
  collapsed: false,
  width: 240,
  collapsedWidth: 56,
  bordered: true,
})

defineEmits<{
  'update:collapsed': [value: boolean]
}>()

provide(SIDEBAR_COLLAPSED_KEY, toRef(props, 'collapsed'))

const style = computed(() => ({
  width: `${props.collapsed ? props.collapsedWidth : props.width}px`,
}))

const classes = computed(() => {
  const parts = [
    'flex flex-col h-full bg-surface-base overflow-hidden shrink-0',
    'transition-[width] duration-normal ease-standard',
  ]
  if (props.bordered) parts.push('border-r border-border')
  return parts.join(' ')
})
</script>

<template>
  <nav :class="classes" :style="style" aria-label="Sidebar navigation">
    <div v-if="$slots.header" class="shrink-0 px-3 py-3">
      <slot name="header" :collapsed="collapsed" />
    </div>

    <div class="flex-1 overflow-y-auto overflow-x-hidden py-2">
      <slot :collapsed="collapsed" />
    </div>

    <div v-if="$slots.footer" class="shrink-0 px-3 py-3 border-t border-border-subtle">
      <slot name="footer" :collapsed="collapsed" />
    </div>
  </nav>
</template>
