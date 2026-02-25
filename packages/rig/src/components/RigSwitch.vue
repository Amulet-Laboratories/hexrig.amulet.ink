<script setup lang="ts">
import { computed, useId } from 'vue'
import type { RigSwitchProps } from '../types'

const props = withDefaults(defineProps<RigSwitchProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const fallbackId = useId()
const switchId = computed(() => props.id ?? fallbackId)
const descriptionId = computed(() => `${switchId.value}-desc`)

const describedBy = computed(() => {
  if (props.description) return descriptionId.value
  return undefined
})

const onToggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    onToggle()
  }
}

const trackClasses = computed(() => {
  const base = 'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-fast ease-standard focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-surface-base'

  if (props.disabled) return `${base} opacity-50 cursor-not-allowed`
  if (props.modelValue) return `${base} bg-accent cursor-pointer`
  return `${base} bg-border cursor-pointer`
})

const thumbClasses = computed(() => {
  const base = 'pointer-events-none inline-block h-5 w-5 rounded-full bg-surface-base shadow-sm ring-0 transition-transform duration-fast ease-standard'

  return props.modelValue ? `${base} translate-x-5` : `${base} translate-x-0`
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div
      class="inline-flex items-center gap-3"
      :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    >
      <button
        :id="switchId"
        type="button"
        role="switch"
        :aria-checked="modelValue"
        :aria-label="label"
        :aria-describedby="describedBy"
        :disabled="disabled"
        :class="trackClasses"
        @click="onToggle"
        @keydown="onKeydown"
      >
        <span :class="thumbClasses" aria-hidden="true" />
      </button>

      <span
        v-if="label"
        class="font-body text-sm text-text-primary select-none"
        @click="onToggle"
      >
        {{ label }}
      </span>
    </div>

    <p
      v-if="description"
      :id="descriptionId"
      class="ml-14 text-sm text-text-muted"
    >
      {{ description }}
    </p>
  </div>
</template>
