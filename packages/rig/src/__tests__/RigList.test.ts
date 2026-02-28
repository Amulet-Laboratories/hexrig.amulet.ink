import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigList from '@rig/components/RigList.vue'

const defaultItems = [
  { id: '1', label: 'Item 1' },
  { id: '2', label: 'Item 2', description: 'Description 2' },
  { id: '3', label: 'Item 3', meta: 'Meta 3' },
]

describe('RigList', () => {
  it('renders all items', () => {
    const wrapper = mount(RigList, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    const items = wrapper.findAll('li')
    expect(items).toHaveLength(3)
  })

  it('renders item labels', () => {
    const wrapper = mount(RigList, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Item 1')
    expect(wrapper.text()).toContain('Item 2')
  })

  it('renders item description when provided', () => {
    const wrapper = mount(RigList, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Description 2')
  })

  it('renders item meta when provided', () => {
    const wrapper = mount(RigList, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Meta 3')
  })

  it('emits item-click when item is clicked', async () => {
    const wrapper = mount(RigList, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    await wrapper.findAll('li')[0].trigger('click')
    expect(wrapper.emitted('item-click')?.[0]).toEqual([defaultItems[0]])
  })

  it('applies hover styles when hoverable', () => {
    const wrapper = mount(RigList, {
      props: { items: defaultItems, hoverable: true },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('li').classes()).toContain('hover:bg-surface-raised')
  })

  it('shows dividers by default', () => {
    const wrapper = mount(RigList, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('li').classes()).toContain('border-b')
  })

  it('hides dividers when divided is false', () => {
    const wrapper = mount(RigList, {
      props: { items: defaultItems, divided: false },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('li').classes()).not.toContain('border-b')
  })
})
