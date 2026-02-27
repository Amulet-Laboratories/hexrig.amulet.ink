import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RigThemeProvider from '@rig/components/RigThemeProvider.vue'

describe('RigThemeProvider', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    })
  })

  it('renders slot content', () => {
    const wrapper = mount(RigThemeProvider, {
      props: { theme: 'hearth', mode: 'dark' },
      slots: { default: 'Hello world' },
    })
    expect(wrapper.text()).toContain('Hello world')
  })

  it('sets data-theme attribute from theme prop', () => {
    const wrapper = mount(RigThemeProvider, {
      props: { theme: 'abyss', mode: 'dark' },
    })
    expect(wrapper.attributes('data-theme')).toBe('abyss')
  })

  it('sets data-mode attribute from mode prop', () => {
    const wrapper = mount(RigThemeProvider, {
      props: { theme: 'hearth', mode: 'dark' },
    })
    expect(wrapper.attributes('data-mode')).toBe('dark')
  })

  it('updates data-theme when theme prop changes', async () => {
    const wrapper = mount(RigThemeProvider, {
      props: { theme: 'hearth', mode: 'dark' },
    })
    await wrapper.setProps({ theme: 'ember' })
    expect(wrapper.attributes('data-theme')).toBe('ember')
  })

  it('renders as <div> by default', () => {
    const wrapper = mount(RigThemeProvider, {
      props: { theme: 'hearth', mode: 'dark' },
    })
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('renders as <main> when as="main"', () => {
    const wrapper = mount(RigThemeProvider, {
      props: { theme: 'hearth', mode: 'dark', as: 'main' },
    })
    expect(wrapper.element.tagName).toBe('MAIN')
  })

  it('renders as <section> when as="section"', () => {
    const wrapper = mount(RigThemeProvider, {
      props: { theme: 'hearth', mode: 'dark', as: 'section' },
    })
    expect(wrapper.element.tagName).toBe('SECTION')
  })
})
