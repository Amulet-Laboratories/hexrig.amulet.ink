import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigSplit from '@rig/components/RigSplit.vue'

describe('RigSplit', () => {
  it('renders a grid container', () => {
    const wrapper = mount(RigSplit, {
      slots: { first: 'Left', second: 'Right' },
    })
    expect(wrapper.find('.grid').exists()).toBe(true)
  })

  it('renders both slot contents', () => {
    const wrapper = mount(RigSplit, {
      slots: { first: 'Left panel', second: 'Right panel' },
    })
    expect(wrapper.text()).toContain('Left panel')
    expect(wrapper.text()).toContain('Right panel')
  })

  it('renders separator with role="separator"', () => {
    const wrapper = mount(RigSplit, {
      slots: { first: 'Left', second: 'Right' },
    })
    expect(wrapper.find('[role="separator"]').exists()).toBe(true)
  })

  it('applies horizontal orientation by default', () => {
    const wrapper = mount(RigSplit, {
      slots: { first: 'Left', second: 'Right' },
    })
    const separator = wrapper.find('[role="separator"]')
    expect(separator.attributes('aria-orientation')).toBe('horizontal')
  })

  it('applies vertical orientation', () => {
    const wrapper = mount(RigSplit, {
      props: { orientation: 'vertical' },
      slots: { first: 'Top', second: 'Bottom' },
    })
    const separator = wrapper.find('[role="separator"]')
    expect(separator.attributes('aria-orientation')).toBe('vertical')
  })

  it('sets initial size via grid style', () => {
    const wrapper = mount(RigSplit, {
      props: { initialSize: 400 },
      slots: { first: 'Left', second: 'Right' },
    })
    const grid = wrapper.find('.grid')
    expect(grid.attributes('style')).toContain('400px')
  })

  it('exposes aria-valuenow on separator', () => {
    const wrapper = mount(RigSplit, {
      props: { initialSize: 300, minSize: 100, maxSize: 800 },
      slots: { first: 'Left', second: 'Right' },
    })
    const separator = wrapper.find('[role="separator"]')
    expect(separator.attributes('aria-valuenow')).toBe('300')
    expect(separator.attributes('aria-valuemin')).toBe('100')
    expect(separator.attributes('aria-valuemax')).toBe('800')
  })

  it('resets to initial size on double-click', async () => {
    const wrapper = mount(RigSplit, {
      props: { initialSize: 300 },
      slots: { first: 'Left', second: 'Right' },
    })
    const separator = wrapper.find('[role="separator"]')
    await separator.trigger('dblclick')
    expect(wrapper.emitted('resize')?.[0]).toEqual([300])
  })
})
