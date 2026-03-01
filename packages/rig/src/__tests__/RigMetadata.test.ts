import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigMetadata from '@rig/components/RigMetadata.vue'

const defaultItems = [
  { label: 'Name', value: 'Hexrig' },
  { label: 'Version', value: '2.1.0' },
  { label: 'Status', value: 'Active', type: 'badge' as const, tone: 'success' as const },
]

describe('RigMetadata', () => {
  it('renders all metadata items', () => {
    const wrapper = mount(RigMetadata, {
      props: { items: defaultItems },
      global: { stubs: { RigBadge: true, RigStatus: true } },
    })
    const terms = wrapper.findAll('dt')
    expect(terms).toHaveLength(3)
  })

  it('renders labels and values', () => {
    const wrapper = mount(RigMetadata, {
      props: { items: defaultItems },
      global: { stubs: { RigBadge: true, RigStatus: true } },
    })
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Hexrig')
  })

  it('renders badge type items', () => {
    const wrapper = mount(RigMetadata, {
      props: { items: [{ label: 'Status', value: 'Active', type: 'badge', tone: 'success' }] },
      global: { stubs: { RigBadge: true, RigStatus: true } },
    })
    expect(wrapper.findComponent({ name: 'RigBadge' }).exists()).toBe(true)
  })

  it('renders status type items', () => {
    const wrapper = mount(RigMetadata, {
      props: { items: [{ label: 'Health', value: 'Online', type: 'status', tone: 'success' }] },
      global: { stubs: { RigBadge: true, RigStatus: true } },
    })
    expect(wrapper.findComponent({ name: 'RigStatus' }).exists()).toBe(true)
  })

  it('renders link type items', () => {
    const wrapper = mount(RigMetadata, {
      props: {
        items: [{ label: 'URL', value: 'amulet.ink', type: 'link', href: 'https://amulet.ink' }],
      },
      global: { stubs: { RigBadge: true, RigStatus: true } },
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://amulet.ink')
  })

  it('applies grid columns', () => {
    const wrapper = mount(RigMetadata, {
      props: { items: defaultItems, columns: 3 },
      global: { stubs: { RigBadge: true, RigStatus: true } },
    })
    expect(wrapper.find('.grid-cols-3').exists()).toBe(true)
  })

  it('shows separator when enabled', () => {
    const wrapper = mount(RigMetadata, {
      props: { items: defaultItems, separator: true },
      global: { stubs: { RigBadge: true, RigStatus: true } },
    })
    expect(wrapper.find('.border-b').exists()).toBe(true)
  })
})
