<script setup lang="ts">
import { ref, computed, watch, onUnmounted, nextTick } from 'vue'
import type { RigGalleryProps } from '../types'
import { ICON_DISMISS } from './shared'

const props = withDefaults(defineProps<RigGalleryProps>(), {
  columns: 3,
  gap: 'md',
  aspectRatio: '4/3',
  lightbox: true,
})

const emit = defineEmits<{
  'image-click': [image: (typeof props.images)[number], index: number]
}>()

const lightboxOpen = ref(false)
const activeIndex = ref(0)
const lightboxRef = ref<HTMLElement | null>(null)

/** Ref-counted scroll lock (shared with RigDialog, RigNavbar) */
const scrollLockCount = (() => {
  if (typeof globalThis !== 'undefined') {
    const key = Symbol.for('rig-scroll-lock')
    const g = globalThis as unknown as Record<
      symbol,
      { value: number; savedOverflow: string } | undefined
    >
    if (!g[key]) g[key] = { value: 0, savedOverflow: '' }
    return g[key]!
  }
  return { value: 0, savedOverflow: '' }
})()

const gapClasses: Record<NonNullable<RigGalleryProps['gap']>, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
}

const responsiveColClasses = computed(() => {
  const c = props.columns
  const classes = ['grid-cols-1']
  if (c >= 2) classes.push('md:grid-cols-2')
  if (c >= 3) classes.push('lg:grid-cols-3')
  if (c === 4) classes.push('xl:grid-cols-4')
  if (c === 5) classes.push('xl:grid-cols-5')
  if (c >= 6) classes.push('xl:grid-cols-6')
  return classes.join(' ')
})

const aspectRatioStyle = computed(() => {
  if (props.aspectRatio === 'auto') return {}
  if (props.aspectRatio === 'square') return { aspectRatio: '1 / 1' }
  return { aspectRatio: props.aspectRatio.replace('/', ' / ') }
})

const activeImage = computed(() => props.images[activeIndex.value])

function openLightbox(index: number) {
  if (!props.lightbox) return
  activeIndex.value = index
  lightboxOpen.value = true
  emit('image-click', props.images[index], index)
}

function closeLightbox() {
  lightboxOpen.value = false
}

function nextImage() {
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}

function prevImage() {
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}

watch(lightboxOpen, (open) => {
  if (typeof document === 'undefined') return
  if (open) {
    if (scrollLockCount.value === 0) {
      scrollLockCount.savedOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    scrollLockCount.value++
    nextTick(() => lightboxRef.value?.focus())
  } else {
    scrollLockCount.value = Math.max(0, scrollLockCount.value - 1)
    if (scrollLockCount.value === 0) {
      document.body.style.overflow = scrollLockCount.savedOverflow
    }
  }
})

/** Get all focusable elements within a container */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  )
}

function onLightboxKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeLightbox()
    return
  }
  if (event.key === 'ArrowRight') {
    nextImage()
    return
  }
  if (event.key === 'ArrowLeft') {
    prevImage()
    return
  }
  if (event.key === 'Tab' && lightboxRef.value) {
    const focusable = getFocusableElements(lightboxRef.value)
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey) {
      if (document.activeElement === first || document.activeElement === lightboxRef.value) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}

let touchStartX = 0
function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
}
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 50) {
    if (dx > 0) {
      prevImage()
    } else {
      nextImage()
    }
  }
}

onUnmounted(() => {
  if (typeof document !== 'undefined' && lightboxOpen.value) {
    scrollLockCount.value = Math.max(0, scrollLockCount.value - 1)
    if (scrollLockCount.value === 0) {
      document.body.style.overflow = scrollLockCount.savedOverflow
    }
  }
})
</script>

<template>
  <div
    :class="['grid', responsiveColClasses, gapClasses[gap]]"
    role="group"
    aria-label="Image gallery"
  >
    <button
      v-for="(image, index) in images"
      :key="image.src"
      :class="[
        'overflow-hidden rounded group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
        lightbox ? 'cursor-pointer' : 'cursor-default',
      ]"
      :style="aspectRatioStyle"
      :aria-label="`View ${image.alt}`"
      @click="openLightbox(index)"
    >
      <slot name="thumbnail" :image="image" :index="index">
        <img
          :src="image.thumbnail ?? image.src"
          :alt="image.alt"
          class="h-full w-full object-cover transition-transform duration-normal ease-standard group-hover:scale-105"
          loading="lazy"
        />
      </slot>
    </button>
  </div>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-normal ease-entrance"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-fast ease-exit"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="lightboxOpen"
        ref="lightboxRef"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        :aria-label="`Image ${activeIndex + 1} of ${images.length}: ${activeImage?.alt}`"
        @keydown="onLightboxKeydown"
        @click.self="closeLightbox"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <button
          type="button"
          class="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded text-white/70 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Close lightbox"
          @click="closeLightbox"
        >
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path :d="ICON_DISMISS" />
          </svg>
        </button>

        <button
          v-if="images.length > 1"
          type="button"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Previous image"
          @click="prevImage"
        >
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div class="max-h-[85vh] max-w-[90vw]">
          <img
            :src="activeImage?.src"
            :alt="activeImage?.alt"
            class="max-h-[85vh] max-w-[90vw] object-contain"
          />
          <slot name="lightbox-caption" :image="activeImage" :index="activeIndex">
            <p v-if="activeImage?.caption" class="mt-3 text-center text-sm text-white/80 font-body">
              {{ activeImage.caption }}
            </p>
          </slot>
        </div>

        <button
          v-if="images.length > 1"
          type="button"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Next image"
          @click="nextImage"
        >
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div
          v-if="images.length > 1"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60 font-body tabular-nums"
        >
          {{ activeIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
