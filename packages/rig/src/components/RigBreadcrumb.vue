<script setup lang="ts">
import { computed } from 'vue'
import type { RigBreadcrumbProps } from '../types'

const props = withDefaults(defineProps<RigBreadcrumbProps>(), {
  separator: '/',
})

const lastIndex = computed(() => props.items.length - 1)
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center gap-1.5 font-body text-sm">
      <li v-for="(item, index) in items" :key="item.label" class="inline-flex items-center gap-1.5">
        <a
          v-if="item.href && index !== lastIndex"
          :href="item.href"
          class="text-text-muted hover:text-text-primary transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
        >
          {{ item.label }}
        </a>
        <span
          v-else
          :class="index === lastIndex ? 'text-text-primary font-medium' : 'text-text-muted'"
          :aria-current="index === lastIndex ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
        <span v-if="index !== lastIndex" class="text-text-muted/50 select-none" aria-hidden="true">
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>
</template>
