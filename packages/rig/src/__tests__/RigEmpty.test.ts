import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigEmpty from '@rig/components/RigEmpty.vue'

describe('RigEmpty', () => {
  it('renders the title text', () => {
    const wrapper = mount(RigEmpty, { props: { title: 'No results found' } })
    expect(wrapper.text()).toContain('No results found')
  })

  it('renders the description when provided', () => {
    const wrapper = mount(RigEmpty, {
      props: { title: 'No results', description: 'Try adjusting your search.' },
    })
    expect(wrapper.text()).toContain('Try adjusting your search.')
  })

  it('does not render description when not provided', () => {
    const wrapper = mount(RigEmpty, { props: { title: 'No results' } })
    const descEl = wrapper.findAll('p').filter((p) => p.classes().includes('text-text-muted'))
    expect(descEl).toHaveLength(0)
  })

  it('renders action button when actionLabel is provided', () => {
    const wrapper = mount(RigEmpty, {
      props: { title: 'No results', actionLabel: 'Create one' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Create one')
  })

  it('emits action when action button is clicked', async () => {
    const wrapper = mount(RigEmpty, {
      props: { title: 'No results', actionLabel: 'Add item' },
      global: { stubs: { RigIcon: true } },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('action')).toHaveLength(1)
  })

  it('renders default slot content instead of icon/title/description', () => {
    const wrapper = mount(RigEmpty, {
      props: { title: 'Ignored' },
      slots: { default: '<div class="custom-empty">Custom empty state</div>' },
    })
    expect(wrapper.find('.custom-empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom empty state')
  })

  it('renders action slot instead of default button', () => {
    const wrapper = mount(RigEmpty, {
      props: { title: 'No results', actionLabel: 'Ignored' },
      slots: { action: '<button class="custom-action">Custom</button>' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('.custom-action').exists()).toBe(true)
  })
})
