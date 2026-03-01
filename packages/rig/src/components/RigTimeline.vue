<script setup lang="ts">
import type { RigTimelineProps, TimelineItem } from '../types'
import RigIcon from './RigIcon.vue'

withDefaults(defineProps<RigTimelineProps>(), {
  orientation: 'vertical',
})

const dotColor = (item: TimelineItem): string => {
  const map: Record<string, string> = {
    accent: 'bg-accent',
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    error: 'bg-status-error',
    info: 'bg-status-info',
    neutral: 'bg-text-muted',
  }
  return map[item.tone ?? 'neutral'] ?? map.neutral
}
</script>

<template>
  <div
    class="font-body"
    :class="orientation === 'horizontal' ? 'flex gap-6 overflow-x-auto' : 'flex flex-col'"
  >
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :class="[
        orientation === 'horizontal'
          ? 'flex flex-col items-center text-center min-w-[120px]'
          : 'flex gap-3',
      ]"
    >
      <!-- Vertical layout -->
      <template v-if="orientation === 'vertical'">
        <div class="flex flex-col items-center">
          <div
            v-if="item.icon"
            :class="['flex items-center justify-center h-8 w-8 rounded-full', dotColor(item)]"
          >
            <RigIcon :name="item.icon" size="xs" color="current" class="text-surface-base" />
          </div>
          <div v-else :class="['h-3 w-3 rounded-full mt-1', dotColor(item)]"></div>
          <div
            v-if="index < items.length - 1"
            class="w-px flex-1 min-h-[24px] bg-border-subtle mt-1"
          ></div>
        </div>

        <div class="pb-6 min-w-0">
          <p class="text-sm font-medium text-text-primary">{{ item.label }}</p>
          <p v-if="item.description" class="text-xs text-text-muted mt-0.5">
            {{ item.description }}
          </p>
          <p v-if="item.timestamp" class="text-xs text-text-muted mt-1">{{ item.timestamp }}</p>
        </div>
      </template>

      <!-- Horizontal layout -->
      <template v-else>
        <div class="flex items-center justify-center">
          <div
            v-if="item.icon"
            :class="['flex items-center justify-center h-8 w-8 rounded-full', dotColor(item)]"
          >
            <RigIcon :name="item.icon" size="xs" color="current" class="text-surface-base" />
          </div>
          <div v-else :class="['h-3 w-3 rounded-full', dotColor(item)]"></div>
        </div>
        <div class="mt-2 min-w-0">
          <p class="text-sm font-medium text-text-primary">{{ item.label }}</p>
          <p v-if="item.description" class="text-xs text-text-muted mt-0.5">
            {{ item.description }}
          </p>
          <p v-if="item.timestamp" class="text-xs text-text-muted mt-1">{{ item.timestamp }}</p>
        </div>
      </template>
    </div>
  </div>
</template>
