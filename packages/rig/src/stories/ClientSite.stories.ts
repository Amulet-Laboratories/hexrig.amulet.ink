import type { Meta, StoryObj } from '@storybook/vue3'
import RigNavbar from '../components/RigNavbar.vue'
import RigHero from '../components/RigHero.vue'
import RigCardGrid from '../components/RigCardGrid.vue'
import RigCard from '../components/RigCard.vue'
import RigContactForm from '../components/RigContactForm.vue'
import RigTestimonial from '../components/RigTestimonial.vue'
import RigHoursDisplay from '../components/RigHoursDisplay.vue'
import RigPricingTable from '../components/RigPricingTable.vue'
import RigText from '../components/RigText.vue'
import RigBadge from '../components/RigBadge.vue'

const meta = {
  title: 'Components/Client Site',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Navbar: Story = {
  name: 'RigNavbar',
  render: () => ({
    components: { RigNavbar },
    setup() {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        {
          label: 'Services',
          children: [
            { label: 'Web Design', href: '/services/web' },
            { label: 'Consulting', href: '/services/consulting' },
            { label: 'Photography', href: '/services/photo' },
          ],
        },
        { label: 'Contact', href: '/contact' },
      ]
      return { items }
    },
    template: `
      <div class="min-h-[300px]">
        <RigNavbar brand="Acme Studio" :items="items" sticky bordered />
        <div class="p-8">
          <p class="text-text-muted">Scroll down to see the sticky navbar in action.</p>
        </div>
      </div>
    `,
  }),
}

export const Hero: Story = {
  name: 'RigHero',
  render: () => ({
    components: { RigHero, RigBadge },
    template: `
      <div class="space-y-8">
        <RigHero
          headline="Craft Coffee, Perfected"
          subheadline="Locally roasted. Thoughtfully brewed. Open daily."
          cta-label="View Menu"
          cta-href="#"
          secondary-cta-label="Find Us"
          secondary-cta-href="#"
          size="lg"
        >
          <template #badge>
            <RigBadge tone="accent" variant="soft">Now Open</RigBadge>
          </template>
        </RigHero>

        <RigHero
          headline="Welcome Home"
          subheadline="Your boutique hotel experience awaits"
          cta-label="Book a Room"
          cta-href="#"
          align="left"
          size="md"
          overlay
          :overlay-opacity="0.4"
        >
          <template #background>
            <div class="w-full h-full bg-gradient-to-r from-accent/20 to-transparent" />
          </template>
        </RigHero>
      </div>
    `,
  }),
}

export const ContactForm: Story = {
  name: 'RigContactForm',
  render: () => ({
    components: { RigContactForm, RigText },
    template: `
      <div class="max-w-lg mx-auto p-8 space-y-8">
        <RigText as="h2" variant="heading">Default Form</RigText>
        <RigContactForm form-name="contact-default" />

        <RigText as="h2" variant="heading">Custom Fields</RigText>
        <RigContactForm
          form-name="contact-custom"
          submit-label="Request Quote"
          :fields="[
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'service', label: 'Service', type: 'select', options: [
              { value: 'web', label: 'Web Design' },
              { value: 'consulting', label: 'Consulting' },
              { value: 'photo', label: 'Photography' },
            ] },
            { name: 'message', label: 'Tell us about your project', type: 'textarea', required: true },
          ]"
        />
      </div>
    `,
  }),
}

export const Testimonial: Story = {
  name: 'RigTestimonial',
  render: () => ({
    components: { RigTestimonial, RigText },
    template: `
      <div class="max-w-3xl mx-auto p-8 space-y-8">
        <RigText as="h2" variant="heading">Card (default)</RigText>
        <RigTestimonial
          quote="The team at Acme transformed our online presence. Bookings increased 40% within the first month."
          author="Sarah Chen"
          role="General Manager, The Grand Hotel"
          :rating="5"
        />

        <RigText as="h2" variant="heading">Inline</RigText>
        <RigTestimonial
          quote="Best coffee in town, hands down. The ambiance is perfect for remote work."
          author="Marcus Rivera"
          variant="inline"
          :rating="4"
        />

        <RigText as="h2" variant="heading">Featured</RigText>
        <RigTestimonial
          quote="Working with this studio was a revelation. They understood our vision from day one and delivered beyond our expectations."
          author="Dr. Emily Nguyen"
          role="Licensed Therapist"
          variant="featured"
          :rating="5"
        />
      </div>
    `,
  }),
}

export const HoursDisplay: Story = {
  name: 'RigHoursDisplay',
  render: () => ({
    components: { RigHoursDisplay, RigText },
    setup() {
      const hours = [
        { day: 'Monday', open: '7:00 AM', close: '6:00 PM' },
        { day: 'Tuesday', open: '7:00 AM', close: '6:00 PM' },
        { day: 'Wednesday', open: '7:00 AM', close: '6:00 PM' },
        { day: 'Thursday', open: '7:00 AM', close: '8:00 PM' },
        { day: 'Friday', open: '7:00 AM', close: '8:00 PM' },
        { day: 'Saturday', open: '8:00 AM', close: '4:00 PM' },
        { day: 'Sunday', closed: true },
      ]
      return { hours }
    },
    template: `
      <div class="max-w-sm mx-auto p-8 space-y-8">
        <RigText as="h2" variant="heading">Coffee Shop Hours</RigText>
        <RigHoursDisplay :hours="hours" timezone="EST" />

        <RigText as="h2" variant="heading">Compact</RigText>
        <RigHoursDisplay :hours="hours" compact />
      </div>
    `,
  }),
}

export const PricingTable: Story = {
  name: 'RigPricingTable',
  render: () => ({
    components: { RigPricingTable, RigText },
    setup() {
      const sections = [
        {
          title: 'Espresso Drinks',
          description: 'All made with locally roasted beans',
          items: [
            { name: 'Espresso', price: 3.5 },
            { name: 'Americano', price: 4.0 },
            { name: 'Cappuccino', price: 5.0, badge: 'Popular' },
            { name: 'Latte', price: 5.5 },
            { name: 'Mocha', price: 6.0 },
          ],
        },
        {
          title: 'Pour Over',
          items: [
            { name: 'Single Origin', price: 5.0, description: 'Ask about today\'s selection' },
            { name: 'Cold Brew', price: 5.5 },
            { name: 'Seasonal Special', price: 'Market price', badge: 'New' },
          ],
        },
      ]
      return { sections }
    },
    template: `
      <div class="max-w-2xl mx-auto p-8 space-y-12">
        <div>
          <RigText as="h2" variant="heading" class="mb-4">List (default)</RigText>
          <RigPricingTable :sections="sections" variant="list" />
        </div>

        <div>
          <RigText as="h2" variant="heading" class="mb-4">Card</RigText>
          <RigPricingTable :sections="sections" variant="card" />
        </div>

        <div>
          <RigText as="h2" variant="heading" class="mb-4">Grid</RigText>
          <RigPricingTable :sections="sections" variant="grid" />
        </div>
      </div>
    `,
  }),
}

export const CardGrid: Story = {
  name: 'RigCardGrid',
  render: () => ({
    components: { RigCardGrid, RigCard, RigText },
    template: `
      <div class="p-8 space-y-8">
        <RigText as="h2" variant="heading">Auto-fit Card Grid</RigText>
        <RigCardGrid min-card-width="250px" gap="md">
          <RigCard v-for="i in 6" :key="i">
            <RigText variant="subheading">Card {{ i }}</RigText>
            <RigText color="muted">Automatically adapts to available space.</RigText>
          </RigCard>
        </RigCardGrid>

        <RigText as="h2" variant="heading">Max 3 Columns</RigText>
        <RigCardGrid min-card-width="200px" :max-columns="3" gap="lg">
          <RigCard v-for="i in 5" :key="i">
            <RigText variant="subheading">Service {{ i }}</RigText>
          </RigCard>
        </RigCardGrid>
      </div>
    `,
  }),
}
