<script setup lang="ts">
/**
 * Hex Engine — StressTest
 *
 * Visual archetype tuner for development. Pick any archetype + weight + attitude
 * combination and see the full token set rendered live.
 *
 * Usage: Drop into any Vite + Vue 3 dev environment.
 * Not bundled into the main package output.
 */

import { ref, computed } from 'vue'
import { generate, checkContrast } from '../src/index'
import type { ArchetypeKey, WeightKey, AttitudeKey, Mode, TokenSet } from '../src/types'

const archetypes: ArchetypeKey[] = [
  'command', 'ledger', 'journal', 'market',
  'gallery', 'signal', 'stage', 'guide',
]
const weights: WeightKey[] = ['light', 'standard', 'heavy']
const attitudes: AttitudeKey[] = ['kinetic', 'tranquil', 'intimate', 'luminous']
const modes: Mode[] = ['night', 'day']

const archetype = ref<ArchetypeKey>('command')
const weight = ref<WeightKey>('standard')
const attitude = ref<AttitudeKey>('kinetic')
const mode = ref<Mode>('night')

const tokens = computed<TokenSet>(() =>
  generate({ archetype: archetype.value, mode: mode.value, weight: weight.value, attitude: attitude.value }),
)

const contrastPairs = computed(() => [
  { name: 'text / surface',    fg: tokens.value.text,    bg: tokens.value.surface    },
  { name: 'text / surfaceAlt', fg: tokens.value.text,    bg: tokens.value.surfaceAlt },
  { name: 'primary / surface', fg: tokens.value.primary, bg: tokens.value.surface    },
  { name: 'accent / surface',  fg: tokens.value.accent,  bg: tokens.value.surface    },
].map(({ name, fg, bg }) => {
  const result = checkContrast(fg, bg)
  return { name, fg, bg, ratio: result.ratio.toFixed(2), aa: result.aa, aaLarge: result.aaLarge }
}))

const colorSwatches = computed(() => [
  { name: 'surface',      value: tokens.value.surface      },
  { name: 'surfaceAlt',   value: tokens.value.surfaceAlt   },
  { name: 'primary',      value: tokens.value.primary      },
  { name: 'primaryHover', value: tokens.value.primaryHover },
  { name: 'secondary',    value: tokens.value.secondary    },
  { name: 'accent',       value: tokens.value.accent       },
  { name: 'accentHover',  value: tokens.value.accentHover  },
  { name: 'text',         value: tokens.value.text         },
  { name: 'textMuted',    value: tokens.value.textMuted    },
  { name: 'muted',        value: tokens.value.muted        },
  { name: 'border',       value: tokens.value.border       },
  { name: 'success',      value: tokens.value.success      },
  { name: 'warning',      value: tokens.value.warning      },
  { name: 'error',        value: tokens.value.error        },
  { name: 'info',         value: tokens.value.info         },
])
</script>

<template>
  <div class="stress-test" :style="{ background: tokens.surface, color: tokens.text, fontFamily: tokens.fontBody }">
    <!-- Controls -->
    <div class="controls" :style="{ background: tokens.surfaceAlt, borderBottom: `1px solid ${tokens.border}` }">
      <h1 :style="{ fontFamily: tokens.fontDisplay, color: tokens.primary }">
        Hex Engine — StressTest
      </h1>

      <div class="control-row">
        <label>Archetype</label>
        <select v-model="archetype">
          <option v-for="a in archetypes" :key="a" :value="a">{{ a }}</option>
        </select>

        <label>Mode</label>
        <select v-model="mode">
          <option v-for="m in modes" :key="m" :value="m">{{ m }}</option>
        </select>

        <label>Weight</label>
        <select v-model="weight">
          <option v-for="w in weights" :key="w" :value="w">{{ w }}</option>
        </select>

        <label>Attitude</label>
        <select v-model="attitude">
          <option v-for="a in attitudes" :key="a" :value="a">{{ a }}</option>
        </select>
      </div>
    </div>

    <div class="content">
      <!-- Color swatches -->
      <section class="section">
        <h2 :style="{ color: tokens.textMuted, fontFamily: tokens.fontMono, fontSize: tokens.textSm }">
          Color Tokens
        </h2>
        <div class="swatch-grid">
          <div
            v-for="swatch in colorSwatches"
            :key="swatch.name"
            class="swatch"
            :style="{ background: swatch.value, boxShadow: tokens.shadowSm }"
          >
            <span class="swatch-label" :style="{ background: tokens.surface, color: tokens.text, fontFamily: tokens.fontMono, fontSize: tokens.textXs }">
              {{ swatch.name }}
            </span>
          </div>
        </div>
      </section>

      <!-- Contrast pairs -->
      <section class="section">
        <h2 :style="{ color: tokens.textMuted, fontFamily: tokens.fontMono, fontSize: tokens.textSm }">
          Contrast Pairs
        </h2>
        <div class="contrast-list">
          <div
            v-for="pair in contrastPairs"
            :key="pair.name"
            class="contrast-row"
            :style="{ background: pair.bg, border: `1px solid ${tokens.border}`, borderRadius: tokens.radiusMd }"
          >
            <span :style="{ color: pair.fg, fontFamily: tokens.fontMono }">{{ pair.name }}</span>
            <span
              :style="{
                color: pair.aa ? tokens.success : (pair.aaLarge ? tokens.warning : tokens.error),
                fontFamily: tokens.fontMono,
                fontWeight: 'bold',
              }"
            >
              {{ pair.ratio }}:1 {{ pair.aa ? '✓ AA' : pair.aaLarge ? '~ AA Large' : '✗ Fail' }}
            </span>
          </div>
        </div>
      </section>

      <!-- Typography scale -->
      <section class="section">
        <h2 :style="{ color: tokens.textMuted, fontFamily: tokens.fontMono, fontSize: tokens.textSm }">
          Typography Scale
        </h2>
        <div :style="{ fontFamily: tokens.fontDisplay }">
          <div :style="{ fontSize: tokens.text4xl, lineHeight: tokens.leadingTight }">Display 4xl</div>
          <div :style="{ fontSize: tokens.text3xl, lineHeight: tokens.leadingTight }">Heading 3xl</div>
          <div :style="{ fontSize: tokens.text2xl, lineHeight: tokens.leadingNormal }">Subheading 2xl</div>
          <div :style="{ fontSize: tokens.textXl, lineHeight: tokens.leadingNormal }">Large xl</div>
        </div>
        <div :style="{ fontFamily: tokens.fontBody, marginTop: tokens.space4 }">
          <div :style="{ fontSize: tokens.textBase, lineHeight: tokens.leadingRelaxed, color: tokens.text }">
            Body text — The quick brown fox jumps over the lazy dog.
          </div>
          <div :style="{ fontSize: tokens.textSm, lineHeight: tokens.leadingRelaxed, color: tokens.textMuted }">
            Small body — Supporting text and captions live here.
          </div>
        </div>
        <div :style="{ fontFamily: tokens.fontMono, marginTop: tokens.space4, color: tokens.accent, fontSize: tokens.textSm }">
          mono — const tokens = generate({{ '{' }} archetype: '{{ tokens.archetype }}' {{ '}' }})
        </div>
      </section>

      <!-- Shadows & radius demo -->
      <section class="section">
        <h2 :style="{ color: tokens.textMuted, fontFamily: tokens.fontMono, fontSize: tokens.textSm }">
          Shadows & Radius
        </h2>
        <div class="shadow-demo">
          <div
            v-for="[size, shadow] in [['sm', tokens.shadowSm], ['md', tokens.shadowMd], ['lg', tokens.shadowLg], ['xl', tokens.shadowXl], ['inner', tokens.shadowInner]]"
            :key="size"
            :style="{
              background: tokens.surfaceAlt,
              boxShadow: shadow,
              borderRadius: tokens.radiusMd,
              padding: tokens.space4,
              color: tokens.textMuted,
              fontFamily: tokens.fontMono,
              fontSize: tokens.textSm,
            }"
          >
            shadow-{{ size }}
          </div>
        </div>
      </section>

      <!-- Spacing -->
      <section class="section">
        <h2 :style="{ color: tokens.textMuted, fontFamily: tokens.fontMono, fontSize: tokens.textSm }">
          Motion — {{ tokens.attitude }} / {{ tokens.durationNormal }}
        </h2>
        <div class="motion-demo">
          <div
            :style="{
              background: tokens.primary,
              borderRadius: tokens.radiusFull,
              padding: `${tokens.space2} ${tokens.space6}`,
              color: tokens.surface,
              fontFamily: tokens.fontBody,
              fontSize: tokens.textSm,
              transition: `all ${tokens.durationNormal} ${tokens.easingDefault}`,
              cursor: 'pointer',
              display: 'inline-block',
            }"
          >
            Hover me
          </div>
          <div
            :style="{
              background: tokens.accent,
              borderRadius: tokens.radiusMd,
              padding: `${tokens.space2} ${tokens.space6}`,
              color: tokens.surface,
              fontFamily: tokens.fontBody,
              fontSize: tokens.textSm,
              transition: `all ${tokens.durationFast} ${tokens.easingEnter}`,
              cursor: 'pointer',
              display: 'inline-block',
            }"
          >
            Accent
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.stress-test {
  min-height: 100vh;
  font-size: 14px;
}

.controls {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 12px 24px;
}

.controls h1 {
  margin: 0 0 8px;
  font-size: 18px;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.control-row label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
}

.control-row select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  font-size: 13px;
  cursor: pointer;
}

.content {
  padding: 24px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section h2 {
  margin: 0 0 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
}

.swatch {
  height: 64px;
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.swatch-label {
  font-size: 9px;
  padding: 2px 4px;
  border-radius: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.contrast-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contrast-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  font-size: 13px;
}

.shadow-demo {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.shadow-demo > div {
  min-width: 120px;
  text-align: center;
}

.motion-demo {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
