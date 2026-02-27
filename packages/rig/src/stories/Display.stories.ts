import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigCard from '../components/RigCard.vue'
import RigDialog from '../components/RigDialog.vue'
import RigButton from '../components/RigButton.vue'
import RigInput from '../components/RigInput.vue'
import RigContainer from '../components/RigContainer.vue'
import RigStack from '../components/RigStack.vue'
import RigGrid from '../components/RigGrid.vue'
import RigSpacer from '../components/RigSpacer.vue'
import RigSpinner from '../components/RigSpinner.vue'

const meta = {
  title: 'Components/Display',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Card: Story = {
  name: 'RigCard',
  render: () => ({
    components: { RigText, RigCard },
    setup() {
      const lastActivated = ref('')
      return { lastActivated }
    },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Elevations</RigText>
          <div class="grid grid-cols-3 gap-4">
            <RigCard elevation="flat">
              <RigText variant="subheading" class="mb-1">Flat</RigText>
              <RigText variant="caption" color="muted">Bordered, no shadow</RigText>
            </RigCard>
            <RigCard elevation="raised">
              <RigText variant="subheading" class="mb-1">Raised</RigText>
              <RigText variant="caption" color="muted">Standard card shadow</RigText>
            </RigCard>
            <RigCard elevation="prominent">
              <RigText variant="subheading" class="mb-1">Prominent</RigText>
              <RigText variant="caption" color="muted">Heavy shadow</RigText>
            </RigCard>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Interactive</RigText>
          <div class="grid grid-cols-2 gap-4">
            <RigCard elevation="raised" interactive aria-label="Clickable card" @activate="lastActivated = 'raised'">
              <RigText variant="subheading" class="mb-1">Interactive card</RigText>
              <RigText variant="caption" color="muted">Click or press Enter/Space. Hover to see shadow lift.</RigText>
            </RigCard>
            <RigCard elevation="prominent" interactive aria-label="Prominent interactive" @activate="lastActivated = 'prominent'">
              <RigText variant="subheading" class="mb-1">Prominent interactive</RigText>
              <RigText variant="caption" color="muted">Full keyboard accessible via role="button".</RigText>
            </RigCard>
          </div>
          <RigText v-if="lastActivated" variant="caption" color="accent">Activated: {{ lastActivated }}</RigText>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">With header and footer slots</RigText>
          <RigCard elevation="raised" class="max-w-sm">
            <template #header>
              <RigText variant="subheading">Card header</RigText>
            </template>
            <RigText color="secondary">Card body content. Can contain any components.</RigText>
            <template #footer>
              <RigText variant="caption" color="muted">Last updated 2 hours ago</RigText>
            </template>
          </RigCard>
        </div>
      </div>
    `,
  }),
}

export const Dialog: Story = {
  name: 'RigDialog',
  render: () => ({
    components: { RigText, RigDialog, RigButton, RigInput },
    setup() {
      const smOpen = ref(false)
      const mdOpen = ref(false)
      const lgOpen = ref(false)
      const persistentOpen = ref(false)
      const formOpen = ref(false)
      const formValue = ref('')
      return { smOpen, mdOpen, lgOpen, persistentOpen, formOpen, formValue }
    },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes</RigText>
          <div class="flex gap-3">
            <RigButton variant="outline" @click="smOpen = true">Small dialog</RigButton>
            <RigButton variant="outline" @click="mdOpen = true">Medium dialog</RigButton>
            <RigButton variant="outline" @click="lgOpen = true">Large dialog</RigButton>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Behaviours</RigText>
          <div class="flex gap-3">
            <RigButton variant="outline" @click="persistentOpen = true">Persistent (no backdrop dismiss)</RigButton>
            <RigButton variant="outline" @click="formOpen = true">With form</RigButton>
          </div>
        </div>

        <RigText variant="caption" color="muted">Focus is trapped inside the dialog. Escape closes dismissible dialogs. Scroll is locked while open.</RigText>

        <!-- Dialogs -->
        <RigDialog v-model="smOpen" size="sm" title="Small dialog" description="Compact dialog for confirmations.">
          <RigText color="secondary">Are you sure you want to delete this item?</RigText>
          <template #footer>
            <RigButton variant="ghost" @click="smOpen = false">Cancel</RigButton>
            <RigButton tone="danger" @click="smOpen = false">Delete</RigButton>
          </template>
        </RigDialog>

        <RigDialog v-model="mdOpen" size="md" title="Medium dialog" description="Default size for most use cases.">
          <RigText color="secondary">This is the standard dialog size. It accommodates forms, detail views, and most modal content comfortably.</RigText>
          <template #footer>
            <RigButton variant="ghost" @click="mdOpen = false">Cancel</RigButton>
            <RigButton @click="mdOpen = false">Confirm</RigButton>
          </template>
        </RigDialog>

        <RigDialog v-model="lgOpen" size="lg" title="Large dialog" description="For rich content, tables, or multi-step flows.">
          <RigText color="secondary">Large dialogs provide space for complex content. Consider whether a full page would serve the user better at this scale.</RigText>
          <template #footer>
            <RigButton variant="ghost" @click="lgOpen = false">Close</RigButton>
          </template>
        </RigDialog>

        <RigDialog v-model="persistentOpen" :persistent="true" title="Persistent dialog" description="Clicking the backdrop does not close this dialog.">
          <RigText color="secondary">Use the button to close. Escape key still works.</RigText>
          <template #footer>
            <RigButton @click="persistentOpen = false">Done</RigButton>
          </template>
        </RigDialog>

        <RigDialog v-model="formOpen" title="Create project" description="Fill in the details below.">
          <RigInput v-model="formValue" label="Project name" placeholder="My project" required class="mb-4" />
          <template #footer>
            <RigButton variant="ghost" @click="formOpen = false">Cancel</RigButton>
            <RigButton @click="formOpen = false">Create</RigButton>
          </template>
        </RigDialog>
      </div>
    `,
  }),
}

export const Layout: Story = {
  name: 'RigContainer / RigStack / RigGrid',
  render: () => ({
    components: { RigText, RigContainer, RigStack, RigGrid, RigSpacer, RigSpinner },
    template: `
      <div class="space-y-8">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">RigStack — vertical (default)</RigText>
          <div class="border border-border-subtle rounded p-4 max-w-xs">
            <RigStack gap="md">
              <div class="bg-accent-muted rounded p-2"><RigText variant="caption">Item 1</RigText></div>
              <div class="bg-accent-muted rounded p-2"><RigText variant="caption">Item 2</RigText></div>
              <div class="bg-accent-muted rounded p-2"><RigText variant="caption">Item 3</RigText></div>
            </RigStack>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">RigStack — horizontal</RigText>
          <div class="border border-border-subtle rounded p-4">
            <RigStack direction="horizontal" gap="md" align="center">
              <RigSpinner size="sm" />
              <RigText color="secondary">Loading content...</RigText>
            </RigStack>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">RigGrid — responsive columns</RigText>
          <RigGrid :cols="3" gap="md">
            <div v-for="i in 6" :key="i" class="bg-surface-raised border border-border-subtle rounded p-3">
              <RigText variant="caption" color="muted">Grid cell {{ i }}</RigText>
            </div>
          </RigGrid>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">RigSpacer</RigText>
          <div class="border border-border-subtle rounded p-4 flex flex-col">
            <RigText variant="caption">Top content</RigText>
            <RigSpacer size="xl" />
            <RigText variant="caption" color="muted">After xl spacer</RigText>
            <RigSpacer size="md" />
            <RigText variant="caption" color="muted">After md spacer</RigText>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">RigContainer — centered content</RigText>
          <div class="border border-border-subtle rounded">
            <RigContainer size="sm" :center="true" :padding="true">
              <RigText color="secondary">Content constrained to sm max-width, centered, with padding.</RigText>
            </RigContainer>
          </div>
        </div>
      </div>
    `,
  }),
}
