<script setup lang="ts">
import { useClipboard } from '@amulet-laboratories/rig'

defineProps<{
  code: string
  lang?: string
  filename?: string
}>()

const { copy, copied } = useClipboard()
</script>

<template>
  <div class="relative rounded-lg bg-surface-sunken border border-border-subtle overflow-hidden">
    <div class="flex items-center justify-between px-4 py-2 border-b border-border-subtle">
      <span class="text-xs font-mono text-text-muted">{{ filename ?? lang ?? 'code' }}</span>
      <button
        type="button"
        class="text-xs font-mono text-text-muted hover:text-accent transition-colors duration-fast"
        @click="copy(code)"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <pre class="p-4 overflow-x-auto text-sm font-mono text-text-secondary leading-relaxed whitespace-pre"><code>{{ code }}</code></pre>
  </div>
</template>
