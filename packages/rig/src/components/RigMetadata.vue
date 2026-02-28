<script setup lang="ts">
import { computed } from 'vue'
import type { RigMetadataProps } from '../types'
import RigBadge from './RigBadge.vue'
import RigStatus from './RigStatus.vue'

const props = withDefaults(defineProps<RigMetadataProps>(), {
  columns: 2,
  orientation: 'vertical',
  separator: false,
})

const gridClasses = computed(() => {
  const colMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }
  return `grid gap-4 ${colMap[props.columns] ?? colMap[2]}`
})

const statusMap: Record<string, string> = {
  accent: 'active',
  success: 'healthy',
  warning: 'warning',
  error: 'error',
  info: 'info',
  neutral: 'neutral',
}
</script>

<template>
  <dl :class="[gridClasses, 'font-body']">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        orientation === 'horizontal' ? 'flex items-center gap-2' : 'flex flex-col gap-0.5',
        separator && 'border-b border-border-subtle pb-3 last:border-b-0 last:pb-0',
      ]"
    >
      <dt class="text-xs font-medium text-text-muted uppercase tracking-wider">
        {{ item.label }}
      </dt>
      <dd class="text-sm text-text-primary">
        <!-- Badge type -->
        <RigBadge
          v-if="item.type === 'badge'"
          variant="soft"
          :tone="item.tone ?? 'neutral'"
          size="sm"
        >
          {{ item.value }}
        </RigBadge>

        <!-- Status type -->
        <RigStatus
          v-else-if="item.type === 'status'"
          :status="(statusMap[item.tone ?? 'neutral'] as 'healthy')"
          :label="String(item.value)"
        />

        <!-- Link type -->
        <a
          v-else-if="item.type === 'link' && item.href"
          :href="item.href"
          class="text-accent hover:underline underline-offset-2"
        >
          {{ item.value }}
        </a>

        <!-- Default text -->
        <span v-else>{{ item.value }}</span>
      </dd>
    </div>
  </dl>
</template>
