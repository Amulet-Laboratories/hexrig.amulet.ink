<script setup lang="ts">
import { computed, useId } from 'vue'
import type { RigRadioProps } from '../types'

const props = withDefaults(defineProps<RigRadioProps>(), {
  orientation: 'vertical',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fallbackId = useId()
const groupId = computed(() => props.id ?? fallbackId)
const descriptionId = computed(() => `${groupId.value}-desc`)
const errorId = computed(() => `${groupId.value}-error`)

const describedBy = computed(() => {
  const parts: string[] = []
  if (props.description && !props.error) parts.push(descriptionId.value)
  if (props.error) parts.push(errorId.value)
  return parts.length > 0 ? parts.join(' ') : undefined
})

const onSelect = (value: string) => {
  if (!props.disabled) {
    emit('update:modelValue', value)
  }
}

const radioClasses = (optionDisabled?: boolean) => {
  const base =
    'h-5 w-5 shrink-0 rounded-full border-2 transition-colors duration-fast ease-standard focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-surface-base cursor-pointer'

  if (props.disabled || optionDisabled) return `${base} opacity-50 cursor-not-allowed`
  if (props.error) return `${base} border-status-error`
  return `${base} border-border hover:border-border-strong`
}
</script>

<template>
  <fieldset
    :aria-describedby="describedBy"
    :aria-invalid="error ? true : undefined"
    :disabled="disabled"
    class="flex flex-col gap-2 font-body"
  >
    <legend class="text-sm font-medium text-text-primary mb-1">
      {{ label }}
    </legend>

    <div
      :class="[
        'flex',
        orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2',
      ]"
    >
      <label
        v-for="option in options"
        :key="option.value"
        :for="`${groupId}-${option.value}`"
        class="inline-flex items-center gap-3"
        :class="[disabled || option.disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
      >
        <input
          :id="`${groupId}-${option.value}`"
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled || option.disabled"
          :class="radioClasses(option.disabled)"
          @change="onSelect(option.value)"
        />

        <span class="text-sm text-text-primary select-none">
          {{ option.label }}
        </span>
      </label>
    </div>

    <p v-if="description && !error" :id="descriptionId" class="text-sm text-text-muted">
      {{ description }}
    </p>

    <p v-if="error" :id="errorId" class="text-sm text-status-error" role="alert">
      {{ error }}
    </p>
  </fieldset>
</template>
