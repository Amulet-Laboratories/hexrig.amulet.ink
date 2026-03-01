import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigAppShell from '@rig/components/RigAppShell.vue'

describe('RigAppShell', () => {
  const mountShell = (props: Record<string, unknown> = {}, slots: Record<string, string> = {}) => {
    return mount(RigAppShell, {
      props: { sidebarCollapsed: false, ...props },
      slots: {
        default: '<div class="main-content">Main</div>',
        ...slots,
      },
      global: { stubs: { RigIcon: true, RigSidebar: true } },
    })
  }

  it('renders main content', () => {
    const wrapper = mountShell()
    expect(wrapper.find('.main-content').exists()).toBe(true)
  })

  it('renders header slot', () => {
    const wrapper = mountShell({}, { header: '<div class="test-header">Header</div>' })
    expect(wrapper.find('.test-header').exists()).toBe(true)
  })

  it('renders footer slot', () => {
    const wrapper = mountShell({}, { footer: '<div class="test-footer">Footer</div>' })
    expect(wrapper.find('.test-footer').exists()).toBe(true)
  })

  it('renders sidebar when sidebar slot is provided', () => {
    const wrapper = mountShell({}, { sidebar: '<div class="test-sidebar">Sidebar</div>' })
    // The RigSidebar is stubbed, so we check for the stub
    expect(wrapper.findComponent({ name: 'RigSidebar' }).exists()).toBe(true)
  })

  it('renders sidebar-header slot', () => {
    const wrapper = mountShell(
      {},
      {
        sidebar: '<div>Nav</div>',
        'sidebar-header': '<div class="test-sidebar-header">Logo</div>',
      },
    )
    expect(wrapper.findComponent({ name: 'RigSidebar' }).exists()).toBe(true)
  })

  it('uses h-screen for full viewport height', () => {
    const wrapper = mountShell()
    expect(wrapper.classes()).toContain('h-screen')
  })

  it('main area is scrollable', () => {
    const wrapper = mountShell()
    expect(wrapper.find('main').classes()).toContain('overflow-y-auto')
  })

  it('uses flex layout', () => {
    const wrapper = mountShell()
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
  })

  it('passes sidebarCollapsed to sidebar', () => {
    const wrapper = mountShell({ sidebarCollapsed: true }, { sidebar: '<div>Nav</div>' })
    const sidebar = wrapper.findComponent({ name: 'RigSidebar' })
    expect(sidebar.props('collapsed')).toBe(true)
  })

  it('passes sidebar width props', () => {
    const wrapper = mountShell(
      { sidebarWidth: 300, sidebarCollapsedWidth: 64 },
      { sidebar: '<div>Nav</div>' },
    )
    const sidebar = wrapper.findComponent({ name: 'RigSidebar' })
    expect(sidebar.props('width')).toBe(300)
    expect(sidebar.props('collapsedWidth')).toBe(64)
  })
})
