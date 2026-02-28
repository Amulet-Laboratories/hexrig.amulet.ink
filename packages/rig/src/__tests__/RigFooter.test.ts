import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigFooter from '@rig/components/RigFooter.vue'

describe('RigFooter', () => {
  it('renders a footer element', () => {
    const wrapper = mount(RigFooter)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(RigFooter, {
      slots: { default: 'Footer content' },
    })
    expect(wrapper.text()).toContain('Footer content')
  })

  it('shows border by default', () => {
    const wrapper = mount(RigFooter)
    expect(wrapper.find('footer').classes()).toContain('border-t')
  })

  it('hides border when bordered is false', () => {
    const wrapper = mount(RigFooter, {
      props: { bordered: false },
    })
    expect(wrapper.find('footer').classes()).not.toContain('border-t')
  })
})
