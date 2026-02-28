<script setup lang="ts"></script>

<template>
  <section class="relative py-32 sm:py-40 px-6">
    <div class="max-w-3xl mx-auto text-center">
      <!-- Thesis statement -->
      <blockquote v-reveal class="space-y-6">
        <p
          class="font-display text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-snug tracking-tight"
        >
          Most design systems give you components and let you pick a color.
        </p>
        <p
          class="font-body text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
        >
          Hex + Rig gives you nine complete worlds — each with its own palette, typography, motion,
          and personality. Switch themes and every token responds: surfaces shift, type resets,
          accents transform.
        </p>
      </blockquote>

      <!-- Three pillars -->
      <div v-reveal class="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-left">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-1.5 h-1.5 rounded-full bg-accent" />
            <span class="text-xs font-mono uppercase tracking-[0.2em] text-accent">Hex</span>
          </div>
          <p class="text-sm text-text-secondary font-body leading-relaxed">
            The token engine. Design tokens as CSS custom properties — surfaces, text, borders,
            accents, status, focus, motion, and typography.
          </p>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-1.5 h-1.5 rounded-full bg-accent" />
            <span class="text-xs font-mono uppercase tracking-[0.2em] text-accent"
              >Hex Origins</span
            >
          </div>
          <p class="text-sm text-text-secondary font-body leading-relaxed">
            Nine curated themes — six spectral hues and three neutrals. Each a complete visual
            language with dark and light modes.
          </p>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-1.5 h-1.5 rounded-full bg-accent" />
            <span class="text-xs font-mono uppercase tracking-[0.2em] text-accent">Rig</span>
          </div>
          <p class="text-sm text-text-secondary font-body leading-relaxed">
            Forty-eight Vue 3 components. WCAG AAA accessible, polymorphic, token-driven. Built to
            feel considered in any theme.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
