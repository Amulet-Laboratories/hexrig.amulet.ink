import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigTabs from '../components/RigTabs.vue'
import RigAccordion from '../components/RigAccordion.vue'
import RigBreadcrumb from '../components/RigBreadcrumb.vue'

const meta = {
  title: 'Components/Navigation',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Tabs: Story = {
  name: 'RigTabs',
  render: () => ({
    components: { RigText, RigTabs },
    setup() {
      const active1 = ref('overview')
      const active2 = ref('overview')
      const active3 = ref('general')

      const tabs1 = [
        { value: 'overview', label: 'Overview' },
        { value: 'analytics', label: 'Analytics' },
        { value: 'settings', label: 'Settings' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ]
      const tabs2 = [
        { value: 'overview', label: 'Overview' },
        { value: 'analytics', label: 'Analytics' },
        { value: 'settings', label: 'Settings' },
      ]
      const tabs3 = [
        { value: 'general', label: 'General' },
        { value: 'security', label: 'Security' },
        { value: 'billing', label: 'Billing' },
      ]
      return { active1, active2, active3, tabs1, tabs2, tabs3 }
    },
    template: `
      <div class="space-y-8 max-w-xl">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Underline variant (default)</RigText>
          <RigTabs v-model="active1" :tabs="tabs1" label="Main navigation">
            <template #overview>
              <RigText color="secondary">Overview panel — the project at a glance.</RigText>
            </template>
            <template #analytics>
              <RigText color="secondary">Analytics panel — usage metrics and trends.</RigText>
            </template>
            <template #settings>
              <RigText color="secondary">Settings panel — configuration options.</RigText>
            </template>
          </RigTabs>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Pill variant</RigText>
          <RigTabs v-model="active2" :tabs="tabs2" variant="pill" label="View selector">
            <template #overview>
              <RigText color="secondary">Overview content.</RigText>
            </template>
            <template #analytics>
              <RigText color="secondary">Analytics content.</RigText>
            </template>
            <template #settings>
              <RigText color="secondary">Settings content.</RigText>
            </template>
          </RigTabs>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes</RigText>
          <RigTabs v-model="active3" :tabs="tabs3" size="sm" label="Small tabs" />
          <RigTabs v-model="active3" :tabs="tabs3" size="md" label="Medium tabs" />
          <RigTabs v-model="active3" :tabs="tabs3" size="lg" label="Large tabs" />
        </div>
      </div>
    `,
  }),
}

export const Accordion: Story = {
  name: 'RigAccordion',
  render: () => ({
    components: { RigText, RigAccordion },
    template: `
      <div class="space-y-8 max-w-lg">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Single open (default)</RigText>
          <RigAccordion :items="[
            { value: 'what', label: 'What is Hex?', content: 'Hex is a design token engine that generates CSS custom properties and Tailwind utilities from a structured theme definition.' },
            { value: 'how', label: 'How do themes work?', content: 'Each theme defines tokens for surfaces, text, borders, accents, status, focus, shadows, syntax, and terminal colours — in both dark and light modes.' },
            { value: 'rig', label: 'What is Rig?', content: 'Rig is a minimal Vue 3 component library built on top of Hex tokens. All components consume CSS custom properties, so they inherit the active theme automatically.' },
            { value: 'disabled', label: 'Disabled item', content: 'This content is inaccessible.', disabled: true },
          ]" :default-open="['what']" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Multiple open</RigText>
          <RigAccordion :multiple="true" :items="[
            { value: 'a', label: 'Accordion item A', content: 'Content for item A. Multiple items can be open at the same time.' },
            { value: 'b', label: 'Accordion item B', content: 'Content for item B.' },
            { value: 'c', label: 'Accordion item C', content: 'Content for item C.' },
          ]" :default-open="['a', 'b']" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Slotted content</RigText>
          <RigAccordion :items="[{ value: 'slot', label: 'Custom slot content' }]">
            <template #slot>
              <div class="space-y-2">
                <RigText color="secondary">Slots can render any content.</RigText>
                <RigText variant="mono" color="muted">template #item-value { ... }</RigText>
              </div>
            </template>
          </RigAccordion>
        </div>
      </div>
    `,
  }),
}

export const Breadcrumb: Story = {
  name: 'RigBreadcrumb',
  render: () => ({
    components: { RigText, RigBreadcrumb },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Standard breadcrumb</RigText>
          <RigBreadcrumb :items="[
            { label: 'Home', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Navigation' },
          ]" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Deep path</RigText>
          <RigBreadcrumb :items="[
            { label: 'Amulet', href: '#' },
            { label: 'HexRig', href: '#' },
            { label: 'Rig', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Navigation', href: '#' },
            { label: 'Breadcrumb' },
          ]" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Custom separator</RigText>
          <RigBreadcrumb separator=">" :items="[
            { label: 'Home', href: '#' },
            { label: 'Settings', href: '#' },
            { label: 'Billing' },
          ]" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">No links (current page only)</RigText>
          <RigBreadcrumb :items="[{ label: 'Dashboard' }]" />
        </div>
      </div>
    `,
  }),
}
