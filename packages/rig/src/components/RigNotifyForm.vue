<script setup lang="ts">
import { ref } from 'vue'
import type { RigNotifyFormProps } from '../types'
import RigInput from './RigInput.vue'
import RigButton from './RigButton.vue'

const props = withDefaults(defineProps<RigNotifyFormProps>(), {
  submitLabel: 'Notify me',
  thankYouMessage: 'Noted. We will be in touch.',
})

const email = ref('')
const submitted = ref(false)
const submitting = ref(false)

async function handleSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  submitting.value = true
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
    })
    submitted.value = true
  } catch {
    submitted.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div v-if="!submitted">
    <form
      :name="props.formName"
      method="POST"
      data-netlify="true"
      :netlify-honeypot="'bot-field'"
      class="flex flex-col sm:flex-row gap-3 max-w-md"
      @submit.prevent="handleSubmit"
    >
      <input type="hidden" name="form-name" :value="props.formName" />
      <p class="hidden">
        <label> Don't fill this out: <input name="bot-field" /> </label>
      </p>
      <div class="flex-1">
        <RigInput
          v-model="email"
          type="email"
          placeholder="your@email.com"
          required
          :disabled="submitting"
        />
      </div>
      <RigButton type="submit" :loading="submitting" :disabled="submitting">
        {{ props.submitLabel }}
      </RigButton>
    </form>
    <p v-if="props.contactEmail" class="mt-3 text-sm text-text-muted font-body">
      <a
        :href="`mailto:${props.contactEmail}`"
        class="text-text-link hover:text-accent-hover transition-colors duration-fast"
      >
        {{ props.contactEmail }}
      </a>
    </p>
  </div>

  <div v-else class="border-l-2 border-accent/30 pl-6 py-2">
    <p class="text-text-secondary font-body">{{ props.thankYouMessage }}</p>
  </div>
</template>
