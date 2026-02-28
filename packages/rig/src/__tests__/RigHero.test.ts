import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigHero from '@rig/components/RigHero.vue'

describe('RigHero', () => {
  it('renders headline and subheadline text', () => {
    const wrapper = mount(RigHero, {
      props: { headline: 'Welcome', subheadline: 'To our site' },
    })
    expect(wrapper.text()).toContain('Welcome')
    expect(wrapper.text()).toContain('To our site')
  })

  it('renders CTA buttons when labels provided', () => {
    const wrapper = mount(RigHero, {
      props: { ctaLabel: 'Get Started', secondaryCtaLabel: 'Learn More' },
    })
    expect(wrapper.text()).toContain('Get Started')
    expect(wrapper.text()).toContain('Learn More')
  })

  it('renders with default center alignment', () => {
    const wrapper = mount(RigHero, {
      props: { headline: 'Hello' },
    })
    expect(wrapper.html()).toContain('text-center')
  })

  it('applies size padding class', () => {
    const wrapper = mount(RigHero, {
      props: { headline: 'Hello', size: 'lg' },
    })
    expect(wrapper.find('section').classes()).toContain('py-[200px]')
  })

  it('renders overlay when overlay=true', () => {
    const wrapper = mount(RigHero, {
      props: { headline: 'Hello', overlay: true, overlayOpacity: 0.6 },
    })
    const overlayDiv = wrapper.find('[aria-hidden="true"]')
    expect(overlayDiv.exists()).toBe(true)
    expect(overlayDiv.attributes('style')).toContain('0.6')
  })

  it('renders background slot content', () => {
    const wrapper = mount(RigHero, {
      slots: { background: '<img src="bg.jpg" alt="Background" />' },
    })
    expect(wrapper.find('img[src="bg.jpg"]').exists()).toBe(true)
  })
})
