import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigTestimonial from '@rig/components/RigTestimonial.vue'

describe('RigTestimonial', () => {
  it('renders quote text and author', () => {
    const wrapper = mount(RigTestimonial, {
      props: { quote: 'Great service!', author: 'Jane Doe' },
    })
    expect(wrapper.text()).toContain('Great service!')
    expect(wrapper.text()).toContain('Jane Doe')
  })

  it('renders role when provided', () => {
    const wrapper = mount(RigTestimonial, {
      props: { quote: 'Amazing!', author: 'John', role: 'CEO' },
    })
    expect(wrapper.text()).toContain('CEO')
  })

  it('renders rating stars', () => {
    const wrapper = mount(RigTestimonial, {
      props: { quote: 'Good', author: 'Alice', rating: 4 },
    })
    const stars = wrapper.findAll('[role="img"] svg')
    expect(stars).toHaveLength(5)
    expect(wrapper.find('[aria-label="4 out of 5 stars"]').exists()).toBe(true)
  })

  it('renders inline variant without card classes', () => {
    const wrapper = mount(RigTestimonial, {
      props: { quote: 'Nice', author: 'Bob', variant: 'inline' },
    })
    expect(wrapper.html()).toContain('flex gap-4')
  })

  it('renders featured variant with centered alignment', () => {
    const wrapper = mount(RigTestimonial, {
      props: { quote: 'Awesome', author: 'Carol', variant: 'featured' },
    })
    expect(wrapper.html()).toContain('text-center')
  })
})
