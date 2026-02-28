import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RigContactForm from '@rig/components/RigContactForm.vue'

describe('RigContactForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders default fields (name, email, message)', () => {
    const wrapper = mount(RigContactForm, { props: { formName: 'contact' } })
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Message')
  })

  it('renders custom fields when provided', () => {
    const wrapper = mount(RigContactForm, {
      props: {
        formName: 'contact',
        fields: [{ name: 'phone', label: 'Phone', type: 'tel' }],
      },
    })
    expect(wrapper.text()).toContain('Phone')
    // Default fields should not appear
    expect(wrapper.find('textarea')).toBeDefined()
    expect(wrapper.findAll('label').some((l) => l.text().includes('Name'))).toBe(false)
  })

  it('shows validation error for required empty field on submit', async () => {
    const wrapper = mount(RigContactForm, { props: { formName: 'contact' } })
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('Name is required')
  })

  it('shows validation error for invalid email', async () => {
    const wrapper = mount(RigContactForm, { props: { formName: 'contact' } })
    // Fill name and invalid email
    const inputs = wrapper.findAllComponents({ name: 'RigInput' })
    const nameInput = inputs.find((c) => c.props('label') === 'Name')
    const emailInput = inputs.find((c) => c.props('label') === 'Email')
    if (nameInput) await nameInput.vm.$emit('update:modelValue', 'John')
    if (emailInput) await emailInput.vm.$emit('update:modelValue', 'invalid')
    // Fill textarea
    const textarea = wrapper.find('textarea')
    if (textarea.exists()) {
      await textarea.setValue('Hello')
    }
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('valid email')
  })

  it('emits submit event with form data', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 200 }))
    const wrapper = mount(RigContactForm, { props: { formName: 'contact' } })
    const inputs = wrapper.findAllComponents({ name: 'RigInput' })
    const nameInput = inputs.find((c) => c.props('label') === 'Name')
    const emailInput = inputs.find((c) => c.props('label') === 'Email')
    if (nameInput) await nameInput.vm.$emit('update:modelValue', 'Jane')
    if (emailInput) await emailInput.vm.$emit('update:modelValue', 'jane@test.com')
    const textarea = wrapper.find('textarea')
    if (textarea.exists()) await textarea.setValue('Hi there')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('shows success message after successful submit', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 200 }))
    const wrapper = mount(RigContactForm, { props: { formName: 'contact' } })
    const inputs = wrapper.findAllComponents({ name: 'RigInput' })
    const nameInput = inputs.find((c) => c.props('label') === 'Name')
    const emailInput = inputs.find((c) => c.props('label') === 'Email')
    if (nameInput) await nameInput.vm.$emit('update:modelValue', 'Jane')
    if (emailInput) await emailInput.vm.$emit('update:modelValue', 'jane@test.com')
    const textarea = wrapper.find('textarea')
    if (textarea.exists()) await textarea.setValue('Hi there')
    await wrapper.find('form').trigger('submit')
    // Wait for async fetch to complete
    await vi.waitFor(() => {
      expect(wrapper.text()).toContain("Thank you")
    })
  })

  it('shows error alert after failed submit', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))
    const wrapper = mount(RigContactForm, { props: { formName: 'contact' } })
    const inputs = wrapper.findAllComponents({ name: 'RigInput' })
    const nameInput = inputs.find((c) => c.props('label') === 'Name')
    const emailInput = inputs.find((c) => c.props('label') === 'Email')
    if (nameInput) await nameInput.vm.$emit('update:modelValue', 'Jane')
    if (emailInput) await emailInput.vm.$emit('update:modelValue', 'jane@test.com')
    const textarea = wrapper.find('textarea')
    if (textarea.exists()) await textarea.setValue('Hi there')
    await wrapper.find('form').trigger('submit')
    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Something went wrong')
    })
  })

  it('renders honeypot field', () => {
    const wrapper = mount(RigContactForm, { props: { formName: 'contact' } })
    expect(wrapper.find('input[name="bot-field"]').exists()).toBe(true)
    expect(wrapper.find('input[name="form-name"]').exists()).toBe(true)
  })
})
