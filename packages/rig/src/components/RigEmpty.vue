<script setup lang="ts">
import type { RigEmptyProps } from '../types'
import RigIcon from './RigIcon.vue'
import RigButton from './RigButton.vue'

withDefaults(defineProps<RigEmptyProps>(), {
  actionVariant: 'outline',
})

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center font-body">
    <slot>
      <RigIcon
        v-if="icon"
        :name="icon"
        size="xl"
        color="muted"
        class="mb-4"
      />

      <p class="text-base font-medium text-text-primary">
        {{ title }}
      </p>

      <p v-if="description" class="mt-1 text-sm text-text-muted max-w-sm">
        {{ description }}
      </p>

      <div v-if="actionLabel || $slots.action" class="mt-4">
        <slot name="action">
          <RigButton
            :variant="actionVariant"
            tone="accent"
            size="sm"
            @click="emit('action')"
          >
            {{ actionLabel }}
          </RigButton>
        </slot>
      </div>
    </slot>
  </div>
</template>
