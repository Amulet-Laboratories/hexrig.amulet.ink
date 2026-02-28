import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigHeader from '@rig/components/RigHeader.vue'

describe('RigHeader', () => {
  it('renders title text', () => {
    const wrapper = mount(RigHeader, { props: { title: 'Dashboard' } })
    expect(wrapper.text()).toContain('Dashboard')
  })

  it('renders as a header element', () => {
    const wrapper = mount(RigHeader)
    expect(wrapper.element.tagName).toBe('HEADER')
  })

  it('has border by default', () => {
    const wrapper = mount(RigHeader)
    expect(wrapper.classes()).toContain('border-b')
  })

  it('removes border when bordered is false', () => {
    const wrapper = mount(RigHeader, { props: { bordered: false } })
    expect(wrapper.classes()).not.toContain('border-b')
  })

  it('renders leading slot', () => {
    const wrapper = mount(RigHeader, {
      slots: { leading: '<span class="test-leading">Logo</span>' },
    })
    expect(wrapper.find('.test-leading').exists()).toBe(true)
  })

  it('renders title slot overriding title prop', () => {
    const wrapper = mount(RigHeader, {
      props: { title: 'Prop Title' },
      slots: { title: '<span class="custom-title">Slot Title</span>' },
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.text()).toContain('Slot Title')
  })

  it('renders center slot', () => {
    const wrapper = mount(RigHeader, {
      slots: { center: '<input class="test-search" />' },
    })
    expect(wrapper.find('.test-search').exists()).toBe(true)
  })

  it('renders trailing slot', () => {
    const wrapper = mount(RigHeader, {
      slots: { trailing: '<button class="test-action">Action</button>' },
    })
    expect(wrapper.find('.test-action').exists()).toBe(true)
  })

  it('is sticky positioned', () => {
    const wrapper = mount(RigHeader)
    expect(wrapper.classes()).toContain('sticky')
    expect(wrapper.classes()).toContain('top-0')
  })
})
