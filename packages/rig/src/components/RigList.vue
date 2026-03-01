<script setup lang="ts">
import { computed } from 'vue'
import type { RigListProps } from '../types'
import RigIcon from './RigIcon.vue'

const props = withDefaults(defineProps<RigListProps>(), {
  hoverable: false,
  divided: true,
  size: 'md',
})

defineEmits<{
  'item-click': [item: { id: string; label: string }]
}>()

const paddingClass = computed(() => {
  const map: Record<string, string> = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-3',
    lg: 'px-5 py-4',
  }
  return map[props.size] ?? map.md
})
</script>

<template>
  <ul class="font-body" role="list">
    <li
      v-for="item in items"
      :key="item.id"
      :class="[
        paddingClass,
        'flex items-center gap-3 transition-colors duration-fast ease-standard',
        divided && 'border-b border-border-subtle last:border-b-0',
        hoverable && 'hover:bg-surface-raised cursor-pointer',
      ]"
      @click="$emit('item-click', item)"
    >
      <RigIcon v-if="item.icon" :name="item.icon" size="sm" color="muted" class="shrink-0" />

      <div class="flex-1 min-w-0">
        <component
          :is="item.href || item.to ? 'a' : 'span'"
          :href="item.href"
          class="text-sm font-medium text-text-primary"
          :class="(item.href || item.to) && 'hover:text-accent underline-offset-2 hover:underline'"
        >
          {{ item.label }}
        </component>

        <p v-if="item.description" class="text-xs text-text-muted mt-0.5 truncate">
          {{ item.description }}
        </p>
      </div>

      <span v-if="item.meta" class="shrink-0 text-xs text-text-muted">
        {{ item.meta }}
      </span>

      <slot name="item-action" :item="item"></slot>
    </li>
  </ul>
</template>
