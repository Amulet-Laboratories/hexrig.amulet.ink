import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RigHoursDisplay from '@rig/components/RigHoursDisplay.vue'
import type { BusinessHours } from '../types'

const sampleHours: BusinessHours[] = [
  { day: 'Monday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Tuesday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Wednesday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Thursday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Friday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Saturday', open: '10:00 AM', close: '3:00 PM' },
  { day: 'Sunday', closed: true },
]

describe('RigHoursDisplay', () => {
  beforeEach(() => {
    // Pin to Monday at 10:00 AM
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-02T10:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders all day entries', () => {
    const wrapper = mount(RigHoursDisplay, { props: { hours: sampleHours } })
    for (const entry of sampleHours) {
      expect(wrapper.text()).toContain(entry.day)
    }
  })

  it('shows "Closed" for days marked closed', () => {
    const wrapper = mount(RigHoursDisplay, { props: { hours: sampleHours } })
    const sundayRow = wrapper.findAll('div').find((el) => el.text().includes('Sunday'))
    expect(sundayRow?.text()).toContain('Closed')
  })

  it('shows time range for open days', () => {
    const wrapper = mount(RigHoursDisplay, { props: { hours: sampleHours } })
    expect(wrapper.text()).toContain('9:00 AM')
    expect(wrapper.text()).toContain('5:00 PM')
  })

  it('shows status badge when showStatus=true', () => {
    const wrapper = mount(RigHoursDisplay, { props: { hours: sampleHours, showStatus: true } })
    expect(wrapper.text()).toContain('Open Now')
  })

  it('highlights today row', () => {
    const wrapper = mount(RigHoursDisplay, { props: { hours: sampleHours, highlightToday: true } })
    const mondayRow = wrapper.findAll('div').find((el) => el.text().includes('Monday'))
    expect(mondayRow?.html()).toContain('border-accent')
  })
})
