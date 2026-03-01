<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import type { RigCardProps } from '../types'

const props = withDefaults(defineProps<RigCardProps>(), {
  elevation: 'raised',
  interactive: false,
  as: 'div',
  accentPosition: 'left',
  selected: false,
})

if (import.meta.env.DEV) {
  watchEffect(() => {
    if (props.interactive && !props.ariaLabel && props.as !== 'a' && props.as !== 'router-link') {
      console.warn(
        '[RigCard] interactive=true without an ariaLabel. ' +
          'Screen readers cannot announce the purpose of this card (WCAG 1.3.1). ' +
          'Provide an ariaLabel prop, or use as="a" with an href.',
      )
    }
  })
}

const emit = defineEmits<{
  activate: [event: KeyboardEvent | MouseEvent]
}>()

const elevationClasses: Record<NonNullable<RigCardProps['elevation']>, string> = {
  flat: 'bg-surface-base border border-border',
  raised: 'bg-surface-raised shadow-md',
  prominent: 'bg-surface-raised shadow-lg',
}

const classes = computed(() => {
  const parts = [
    props.accentColor ? 'overflow-hidden font-body' : 'rounded overflow-hidden font-body',
    elevationClasses[props.elevation],
  ]

  if (props.interactive) {
    parts.push(
      'cursor-pointer transition-[box-shadow,transform,border-color] duration-normal ease-standard',
      props.accentColor ? '' : 'hover:shadow-lg hover:-translate-y-0.5 active:shadow-sm active:translate-y-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
    )
  }

  return parts.filter(Boolean).join(' ')
})

const accentStyle = computed(() => {
  if (!props.accentColor) return {}
  return { '--rig-card-accent': props.accentColor }
})

const onActivate = (event: MouseEvent) => {
  if (!props.interactive) return
  emit('activate', event)
}

const onKeydown = (event: KeyboardEvent) => {
  if (!props.interactive) return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    emit('activate', event)
  }
}
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :style="accentStyle"
    :data-has-accent="accentColor ? '' : undefined"
    :data-accent-position="accentColor ? accentPosition : undefined"
    :data-selected="accentColor && selected ? '' : undefined"
    :href="href"
    :to="to"
    :tabindex="interactive ? 0 : undefined"
    :role="interactive && as !== 'a' && as !== 'router-link' ? 'button' : undefined"
    :aria-label="interactive ? ariaLabel : undefined"
    @click="onActivate"
    @keydown="onKeydown"
  >
    <div v-if="$slots.header" class="px-4 pt-4 pb-2 border-b border-border-subtle">
      <slot name="header" />
    </div>

    <div class="p-4">
      <slot />
    </div>

    <div v-if="$slots.footer" class="px-4 pt-2 pb-4 border-t border-border-subtle">
      <slot name="footer" />
    </div>
  </component>
</template>

<style scoped>
[data-has-accent][data-accent-position="left"] {
  border-left: 3px solid var(--rig-card-accent, transparent);
  border-radius: 0 0.25rem 0.25rem 0;
}

[data-has-accent][data-accent-position="top"] {
  border-top: 3px solid var(--rig-card-accent, transparent);
  border-radius: 0 0 0.25rem 0.25rem;
}

[data-has-accent][data-accent-position="right"] {
  border-right: 3px solid var(--rig-card-accent, transparent);
  border-radius: 0.25rem 0 0 0.25rem;
}

[data-has-accent]:hover {
  border-color: var(--rig-card-accent, transparent);
  box-shadow: 0 0 0 1px var(--rig-card-accent, transparent), 0 4px 20px rgba(0, 0, 0, 0.4);
  transform: none;
}

[data-has-accent][data-selected] {
  border-color: var(--rig-card-accent, transparent);
  box-shadow: 0 0 0 1px var(--rig-card-accent, transparent), 0 0 20px rgba(0, 0, 0, 0.6);
}
</style>
