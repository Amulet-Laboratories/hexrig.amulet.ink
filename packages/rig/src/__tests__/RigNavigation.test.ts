import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigTabs from '@rig/components/RigTabs.vue'
import RigAccordion from '@rig/components/RigAccordion.vue'

const TABS = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' },
]

describe('RigTabs', () => {
  it('renders one tab button per tab item', () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    expect(wrapper.findAll('[role="tab"]')).toHaveLength(3)
  })

  it('renders a tabpanel for the active tab', () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    expect(wrapper.findAll('[role="tabpanel"]')).toHaveLength(1)
  })

  it('active tab has aria-selected="true"', () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'second' } })
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs[1].attributes('aria-selected')).toBe('true')
  })

  it('inactive tabs have aria-selected="false"', () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs[1].attributes('aria-selected')).toBe('false')
    expect(tabs[2].attributes('aria-selected')).toBe('false')
  })

  it('active tab has tabindex=0, others have tabindex=-1', () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs[0].attributes('tabindex')).toBe('0')
    expect(tabs[1].attributes('tabindex')).toBe('-1')
  })

  it('emits update:modelValue with tab value on click', async () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    await wrapper.findAll('[role="tab"]')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['second'])
  })

  it('emits update:modelValue on ArrowRight', async () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    await wrapper.findAll('[role="tab"]')[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['second'])
  })

  it('wraps to first tab on ArrowRight from last', async () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'third' } })
    await wrapper.findAll('[role="tab"]')[2].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['first'])
  })

  it('emits update:modelValue on ArrowLeft', async () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'second' } })
    await wrapper.findAll('[role="tab"]')[1].trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['first'])
  })

  it('wraps to last tab on ArrowLeft from first', async () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    await wrapper.findAll('[role="tab"]')[0].trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['third'])
  })

  it('emits first tab on Home key', async () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'third' } })
    await wrapper.findAll('[role="tab"]')[2].trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['first'])
  })

  it('emits last tab on End key', async () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    await wrapper.findAll('[role="tab"]')[0].trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['third'])
  })

  it('non-navigation keys do not emit', async () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    await wrapper.findAll('[role="tab"]')[0].trigger('keydown', { key: 'Tab' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('renders pill variant tablist class', () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first', variant: 'pill' } })
    expect(wrapper.find('[role="tablist"]').classes()).toContain('bg-surface-sunken')
  })

  it('only the active panel is rendered', () => {
    const wrapper = mount(RigTabs, { props: { tabs: TABS, modelValue: 'first' } })
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels).toHaveLength(1)
    expect(panels[0].attributes('aria-labelledby')).toContain('first')
  })
})

const ITEMS = [
  { label: 'Item One', value: 'one', content: 'Content for one' },
  { label: 'Item Two', value: 'two', content: 'Content for two' },
  { label: 'Item Three', value: 'three', content: 'Content for three' },
]

describe('RigAccordion', () => {
  it('renders one trigger button per item', () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS } })
    expect(wrapper.findAll('button[aria-expanded]')).toHaveLength(3)
  })

  it('all panels are closed by default', () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS } })
    wrapper.findAll('button[aria-expanded]').forEach((btn) => {
      expect(btn.attributes('aria-expanded')).toBe('false')
    })
  })

  it('opens a panel on trigger click (aria-expanded becomes true)', async () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.findAll('button[aria-expanded]')[0].attributes('aria-expanded')).toBe('true')
  })

  it('closes an open panel on second click', async () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS } })
    await wrapper.findAll('button')[0].trigger('click')
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.findAll('button[aria-expanded]')[0].attributes('aria-expanded')).toBe('false')
  })

  it('multiple=false closes other panels when one opens', async () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS, multiple: false } })
    await wrapper.findAll('button')[0].trigger('click')
    await wrapper.findAll('button')[1].trigger('click')
    const btns = wrapper.findAll('button[aria-expanded]')
    expect(btns[0].attributes('aria-expanded')).toBe('false')
    expect(btns[1].attributes('aria-expanded')).toBe('true')
  })

  it('multiple=true allows multiple panels open simultaneously', async () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS, multiple: true } })
    await wrapper.findAll('button')[0].trigger('click')
    await wrapper.findAll('button')[1].trigger('click')
    const btns = wrapper.findAll('button[aria-expanded]')
    expect(btns[0].attributes('aria-expanded')).toBe('true')
    expect(btns[1].attributes('aria-expanded')).toBe('true')
  })

  it('defaultOpen pre-opens specified items', () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS, defaultOpen: ['two'] } })
    const btns = wrapper.findAll('button[aria-expanded]')
    expect(btns[0].attributes('aria-expanded')).toBe('false')
    expect(btns[1].attributes('aria-expanded')).toBe('true')
    expect(btns[2].attributes('aria-expanded')).toBe('false')
  })

  it('defaultOpen with multiple=true pre-opens multiple items', () => {
    const wrapper = mount(RigAccordion, {
      props: { items: ITEMS, multiple: true, defaultOpen: ['one', 'three'] },
    })
    const btns = wrapper.findAll('button[aria-expanded]')
    expect(btns[0].attributes('aria-expanded')).toBe('true')
    expect(btns[1].attributes('aria-expanded')).toBe('false')
    expect(btns[2].attributes('aria-expanded')).toBe('true')
  })

  it('disabled item has the disabled attribute', () => {
    const items = [
      { label: 'Normal', value: 'normal', content: 'ok' },
      { label: 'Disabled', value: 'dis', content: 'hidden', disabled: true },
    ]
    const wrapper = mount(RigAccordion, { props: { items } })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeUndefined()
    expect(buttons[1].attributes('disabled')).toBeDefined()
  })

  it('open panel has aria-hidden=false', async () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS } })
    await wrapper.findAll('button')[0].trigger('click')
    const panels = wrapper.findAll('[role="region"]')
    expect(panels[0].attributes('aria-hidden')).toBe('false')
  })

  it('closed panel has aria-hidden', () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS } })
    const panels = wrapper.findAll('[role="region"]')
    expect(panels[0].attributes('aria-hidden')).toBe('true')
  })

  it('each panel is labelled by its trigger', async () => {
    const wrapper = mount(RigAccordion, { props: { items: ITEMS } })
    const buttons = wrapper.findAll('button[aria-expanded]')
    const panels = wrapper.findAll('[role="region"]')
    // The trigger's id should match the panel's aria-labelledby
    expect(panels[0].attributes('aria-labelledby')).toBe(buttons[0].attributes('id'))
  })
})
