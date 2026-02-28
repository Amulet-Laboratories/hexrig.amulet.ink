import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigTree from '@rig/components/RigTree.vue'

const defaultNodes = [
  {
    id: 'root',
    label: 'Root',
    children: [
      { id: 'child-1', label: 'Child 1' },
      {
        id: 'child-2',
        label: 'Child 2',
        children: [{ id: 'grandchild', label: 'Grandchild' }],
      },
    ],
  },
  { id: 'sibling', label: 'Sibling' },
]

describe('RigTree', () => {
  it('renders tree with role="tree"', () => {
    const wrapper = mount(RigTree, {
      props: { nodes: defaultNodes },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('[role="tree"]').exists()).toBe(true)
  })

  it('renders root-level nodes', () => {
    const wrapper = mount(RigTree, {
      props: { nodes: defaultNodes },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Root')
    expect(wrapper.text()).toContain('Sibling')
  })

  it('does not render collapsed children by default', () => {
    const wrapper = mount(RigTree, {
      props: { nodes: defaultNodes },
      global: { stubs: { RigIcon: true } },
    })
    // Children are not visible because Root is not expanded
    expect(wrapper.text()).not.toContain('Child 1')
  })

  it('renders children when expanded', () => {
    const wrapper = mount(RigTree, {
      props: { nodes: defaultNodes, expanded: ['root'] },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Child 1')
    expect(wrapper.text()).toContain('Child 2')
  })

  it('renders grandchildren when parent and grandparent expanded', () => {
    const wrapper = mount(RigTree, {
      props: { nodes: defaultNodes, expanded: ['root', 'child-2'] },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Grandchild')
  })

  it('applies aria-expanded on nodes with children', () => {
    const wrapper = mount(RigTree, {
      props: { nodes: defaultNodes },
      global: { stubs: { RigIcon: true } },
    })
    const rootItem = wrapper.find('[data-tree-node="root"]')
    expect(rootItem.attributes('aria-expanded')).toBe('false')
  })

  it('sets aria-level on tree items', () => {
    const wrapper = mount(RigTree, {
      props: { nodes: defaultNodes, expanded: ['root'] },
      global: { stubs: { RigIcon: true } },
    })
    const rootItem = wrapper.find('[data-tree-node="root"]')
    expect(rootItem.attributes('aria-level')).toBe('1')
    const childItem = wrapper.find('[data-tree-node="child-1"]')
    expect(childItem.attributes('aria-level')).toBe('2')
  })

  it('toggles expansion on click', async () => {
    const wrapper = mount(RigTree, {
      props: { nodes: defaultNodes },
      global: { stubs: { RigIcon: true } },
    })
    // Click Root to expand
    await wrapper.find('[data-tree-node="root"]').trigger('click')
    expect(wrapper.text()).toContain('Child 1')
    expect(wrapper.emitted('update:expanded')).toBeTruthy()
  })

  it('emits update:selected when selectable and node clicked', async () => {
    const wrapper = mount(RigTree, {
      props: { nodes: [{ id: 'a', label: 'A' }], selectable: true },
      global: { stubs: { RigIcon: true } },
    })
    await wrapper.find('[data-tree-node="a"]').trigger('click')
    expect(wrapper.emitted('update:selected')?.[0]).toEqual(['a'])
  })

  it('emits node-click on click', async () => {
    const wrapper = mount(RigTree, {
      props: { nodes: [{ id: 'a', label: 'A' }] },
      global: { stubs: { RigIcon: true } },
    })
    await wrapper.find('[data-tree-node="a"]').trigger('click')
    expect(wrapper.emitted('node-click')?.[0]?.[0]).toMatchObject({ id: 'a', label: 'A' })
  })

  it('applies selected style', () => {
    const wrapper = mount(RigTree, {
      props: { nodes: [{ id: 'a', label: 'A' }], selectable: true, selected: 'a' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('[data-tree-node="a"]').classes()).toContain('bg-accent-muted')
  })

  it('handles keyboard ArrowDown navigation', async () => {
    const wrapper = mount(RigTree, {
      props: { nodes: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] },
      global: { stubs: { RigIcon: true } },
    })
    await wrapper.find('[role="tree"]').trigger('keydown', { key: 'ArrowDown' })
    // After ArrowDown, focusedIndex moves to 1
    const items = wrapper.findAll('[role="treeitem"]')
    expect(items[1].attributes('tabindex')).toBe('0')
  })

  it('applies indentation based on depth', () => {
    const wrapper = mount(RigTree, {
      props: { nodes: defaultNodes, expanded: ['root'] },
      global: { stubs: { RigIcon: true } },
    })
    const childItem = wrapper.find('[data-tree-node="child-1"]')
    expect(childItem.attributes('style')).toContain('padding-left: 16px')
  })
})
