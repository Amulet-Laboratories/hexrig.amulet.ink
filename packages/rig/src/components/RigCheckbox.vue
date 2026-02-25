<script setup lang="ts">
import { computed, useId } from 'vue'
import type { RigCheckboxProps } from '../types'

const props = withDefaults(defineProps<RigCheckboxProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const fallbackId = useId()
const checkboxId = computed(() => props.id ?? fallbackId)
const descriptionId = computed(() => `${checkboxId.value}-desc`)
const errorId = computed(() => `${checkboxId.value}-error`)

const describedBy = computed(() => {
  const parts: string[] = []
  if (props.description && !props.error) parts.push(descriptionId.value)
  if (props.error) parts.push(errorId.value)
  return parts.length > 0 ? parts.join(' ') : undefined
})

const onToggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

const checkboxClasses = computed(() => {
  const base = 'h-5 w-5 shrink-0 rounded-sm border-2 transition-colors duration-fast ease-standard focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-surface-base cursor-pointer'

  if (props.disabled) return `${base} opacity-50 cursor-not-allowed`
  if (props.error) return `${base} border-status-error`
  if (props.modelValue) return `${base} border-accent bg-accent text-surface-base`
  return `${base} border-border hover:border-border-strong bg-surface-sunken`
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      :for="checkboxId"
      class="inline-flex items-start gap-3"
      :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    >
      <input
        :id="checkboxId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :aria-describedby="describedBy"
        :aria-invalid="error ? true : undefined"
        :class="checkboxClasses"
        @change="onToggle"
      />

      <span v-if="label" class="font-body text-sm text-text-primary select-none">
        {{ label }}
      </span>
    </label>

    <p
      v-if="description && !error"
      :id="descriptionId"
      class="ml-8 text-sm text-text-muted"
    >
      {{ description }}
    </p>

    <p
      v-if="error"
      :id="errorId"
      class="ml-8 text-sm text-status-error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>
