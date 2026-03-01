<script setup lang="ts">
import { computed, inject } from 'vue'
import type { RigSidebarItemProps } from '../types'
import { SIDEBAR_COLLAPSED_KEY } from './shared'
import RigIcon from './RigIcon.vue'

const props = withDefaults(defineProps<RigSidebarItemProps>(), {
  active: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const collapsedRef = inject(SIDEBAR_COLLAPSED_KEY, undefined)
const isCollapsed = computed(() => collapsedRef?.value ?? false)

const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const classes = computed(() => {
  const parts = [
    'flex items-center gap-3 w-full mx-2 rounded text-sm font-body',
    'transition-colors duration-fast ease-standard',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
  ]

  if (isCollapsed.value) {
    parts.push('px-0 py-2 justify-center')
  } else {
    parts.push('px-3 py-2')
  }

  if (props.active) {
    parts.push('bg-accent-muted text-accent font-medium')
  } else {
    parts.push('text-text-secondary hover:bg-surface-raised hover:text-text-primary')
  }

  // Account for the mx-2 — limit the width
  parts.push('max-w-[calc(100%-16px)]')

  return parts.join(' ')
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :type="tag === 'button' ? 'button' : undefined"
    :href="href"
    :to="to"
    :title="isCollapsed ? label : undefined"
    @click="handleClick"
  >
    <slot name="icon">
      <RigIcon v-if="icon" :name="icon" size="sm" :color="active ? 'accent' : 'muted'" />
    </slot>

    <span v-if="!isCollapsed" class="flex-1 truncate text-left">
      <slot>{{ label }}</slot>
    </span>

    <span
      v-if="badge != null && !isCollapsed"
      class="shrink-0 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium bg-accent-muted text-accent"
    >
      {{ badge }}
    </span>
  </component>
</template>
