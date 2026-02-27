<script setup lang="ts">
import { computed } from 'vue'
import type { RigNoiseGrainProps } from '../types'

const props = withDefaults(defineProps<RigNoiseGrainProps>(), {
  opacity: 0.02,
  frequency: 0.7,
  blend: 'overlay',
})

const style = computed(() => ({
  position: 'fixed' as const,
  inset: '0',
  zIndex: 50,
  pointerEvents: 'none' as const,
  mixBlendMode: props.blend as 'overlay' | 'soft-light' | 'multiply',
  opacity: props.opacity,
}))
</script>

<template>
  <div :style="style" aria-hidden="true">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="rig-noise-grain">
        <feTurbulence
          type="fractalNoise"
          :baseFrequency="props.frequency"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#rig-noise-grain)" />
    </svg>
  </div>
</template>
