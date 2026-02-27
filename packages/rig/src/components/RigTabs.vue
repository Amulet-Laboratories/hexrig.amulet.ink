<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import type { RigTabsProps, RigTabItem } from '../types'

const props = withDefaults(defineProps<RigTabsProps>(), {
  variant: 'underline',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const tablistId = useId()

const activeTab = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

provide('rig-tabs-id', tablistId)

const sizeClasses: Record<NonNullable<RigTabsProps['size']>, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

const tabClasses = (tab: RigTabItem) => {
  const isActive = tab.value === activeTab.value
  const base = `inline-flex items-center gap-2 font-body font-medium transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${sizeClasses[props.size]}`

  if (props.variant === 'underline') {
    return [
      base,
      'px-4 py-2 border-b-2 -mb-px',
      isActive
        ? 'border-accent text-accent'
        : 'border-transparent text-text-muted hover:text-text-primary hover:border-border',
    ].join(' ')
  }

  // pill variant
  return [
    base,
    'px-4 py-2 rounded',
    isActive
      ? 'bg-accent text-text-on-accent'
      : 'text-text-muted hover:text-text-primary hover:bg-surface-raised',
  ].join(' ')
}

const listClasses = computed(() => {
  if (props.variant === 'underline') {
    return 'flex border-b border-border-subtle'
  }
  return 'flex gap-1 p-1 bg-surface-sunken rounded'
})

const handleKeydown = (event: KeyboardEvent, index: number) => {
  const enabledTabs = props.tabs.filter((t) => !t.disabled)
  const currentEnabledIndex = enabledTabs.findIndex((t) => t.value === props.tabs[index].value)
  let targetIndex = -1

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    targetIndex = (currentEnabledIndex + 1) % enabledTabs.length
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    targetIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length
  } else if (event.key === 'Home') {
    event.preventDefault()
    targetIndex = 0
  } else if (event.key === 'End') {
    event.preventDefault()
    targetIndex = enabledTabs.length - 1
  }

  if (targetIndex >= 0) {
    const target = enabledTabs[targetIndex]
    activeTab.value = target.value
    const el = document.getElementById(`${tablistId}-tab-${target.value}`)
    el?.focus()
  }
}

const panelId = (value: string) => `${tablistId}-panel-${value}`
const tabId = (value: string) => `${tablistId}-tab-${value}`
</script>

<template>
  <div>
    <div :class="listClasses" role="tablist" :aria-label="label">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value"
        :id="tabId(tab.value)"
        role="tab"
        type="button"
        :aria-selected="tab.value === activeTab"
        :aria-controls="panelId(tab.value)"
        :tabindex="tab.value === activeTab ? 0 : -1"
        :disabled="tab.disabled"
        :class="[tabClasses(tab), tab.disabled && 'opacity-40 pointer-events-none']"
        @click="activeTab = tab.value"
        @keydown="handleKeydown($event, index)"
      >
        {{ tab.label }}
      </button>
    </div>

    <Transition
      mode="out-in"
      enter-active-class="transition-[opacity,transform] duration-fast ease-entrance"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-[opacity,transform] duration-fast ease-exit"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        :key="activeTab"
        :id="panelId(activeTab)"
        role="tabpanel"
        :aria-labelledby="tabId(activeTab)"
        :tabindex="0"
        class="pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
      >
        <slot :name="activeTab" />
      </div>
    </Transition>
  </div>
</template>
