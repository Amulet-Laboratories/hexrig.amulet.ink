import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigSelect from '@rig/components/RigSelect.vue'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
]

describe('RigSelect', () => {
  it('renders a native <select> element', () => {
    const wrapper = mount(RigSelect, { props: { options } })
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('renders options from the options array', () => {
    const wrapper = mount(RigSelect, { props: { options } })
    const opts = wrapper.findAll('option')
    expect(opts.some((o) => o.text() === 'Option A')).toBe(true)
    expect(opts.some((o) => o.text() === 'Option B')).toBe(true)
  })

  it('renders a disabled option when option.disabled=true', () => {
    const wrapper = mount(RigSelect, { props: { options } })
    const disabledOpt = wrapper.findAll('option').find((o) => o.text() === 'Option C')
    expect(disabledOpt?.attributes('disabled')).toBeDefined()
  })

  it('renders a label and links it to the select via for/id', () => {
    const wrapper = mount(RigSelect, {
      props: { options, label: 'Choose one', id: 'my-select' },
    })
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toContain('Choose one')
    expect(label.attributes('for')).toBe('my-select')
    expect(wrapper.find('select').attributes('id')).toBe('my-select')
  })

  it('renders placeholder as a disabled empty-value option', () => {
    const wrapper = mount(RigSelect, { props: { options, placeholder: 'Pick one' } })
    const placeholderOpt = wrapper.find('option[value=""]')
    expect(placeholderOpt.exists()).toBe(true)
    expect(placeholderOpt.text()).toBe('Pick one')
    expect(placeholderOpt.attributes('disabled')).toBeDefined()
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(RigSelect, { props: { options, modelValue: 'a' } })
    const select = wrapper.find('select')
    await select.trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('disabled select has disabled attribute', () => {
    const wrapper = mount(RigSelect, { props: { options, disabled: true } })
    expect(wrapper.find('select').attributes('disabled')).toBeDefined()
  })

  it('required prop is forwarded to native select', () => {
    const wrapper = mount(RigSelect, { props: { options, required: true } })
    expect(wrapper.find('select').attributes('required')).toBeDefined()
  })

  it('error prop applies error border class', () => {
    const wrapper = mount(RigSelect, { props: { options, error: 'Required field' } })
    expect(wrapper.find('select').classes()).toContain('border-status-error')
  })

  it('error prop shows error message with role=alert', () => {
    const wrapper = mount(RigSelect, { props: { options, error: 'Required field' } })
    const errorEl = wrapper.find('p[role="alert"]')
    expect(errorEl.exists()).toBe(true)
    expect(errorEl.text()).toBe('Required field')
  })

  it('aria-invalid="true" when error is provided', () => {
    const wrapper = mount(RigSelect, { props: { options, error: 'Required' } })
    expect(wrapper.find('select').attributes('aria-invalid')).toBe('true')
  })

  it('aria-invalid is absent when no error', () => {
    const wrapper = mount(RigSelect, { props: { options } })
    expect(wrapper.find('select').attributes('aria-invalid')).toBeUndefined()
  })

  it('description is shown when there is no error', () => {
    const wrapper = mount(RigSelect, { props: { options, description: 'Helper text' } })
    expect(wrapper.text()).toContain('Helper text')
  })

  it('description is hidden when error is present', () => {
    const wrapper = mount(RigSelect, {
      props: { options, description: 'Helper text', error: 'Required' },
    })
    expect(wrapper.text()).not.toContain('Helper text')
    expect(wrapper.text()).toContain('Required')
  })

  it('aria-describedby points to the error element when errored', () => {
    const wrapper = mount(RigSelect, { props: { options, id: 'sel', error: 'Required' } })
    const describedBy = wrapper.find('select').attributes('aria-describedby')
    expect(describedBy).toContain('sel-error')
  })

  it('aria-describedby points to description element when not errored', () => {
    const wrapper = mount(RigSelect, {
      props: { options, id: 'sel', description: 'Helper text' },
    })
    const describedBy = wrapper.find('select').attributes('aria-describedby')
    expect(describedBy).toContain('sel-desc')
  })
})
