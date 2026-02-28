<script setup lang="ts">
import type { RigAppShellProps } from '../types'
import RigSidebar from './RigSidebar.vue'

withDefaults(defineProps<RigAppShellProps>(), {
  sidebarCollapsed: false,
  sidebarWidth: 240,
  sidebarCollapsedWidth: 56,
})

const emit = defineEmits<{
  'update:sidebarCollapsed': [value: boolean]
}>()
</script>

<template>
  <div class="flex flex-col h-screen bg-surface-base font-body">
    <!-- Header — full width -->
    <div v-if="$slots.header">
      <slot name="header" />
    </div>

    <!-- Body — sidebar + main -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <RigSidebar
        v-if="$slots.sidebar || $slots['sidebar-header'] || $slots['sidebar-footer']"
        :collapsed="sidebarCollapsed"
        :width="sidebarWidth"
        :collapsed-width="sidebarCollapsedWidth"
        @update:collapsed="emit('update:sidebarCollapsed', $event)"
      >
        <template v-if="$slots['sidebar-header']" #header="{ collapsed }">
          <slot name="sidebar-header" :collapsed="collapsed" />
        </template>

        <template #default="{ collapsed }">
          <slot name="sidebar" :collapsed="collapsed" />
        </template>

        <template v-if="$slots['sidebar-footer']" #footer="{ collapsed }">
          <slot name="sidebar-footer" :collapsed="collapsed" />
        </template>
      </RigSidebar>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto overflow-x-hidden">
        <slot />
      </main>
    </div>

    <!-- Footer — full width -->
    <div v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
