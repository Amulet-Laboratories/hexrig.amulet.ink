<template>
  <section class="py-20">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="text-3xl font-display mb-6">Texture & Ornament</h2>
      <p class="text-text-secondary mb-6">
        Preview of noise grain, ornaments, and the maker's stamp across the active theme.
      </p>

      <div class="space-y-8">
        <div class="p-6 bg-surface-raised border border-border-subtle rounded-theme">
          <div class="mb-4">Noise Grain (demo)</div>
          <div class="relative h-40 bg-surface-base">
            <RigNoiseGrain :opacity="0.03" :frequency="0.8" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="px-4 py-2 bg-surface-elevated rounded">Surface with grain</div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-surface-raised border border-border-subtle rounded-theme">
          <div class="mb-4">Ornaments</div>
          <div class="space-y-4">
            <RigOrnament motif="geological" />
            <RigOrnament motif="technical" />
            <RigOrnament motif="typographic" />
          </div>
        </div>

        <div
          class="p-6 bg-surface-raised border border-border-subtle rounded-theme flex items-center justify-between"
        >
          <div>
            <div class="mb-2">Maker's stamp</div>
            <RigMakerStamp :size="28" />
          </div>
          <div class="text-text-muted">Corpus fragment: Low tide.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RigNoiseGrain, RigOrnament, RigMakerStamp } from '@amulet-laboratories/rig'
</script>
<script setup lang="ts">
import { RigNoiseGrain, RigMakerStamp, RigOrnament } from '@amulet-laboratories/rig'

defineProps<{
  activeTheme: string
}>()
</script>

<template>
  <section class="py-hex-3xl px-6">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <RigText variant="overline" color="muted" class="mb-hex-sm">Texture Layer</RigText>
      <RigText as="h2" variant="heading" class="mb-hex-md"> Material Presence </RigText>
      <RigText variant="body" color="secondary" class="max-w-2xl mb-hex-2xl">
        The physical quality of Amulet's digital presence comes from texture elements working in
        concert. Noise grain, ornamental line-drawing, and the maker's stamp create surfaces that
        feel material.
      </RigText>

      <!-- Maker's Stamp -->
      <div class="mb-hex-3xl">
        <RigText variant="subheading" class="mb-hex-md">Maker's Stamp</RigText>
        <div class="flex items-end gap-hex-xl">
          <div
            v-for="size in [12, 16, 20, 32, 48]"
            :key="size"
            class="flex flex-col items-center gap-2"
          >
            <RigMakerStamp :size="size" href="https://amulet.ink" />
            <span class="text-xs text-text-muted font-mono">{{ size }}px</span>
          </div>
        </div>
        <RigText variant="caption" color="muted" class="mt-hex-sm">
          The architectural thread. Uses currentColor — adapts to any theme automatically.
        </RigText>
      </div>

      <RigDivider class="mb-hex-3xl" />

      <!-- Ornament Motifs -->
      <div class="mb-hex-3xl">
        <RigText variant="subheading" class="mb-hex-md">Ornamental Line-Drawing</RigText>
        <RigText variant="body" color="secondary" class="max-w-2xl mb-hex-xl">
          Each room has a motif vocabulary for section dividers and accent illustrations that draw
          themselves on scroll. Seven motif families, one per atmospheric domain.
        </RigText>

        <div class="space-y-hex-xl">
          <div v-for="motif in motifs" :key="motif.id" class="group">
            <div class="flex items-baseline justify-between mb-hex-xs">
              <div>
                <span class="text-sm font-mono text-text-primary">{{ motif.label }}</span>
                <span class="text-xs text-text-muted ml-3">{{ motif.room }}</span>
              </div>
              <span class="text-xs text-text-muted">{{ motif.description }}</span>
            </div>
            <RigOrnament
              :motif="motif.id"
              :color="motif.color || 'var(--text-muted)'"
              :animated="true"
              :stroke-width="motif.id === 'toolmarks' ? 2 : motif.id === 'waveform' ? 1 : 1.5"
            />
          </div>
        </div>
      </div>

      <RigDivider class="mb-hex-3xl" />

      <!-- Noise Grain Presets -->
      <div>
        <RigText variant="subheading" class="mb-hex-md">Noise Grain</RigText>
        <RigText variant="body" color="secondary" class="max-w-2xl mb-hex-xl">
          Every property applies a subtle feTurbulence noise overlay. The grain provides physical
          texture — the sense of material beneath the pixels. What changes per room is the density
          and warmth.
        </RigText>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-hex-md">
          <div
            v-for="preset in grainPresets"
            :key="preset.label"
            class="relative rounded border border-border-subtle overflow-hidden"
          >
            <div class="aspect-square bg-surface-base relative">
              <RigNoiseGrain :opacity="preset.opacity" :frequency="preset.frequency" />
              <div class="absolute inset-0 flex items-end p-3">
                <div>
                  <p class="text-xs font-mono text-text-primary">{{ preset.label }}</p>
                  <p class="text-xs text-text-muted">{{ preset.room }}</p>
                  <p class="text-xs text-text-muted font-mono mt-1">
                    {{ preset.opacity * 100 }}% · {{ preset.frequency }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
