<script setup lang="ts">
import { computed, useId } from 'vue'
import type { RigSelectProps } from '../types'

const props = withDefaults(defineProps<RigSelectProps>(), {
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fallbackId = useId()
const selectId = computed(() => props.id ?? fallbackId)
const descriptionId = computed(() => `${selectId.value}-desc`)
const errorId = computed(() => `${selectId.value}-error`)

const describedBy = computed(() => {
  const parts: string[] = []
  if (props.description && !props.error) parts.push(descriptionId.value)
  if (props.error) parts.push(errorId.value)
  return parts.length > 0 ? parts.join(' ') : undefined
})

const selectClasses = computed(() => {
  const base =
    'block w-full appearance-none rounded border bg-surface-sunken px-3 py-2 pr-10 font-body text-base text-text-primary transition-colors duration-fast ease-standard focus:outline-none focus:border-focus-ring focus:ring-2 focus:ring-focus-ring'

  if (props.error) return `${base} border-status-error`
  if (props.disabled) return `${base} border-border opacity-50 cursor-not-allowed`
  return `${base} border-border hover:border-border-strong`
})

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="selectId" class="font-body text-sm font-medium text-text-primary">
      {{ label }}
      <span v-if="required" class="text-status-error ml-0.5" aria-hidden="true">*</span>
    </label>

    <div class="relative">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :aria-label="!label ? (placeholder ?? 'Select') : undefined"
        :aria-describedby="describedBy"
        :aria-invalid="error ? true : undefined"
        :class="selectClasses"
        @change="onChange"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <svg
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted"
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

    <p v-if="description && !error" :id="descriptionId" class="text-sm text-text-muted">
      {{ description }}
    </p>

    <p v-if="error" :id="errorId" class="text-sm text-status-error" role="alert">
      {{ error }}
    </p>
  </div>
</template>
