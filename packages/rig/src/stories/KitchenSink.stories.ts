import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigButton from '../components/RigButton.vue'
import RigInput from '../components/RigInput.vue'
import RigSurface from '../components/RigSurface.vue'
import RigDivider from '../components/RigDivider.vue'
import RigBadge from '../components/RigBadge.vue'
import RigAlert from '../components/RigAlert.vue'
import RigCard from '../components/RigCard.vue'
import RigDialog from '../components/RigDialog.vue'
import RigToast from '../components/RigToast.vue'
import { useToast } from '../composables/useToast'

const meta = {
  title: 'Showcase/Kitchen Sink',
} satisfies Meta

export default meta
type Story = StoryObj

export const KitchenSink: Story = {
  render: () => ({
    components: {
      RigText, RigButton, RigInput, RigSurface, RigDivider,
      RigBadge, RigAlert, RigCard, RigDialog, RigToast,
    },
    setup() {
      const dialogOpen = ref(false)
      const inputValue = ref('')
      const searchValue = ref('')
      const toast = useToast()

      const showToast = () => toast.show({
        title: 'Action completed',
        description: 'Your changes have been saved.',
        tone: 'success',
        dismissible: true,
      })

      return { dialogOpen, inputValue, searchValue, showToast }
    },
    template: `
      <div class="space-y-8">
        <!-- Typography -->
        <section>
          <RigText variant="overline" color="accent" class="mb-2">Typography</RigText>
          <RigText variant="display" class="mb-2">Display Heading</RigText>
          <RigText variant="heading" class="mb-1">Section Heading</RigText>
          <RigText variant="subheading" color="secondary" class="mb-3">Subheading with secondary color</RigText>
          <RigText color="secondary">
            Body text for paragraphs. The quick brown fox jumps over the lazy dog.
            Typography tokens flow from Hex into Rig, ensuring consistency.
          </RigText>
        </section>

        <RigDivider />

        <!-- Buttons -->
        <section>
          <RigText variant="overline" color="accent" class="mb-3">Buttons</RigText>
          <div class="flex flex-wrap gap-3 mb-3">
            <RigButton variant="solid">Solid</RigButton>
            <RigButton variant="outline">Outline</RigButton>
            <RigButton variant="ghost">Ghost</RigButton>
            <RigButton variant="link">Link</RigButton>
          </div>
          <div class="flex flex-wrap gap-3 mb-3">
            <RigButton size="sm">Small</RigButton>
            <RigButton size="md">Medium</RigButton>
            <RigButton size="lg">Large</RigButton>
          </div>
          <div class="flex flex-wrap gap-3">
            <RigButton tone="accent">Accent</RigButton>
            <RigButton tone="neutral">Neutral</RigButton>
            <RigButton tone="danger">Danger</RigButton>
            <RigButton disabled>Disabled</RigButton>
            <RigButton loading>Loading</RigButton>
          </div>
        </section>

        <RigDivider />

        <!-- Inputs -->
        <section>
          <RigText variant="overline" color="accent" class="mb-3">Inputs</RigText>
          <div class="grid grid-cols-2 gap-4 max-w-lg">
            <RigInput v-model="inputValue" label="Name" placeholder="Jane Doe" required />
            <RigInput v-model="searchValue" label="Search" placeholder="Search..." type="search" description="Find anything." />
          </div>
        </section>

        <RigDivider />

        <!-- Badges -->
        <section>
          <RigText variant="overline" color="accent" class="mb-3">Badges</RigText>
          <div class="flex flex-wrap gap-2 mb-3">
            <RigBadge tone="accent">Accent</RigBadge>
            <RigBadge tone="success" dot>Online</RigBadge>
            <RigBadge tone="warning">Warning</RigBadge>
            <RigBadge tone="error" variant="solid">Critical</RigBadge>
            <RigBadge tone="info" variant="outline">Info</RigBadge>
            <RigBadge tone="neutral" removable>Removable</RigBadge>
          </div>
        </section>

        <RigDivider />

        <!-- Alerts -->
        <section>
          <RigText variant="overline" color="accent" class="mb-3">Alerts</RigText>
          <div class="flex flex-col gap-3 max-w-lg">
            <RigAlert tone="info" title="Information">Keep your dependencies up to date.</RigAlert>
            <RigAlert tone="success" title="Deployed">The latest build is live.</RigAlert>
            <RigAlert tone="warning" title="Deprecation" dismissible>This API will be removed in v3.</RigAlert>
            <RigAlert tone="error" title="Build Failed">Check the console for errors.</RigAlert>
          </div>
        </section>

        <RigDivider />

        <!-- Cards -->
        <section>
          <RigText variant="overline" color="accent" class="mb-3">Cards</RigText>
          <div class="grid grid-cols-3 gap-4">
            <RigCard elevation="flat">
              <RigText variant="subheading" class="mb-1">Flat</RigText>
              <RigText color="muted" variant="caption">Minimal elevation</RigText>
            </RigCard>
            <RigCard elevation="raised">
              <RigText variant="subheading" class="mb-1">Raised</RigText>
              <RigText color="muted" variant="caption">Standard shadow</RigText>
            </RigCard>
            <RigCard elevation="prominent" interactive>
              <RigText variant="subheading" class="mb-1">Prominent</RigText>
              <RigText color="muted" variant="caption">Interactive hover</RigText>
            </RigCard>
          </div>
        </section>

        <RigDivider />

        <!-- Surfaces -->
        <section>
          <RigText variant="overline" color="accent" class="mb-3">Surfaces</RigText>
          <div class="flex gap-4">
            <RigSurface v-for="e in ['sunken', 'base', 'raised', 'overlay']" :key="e" :elevation="e" padding="md" border class="flex-1">
              <RigText variant="mono" color="muted">{{ e }}</RigText>
            </RigSurface>
          </div>
        </section>

        <RigDivider />

        <!-- Dialog & Toast -->
        <section>
          <RigText variant="overline" color="accent" class="mb-3">Dialog & Toast</RigText>
          <div class="flex gap-3">
            <RigButton @click="dialogOpen = true">Open Dialog</RigButton>
            <RigButton variant="outline" @click="showToast">Show Toast</RigButton>
          </div>
          <RigDialog v-model="dialogOpen" title="Kitchen Sink Dialog" description="Testing all components together.">
            <RigText color="secondary">Everything works in harmony.</RigText>
            <template #footer>
              <RigButton variant="ghost" @click="dialogOpen = false">Close</RigButton>
              <RigButton @click="dialogOpen = false">Confirm</RigButton>
            </template>
          </RigDialog>
          <RigToast />
        </section>
      </div>
    `,
  }),
}
