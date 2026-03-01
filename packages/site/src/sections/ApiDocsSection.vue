<script setup lang="ts">
import { ref } from 'vue'
import {
  RigSurface,
  RigText,
  RigBadge,
  RigInput,
  useFilter,
} from '@amulet-laboratories/rig'
import CodeBlock from '../components/CodeBlock.vue'
import { componentDocs } from '@/data/api-docs'

const docsRef = ref(componentDocs)
const { filtered, query } = useFilter(docsRef, ['name', 'description'])
</script>

<template>
  <section class="relative py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">API Reference</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        Every prop, documented.
      </h2>
      <!-- Search bar -->
      <div v-reveal class="mb-8">
        <RigInput
          v-model="query"
          placeholder="Search..."
          description="Find any of 58 components"
        />
      </div>

      <!-- Components grid -->
      <div class="space-y-6 reveal-stagger">
        <RigSurface
          v-for="doc in filtered"
          :key="doc.id"
          v-reveal:scale
          elevation="raised"
          border="subtle"
          rounded
          padding="lg"
          class="panel-lift"
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <div>
              <RigText as="h3" variant="heading" class="mb-1">{{ doc.name }}</RigText>
              <p class="text-xs text-text-muted font-body">{{ doc.description }}</p>
            </div>
            <RigBadge variant="soft" tone="accent">{{ doc.category }}</RigBadge>
          </div>

          <!-- Props table -->
          <div class="mb-6 overflow-x-auto">
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="border-b border-border">
                  <th class="text-left p-3 font-semibold text-text-primary">Prop</th>
                  <th class="text-left p-3 font-semibold text-text-primary">Type</th>
                  <th class="text-left p-3 font-semibold text-text-primary">Default</th>
                  <th class="text-left p-3 font-semibold text-text-primary">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="prop in doc.props"
                  :key="prop.name"
                  class="border-b border-border-subtle hover:bg-surface-sunken transition-colors"
                >
                  <td class="p-3 font-mono text-accent text-xs">{{ prop.name }}</td>
                  <td class="p-3 font-mono text-text-secondary text-xs">{{ prop.type }}</td>
                  <td class="p-3 font-mono text-text-muted text-xs">
                    {{ prop.default ?? (prop.required ? '—' : 'undefined') }}
                  </td>
                  <td class="p-3 text-text-secondary">{{ prop.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Usage example -->
          <div>
            <RigText variant="caption" color="muted" class="mb-2 block">Usage example</RigText>
            <CodeBlock :code="doc.usage" lang="vue" />
          </div>
        </RigSurface>
      </div>
    </div>
  </section>
</template>
