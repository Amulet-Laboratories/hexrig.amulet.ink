<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { generateOrnamentPath } from './ornament-paths'

const props = withDefaults(
  defineProps<{
    motif?:
      | 'geological'
      | 'technical'
      | 'typographic'
      | 'toolmarks'
      | 'waveform'
      | 'organic'
      | 'minimal'
    color?: string
    animated?: boolean
    strokeWidth?: number
    width?: number
    height?: number
    seed?: number
  }>(),
  {
    motif: 'minimal',
    color: 'currentColor',
    animated: true,
    strokeWidth: 1.5,
    width: 800,
    height: 60,
    seed: undefined,
  },
)

const svgRef = ref<SVGSVGElement | null>(null)
const pathRef = ref<SVGPathElement | null>(null)
const pathLength = ref(0)
const drawProgress = ref(0)
const prefersReducedMotion = ref(false)

const pathData = computed(() =>
  generateOrnamentPath(props.motif ?? 'minimal', {
    width: props.width ?? 800,
    height: props.height ?? 60,
    seed: props.seed,
  }),
)

const dashStyle = computed(() => {
  if (!props.animated || pathLength.value === 0) return {}
  const offset = pathLength.value * (1 - drawProgress.value)
  return {
    strokeDasharray: pathLength.value,
    strokeDashoffset: offset,
    transition: 'stroke-dashoffset 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
  }
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (pathRef.value) {
    pathLength.value = pathRef.value.getTotalLength()
  }

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches
  const handleChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches
  }
  mq.addEventListener('change', handleChange)

  if (!props.animated || prefersReducedMotion.value) {
    drawProgress.value = 1
    return
  }

  if (svgRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const startTime = performance.now()
            const duration = 800

            const animate = (now: number) => {
              const elapsed = now - startTime
              const t = Math.min(elapsed / duration, 1)
              drawProgress.value = 1 - Math.pow(1 - t, 3)

              if (t < 1) {
                requestAnimationFrame(animate)
              }
            }
            requestAnimationFrame(animate)
            observer?.disconnect()
          }
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(svgRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})

watch(
  () => props.animated,
  (val) => {
    if (!val) drawProgress.value = 1
  },
)
</script>

<template>
  <svg
    ref="svgRef"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full h-auto"
    aria-hidden="true"
    preserveAspectRatio="none"
  >
    <path
      ref="pathRef"
      :d="pathData"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      :style="dashStyle"
    />
  </svg>
</template>
