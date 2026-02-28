import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigPage from '@rig/components/RigPage.vue'

describe('RigPage', () => {
  it('renders default slot content', () => {
    const wrapper = mount(RigPage, { slots: { default: 'Page content' } })
    expect(wrapper.text()).toContain('Page content')
  })

  it('renders title when provided', () => {
    const wrapper = mount(RigPage, { props: { title: 'Settings' } })
    expect(wrapper.text()).toContain('Settings')
  })

  it('renders description when provided', () => {
    const wrapper = mount(RigPage, {
      props: { title: 'Settings', description: 'Manage preferences' },
    })
    expect(wrapper.text()).toContain('Manage preferences')
  })

  it('renders actions slot', () => {
    const wrapper = mount(RigPage, {
      props: { title: 'Settings' },
      slots: { actions: '<button class="test-action">Save</button>' },
    })
    expect(wrapper.find('.test-action').exists()).toBe(true)
  })

  it('applies max-w-full by default', () => {
    const wrapper = mount(RigPage, { slots: { default: 'Content' } })
    expect(wrapper.find('.max-w-full').exists()).toBe(true)
  })

  it('applies max-w-4xl for md maxWidth', () => {
    const wrapper = mount(RigPage, {
      props: { maxWidth: 'md' },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.max-w-4xl').exists()).toBe(true)
  })

  it('applies padding by default', () => {
    const wrapper = mount(RigPage, { slots: { default: 'Content' } })
    expect(wrapper.find('.px-6').exists()).toBe(true)
  })

  it('removes padding when padding is false', () => {
    const wrapper = mount(RigPage, {
      props: { padding: false },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.px-6').exists()).toBe(false)
  })

  it('is scrollable', () => {
    const wrapper = mount(RigPage, { slots: { default: 'Content' } })
    expect(wrapper.find('.overflow-y-auto').exists()).toBe(true)
  })
})
