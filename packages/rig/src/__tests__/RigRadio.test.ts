import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigRadio from '@rig/components/RigRadio.vue'

const defaultOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

describe('RigRadio', () => {
  it('renders a fieldset with legend', () => {
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options: defaultOptions },
    })
    expect(wrapper.find('fieldset').exists()).toBe(true)
    expect(wrapper.find('legend').text()).toBe('Pick one')
  })

  it('renders all radio options', () => {
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options: defaultOptions },
    })
    const radios = wrapper.findAll('input[type="radio"]')
    expect(radios).toHaveLength(3)
  })

  it('checks the selected option based on modelValue', () => {
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options: defaultOptions, modelValue: 'b' },
    })
    const radios = wrapper.findAll('input[type="radio"]')
    expect((radios[1].element as HTMLInputElement).checked).toBe(true)
  })

  it('emits update:modelValue on selection change', async () => {
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options: defaultOptions },
    })
    await wrapper.findAll('input[type="radio"]')[1].setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('renders horizontal layout when orientation is horizontal', () => {
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options: defaultOptions, orientation: 'horizontal' },
    })
    expect(wrapper.find('.flex-row').exists()).toBe(true)
  })

  it('renders vertical layout by default', () => {
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options: defaultOptions },
    })
    expect(wrapper.find('.flex-col').exists()).toBe(true)
  })

  it('disables all radios when disabled prop is true', () => {
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options: defaultOptions, disabled: true },
    })
    const radios = wrapper.findAll('input[type="radio"]')
    for (const radio of radios) {
      expect((radio.element as HTMLInputElement).disabled).toBe(true)
    }
  })

  it('shows error message and aria-invalid', () => {
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options: defaultOptions, error: 'Required' },
    })
    expect(wrapper.find('[role="alert"]').text()).toBe('Required')
    expect(wrapper.find('fieldset').attributes('aria-invalid')).toBe('true')
  })

  it('shows description when provided', () => {
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options: defaultOptions, description: 'Choose wisely' },
    })
    expect(wrapper.text()).toContain('Choose wisely')
  })

  it('disables individual options', () => {
    const options = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ]
    const wrapper = mount(RigRadio, {
      props: { name: 'test', label: 'Pick one', options },
    })
    const radios = wrapper.findAll('input[type="radio"]')
    expect((radios[0].element as HTMLInputElement).disabled).toBe(false)
    expect((radios[1].element as HTMLInputElement).disabled).toBe(true)
  })
})
