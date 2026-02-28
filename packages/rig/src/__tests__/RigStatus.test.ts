import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigStatus from '@rig/components/RigStatus.vue'

describe('RigStatus', () => {
  it('renders a dot element', () => {
    const wrapper = mount(RigStatus, { props: { status: 'healthy' } })
    expect(wrapper.find('.rounded-full').exists()).toBe(true)
  })

  it('applies success color for healthy status', () => {
    const wrapper = mount(RigStatus, { props: { status: 'healthy' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('bg-status-success')
  })

  it('applies success color for active status', () => {
    const wrapper = mount(RigStatus, { props: { status: 'active' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('bg-status-success')
  })

  it('applies warning color for warning status', () => {
    const wrapper = mount(RigStatus, { props: { status: 'warning' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('bg-status-warning')
  })

  it('applies warning color for wip status', () => {
    const wrapper = mount(RigStatus, { props: { status: 'wip' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('bg-status-warning')
  })

  it('applies error color for critical status', () => {
    const wrapper = mount(RigStatus, { props: { status: 'critical' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('bg-status-error')
  })

  it('applies error color for error status', () => {
    const wrapper = mount(RigStatus, { props: { status: 'error' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('bg-status-error')
  })

  it('applies info color for info status', () => {
    const wrapper = mount(RigStatus, { props: { status: 'info' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('bg-status-info')
  })

  it('applies muted color for neutral status', () => {
    const wrapper = mount(RigStatus, { props: { status: 'neutral' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('bg-text-muted')
  })

  it('renders label text when provided', () => {
    const wrapper = mount(RigStatus, { props: { status: 'healthy', label: 'Online' } })
    expect(wrapper.text()).toContain('Online')
  })

  it('does not render label text when not provided', () => {
    const wrapper = mount(RigStatus, { props: { status: 'healthy' } })
    const spans = wrapper.findAll('span')
    // Should not have a label span — only the dot wrapper and dot itself
    const textSpans = spans.filter((s) => s.text().length > 0)
    expect(textSpans).toHaveLength(0)
  })

  it('renders pulse animation when pulse is true', () => {
    const wrapper = mount(RigStatus, { props: { status: 'healthy', pulse: true } })
    expect(wrapper.find('.animate-ping').exists()).toBe(true)
  })

  it('does not render pulse when pulse is false', () => {
    const wrapper = mount(RigStatus, { props: { status: 'healthy', pulse: false } })
    expect(wrapper.find('.animate-ping').exists()).toBe(false)
  })

  it('applies sm size classes', () => {
    const wrapper = mount(RigStatus, { props: { status: 'healthy', size: 'sm' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('h-1.5')
    expect(wrapper.find('.rounded-full').classes()).toContain('w-1.5')
  })

  it('applies lg size classes', () => {
    const wrapper = mount(RigStatus, { props: { status: 'healthy', size: 'lg' } })
    expect(wrapper.find('.rounded-full').classes()).toContain('h-2.5')
    expect(wrapper.find('.rounded-full').classes()).toContain('w-2.5')
  })
})
