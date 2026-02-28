import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigPricingTable from '@rig/components/RigPricingTable.vue'
import type { PricingSection } from '../types'

const sections: PricingSection[] = [
  {
    title: 'Coffee',
    description: 'Our finest brews',
    items: [
      { name: 'Espresso', price: 3.5 },
      { name: 'Latte', price: 5, badge: 'Popular' },
      { name: 'Seasonal Special', price: 'Market price' },
    ],
  },
]

describe('RigPricingTable', () => {
  it('renders section titles', () => {
    const wrapper = mount(RigPricingTable, { props: { sections } })
    expect(wrapper.text()).toContain('Coffee')
  })

  it('renders item names and prices', () => {
    const wrapper = mount(RigPricingTable, { props: { sections } })
    expect(wrapper.text()).toContain('Espresso')
    expect(wrapper.text()).toContain('Latte')
  })

  it('formats numeric prices with currency', () => {
    const wrapper = mount(RigPricingTable, { props: { sections } })
    expect(wrapper.text()).toContain('$3.50')
    expect(wrapper.text()).toContain('$5.00')
  })

  it('renders string prices as-is', () => {
    const wrapper = mount(RigPricingTable, { props: { sections } })
    expect(wrapper.text()).toContain('Market price')
  })

  it('renders badge when item has badge', () => {
    const wrapper = mount(RigPricingTable, { props: { sections } })
    expect(wrapper.text()).toContain('Popular')
  })

  it('renders leader lines in list variant', () => {
    const wrapper = mount(RigPricingTable, { props: { sections, variant: 'list' } })
    expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(true)
    expect(wrapper.html()).toContain('border-dotted')
  })
})
