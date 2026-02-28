<script setup lang="ts">
import { computed } from 'vue'
import type { RigHeroProps } from '../types'
import RigText from './RigText.vue'
import RigButton from './RigButton.vue'

const props = withDefaults(defineProps<RigHeroProps>(), {
  align: 'center',
  size: 'md',
  overlay: false,
  overlayOpacity: 0.5,
})

const sizePaddingClasses: Record<NonNullable<RigHeroProps['size']>, string> = {
  sm: 'py-20',
  md: 'py-[120px]',
  lg: 'py-[200px]',
  xl: 'py-[300px]',
}

const alignClasses: Record<NonNullable<RigHeroProps['align']>, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
}

const ctaAlignClasses: Record<NonNullable<RigHeroProps['align']>, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const containerClasses = computed(
  () => `relative overflow-hidden ${sizePaddingClasses[props.size]} px-6`,
)

const contentClasses = computed(
  () => `relative z-10 flex flex-col gap-4 max-w-3xl mx-auto ${alignClasses[props.align]}`,
)
</script>

<template>
  <section :class="containerClasses">
    <div v-if="$slots.background" class="absolute inset-0">
      <slot name="background" />
    </div>

    <div
      v-if="overlay"
      class="absolute inset-0 bg-black"
      :style="{ opacity: overlayOpacity }"
      aria-hidden="true"
    />

    <div :class="contentClasses">
      <div v-if="$slots.badge">
        <slot name="badge" />
      </div>

      <slot>
        <RigText v-if="headline" as="h1" variant="display" :align="align">{{ headline }}</RigText>
        <RigText v-if="subheadline" as="p" variant="subheading" color="secondary" :align="align">{{ subheadline }}</RigText>
      </slot>

      <slot name="cta">
        <div :class="['flex flex-wrap gap-3', ctaAlignClasses[align]]">
          <RigButton v-if="ctaLabel" :as="ctaHref ? 'a' : 'button'" :href="ctaHref" size="lg">{{ ctaLabel }}</RigButton>
          <RigButton v-if="secondaryCtaLabel" :as="secondaryCtaHref ? 'a' : 'button'" :href="secondaryCtaHref" variant="outline" tone="neutral" size="lg">{{ secondaryCtaLabel }}</RigButton>
        </div>
      </slot>
    </div>
  </section>
</template>
