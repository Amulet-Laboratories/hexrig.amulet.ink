<script setup lang="ts">
import { computed } from 'vue'
import type { RigHoursDisplayProps } from '../types'
import RigBadge from './RigBadge.vue'

const props = withDefaults(defineProps<RigHoursDisplayProps>(), {
  highlightToday: true,
  showStatus: true,
  compact: false,
})

const DAY_MAP: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
}

const todayIndex = computed(() => new Date().getDay())

function isToday(day: string): boolean {
  return DAY_MAP[day.toLowerCase()] === todayIndex.value
}

function parseTimeToMinutes(time: string): number {
  const normalized = time.trim().toUpperCase()
  const match = normalized.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/)
  if (!match) return -1
  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const period = match[3]
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return hours * 60 + minutes
}

const currentDayHours = computed(() =>
  props.hours.find((entry) => isToday(entry.day)),
)

const isCurrentlyOpen = computed(() => {
  const entry = currentDayHours.value
  if (!entry || entry.closed || !entry.open || !entry.close) return false
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const openMinutes = parseTimeToMinutes(entry.open)
  const closeMinutes = parseTimeToMinutes(entry.close)
  if (openMinutes === -1 || closeMinutes === -1) return false
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes
})

const statusTone = computed(() => (isCurrentlyOpen.value ? 'success' : 'neutral'))
const statusText = computed(() => (isCurrentlyOpen.value ? 'Open Now' : 'Closed'))
</script>

<template>
  <div class="font-body">
    <div v-if="showStatus" class="mb-3 flex items-center gap-2">
      <RigBadge :tone="statusTone" dot variant="soft">{{ statusText }}</RigBadge>
      <span v-if="timezone" class="text-xs text-text-muted">{{ timezone }}</span>
    </div>

    <dl :class="compact ? 'space-y-1' : 'space-y-2'">
      <div
        v-for="entry in hours"
        :key="entry.day"
        class="flex items-center justify-between"
        :class="[
          highlightToday && isToday(entry.day) && 'bg-accent-muted rounded px-2 py-1 -mx-2 border-l-2 border-accent',
          compact ? 'py-0.5' : 'py-1',
        ]"
      >
        <dt
          class="text-sm font-medium"
          :class="highlightToday && isToday(entry.day) ? 'text-accent' : 'text-text-primary'"
        >
          {{ entry.day }}
        </dt>
        <dd
          class="text-sm"
          :class="entry.closed ? 'text-text-muted italic' : 'text-text-secondary'"
        >
          <template v-if="entry.closed">Closed</template>
          <template v-else>{{ entry.open }} - {{ entry.close }}</template>
        </dd>
      </div>
    </dl>
  </div>
</template>
