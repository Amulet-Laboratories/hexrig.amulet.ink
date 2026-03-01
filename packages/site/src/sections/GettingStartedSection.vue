<script setup lang="ts">
import { RigSurface, RigText, RigBadge } from '@amulet-laboratories/rig'
import CodeBlock from '../components/CodeBlock.vue'

const installCode = 'pnpm add @amulet-laboratories/rig @amulet-laboratories/hex'
const configCode = `// main.ts
import '@amulet-laboratories/hex/themes/hearth.css'`
const htmlCode = `<div data-theme="hearth" data-mode="dark">
  <!-- your app -->
</div>`
const useCode = `<script setup lang="ts">
import { RigButton, RigCard } from '@amulet-laboratories/rig'
<\/script>

<template>
  <RigCard>
    <div class="p-4">
      <RigButton variant="solid" tone="accent">Get started</RigButton>
    </div>
  </RigCard>
<\/template>`
</script>

<template>
  <section class="relative py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Get Started</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        From zero to component in three steps.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg mb-16 max-w-xl">
        No bundler magic. No peer-dependency maze. Add one package, set one attribute, import a
        component.
      </p>

      <!-- Steps -->
      <div class="space-y-8 reveal-stagger">
        <!-- Step 1: Install -->
        <RigSurface
          v-reveal:scale
          elevation="raised"
          border="subtle"
          rounded
          padding="lg"
          class="panel-lift"
        >
          <div class="flex items-center gap-3 mb-4">
            <RigBadge variant="solid" tone="accent">1</RigBadge>
            <RigText as="h3" variant="subheading">Install</RigText>
          </div>
          <CodeBlock :code="installCode" lang="shell" />
          <p class="text-xs text-text-muted font-body mt-3">
            Published on GitHub Packages. Node 22+ required.
          </p>
        </RigSurface>

        <!-- Step 2: Configure -->
        <RigSurface
          v-reveal:scale
          elevation="raised"
          border="subtle"
          rounded
          padding="lg"
          class="panel-lift"
        >
          <div class="flex items-center gap-3 mb-4">
            <RigBadge variant="solid" tone="accent">2</RigBadge>
            <RigText as="h3" variant="subheading">Configure</RigText>
          </div>
          <div class="space-y-4">
            <div>
              <RigText variant="caption" color="muted" class="mb-2 block">Import theme CSS</RigText>
              <CodeBlock :code="configCode" lang="ts" filename="main.ts" />
            </div>
            <div>
              <RigText variant="caption" color="muted" class="mb-2 block"
                >Set theme on root element</RigText
              >
              <CodeBlock :code="htmlCode" lang="html" />
            </div>
          </div>
          <p class="text-xs text-text-muted font-body mt-3">
            Nine themes available: hearth, ember, grove, reef, abyss, cove, linen, keep, slate.
          </p>
        </RigSurface>

        <!-- Step 3: Use -->
        <RigSurface
          v-reveal:scale
          elevation="raised"
          border="subtle"
          rounded
          padding="lg"
          class="panel-lift"
        >
          <div class="flex items-center gap-3 mb-4">
            <RigBadge variant="solid" tone="accent">3</RigBadge>
            <RigText as="h3" variant="subheading">Use</RigText>
          </div>
          <CodeBlock :code="useCode" lang="vue" filename="App.vue" />
          <p class="text-xs text-text-muted font-body mt-3">
            Switch to any theme above. Every component responds instantly.
          </p>
        </RigSurface>
      </div>
    </div>
  </section>
</template>
