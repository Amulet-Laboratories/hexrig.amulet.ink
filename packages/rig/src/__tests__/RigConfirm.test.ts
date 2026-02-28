import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RigConfirm from '@rig/components/RigConfirm.vue'

describe('RigConfirm', () => {
  const scrollLockKey = Symbol.for('rig-scroll-lock')

  beforeEach(() => {
    const g = globalThis as unknown as Record<symbol, unknown>
    g[scrollLockKey] = { value: 0, savedOverflow: '' }
    document.body.style.overflow = ''
  })

  const mountConfirm = (props: Record<string, unknown> = {}) => {
    return mount(RigConfirm, {
      props: {
        modelValue: true,
        title: 'Delete item?',
        description: 'This cannot be undone.',
        ...props,
      },
      global: {
        stubs: { Teleport: true, Transition: true },
      },
    })
  }

  it('renders title and description', () => {
    const wrapper = mountConfirm()
    expect(wrapper.text()).toContain('Delete item?')
    expect(wrapper.text()).toContain('This cannot be undone.')
  })

  it('renders default confirm and cancel labels', () => {
    const wrapper = mountConfirm()
    expect(wrapper.text()).toContain('Confirm')
    expect(wrapper.text()).toContain('Cancel')
  })

  it('renders custom confirm and cancel labels', () => {
    const wrapper = mountConfirm({ confirmLabel: 'Delete', cancelLabel: 'Keep' })
    expect(wrapper.text()).toContain('Delete')
    expect(wrapper.text()).toContain('Keep')
  })

  it('emits confirm when confirm button is clicked', async () => {
    const wrapper = mountConfirm()
    const buttons = wrapper.findAll('button').filter((b) => b.text() === 'Confirm')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('emits cancel when cancel button is clicked', async () => {
    const wrapper = mountConfirm()
    const buttons = wrapper.findAll('button').filter((b) => b.text() === 'Cancel')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })

  it('emits update:modelValue false when cancel is clicked', async () => {
    const wrapper = mountConfirm()
    const buttons = wrapper.findAll('button').filter((b) => b.text() === 'Cancel')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const emitted = wrapper.emitted('update:modelValue') as boolean[][]
    expect(emitted[emitted.length - 1][0]).toBe(false)
  })

  it('disables buttons when loading', () => {
    const wrapper = mountConfirm({ loading: true })
    const confirmBtn = wrapper.findAll('button').filter((b) => b.text().includes('Confirm'))
    expect(confirmBtn[0].attributes('disabled')).toBeDefined()
  })

  it('does not emit confirm when loading', async () => {
    const wrapper = mountConfirm({ loading: true })
    const buttons = wrapper.findAll('button').filter((b) => b.text().includes('Confirm'))
    await buttons[0].trigger('click')
    expect(wrapper.emitted('confirm')).toBeUndefined()
  })

  it('is not visible when modelValue is false', () => {
    const wrapper = mount(RigConfirm, {
      props: { modelValue: false, title: 'Delete?' },
      global: { stubs: { Teleport: true, Transition: true } },
    })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })
})
