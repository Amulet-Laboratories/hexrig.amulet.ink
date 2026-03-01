<script setup lang="ts">
import { ref, computed } from 'vue'
import type { RigPanelProps } from '../types'

const props = withDefaults(defineProps<RigPanelProps>(), {
  collapsible: false,
  defaultOpen: true,
  bordered: true,
  padded: true,
})

const emit = defineEmits<{
  toggle: [open: boolean]
}>()

const isOpen = ref(props.defaultOpen)

const toggle = () => {
  if (!props.collapsible) return
  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}

const containerClasses = computed(() => {
  const parts = ['rounded font-body overflow-hidden']
  if (props.bordered) parts.push('border border-border bg-surface-base')
  return parts.join(' ')
})
</script>

<template>
  <div :class="containerClasses">
    <!-- Title bar -->
    <div
      v-if="title || $slots.header"
      class="flex items-center justify-between gap-3 px-4 py-3"
      :class="[
        collapsible &&
          'cursor-pointer select-none hover:bg-surface-raised transition-colors duration-fast ease-standard',
        isOpen && (bordered || $slots.footer) && 'border-b border-border-subtle',
      ]"
      :role="collapsible ? 'button' : undefined"
      :tabindex="collapsible ? 0 : undefined"
      :aria-expanded="collapsible ? isOpen : undefined"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <slot name="header">
        <div class="min-w-0">
          <p class="text-sm font-semibold text-text-primary truncate">{{ title }}</p>
          <p v-if="description" class="text-xs text-text-muted mt-0.5 truncate">
            {{ description }}
          </p>
        </div>
      </slot>

      <div class="flex items-center gap-2 shrink-0">
        <slot name="actions" />
        <svg
          v-if="collapsible"
          class="h-4 w-4 text-text-muted transition-transform duration-fast ease-standard shrink-0"
          :class="isOpen && 'rotate-180'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>

    <!-- Body -->
    <div
      class="grid transition-[grid-template-rows,opacity] duration-normal ease-standard"
      :style="{ gridTemplateRows: isOpen ? '1fr' : '0fr' }"
      :class="isOpen ? 'opacity-100' : 'opacity-0'"
      :aria-hidden="collapsible ? !isOpen : undefined"
    >
      <div class="overflow-hidden">
        <div :class="padded ? 'p-4' : ''">
          <slot />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      v-if="$slots.footer && isOpen"
      class="px-4 py-3 border-t border-border-subtle flex items-center justify-end gap-3"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
