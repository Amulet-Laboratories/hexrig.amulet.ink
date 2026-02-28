<script setup lang="ts">
import { ref, computed } from 'vue'
import type { RigContactFormProps, ContactFormField } from '../types'
import RigInput from './RigInput.vue'
import RigSelect from './RigSelect.vue'
import RigButton from './RigButton.vue'
import RigAlert from './RigAlert.vue'

const props = withDefaults(defineProps<RigContactFormProps>(), {
  submitLabel: 'Send Message',
  successMessage: "Thank you! We'll be in touch.",
  errorMessage: 'Something went wrong. Please try again.',
  compact: false,
})

const emit = defineEmits<{
  submit: [data: Record<string, string>]
}>()

const DEFAULT_FIELDS: ContactFormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
]

const activeFields = computed(() => props.fields ?? DEFAULT_FIELDS)

const formData = ref<Record<string, string>>({})
const errors = ref<Record<string, string>>({})
const submitted = ref(false)
const submitting = ref(false)
const submitError = ref(false)

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validatePhone(value: string): boolean {
  return /^[+]?[\d\s\-().]{7,}$/.test(value)
}

function validateField(field: ContactFormField): string | null {
  const value = formData.value[field.name]?.trim() ?? ''
  if (field.required && !value) return `${field.label} is required`
  if (field.type === 'email' && value && !validateEmail(value)) return 'Please enter a valid email'
  if (field.type === 'tel' && value && !validatePhone(value))
    return 'Please enter a valid phone number'
  return null
}

function validateAll(): boolean {
  errors.value = {}
  let valid = true
  for (const field of activeFields.value) {
    const error = validateField(field)
    if (error) {
      errors.value[field.name] = error
      valid = false
    }
  }
  return valid
}

async function handleSubmit() {
  if (!validateAll()) return
  submitting.value = true
  submitError.value = false
  emit('submit', { ...formData.value })

  try {
    const body = new URLSearchParams({
      'form-name': props.formName,
      ...formData.value,
    })
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    if (!response.ok) throw new Error('Network error')
    submitted.value = true
  } catch {
    submitError.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div v-if="submitted">
    <slot name="success">
      <RigAlert tone="success" :title="successMessage" />
    </slot>
  </div>

  <form
    v-else
    :name="formName"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" :value="formName" />
    <p class="hidden" aria-hidden="true">
      <label>Don't fill this out: <input name="bot-field" /></label>
    </p>

    <slot name="before" />

    <div :class="compact ? 'space-y-3' : 'space-y-4'">
      <template v-for="field in activeFields" :key="field.name">
        <div v-if="field.type === 'textarea'" class="flex flex-col gap-1.5">
          <label
            :for="`${formName}-${field.name}`"
            class="font-body text-sm font-medium text-text-primary"
          >
            {{ field.label }}
            <span v-if="field.required" class="text-status-error ml-0.5" aria-hidden="true">*</span>
          </label>
          <textarea
            :id="`${formName}-${field.name}`"
            v-model="formData[field.name]"
            :name="field.name"
            :placeholder="field.placeholder"
            :required="field.required"
            :aria-invalid="errors[field.name] ? true : undefined"
            rows="4"
            class="block w-full rounded border bg-surface-sunken px-3 py-2 font-body text-base text-text-primary placeholder:text-text-muted shadow-inner transition-colors duration-fast ease-standard focus:outline-none focus:border-focus-ring focus:ring-2 focus:ring-focus-ring"
            :class="errors[field.name] ? 'border-status-error' : 'border-border hover:border-border-strong'"
          />
          <p v-if="errors[field.name]" class="text-sm text-status-error" role="alert">
            {{ errors[field.name] }}
          </p>
        </div>

        <RigSelect
          v-else-if="field.type === 'select'"
          v-model="formData[field.name]"
          :label="field.label"
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          :options="field.options ?? []"
          :error="errors[field.name]"
        />

        <RigInput
          v-else
          v-model="formData[field.name]"
          :label="field.label"
          :name="field.name"
          :type="field.type ?? 'text'"
          :placeholder="field.placeholder"
          :required="field.required"
          :error="errors[field.name]"
        />
      </template>
    </div>

    <RigAlert
      v-if="submitError"
      tone="error"
      :title="errorMessage"
      class="mt-4"
      dismissible
      @dismiss="submitError = false"
    />

    <slot name="after" />

    <div class="mt-6">
      <RigButton type="submit" :loading="submitting" :disabled="submitting">
        {{ submitLabel }}
      </RigButton>
    </div>
  </form>
</template>
