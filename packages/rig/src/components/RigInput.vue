<script setup lang="ts">
import { computed, useId } from 'vue'
import type { RigInputProps } from '../types'

const props = withDefaults(defineProps<RigInputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fallbackId = useId()
const inputId = computed(() => props.id ?? fallbackId)
const descriptionId = computed(() => `${inputId.value}-desc`)
const errorId = computed(() => `${inputId.value}-error`)

const describedBy = computed(() => {
  const parts: string[] = []
  if (props.description && !props.error) parts.push(descriptionId.value)
  if (props.error) parts.push(errorId.value)
  return parts.length > 0 ? parts.join(' ') : undefined
})

const inputClasses = computed(() => {
  const base =
    'block w-full rounded border bg-surface-sunken px-3 py-2 font-body text-base text-text-primary placeholder:text-text-muted shadow-inner transition-colors duration-fast ease-standard focus:outline-none focus:border-focus-ring focus:ring-2 focus:ring-focus-ring'

  if (props.error) {
    return `${base} border-status-error`
  }
  if (props.disabled) {
    return `${base} border-border opacity-50 cursor-not-allowed`
  }
  return `${base} border-border hover:border-border-strong`
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="inputId" class="font-body text-sm font-medium text-text-primary">
      {{ label }}
      <span v-if="required" class="text-status-error ml-0.5" aria-hidden="true">*</span>
    </label>

    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-label="!label ? (placeholder ?? 'Input') : undefined"
      :aria-describedby="describedBy"
      :aria-invalid="error ? true : undefined"
      :class="inputClasses"
      @input="onInput"
    />

    <p v-if="description && !error" :id="descriptionId" class="text-sm text-text-muted">
      {{ description }}
    </p>

    <p v-if="error" :id="errorId" class="text-sm text-status-error" role="alert">
      {{ error }}
    </p>
  </div>
</template>
