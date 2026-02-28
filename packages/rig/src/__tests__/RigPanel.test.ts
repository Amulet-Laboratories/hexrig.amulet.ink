import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigPanel from '@rig/components/RigPanel.vue'

describe('RigPanel', () => {
  it('renders title text', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Health Summary' },
      slots: { default: 'Content' },
    })
    expect(wrapper.text()).toContain('Health Summary')
  })

  it('renders description text', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Health', description: 'Current status' },
      slots: { default: 'Content' },
    })
    expect(wrapper.text()).toContain('Current status')
  })

  it('renders body content', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel' },
      slots: { default: 'Body content here' },
    })
    expect(wrapper.text()).toContain('Body content here')
  })

  it('renders footer slot', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel' },
      slots: { default: 'Body', footer: 'Footer content' },
    })
    expect(wrapper.text()).toContain('Footer content')
  })

  it('renders actions slot in title bar', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel' },
      slots: { default: 'Body', actions: '<button class="test-action">Edit</button>' },
    })
    expect(wrapper.find('.test-action').exists()).toBe(true)
  })

  it('has border by default', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel' },
      slots: { default: 'Content' },
    })
    expect(wrapper.classes()).toContain('border')
  })

  it('removes border when bordered is false', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel', bordered: false },
      slots: { default: 'Content' },
    })
    expect(wrapper.classes()).not.toContain('border')
  })

  it('shows chevron icon when collapsible', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel', collapsible: true },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('does not show chevron when not collapsible', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel', collapsible: false },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('toggles open state on click when collapsible', async () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel', collapsible: true, defaultOpen: true },
      slots: { default: 'Content' },
    })
    // Click the title bar
    await wrapper.find('[role="button"]').trigger('click')
    expect(wrapper.emitted('toggle')).toHaveLength(1)
    expect(wrapper.emitted('toggle')![0]).toEqual([false])
  })

  it('emits toggle with true when opening', async () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel', collapsible: true, defaultOpen: false },
      slots: { default: 'Content' },
    })
    await wrapper.find('[role="button"]').trigger('click')
    expect(wrapper.emitted('toggle')![0]).toEqual([true])
  })

  it('sets aria-expanded on collapsible title bar', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel', collapsible: true, defaultOpen: true },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('[role="button"]').attributes('aria-expanded')).toBe('true')
  })

  it('applies padding to body by default', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel' },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.p-4').exists()).toBe(true)
  })

  it('removes padding when padded is false', () => {
    const wrapper = mount(RigPanel, {
      props: { title: 'Panel', padded: false },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.p-4').exists()).toBe(false)
  })
})
