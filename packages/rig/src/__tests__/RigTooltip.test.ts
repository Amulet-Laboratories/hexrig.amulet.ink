import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RigTooltip from '@rig/components/RigTooltip.vue'

const mountTooltip = (props: Record<string, unknown> = {}) =>
  mount(RigTooltip, {
    props: { content: 'Tooltip text', ...props },
    slots: { default: '<button>Trigger</button>' },
  })

describe('RigTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('tooltip element is in the DOM when content is provided', () => {
    const wrapper = mountTooltip()
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)
  })

  it('tooltip is not visible initially (opacity-0)', () => {
    const wrapper = mountTooltip()
    expect(wrapper.find('[role="tooltip"]').classes()).toContain('opacity-0')
  })

  it('does not show before the delay elapses', async () => {
    const wrapper = mountTooltip({ delay: 200 })
    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="tooltip"]').classes()).toContain('opacity-0')
  })

  it('becomes visible after mouseenter + delay', async () => {
    const wrapper = mountTooltip({ delay: 200 })
    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(200)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="tooltip"]').classes()).toContain('opacity-100')
  })

  it('hides after mouseleave + hide delay', async () => {
    const wrapper = mountTooltip({ delay: 0 })
    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(0)
    await wrapper.vm.$nextTick()
    await wrapper.trigger('mouseleave')
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="tooltip"]').classes()).toContain('opacity-0')
  })

  it('shows on focusin', async () => {
    const wrapper = mountTooltip({ delay: 0 })
    await wrapper.trigger('focusin')
    vi.advanceTimersByTime(0)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="tooltip"]').classes()).toContain('opacity-100')
  })

  it('hides on focusout', async () => {
    const wrapper = mountTooltip({ delay: 0 })
    await wrapper.trigger('focusin')
    vi.advanceTimersByTime(0)
    await wrapper.vm.$nextTick()
    await wrapper.trigger('focusout')
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="tooltip"]').classes()).toContain('opacity-0')
  })

  it('Escape key closes a visible tooltip', async () => {
    const wrapper = mountTooltip({ delay: 0 })
    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(0)
    await wrapper.vm.$nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="tooltip"]').classes()).toContain('opacity-0')
  })

  it('disabled=true: tooltip element is not in DOM', () => {
    const wrapper = mountTooltip({ disabled: true })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('no content: tooltip element is not in DOM', () => {
    const wrapper = mount(RigTooltip, {
      props: {},
      slots: { default: '<button>Trigger</button>' },
    })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('disabled tooltip does not show on mouseenter', async () => {
    const wrapper = mountTooltip({ disabled: true })
    await wrapper.trigger('mouseenter')
    vi.advanceTimersByTime(500)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })
})
