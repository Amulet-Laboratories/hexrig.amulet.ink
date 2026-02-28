import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigStat from '@rig/components/RigStat.vue'

describe('RigStat', () => {
  it('renders label and value', () => {
    const wrapper = mount(RigStat, {
      props: { label: 'Revenue', value: '$12,345' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Revenue')
    expect(wrapper.text()).toContain('$12,345')
  })

  it('renders numeric value', () => {
    const wrapper = mount(RigStat, {
      props: { label: 'Users', value: 42 },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('42')
  })

  it('renders description when provided', () => {
    const wrapper = mount(RigStat, {
      props: { label: 'Revenue', value: '$12,345', description: 'This month' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('This month')
  })

  it('renders trend up indicator', () => {
    const wrapper = mount(RigStat, {
      props: { label: 'Revenue', value: '$12,345', trend: 'up', trendLabel: '+12%' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('.text-status-success').exists()).toBe(true)
    expect(wrapper.text()).toContain('+12%')
  })

  it('renders trend down indicator', () => {
    const wrapper = mount(RigStat, {
      props: { label: 'Revenue', value: '$12,345', trend: 'down', trendLabel: '-5%' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('.text-status-error').exists()).toBe(true)
    expect(wrapper.text()).toContain('-5%')
  })

  it('applies size classes', () => {
    const wrapper = mount(RigStat, {
      props: { label: 'Revenue', value: '$12,345', size: 'lg' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('.text-4xl').exists()).toBe(true)
  })

  it('renders icon when provided', () => {
    const wrapper = mount(RigStat, {
      props: { label: 'Revenue', value: '$12,345', icon: 'mdi:currency-usd' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.findComponent({ name: 'RigIcon' }).exists()).toBe(true)
  })
})
