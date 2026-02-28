import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigCardGrid from '@rig/components/RigCardGrid.vue'

describe('RigCardGrid', () => {
  it('renders slot content in a grid container', () => {
    const wrapper = mount(RigCardGrid, {
      slots: { default: '<div class="child">Card</div>' },
    })
    expect(wrapper.find('.grid').exists()).toBe(true)
    expect(wrapper.text()).toContain('Card')
  })

  it('applies default gap class (gap-4 for md)', () => {
    const wrapper = mount(RigCardGrid)
    expect(wrapper.classes()).toContain('gap-4')
  })

  it('applies custom minCardWidth in inline style', () => {
    const wrapper = mount(RigCardGrid, {
      props: { minCardWidth: '200px' },
    })
    const style = wrapper.attributes('style') ?? ''
    expect(style).toContain('200px')
  })

  it('includes masonry in computed gridStyle when masonry=true', () => {
    const wrapper = mount(RigCardGrid, {
      props: { masonry: true },
    })
    // Access the VM's computed gridStyle directly since jsdom
    // does not support grid-template-rows: masonry
    const vm = wrapper.vm as unknown as { gridStyle: Record<string, string> }
    expect(vm.gridStyle.gridTemplateRows).toBe('masonry')
  })

  it('includes max() in computed gridStyle when maxColumns is set', () => {
    const wrapper = mount(RigCardGrid, {
      props: { maxColumns: 3 },
    })
    // Access the VM's computed gridStyle directly since jsdom
    // does not support CSS max() in grid-template-columns
    const vm = wrapper.vm as unknown as { gridStyle: Record<string, string> }
    expect(vm.gridStyle.gridTemplateColumns).toContain('max(')
  })
})
