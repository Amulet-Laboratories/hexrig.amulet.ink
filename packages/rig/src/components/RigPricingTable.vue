<script setup lang="ts">
import type { RigPricingTableProps } from '../types'
import RigText from './RigText.vue'
import RigBadge from './RigBadge.vue'
import RigCard from './RigCard.vue'

const props = withDefaults(defineProps<RigPricingTableProps>(), {
  currency: '$',
  variant: 'list',
  showDividers: true,
  compact: false,
})

function formatPrice(price: string | number): string {
  if (typeof price === 'number') return `${props.currency}${price.toFixed(2)}`
  return price
}
</script>

<template>
  <div class="font-body" :class="compact ? 'space-y-4' : 'space-y-8'">
    <div v-for="(section, sIndex) in sections" :key="section.title">
      <slot name="section-header" :section="section" :index="sIndex">
        <div :class="compact ? 'mb-2' : 'mb-4'">
          <RigText as="h3" variant="heading">{{ section.title }}</RigText>
          <RigText v-if="section.description" as="p" variant="caption" color="muted">{{
            section.description
          }}</RigText>
        </div>
      </slot>

      <!-- List variant -->
      <div v-if="variant === 'list'" :class="showDividers && 'divide-y divide-border-subtle'">
        <div v-for="item in section.items" :key="item.name" :class="compact ? 'py-2' : 'py-3'">
          <div class="flex items-baseline gap-2">
            <slot name="item" :item="item">
              <span class="text-text-primary font-medium shrink-0">{{ item.name }}</span>
              <RigBadge v-if="item.badge" tone="accent" variant="soft" size="sm">{{
                item.badge
              }}</RigBadge>
              <span
                class="flex-1 border-b border-dotted border-border mx-1 self-end mb-1"
                aria-hidden="true"
              />
              <slot name="price" :item="item">
                <span class="text-text-primary font-semibold shrink-0 tabular-nums">{{
                  formatPrice(item.price)
                }}</span>
              </slot>
            </slot>
          </div>
          <RigText v-if="item.description" as="p" variant="caption" color="muted" class="mt-0.5">{{
            item.description
          }}</RigText>
        </div>
      </div>

      <!-- Card variant -->
      <div
        v-else-if="variant === 'card'"
        class="grid gap-4"
        :class="
          compact ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        "
      >
        <RigCard v-for="item in section.items" :key="item.name">
          <div class="flex items-start justify-between">
            <div>
              <RigText as="span" variant="body" weight="medium">{{ item.name }}</RigText>
              <RigText v-if="item.description" as="p" variant="caption" color="muted">{{
                item.description
              }}</RigText>
            </div>
            <div class="flex items-center gap-2">
              <RigBadge v-if="item.badge" tone="accent" variant="soft" size="sm">{{
                item.badge
              }}</RigBadge>
              <RigText as="span" variant="subheading" weight="bold" class="tabular-nums">{{
                formatPrice(item.price)
              }}</RigText>
            </div>
          </div>
        </RigCard>
      </div>

      <!-- Grid variant -->
      <div v-else-if="variant === 'grid'">
        <table class="w-full">
          <tbody>
            <tr
              v-for="item in section.items"
              :key="item.name"
              :class="[showDividers && 'border-b border-border-subtle', compact ? 'text-sm' : '']"
            >
              <td class="py-2 pr-4">
                <span class="font-medium text-text-primary">{{ item.name }}</span>
                <span v-if="item.description" class="block text-xs text-text-muted">{{
                  item.description
                }}</span>
              </td>
              <td
                class="py-2 text-right font-semibold text-text-primary tabular-nums whitespace-nowrap"
              >
                <RigBadge v-if="item.badge" tone="accent" variant="soft" size="sm" class="mr-2">{{
                  item.badge
                }}</RigBadge>
                {{ formatPrice(item.price) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
