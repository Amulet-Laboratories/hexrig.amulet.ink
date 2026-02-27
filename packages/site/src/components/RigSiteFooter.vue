<script setup lang="ts">
import RigMakerStamp from './RigMakerStamp.vue'

withDefaults(
  defineProps<{
    email: string
    imprintName: string
    homeUrl?: string
    corpusFragment?: string
    year?: number
  }>(),
  {
    homeUrl: 'https://amulet.ink',
    year: new Date().getFullYear(),
  },
)
</script>

<template>
  <footer class="border-t border-border-subtle px-6 py-12 mt-auto">
    <div class="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
      <!-- Contact -->
      <p class="text-sm text-text-muted font-body">
        <a
          :href="`mailto:${email}`"
          class="hover:text-text-secondary transition-colors duration-fast ease-standard"
        >
          {{ email }}
        </a>
      </p>

      <!-- Maker's stamp -->
      <div class="flex items-center gap-4">
        <RigMakerStamp :href="homeUrl" :size="16" />
        <a
          :href="homeUrl"
          class="text-xs text-text-muted hover:text-text-secondary transition-colors duration-fast ease-standard tracking-wide font-body"
        >
          amulet.ink
        </a>
      </div>

      <!-- Copyright + corpus fragment -->
      <div class="text-right">
        <p class="text-xs text-text-muted tracking-wide font-body">
          &copy; {{ year }} Amulet {{ imprintName }}
        </p>
        <p v-if="corpusFragment" class="text-xs text-text-muted/50 mt-1 italic font-body">
          {{ corpusFragment }}
        </p>
      </div>
    </div>
  </footer>
</template>
