<script setup lang="ts">
import { ref, useId } from 'vue'
import type { RigAccordionProps } from '../types'

const props = withDefaults(defineProps<RigAccordionProps>(), {
  multiple: false,
})

const accordionId = useId()
const openItems = ref<Set<string>>(new Set(props.defaultOpen ?? []))

const toggle = (value: string) => {
  if (openItems.value.has(value)) {
    openItems.value.delete(value)
  } else {
    if (!props.multiple) {
      openItems.value.clear()
    }
    openItems.value.add(value)
  }
  // Trigger reactivity
  openItems.value = new Set(openItems.value)
}

const isOpen = (value: string) => openItems.value.has(value)

const triggerId = (value: string) => `${accordionId}-trigger-${value}`
const panelId = (value: string) => `${accordionId}-panel-${value}`

const handleKeydown = (event: KeyboardEvent, index: number) => {
  const enabledItems = props.items.filter((i) => !i.disabled)
  const currentIndex = enabledItems.findIndex((i) => i.value === props.items[index].value)
  let targetIndex = -1

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    targetIndex = (currentIndex + 1) % enabledItems.length
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    targetIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length
  } else if (event.key === 'Home') {
    event.preventDefault()
    targetIndex = 0
  } else if (event.key === 'End') {
    event.preventDefault()
    targetIndex = enabledItems.length - 1
  }

  if (targetIndex >= 0) {
    const target = enabledItems[targetIndex]
    const el = document.getElementById(triggerId(target.value))
    el?.focus()
  }
}
</script>

<template>
  <div class="divide-y divide-border-subtle border-y border-border-subtle">
    <div v-for="(item, index) in items" :key="item.value">
      <h3>
        <button
          :id="triggerId(item.value)"
          type="button"
          class="flex w-full items-center justify-between py-4 px-1 text-left font-body font-medium text-text-primary transition-colors duration-fast ease-standard hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
          :class="[item.disabled && 'opacity-40 pointer-events-none']"
          :aria-expanded="isOpen(item.value)"
          :aria-controls="panelId(item.value)"
          :disabled="item.disabled"
          @click="toggle(item.value)"
          @keydown="handleKeydown($event, index)"
        >
          <span>{{ item.label }}</span>
          <svg
            class="h-5 w-5 shrink-0 text-text-muted transition-transform duration-fast ease-standard"
            :class="isOpen(item.value) && 'rotate-180'"
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
        </button>
      </h3>

      <div
        :id="panelId(item.value)"
        role="region"
        :aria-labelledby="triggerId(item.value)"
        :hidden="!isOpen(item.value)"
        class="pb-4 px-1 text-text-secondary font-body leading-relaxed"
      >
        <slot :name="item.value" :item="item">
          {{ item.content }}
        </slot>
      </div>
    </div>
  </div>
</template>
