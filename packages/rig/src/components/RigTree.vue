<script setup lang="ts">
import { ref, computed } from 'vue'
import type { RigTreeProps, TreeNode } from '../types'
import RigIcon from './RigIcon.vue'

const props = withDefaults(defineProps<RigTreeProps>(), {
  selectable: false,
})

const emit = defineEmits<{
  'update:selected': [value: string]
  'update:expanded': [value: string[]]
  'node-click': [node: TreeNode]
}>()

const internalExpanded = ref<Set<string>>(new Set(props.expanded ?? []))

const isExpanded = (id: string): boolean => internalExpanded.value.has(id)

const toggleExpand = (node: TreeNode) => {
  const next = new Set(internalExpanded.value)
  if (next.has(node.id)) {
    next.delete(node.id)
  } else {
    next.add(node.id)
  }
  internalExpanded.value = next
  emit('update:expanded', [...next])
}

const selectNode = (node: TreeNode) => {
  if (node.disabled) return
  emit('node-click', node)
  if (props.selectable) {
    emit('update:selected', node.id)
  }
}

// Flatten visible nodes for keyboard navigation
interface FlatNode {
  node: TreeNode
  depth: number
  hasChildren: boolean
}

const flatNodes = computed<FlatNode[]>(() => {
  const result: FlatNode[] = []
  const walk = (nodes: TreeNode[], depth: number) => {
    for (const node of nodes) {
      const hasChildren = !!(node.children && node.children.length > 0)
      result.push({ node, depth, hasChildren })
      if (hasChildren && isExpanded(node.id)) {
        walk(node.children!, depth + 1)
      }
    }
  }
  walk(props.nodes, 0)
  return result
})

const focusedIndex = ref(0)

const focusNode = (index: number) => {
  focusedIndex.value = index
  const treeEl = document.querySelector(`[data-tree-node="${flatNodes.value[index]?.node.id}"]`) as HTMLElement | null
  treeEl?.focus()
}

const onKeydown = (event: KeyboardEvent) => {
  const flat = flatNodes.value
  if (flat.length === 0) return

  let idx = focusedIndex.value
  const current = flat[idx]
  if (!current) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (idx < flat.length - 1) focusNode(idx + 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      if (idx > 0) focusNode(idx - 1)
      break
    case 'ArrowRight':
      event.preventDefault()
      if (current.hasChildren && !isExpanded(current.node.id)) {
        toggleExpand(current.node)
      } else if (current.hasChildren && isExpanded(current.node.id) && idx < flat.length - 1) {
        focusNode(idx + 1)
      }
      break
    case 'ArrowLeft':
      event.preventDefault()
      if (current.hasChildren && isExpanded(current.node.id)) {
        toggleExpand(current.node)
      } else if (current.depth > 0) {
        // Find parent
        for (let i = idx - 1; i >= 0; i--) {
          if (flat[i].depth < current.depth) {
            focusNode(i)
            break
          }
        }
      }
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectNode(current.node)
      if (current.hasChildren) toggleExpand(current.node)
      break
    case 'Home':
      event.preventDefault()
      focusNode(0)
      break
    case 'End':
      event.preventDefault()
      focusNode(flat.length - 1)
      break
  }
}
</script>

<template>
  <ul
    role="tree"
    class="font-body"
    @keydown="onKeydown"
  >
    <template v-for="(flat, index) in flatNodes" :key="flat.node.id">
      <li
        role="treeitem"
        :aria-level="flat.depth + 1"
        :aria-expanded="flat.hasChildren ? isExpanded(flat.node.id) : undefined"
        :aria-selected="selectable && selected === flat.node.id ? true : undefined"
        :aria-disabled="flat.node.disabled || undefined"
        :data-tree-node="flat.node.id"
        :tabindex="index === focusedIndex ? 0 : -1"
        :style="{ paddingLeft: `${flat.depth * 16}px` }"
        :class="[
          'flex items-center gap-1.5 px-2 py-1.5 text-sm rounded cursor-pointer select-none',
          'transition-colors duration-fast ease-standard',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
          flat.node.disabled && 'opacity-50 cursor-not-allowed',
          selectable && selected === flat.node.id && 'bg-accent-muted text-accent',
          !flat.node.disabled && !(selectable && selected === flat.node.id) && 'text-text-primary hover:bg-surface-raised',
        ]"
        @click="() => { selectNode(flat.node); if (flat.hasChildren) toggleExpand(flat.node) }"
      >
        <!-- Expand/collapse chevron -->
        <svg
          v-if="flat.hasChildren"
          class="h-4 w-4 shrink-0 text-text-muted transition-transform duration-fast ease-standard"
          :class="isExpanded(flat.node.id) && 'rotate-90'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
        <span v-else class="h-4 w-4 shrink-0"></span>

        <!-- Icon -->
        <RigIcon
          v-if="flat.node.icon"
          :name="flat.node.icon"
          size="sm"
          color="muted"
          class="shrink-0"
        />

        <!-- Label -->
        <span class="truncate">{{ flat.node.label }}</span>
      </li>
    </template>
  </ul>
</template>
