<script setup lang="ts">
const stats = [
  { value: '56', label: 'Components' },
  { value: '9', label: 'Themes' },
  { value: '18', label: 'Color Modes' },
  { value: '764', label: 'Tests' },
  { value: 'AAA', label: 'WCAG Level' },
]

const composables = [
  {
    name: 'useToast()',
    surface: 'show \u00b7 dismiss \u00b7 dismissAll \u00b7 toasts',
  },
  {
    name: 'useTheme()',
    surface: 'theme \u00b7 mode \u00b7 setMode \u00b7 toggleMode \u00b7 resetToAuto',
  },
  {
    name: 'useMotion()',
    surface: 'duration \u00b7 easing \u00b7 prefersReducedMotion',
  },
  {
    name: 'useKeyboard()',
    surface: 'register \u00b7 unregister \u00b7 shortcuts',
  },
  {
    name: 'useClipboard()',
    surface: 'copy \u00b7 copied \u00b7 isSupported',
  },
  {
    name: 'useLocalStorage()',
    surface: 'value \u00b7 remove',
  },
  {
    name: 'useBreakpoint()',
    surface: 'current \u00b7 gte \u00b7 lt',
  },
  {
    name: 'useSort()',
    surface: 'sorted \u00b7 sortBy \u00b7 sortDir \u00b7 toggleSort',
  },
  {
    name: 'useFilter()',
    surface: 'filtered \u00b7 query \u00b7 filters \u00b7 activeCount \u00b7 reset',
  },
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
      <div v-reveal class="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-16">
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

      <!-- Composables -->
      <div v-reveal class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        <div
          v-for="c in composables"
          :key="c.name"
          class="bg-surface-raised border border-border-subtle rounded-lg p-5"
        >
          <span class="font-mono text-xs text-accent block mb-1">{{ c.name }}</span>
          <p class="text-xs text-text-muted font-body">{{ c.surface }}</p>
        </div>
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
            <span
              class="font-body font-semibold text-text-primary group-hover:text-accent transition-colors"
            >
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
