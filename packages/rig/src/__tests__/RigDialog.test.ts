import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import RigDialog from '@rig/components/RigDialog.vue'

const stubs = { Teleport: true, Transition: true }

const mountDialog = (props: Record<string, unknown> = {}, slots: Record<string, string> = {}) =>
  mount(RigDialog, {
    props,
    slots,
    global: { stubs },
  })

describe('RigDialog', () => {
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

  it('renders nothing when modelValue=false', () => {
    const wrapper = mountDialog({ modelValue: false })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('renders dialog element when modelValue=true', () => {
    const wrapper = mountDialog({ modelValue: true })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    expect(wrapper.find('[aria-modal="true"]').exists()).toBe(true)
  })

  it('emits update:modelValue=false when dismiss button clicked', async () => {
    const wrapper = mountDialog({ modelValue: true, dismissible: true })
    await wrapper.find('button[aria-label="Close dialog"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not render dismiss button when dismissible=false', () => {
    const wrapper = mountDialog({ modelValue: true, dismissible: false })
    expect(wrapper.find('button[aria-label="Close dialog"]').exists()).toBe(false)
  })

  it('emits update:modelValue=false on backdrop click when dismissible=true', async () => {
    const wrapper = mountDialog({ modelValue: true, dismissible: true })
    await wrapper.find('.fixed').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does NOT emit on backdrop click when persistent=true', async () => {
    const wrapper = mountDialog({ modelValue: true, persistent: true })
    await wrapper.find('.fixed').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('does NOT emit on backdrop click when dismissible=false', async () => {
    const wrapper = mountDialog({ modelValue: true, dismissible: false })
    await wrapper.find('.fixed').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('has aria-labelledby pointing to the title element when title is provided', () => {
    const wrapper = mountDialog({ modelValue: true, title: 'Confirm delete' })
    const dialog = wrapper.find('[role="dialog"]')
    const labelledBy = dialog.attributes('aria-labelledby')
    expect(labelledBy).toBeTruthy()
    expect(wrapper.find(`#${labelledBy}`).text()).toBe('Confirm delete')
  })

  it('has aria-label="Dialog" when no title is provided', () => {
    const wrapper = mountDialog({ modelValue: true })
    expect(wrapper.find('[aria-label="Dialog"]').exists()).toBe(true)
  })

  it('closes on Escape key when dismissible=true', async () => {
    const wrapper = mountDialog({ modelValue: true, dismissible: true })
    await wrapper.find('[role="dialog"]').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does NOT close on Escape when dismissible=false', async () => {
    const wrapper = mountDialog({ modelValue: true, dismissible: false })
    await wrapper.find('[role="dialog"]').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('locks body scroll when dialog opens', async () => {
    const wrapper = mountDialog({ modelValue: false })
    await wrapper.setProps({ modelValue: true })
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scroll when dialog closes', async () => {
    const wrapper = mountDialog({ modelValue: false })
    await wrapper.setProps({ modelValue: true })
    await wrapper.setProps({ modelValue: false })
    expect(document.body.style.overflow).toBe('')
  })

  it('renders slot content', () => {
    const wrapper = mountDialog({ modelValue: true }, { default: 'Body text here' })
    expect(wrapper.text()).toContain('Body text here')
  })

  it('renders title and description text', () => {
    const wrapper = mountDialog({ modelValue: true, title: 'Hello', description: 'A description' })
    expect(wrapper.text()).toContain('Hello')
    expect(wrapper.text()).toContain('A description')
  })

  it('fires dev warning when open without a title', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mountDialog({ modelValue: true })
    await nextTick()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[RigDialog]'))
    spy.mockRestore()
  })
})
