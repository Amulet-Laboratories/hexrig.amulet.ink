import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigAlert from '@rig/components/RigAlert.vue'

describe('RigAlert', () => {
  it('renders when visible is true (default)', () => {
    const wrapper = mount(RigAlert, { props: { visible: true } })
    expect(wrapper.find('[role]').exists()).toBe(true)
  })

  it('does not render when visible is false', () => {
    const wrapper = mount(RigAlert, { props: { visible: false } })
    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  it('shows dismiss button when dismissible=true', () => {
    const wrapper = mount(RigAlert, { props: { dismissible: true } })
    expect(wrapper.find('button[aria-label="Dismiss"]').exists()).toBe(true)
  })

  it('hides dismiss button when dismissible=false', () => {
    const wrapper = mount(RigAlert, { props: { dismissible: false } })
    expect(wrapper.find('button[aria-label="Dismiss"]').exists()).toBe(false)
  })

  it('emits "dismiss" when dismiss button is clicked', async () => {
    const wrapper = mount(RigAlert, { props: { dismissible: true } })
    await wrapper.find('button[aria-label="Dismiss"]').trigger('click')
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })

  it('emits "update:visible" with false when dismissed', async () => {
    const wrapper = mount(RigAlert, { props: { dismissible: true } })
    await wrapper.find('button[aria-label="Dismiss"]').trigger('click')
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
  })

  it('has role="alert" for error tone', () => {
    const wrapper = mount(RigAlert, { props: { tone: 'error' } })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('has role="alert" for warning tone', () => {
    const wrapper = mount(RigAlert, { props: { tone: 'warning' } })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('has role="status" for info tone', () => {
    const wrapper = mount(RigAlert, { props: { tone: 'info' } })
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
  })

  it('has role="status" for success tone', () => {
    const wrapper = mount(RigAlert, { props: { tone: 'success' } })
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
  })

  it('shows title when provided', () => {
    const wrapper = mount(RigAlert, { props: { title: 'Important notice' } })
    expect(wrapper.text()).toContain('Important notice')
  })

  it('renders slot content', () => {
    const wrapper = mount(RigAlert, { slots: { default: 'Alert body text' } })
    expect(wrapper.text()).toContain('Alert body text')
  })

  it('renders icon by default', () => {
    const wrapper = mount(RigAlert)
    expect(wrapper.find('svg[aria-hidden="true"]').exists()).toBe(true)
  })

  it('hides icon when icon=false', () => {
    const wrapper = mount(RigAlert, { props: { icon: false } })
    // No icon svg rendered; dismiss button svg is different since no dismiss
    expect(wrapper.find('svg').exists()).toBe(false)
  })
})
