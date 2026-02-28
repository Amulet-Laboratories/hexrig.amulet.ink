import { describe, it, expect } from 'vitest'
import { defineComponent, provide, ref } from 'vue'
import { mount } from '@vue/test-utils'
import RigSidebar from '@rig/components/RigSidebar.vue'
import RigSidebarSection from '@rig/components/RigSidebarSection.vue'
import RigSidebarItem from '@rig/components/RigSidebarItem.vue'
import { SIDEBAR_COLLAPSED_KEY } from '@rig/components/shared'

describe('RigSidebar', () => {
  const mountSidebar = (props: Record<string, unknown> = {}, slots: Record<string, string> = {}) => {
    return mount(RigSidebar, {
      props: { collapsed: false, ...props },
      slots: { default: '<div class="sidebar-content">Items</div>', ...slots },
      global: { stubs: { RigIcon: true } },
    })
  }

  it('renders as a nav element', () => {
    const wrapper = mountSidebar()
    expect(wrapper.element.tagName).toBe('NAV')
  })

  it('has aria-label for accessibility', () => {
    const wrapper = mountSidebar()
    expect(wrapper.attributes('aria-label')).toBe('Sidebar navigation')
  })

  it('renders default slot content', () => {
    const wrapper = mountSidebar()
    expect(wrapper.find('.sidebar-content').exists()).toBe(true)
  })

  it('renders header slot', () => {
    const wrapper = mountSidebar({}, { header: '<div class="test-header">Logo</div>' })
    expect(wrapper.find('.test-header').exists()).toBe(true)
  })

  it('renders footer slot', () => {
    const wrapper = mountSidebar({}, { footer: '<div class="test-footer">Info</div>' })
    expect(wrapper.find('.test-footer').exists()).toBe(true)
  })

  it('applies expanded width', () => {
    const wrapper = mountSidebar({ width: 280 })
    expect(wrapper.attributes('style')).toContain('width: 280px')
  })

  it('applies collapsed width when collapsed', () => {
    const wrapper = mountSidebar({ collapsed: true, collapsedWidth: 60 })
    expect(wrapper.attributes('style')).toContain('width: 60px')
  })

  it('has right border by default', () => {
    const wrapper = mountSidebar()
    expect(wrapper.classes()).toContain('border-r')
  })

  it('removes border when bordered is false', () => {
    const wrapper = mountSidebar({ bordered: false })
    expect(wrapper.classes()).not.toContain('border-r')
  })
})

describe('RigSidebarSection', () => {
  it('renders title when sidebar is expanded', () => {
    const wrapper = mount(RigSidebarSection, {
      props: { title: 'Navigation' },
      slots: { default: '<div>Items</div>' },
      global: {
        provide: { [SIDEBAR_COLLAPSED_KEY as symbol]: ref(false) },
      },
    })
    expect(wrapper.text()).toContain('Navigation')
  })

  it('renders children', () => {
    const wrapper = mount(RigSidebarSection, {
      slots: { default: '<div class="test-child">Item</div>' },
    })
    expect(wrapper.find('.test-child').exists()).toBe(true)
  })
})

describe('RigSidebarItem', () => {
  it('renders label text', () => {
    const wrapper = mount(RigSidebarItem, {
      props: { label: 'Dashboard' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('Dashboard')
  })

  it('renders as a button by default', () => {
    const wrapper = mount(RigSidebarItem, {
      props: { label: 'Home' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders as an anchor when href is provided', () => {
    const wrapper = mount(RigSidebarItem, {
      props: { label: 'Home', href: '/home' },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('applies active styling when active', () => {
    const wrapper = mount(RigSidebarItem, {
      props: { label: 'Home', active: true },
      global: { stubs: { RigIcon: true } },
    })
    const el = wrapper.find('button')
    expect(el.classes()).toContain('bg-accent-muted')
    expect(el.classes()).toContain('text-accent')
  })

  it('renders badge when provided', () => {
    const wrapper = mount(RigSidebarItem, {
      props: { label: 'Inbox', badge: 5 },
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.text()).toContain('5')
  })

  it('emits click on click', async () => {
    const wrapper = mount(RigSidebarItem, {
      props: { label: 'Home' },
      global: { stubs: { RigIcon: true } },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('shows title attribute when sidebar is collapsed', () => {
    const Wrapper = defineComponent({
      components: { RigSidebarItem },
      setup() {
        provide(SIDEBAR_COLLAPSED_KEY, ref(true))
        return {}
      },
      template: '<RigSidebarItem label="Home" />',
    })
    const wrapper = mount(Wrapper, {
      global: { stubs: { RigIcon: true } },
    })
    expect(wrapper.findComponent(RigSidebarItem).find('button').attributes('title')).toBe('Home')
  })
})
