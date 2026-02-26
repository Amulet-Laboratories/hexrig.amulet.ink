<script setup lang="ts">
const stats = [
  { value: '28', label: 'Components' },
  { value: '5', label: 'Themes' },
  { value: '10', label: 'Color Modes' },
  { value: 'AAA', label: 'WCAG Level' },
]

const techStack = [
  { label: 'Vue 3', href: 'https://vuejs.org/' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org/' },
  { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  { label: 'Vite', href: 'https://vite.dev/' },
]

const links = [
  {
    label: 'Storybook',
    description: 'Browse all components with live examples',
    href: '/storybook/',
    external: false,
  },
  {
    label: 'GitHub',
    description: 'Source code, issues, and contributions',
    href: 'https://github.com/Amulet-Laboratories/hexrig.amulet.ink',
    external: true,
  },
  {
    label: 'npm Packages',
    description: 'Published on GitHub Packages',
    href: 'https://github.com/orgs/Amulet-Laboratories/packages?repo_name=hexrig.amulet.ink',
    external: true,
  },
]
</script>

<template>
  <section class="relative py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Built With</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        The foundation.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg mb-16 max-w-xl">
        Modern stack. Rigorous standards. Open source.
      </p>

      <!-- Stats row -->
      <div v-reveal class="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="font-display text-4xl sm:text-5xl text-accent leading-none mb-2">
            {{ stat.value }}
          </div>
          <div class="text-xs font-mono uppercase tracking-[0.2em] text-text-muted">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- Tech stack badges -->
      <div v-reveal class="flex flex-wrap items-center justify-center gap-3 mb-16">
        <a
          v-for="tech in techStack"
          :key="tech.label"
          :href="tech.href"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 border border-border-subtle rounded-lg text-sm font-mono text-text-secondary hover:border-accent hover:text-accent transition-colors duration-fast"
        >
          {{ tech.label }}
        </a>
      </div>

      <!-- Ecosystem links -->
      <div v-reveal class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="group bg-surface-raised border border-border-subtle rounded-lg p-6 hover:border-accent transition-colors duration-fast"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="font-body font-semibold text-text-primary group-hover:text-accent transition-colors">
              {{ link.label }}
            </span>
            <span class="text-text-muted text-sm">{{ link.external ? '↗' : '→' }}</span>
          </div>
          <p class="text-sm text-text-muted font-body leading-relaxed">
            {{ link.description }}
          </p>
        </a>
      </div>
    </div>
  </section>
</template>
