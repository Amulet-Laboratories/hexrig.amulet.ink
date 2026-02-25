<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-border-subtle">
    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <div class="w-6 h-6 rounded bg-accent" />
            <span class="font-display text-lg text-text-primary">Amulet</span>
          </div>
          <p class="text-sm text-text-muted font-body leading-relaxed max-w-xs">
            Hex + Rig. Design tokens and Vue 3 components for interfaces that feel considered.
          </p>
        </div>

        <!-- Packages -->
        <div>
          <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted block mb-4">Packages</span>
          <ul class="space-y-2">
            <li>
              <a
                href="https://www.npmjs.com/package/@amulet-laboratories/hex"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-text-secondary hover:text-text-link transition-colors font-mono"
              >
                @amulet-laboratories/hex
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/@amulet-laboratories/rig"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-text-secondary hover:text-text-link transition-colors font-mono"
              >
                @amulet-laboratories/rig
              </a>
            </li>
          </ul>
        </div>

        <!-- Links -->
        <div>
          <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted block mb-4">Links</span>
          <ul class="space-y-2">
            <li>
              <a
                href="/storybook/"
                class="text-sm text-text-secondary hover:text-text-link transition-colors font-body"
              >
                Storybook
              </a>
            </li>
            <li>
              <a
                href="https://github.com/amulet-laboratories/hexrig.amulet.ink"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-text-secondary hover:text-text-link transition-colors font-body"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://amulet.ink"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-text-secondary hover:text-text-link transition-colors font-body"
              >
                amulet.ink
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border-subtle">
        <p class="text-xs text-text-muted font-body">
          &copy; {{ year }} Amulet Laboratories
        </p>
        <div class="flex items-center gap-4">
          <span class="text-xs text-text-muted font-mono">WCAG AAA</span>
          <span class="text-border-subtle">·</span>
          <span class="text-xs text-text-muted font-mono">Vue 3</span>
          <span class="text-border-subtle">·</span>
          <span class="text-xs text-text-muted font-mono">TypeScript</span>
        </div>
      </div>
    </div>
  </footer>
</template>
