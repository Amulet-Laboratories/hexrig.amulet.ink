import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import RigNavbar from '@rig/components/RigNavbar.vue'
import type { NavbarItem } from '../types'

const stubs = { Teleport: true, Transition: true }

const items: NavbarItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    children: [
      { label: 'Web Design', href: '/services/web' },
      { label: 'Consulting', href: '/services/consulting' },
    ],
  },
]

const mountNavbar = (props: Record<string, unknown> = {}) =>
  mount(RigNavbar, {
    props: { items, ...props },
    global: { stubs },
  })

describe('RigNavbar', () => {
  beforeEach(() => {
    document.body.style.overflow = ''
    const key = Symbol.for('rig-scroll-lock')
    const g = globalThis as unknown as Record<
      symbol,
      { value: number; savedOverflow: string } | undefined
    >
    if (g[key]) {
      g[key]!.value = 0
      g[key]!.savedOverflow = ''
    }
  })

  it('renders brand text', () => {
    const wrapper = mountNavbar({ brand: 'Acme Co' })
    expect(wrapper.text()).toContain('Acme Co')
  })

  it('renders nav items as links', () => {
    const wrapper = mountNavbar()
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About')
  })

  it('renders hamburger button', () => {
    const wrapper = mountNavbar()
    expect(wrapper.find('button[aria-label="Toggle navigation menu"]').exists()).toBe(true)
  })

  it('opens mobile menu on hamburger click', async () => {
    const wrapper = mountNavbar()
    await wrapper.find('button[aria-label="Toggle navigation menu"]').trigger('click')
    await nextTick()
    expect(wrapper.find('.max-w-sm').exists()).toBe(true)
  })

  it('closes mobile menu on Escape key', async () => {
    const wrapper = mountNavbar()
    await wrapper.find('button[aria-label="Toggle navigation menu"]').trigger('click')
    await nextTick()
    const menu = wrapper.find('.max-w-sm')
    await menu.trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.find('.max-w-sm').exists()).toBe(false)
  })

  it('renders dropdown trigger for items with children', () => {
    const wrapper = mountNavbar()
    expect(wrapper.text()).toContain('Services')
    const buttons = wrapper.findAll('button')
    const servicesBtn = buttons.find((b) => b.text().includes('Services'))
    expect(servicesBtn?.attributes('aria-expanded')).toBe('false')
  })

  it('toggles dropdown on click', async () => {
    const wrapper = mountNavbar()
    const buttons = wrapper.findAll('button')
    const servicesBtn = buttons.find((b) => b.text().includes('Services'))
    await servicesBtn?.trigger('click')
    expect(wrapper.text()).toContain('Web Design')
    expect(wrapper.text()).toContain('Consulting')
  })

  it('locks body scroll when mobile menu opens', async () => {
    const wrapper = mountNavbar()
    await wrapper.find('button[aria-label="Toggle navigation menu"]').trigger('click')
    await nextTick()
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scroll when mobile menu closes', async () => {
    const wrapper = mountNavbar()
    await wrapper.find('button[aria-label="Toggle navigation menu"]').trigger('click')
    await nextTick()
    // Close via close button
    const closeBtn = wrapper.find('button[aria-label="Close menu"]')
    await closeBtn.trigger('click')
    await nextTick()
    expect(document.body.style.overflow).toBe('')
  })

  it('applies bordered class when bordered=true', () => {
    const wrapper = mountNavbar({ bordered: true })
    expect(wrapper.find('nav').classes()).toContain('border-b')
  })
})
