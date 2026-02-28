import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigTimeline from '@rig/components/RigTimeline.vue'

const defaultItems = [
  { id: '1', label: 'Created', tone: 'success' as const },
  { id: '2', label: 'In Progress', description: 'Working on it', tone: 'warning' as const },
  { id: '3', label: 'Completed', timestamp: '2 hours ago', tone: 'accent' as const },
]

describe('RigTimeline', () => {
  it('renders all timeline items', () => {
    const wrapper = mount(RigTimeline, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Created')
    expect(wrapper.text()).toContain('In Progress')
    expect(wrapper.text()).toContain('Completed')
  })

  it('renders item descriptions', () => {
    const wrapper = mount(RigTimeline, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Working on it')
  })

  it('renders timestamps', () => {
    const wrapper = mount(RigTimeline, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('2 hours ago')
  })

  it('applies tone colors to dots', () => {
    const wrapper = mount(RigTimeline, {
      props: { items: [{ id: '1', label: 'Success', tone: 'success' }] },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('.bg-status-success').exists()).toBe(true)
  })

  it('renders vertical layout by default', () => {
    const wrapper = mount(RigTimeline, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('.flex-col').exists()).toBe(true)
  })

  it('renders horizontal layout when specified', () => {
    const wrapper = mount(RigTimeline, {
      props: { items: defaultItems, orientation: 'horizontal' },
      global: { stubs: { RigIcon: true } },
    })
    // The root container has flex gap-6 (horizontal) without flex-col
    expect(wrapper.find('.gap-6').exists()).toBe(true)
  })

  it('renders connector line between items', () => {
    const wrapper = mount(RigTimeline, {
      props: { items: defaultItems },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('.bg-border-subtle').exists()).toBe(true)
  })
})
