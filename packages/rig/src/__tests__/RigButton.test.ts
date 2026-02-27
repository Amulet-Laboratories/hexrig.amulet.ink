import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigButton from '@rig/components/RigButton.vue'

describe('RigButton', () => {
  it('renders a <button> element by default', () => {
    const wrapper = mount(RigButton, { slots: { default: 'Click me' } })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').attributes('type')).toBe('button')
  })

  it('emits click when clicked', async () => {
    const wrapper = mount(RigButton)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(RigButton, { props: { disabled: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(RigButton, { props: { loading: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('renders spinner and sr-only "Loading" text when loading', () => {
    const wrapper = mount(RigButton, { props: { loading: true } })
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
    expect(wrapper.find('.sr-only').text()).toBe('Loading')
  })

  it('has aria-busy="true" when loading', () => {
    const wrapper = mount(RigButton, { props: { loading: true } })
    expect(wrapper.find('button').attributes('aria-busy')).toBe('true')
  })

  it('does not have aria-busy when not loading', () => {
    const wrapper = mount(RigButton)
    expect(wrapper.find('button').attributes('aria-busy')).toBeUndefined()
  })

  it('renders as an anchor when as="a"', () => {
    const wrapper = mount(RigButton, { props: { as: 'a', href: '/home' } })
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('adds opacity-50 and pointer-events-none when disabled', () => {
    const wrapper = mount(RigButton, { props: { disabled: true } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('opacity-50')
    expect(classes).toContain('pointer-events-none')
  })

  it('adds opacity-50 and pointer-events-none when loading', () => {
    const wrapper = mount(RigButton, { props: { loading: true } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('opacity-50')
    expect(classes).toContain('pointer-events-none')
  })

  it('does not show spinner when not loading', () => {
    const wrapper = mount(RigButton)
    expect(wrapper.find('.animate-spin').exists()).toBe(false)
  })

  it('uses solid-accent classes by default', () => {
    const wrapper = mount(RigButton)
    expect(wrapper.find('button').classes()).toContain('bg-accent')
  })

  it('uses outline variant classes', () => {
    const wrapper = mount(RigButton, { props: { variant: 'outline', tone: 'accent' } })
    expect(wrapper.find('button').classes()).toContain('border-accent')
  })

  it('uses ghost variant classes', () => {
    const wrapper = mount(RigButton, { props: { variant: 'ghost', tone: 'neutral' } })
    expect(wrapper.find('button').classes()).toContain('text-text-secondary')
  })

  it('applies sm size classes', () => {
    const wrapper = mount(RigButton, { props: { size: 'sm' } })
    expect(wrapper.find('button').classes()).toContain('px-3')
  })

  it('applies lg size classes', () => {
    const wrapper = mount(RigButton, { props: { size: 'lg' } })
    expect(wrapper.find('button').classes()).toContain('px-6')
  })
})
