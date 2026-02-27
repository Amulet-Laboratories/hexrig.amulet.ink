import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import RigCard from '@rig/components/RigCard.vue'

describe('RigCard', () => {
  it('renders default slot content', () => {
    const wrapper = mount(RigCard, { slots: { default: 'Card body' } })
    expect(wrapper.text()).toContain('Card body')
  })

  it('applies raised elevation classes by default', () => {
    const wrapper = mount(RigCard)
    expect(wrapper.classes()).toContain('bg-surface-raised')
    expect(wrapper.classes()).toContain('shadow-md')
  })

  it('applies flat elevation classes', () => {
    const wrapper = mount(RigCard, { props: { elevation: 'flat' } })
    expect(wrapper.classes()).toContain('bg-surface-base')
    expect(wrapper.classes()).toContain('border')
  })

  it('applies prominent elevation classes', () => {
    const wrapper = mount(RigCard, { props: { elevation: 'prominent' } })
    expect(wrapper.classes()).toContain('shadow-lg')
  })

  it('non-interactive card has no tabindex', () => {
    const wrapper = mount(RigCard, { props: { interactive: false } })
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('non-interactive card has no role', () => {
    const wrapper = mount(RigCard, { props: { interactive: false } })
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  it('interactive card has tabindex=0 and role=button', () => {
    const wrapper = mount(RigCard, { props: { interactive: true } })
    expect(wrapper.attributes('tabindex')).toBe('0')
    expect(wrapper.attributes('role')).toBe('button')
  })

  it('interactive card as="a" has no role=button (native anchor semantic)', () => {
    const wrapper = mount(RigCard, { props: { interactive: true, as: 'a', href: '#' } })
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  it('click on interactive card emits activate', async () => {
    const wrapper = mount(RigCard, { props: { interactive: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('activate')).toHaveLength(1)
  })

  it('click on non-interactive card does NOT emit activate', async () => {
    const wrapper = mount(RigCard, { props: { interactive: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('activate')).toBeUndefined()
  })

  it('Enter key on interactive card emits activate', async () => {
    const wrapper = mount(RigCard, { props: { interactive: true } })
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('activate')).toHaveLength(1)
  })

  it('Space key on interactive card emits activate', async () => {
    const wrapper = mount(RigCard, { props: { interactive: true } })
    await wrapper.trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('activate')).toHaveLength(1)
  })

  it('keydown on non-interactive card does NOT emit activate', async () => {
    const wrapper = mount(RigCard, { props: { interactive: false } })
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('activate')).toBeUndefined()
  })

  it('renders as <div> by default', () => {
    const wrapper = mount(RigCard)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('renders header and footer slots', () => {
    const wrapper = mount(RigCard, {
      slots: {
        header: 'Header content',
        default: 'Body content',
        footer: 'Footer content',
      },
    })
    expect(wrapper.text()).toContain('Header content')
    expect(wrapper.text()).toContain('Body content')
    expect(wrapper.text()).toContain('Footer content')
  })

  it('fires dev warning when interactive=true without ariaLabel', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(RigCard, { props: { interactive: true } })
    await nextTick()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[RigCard]'))
    spy.mockRestore()
  })

  it('does NOT fire dev warning when interactive=true with ariaLabel', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(RigCard, { props: { interactive: true, ariaLabel: 'View project details' } })
    await nextTick()
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })
})
