<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RigTableProps, RigTableColumn } from '../types'
import RigSkeleton from './RigSkeleton.vue'
import RigCheckbox from './RigCheckbox.vue'

const props = withDefaults(defineProps<RigTableProps>(), {
  rowKey: 'id',
  sortDir: 'asc',
  expandable: false,
  selectable: false,
  striped: false,
  hoverable: true,
  compact: false,
  dense: false,
  loading: false,
})

const emit = defineEmits<{
  'update:sortBy': [value: string]
  'update:sortDir': [value: 'asc' | 'desc']
  'update:selected': [value: string[]]
  'row-click': [row: Record<string, unknown>]
  'row-expand': [payload: { row: Record<string, unknown>; expanded: boolean }]
}>()

const expandedRows = ref<Set<string>>(new Set())

const getRowId = (row: Record<string, unknown>): string => {
  return String(row[props.rowKey] ?? '')
}

const handleSort = (column: RigTableColumn) => {
  if (!column.sortable) return
  if (props.sortBy === column.key) {
    emit('update:sortDir', props.sortDir === 'asc' ? 'desc' : 'asc')
  } else {
    emit('update:sortBy', column.key)
    emit('update:sortDir', 'asc')
  }
}

const toggleExpand = (row: Record<string, unknown>) => {
  if (!props.expandable) return
  const id = getRowId(row)
  const isExpanded = expandedRows.value.has(id)
  if (isExpanded) {
    expandedRows.value.delete(id)
  } else {
    expandedRows.value.add(id)
  }
  expandedRows.value = new Set(expandedRows.value)
  emit('row-expand', { row, expanded: !isExpanded })
}

const isExpanded = (row: Record<string, unknown>): boolean => {
  return expandedRows.value.has(getRowId(row))
}

const toggleSelectRow = (row: Record<string, unknown>) => {
  const id = getRowId(row)
  const current = props.selected ?? []
  const next = current.includes(id) ? current.filter((s) => s !== id) : [...current, id]
  emit('update:selected', next)
}

const isSelected = (row: Record<string, unknown>): boolean => {
  return (props.selected ?? []).includes(getRowId(row))
}

const allSelected = computed(() => {
  if (props.rows.length === 0) return false
  return props.rows.every((row) => (props.selected ?? []).includes(getRowId(row)))
})

const toggleSelectAll = () => {
  if (allSelected.value) {
    emit('update:selected', [])
  } else {
    emit('update:selected', props.rows.map(getRowId))
  }
}

const handleRowClick = (row: Record<string, unknown>) => {
  emit('row-click', row)
}

const alignClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const cellPadding = computed(() => {
  if (props.dense) return 'px-2 py-1'
  if (props.compact) return 'px-3 py-1.5'
  return 'px-4 py-3'
})
const headerPadding = computed(() => {
  if (props.dense) return 'px-2 py-1'
  if (props.compact) return 'px-3 py-1.5'
  return 'px-4 py-2.5'
})
const cellTextClass = computed(() => (props.dense ? 'text-xs' : 'text-sm'))
const headerTextClass = computed(() => (props.dense ? 'text-[10px]' : 'text-xs'))
const expandedPadding = computed(() => (props.dense ? 'px-3 py-2' : 'px-4 py-3'))

const totalCols = computed(() => {
  let cols = props.columns.length
  if (props.selectable) cols++
  if (props.expandable) cols++
  return cols
})

const sortIcon = (column: RigTableColumn): string => {
  if (props.sortBy !== column.key) return 'M7 10l5 5 5-5'
  return props.sortDir === 'asc' ? 'M7 14l5-5 5 5' : 'M7 10l5 5 5-5'
}

const ariaSortValue = (column: RigTableColumn): 'ascending' | 'descending' | 'none' | undefined => {
  if (!column.sortable) return undefined
  if (props.sortBy !== column.key) return 'none'
  return props.sortDir === 'asc' ? 'ascending' : 'descending'
}
</script>

<template>
  <div class="overflow-x-auto font-body">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b border-border">
          <!-- Select all -->
          <th
            v-if="selectable"
            :class="[headerPadding, 'w-10']"
          >
            <RigCheckbox
              :model-value="allSelected"
              label="Select all"
              class="[&_label]:sr-only"
              @update:model-value="toggleSelectAll"
            />
          </th>

          <!-- Expand spacer -->
          <th v-if="expandable" :class="[headerPadding, 'w-10']"></th>

          <!-- Column headers -->
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              headerPadding,
              alignClasses[column.align ?? 'left'],
              headerTextClass,
              'font-semibold uppercase tracking-wider text-text-muted whitespace-nowrap',
              column.sortable && 'cursor-pointer select-none hover:text-text-primary transition-colors duration-fast ease-standard',
            ]"
            :style="column.width ? { width: column.width } : undefined"
            :aria-sort="ariaSortValue(column)"
            @click="handleSort(column)"
          >
            <span class="inline-flex items-center gap-1">
              <slot :name="`header-${column.key}`">
                {{ column.label }}
              </slot>
              <svg
                v-if="column.sortable"
                class="h-3.5 w-3.5 shrink-0"
                :class="sortBy === column.key ? 'text-text-primary' : 'text-text-muted'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="sortIcon(column)" />
              </svg>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- Loading state -->
        <template v-if="loading">
          <tr v-for="i in 5" :key="`skeleton-${i}`" class="border-b border-border-subtle">
            <td v-if="selectable" :class="cellPadding">
              <RigSkeleton variant="rect" />
            </td>
            <td v-if="expandable" :class="cellPadding"></td>
            <td
              v-for="column in columns"
              :key="column.key"
              :class="cellPadding"
            >
              <RigSkeleton variant="text" />
            </td>
          </tr>
        </template>

        <!-- Empty state -->
        <template v-else-if="rows.length === 0">
          <tr>
            <td :colspan="totalCols" class="py-12">
              <slot name="empty">
                <div class="flex flex-col items-center justify-center text-center px-4">
                  <svg
                    class="h-10 w-10 text-text-muted mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="text-sm font-medium text-text-primary">
                    {{ emptyTitle ?? 'No data' }}
                  </p>
                  <p v-if="emptyDescription" class="mt-1 text-xs text-text-muted">
                    {{ emptyDescription }}
                  </p>
                </div>
              </slot>
            </td>
          </tr>
        </template>

        <!-- Data rows -->
        <template v-else>
          <template v-for="row in rows" :key="getRowId(row)">
            <tr
              :class="[
                'border-b border-border-subtle transition-colors duration-fast ease-standard',
                hoverable && 'hover:bg-surface-raised',
                striped && 'even:bg-surface-sunken',
                selectable && isSelected(row) && 'bg-accent-muted/30',
                'cursor-pointer',
              ]"
              @click="handleRowClick(row)"
            >
              <!-- Selection checkbox -->
              <td
                v-if="selectable"
                :class="cellPadding"
                @click.stop
              >
                <RigCheckbox
                  :model-value="isSelected(row)"
                  :label="`Select row ${getRowId(row)}`"
                  class="[&_label]:sr-only"
                  @update:model-value="toggleSelectRow(row)"
                />
              </td>

              <!-- Expand toggle -->
              <td
                v-if="expandable"
                :class="[cellPadding, 'w-10']"
                @click.stop="toggleExpand(row)"
              >
                <button
                  type="button"
                  class="inline-flex items-center justify-center h-6 w-6 rounded text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  :aria-expanded="isExpanded(row)"
                  aria-label="Expand row"
                >
                  <svg
                    class="h-4 w-4 transition-transform duration-fast ease-standard"
                    :class="isExpanded(row) && 'rotate-90'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </td>

              <!-- Data cells -->
              <td
                v-for="column in columns"
                :key="column.key"
                :class="[cellPadding, alignClasses[column.align ?? 'left'], cellTextClass, 'text-text-primary']"
              >
                <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                  {{ row[column.key] ?? '' }}
                </slot>
              </td>
            </tr>

            <!-- Expanded row -->
            <tr v-if="expandable && isExpanded(row)" role="row">
              <td :colspan="totalCols" :class="['bg-surface-sunken border-b border-border-subtle', expandedPadding]">
                <slot name="expanded" :row="row"></slot>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>
