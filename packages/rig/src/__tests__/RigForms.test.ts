import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigCheckbox from '@rig/components/RigCheckbox.vue'
import RigSwitch from '@rig/components/RigSwitch.vue'
import RigInput from '@rig/components/RigInput.vue'

describe('RigCheckbox', () => {
  it('renders a checkbox input', () => {
    const wrapper = mount(RigCheckbox, { props: { label: 'Accept terms' } })
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('emits update:modelValue toggled to true when unchecked', async () => {
    const wrapper = mount(RigCheckbox, { props: { modelValue: false } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('emits update:modelValue toggled to false when checked', async () => {
    const wrapper = mount(RigCheckbox, { props: { modelValue: true } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(RigCheckbox, { props: { modelValue: false, disabled: true } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('has aria-invalid="true" when error is provided', () => {
    const wrapper = mount(RigCheckbox, { props: { error: 'Required' } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('does not have aria-invalid without error', () => {
    const wrapper = mount(RigCheckbox)
    expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
  })

  it('shows error message text', () => {
    const wrapper = mount(RigCheckbox, { props: { error: 'Please check this box' } })
    expect(wrapper.text()).toContain('Please check this box')
  })

  it('shows description when no error', () => {
    const wrapper = mount(RigCheckbox, { props: { description: 'Optional helper text' } })
    expect(wrapper.text()).toContain('Optional helper text')
  })

  it('hides description paragraph when error is present', () => {
    const wrapper = mount(RigCheckbox, { props: { description: 'Helper', error: 'Required' } })
    // The description <p> is hidden; only the error <p> renders
    expect(wrapper.find('p[role="alert"]').text()).toBe('Required')
    const allPs = wrapper.findAll('p')
    expect(allPs).toHaveLength(1)
  })

  it('renders label text', () => {
    const wrapper = mount(RigCheckbox, { props: { label: 'Subscribe' } })
    expect(wrapper.text()).toContain('Subscribe')
  })

  it('links label to input via for/id', () => {
    const wrapper = mount(RigCheckbox, { props: { id: 'my-cb', label: 'Check me' } })
    expect(wrapper.find('label').attributes('for')).toBe('my-cb')
    expect(wrapper.find('input').attributes('id')).toBe('my-cb')
  })
})

describe('RigSwitch', () => {
  it('renders with role="switch"', () => {
    const wrapper = mount(RigSwitch, { props: { modelValue: false } })
    expect(wrapper.find('[role="switch"]').exists()).toBe(true)
  })

  it('aria-checked="true" when modelValue is true', () => {
    const wrapper = mount(RigSwitch, { props: { modelValue: true } })
    expect(wrapper.find('[role="switch"]').attributes('aria-checked')).toBe('true')
  })

  it('aria-checked="false" when modelValue is false', () => {
    const wrapper = mount(RigSwitch, { props: { modelValue: false } })
    expect(wrapper.find('[role="switch"]').attributes('aria-checked')).toBe('false')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(RigSwitch, { props: { modelValue: false } })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('emits false when currently true', async () => {
    const wrapper = mount(RigSwitch, { props: { modelValue: true } })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(RigSwitch, { props: { modelValue: false, disabled: true } })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('toggles on Space keydown', async () => {
    const wrapper = mount(RigSwitch, { props: { modelValue: false } })
    await wrapper.find('[role="switch"]').trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('toggles on Enter keydown', async () => {
    const wrapper = mount(RigSwitch, { props: { modelValue: false } })
    await wrapper.find('[role="switch"]').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('does not toggle on other keys', async () => {
    const wrapper = mount(RigSwitch, { props: { modelValue: false } })
    await wrapper.find('[role="switch"]').trigger('keydown', { key: 'Tab' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('has aria-invalid="true" when error is provided', () => {
    const wrapper = mount(RigSwitch, { props: { error: 'Required' } })
    expect(wrapper.find('[role="switch"]').attributes('aria-invalid')).toBe('true')
  })

  it('shows error text', () => {
    const wrapper = mount(RigSwitch, { props: { error: 'Toggle required' } })
    expect(wrapper.text()).toContain('Toggle required')
  })

  it('shows label text', () => {
    const wrapper = mount(RigSwitch, {
      props: { modelValue: false, label: 'Enable notifications' },
    })
    expect(wrapper.text()).toContain('Enable notifications')
  })

  it('shows description when no error', () => {
    const wrapper = mount(RigSwitch, {
      props: { modelValue: false, description: 'Sends daily emails' },
    })
    expect(wrapper.text()).toContain('Sends daily emails')
  })
})

describe('RigInput', () => {
  it('renders an input element', () => {
    const wrapper = mount(RigInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('emits update:modelValue on user input', async () => {
    const wrapper = mount(RigInput, { props: { modelValue: '' } })
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('has aria-invalid="true" when error is provided', () => {
    const wrapper = mount(RigInput, { props: { error: 'Invalid value' } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('does not have aria-invalid without error', () => {
    const wrapper = mount(RigInput)
    expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
  })

  it('shows error message', () => {
    const wrapper = mount(RigInput, { props: { error: 'This field is required' } })
    expect(wrapper.text()).toContain('This field is required')
  })

  it('shows description when no error', () => {
    const wrapper = mount(RigInput, { props: { description: 'Enter your email address' } })
    expect(wrapper.text()).toContain('Enter your email address')
  })

  it('renders label when provided', () => {
    const wrapper = mount(RigInput, { props: { label: 'Email' } })
    expect(wrapper.find('label').text()).toContain('Email')
  })

  it('passes type prop to native input', () => {
    const wrapper = mount(RigInput, { props: { type: 'email' } })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })

  it('passes placeholder to native input', () => {
    const wrapper = mount(RigInput, { props: { placeholder: 'you@example.com' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('you@example.com')
  })

  it('shows required asterisk when required', () => {
    const wrapper = mount(RigInput, { props: { label: 'Name', required: true } })
    expect(wrapper.find('span[aria-hidden="true"]').text()).toBe('*')
  })

  it('links label to input via for/id', () => {
    const wrapper = mount(RigInput, { props: { id: 'email-field', label: 'Email' } })
    expect(wrapper.find('label').attributes('for')).toBe('email-field')
    expect(wrapper.find('input').attributes('id')).toBe('email-field')
  })
})
