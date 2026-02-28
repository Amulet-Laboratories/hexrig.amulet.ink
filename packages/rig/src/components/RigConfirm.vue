<script setup lang="ts">
import type { RigConfirmProps } from '../types'
import RigDialog from './RigDialog.vue'
import RigButton from './RigButton.vue'

const props = withDefaults(defineProps<RigConfirmProps>(), {
  modelValue: false,
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  tone: 'danger',
  loading: false,
  persistent: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

const handleConfirm = () => {
  if (props.loading) return
  emit('confirm')
}

const handleCancel = () => {
  if (props.loading) return
  emit('cancel')
  emit('update:modelValue', false)
}

const handleDialogUpdate = (value: boolean) => {
  emit('update:modelValue', value)
  if (!value) {
    emit('cancel')
  }
}

const confirmToneMap: Record<NonNullable<RigConfirmProps['tone']>, 'danger' | 'accent'> = {
  danger: 'danger',
  warning: 'accent',
  info: 'accent',
}
</script>

<template>
  <RigDialog
    :model-value="modelValue"
    :title="title"
    :description="description"
    :persistent="persistent || loading"
    :dismissible="!loading"
    size="sm"
    @update:model-value="handleDialogUpdate"
  >
    <template #footer>
      <RigButton
        variant="ghost"
        tone="neutral"
        size="sm"
        :disabled="loading"
        @click="handleCancel"
      >
        {{ cancelLabel }}
      </RigButton>
      <RigButton
        variant="solid"
        :tone="confirmToneMap[tone]"
        size="sm"
        :loading="loading"
        :disabled="loading"
        @click="handleConfirm"
      >
        {{ confirmLabel }}
      </RigButton>
    </template>
  </RigDialog>
</template>
