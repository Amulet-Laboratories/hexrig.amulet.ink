<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, useId } from 'vue'
import type { RigNavbarProps } from '../types'
import { ICON_DISMISS } from './shared'

const props = withDefaults(defineProps<RigNavbarProps>(), {
  sticky: false,
  transparent: false,
  bordered: false,
})

const mobileOpen = ref(false)
const activeDropdown = ref<string | null>(null)
const scrolled = ref(false)
const navbarRef = ref<HTMLElement | null>(null)
const mobileMenuRef = ref<HTMLElement | null>(null)
const navId = useId()

/** Ref-counted scroll lock (shared with RigDialog) */
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

function onScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  if (props.transparent) {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  if (props.transparent) window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocumentClick)
  if (mobileOpen.value) {
    scrollLockCount.value = Math.max(0, scrollLockCount.value - 1)
    if (scrollLockCount.value === 0) {
      document.body.style.overflow = scrollLockCount.savedOverflow
    }
  }
})

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

watch(mobileOpen, (open) => {
  if (typeof document === 'undefined') return
  if (open) {
    if (scrollLockCount.value === 0) {
      scrollLockCount.savedOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    scrollLockCount.value++
    nextTick(() => mobileMenuRef.value?.focus())
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

function onMobileKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    mobileOpen.value = false
    return
  }
  if (event.key === 'Tab' && mobileMenuRef.value) {
    const focusable = getFocusableElements(mobileMenuRef.value)
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey) {
      if (document.activeElement === first || document.activeElement === mobileMenuRef.value) {
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

function toggleDropdown(label: string) {
  activeDropdown.value = activeDropdown.value === label ? null : label
}

function closeDropdowns() {
  activeDropdown.value = null
}

function onDocumentClick(event: MouseEvent) {
  if (!navbarRef.value?.contains(event.target as Node)) closeDropdowns()
}

const navClasses = computed(() => {
  const parts = ['w-full font-body']
  if (props.sticky) parts.push('sticky top-0 z-40')
  if (props.bordered) parts.push('border-b border-border')
  if (props.transparent && !scrolled.value) parts.push('bg-transparent')
  else parts.push('bg-surface-base')
  if (props.transparent) parts.push('transition-colors duration-normal ease-standard')
  return parts.join(' ')
})
</script>

<template>
  <nav ref="navbarRef" :class="navClasses" :aria-label="brand ?? 'Site navigation'">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Brand -->
        <div class="shrink-0">
          <slot name="brand">
            <a
              v-if="brand"
              :href="brandHref ?? '/'"
              class="font-display text-lg font-bold text-text-primary hover:text-accent transition-colors duration-fast ease-standard"
            >
              {{ brand }}
            </a>
          </slot>
        </div>

        <!-- Leading slot -->
        <slot name="leading" />

        <!-- Desktop nav items -->
        <div class="hidden md:flex md:items-center md:gap-1">
          <template v-for="item in items" :key="item.label">
            <a
              v-if="!item.children"
              :href="item.href"
              class="px-3 py-2 rounded text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >{{ item.label }}</a
            >

            <div v-else class="relative">
              <button
                type="button"
                class="inline-flex items-center gap-1 px-3 py-2 rounded text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                :aria-expanded="activeDropdown === item.label"
                :aria-controls="`${navId}-dropdown-${item.label}`"
                @click.stop="toggleDropdown(item.label)"
              >
                {{ item.label }}
                <svg
                  class="h-4 w-4 text-text-muted transition-transform duration-fast"
                  :class="activeDropdown === item.label && 'rotate-180'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <Transition
                enter-active-class="transition-[opacity,transform] duration-fast ease-entrance"
                enter-from-class="opacity-0 scale-95 -translate-y-1"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-[opacity,transform] duration-fast ease-exit"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-1"
              >
                <div
                  v-if="activeDropdown === item.label"
                  :id="`${navId}-dropdown-${item.label}`"
                  class="absolute top-full left-0 mt-1 min-w-[180px] rounded bg-surface-raised shadow-lg border border-border-subtle py-1 z-50"
                >
                  <a
                    v-for="child in item.children"
                    :key="child.label"
                    :href="child.href"
                    class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                    @click="closeDropdowns"
                    >{{ child.label }}</a
                  >
                </div>
              </Transition>
            </div>
          </template>
        </div>

        <!-- Trailing slot -->
        <slot name="trailing" />

        <!-- Mobile hamburger button -->
        <button
          type="button"
          class="md:hidden inline-flex h-11 w-11 items-center justify-center rounded text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          :aria-expanded="mobileOpen"
          :aria-controls="`${navId}-mobile`"
          aria-label="Toggle navigation menu"
          @click="toggleMobile"
        >
          <svg
            v-if="!mobileOpen"
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
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
      </div>
    </div>

    <!-- Mobile menu panel -->
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
          v-if="mobileOpen"
          class="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm"
          @click.self="mobileOpen = false"
        >
          <Transition
            appear
            enter-active-class="transition-transform duration-normal ease-entrance"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition-transform duration-fast ease-exit"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div
              v-if="mobileOpen"
              :id="`${navId}-mobile`"
              ref="mobileMenuRef"
              class="fixed inset-y-0 right-0 w-full max-w-sm bg-surface-base shadow-xl p-6 overflow-y-auto"
              tabindex="-1"
              @keydown="onMobileKeydown"
            >
              <button
                type="button"
                class="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded text-text-muted hover:text-text-primary hover:bg-surface-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                aria-label="Close menu"
                @click="mobileOpen = false"
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path :d="ICON_DISMISS" />
                </svg>
              </button>

              <slot name="mobile" :items="items" :close="() => (mobileOpen = false)">
                <div class="mt-8 space-y-1">
                  <template v-for="item in items" :key="item.label">
                    <a
                      v-if="!item.children"
                      :href="item.href"
                      class="block px-3 py-3 rounded text-base font-medium text-text-primary hover:bg-surface-raised transition-colors duration-fast ease-standard"
                      @click="mobileOpen = false"
                      >{{ item.label }}</a
                    >

                    <div v-else>
                      <button
                        type="button"
                        class="flex w-full items-center justify-between px-3 py-3 rounded text-base font-medium text-text-primary hover:bg-surface-raised transition-colors duration-fast ease-standard"
                        :aria-expanded="activeDropdown === item.label"
                        @click="toggleDropdown(item.label)"
                      >
                        {{ item.label }}
                        <svg
                          class="h-5 w-5 text-text-muted transition-transform duration-fast"
                          :class="activeDropdown === item.label && 'rotate-180'"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          aria-hidden="true"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <div
                        class="grid transition-[grid-template-rows,opacity] duration-normal ease-standard"
                        :style="{ gridTemplateRows: activeDropdown === item.label ? '1fr' : '0fr' }"
                        :class="activeDropdown === item.label ? 'opacity-100' : 'opacity-0'"
                      >
                        <div class="overflow-hidden">
                          <div class="pl-6 space-y-1 pb-2">
                            <a
                              v-for="child in item.children"
                              :key="child.label"
                              :href="child.href"
                              class="block px-3 py-2 rounded text-sm text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors duration-fast ease-standard"
                              @click="mobileOpen = false"
                              >{{ child.label }}</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </slot>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>
