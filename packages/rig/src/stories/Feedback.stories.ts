import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigAlert from '../components/RigAlert.vue'
import RigBadge from '../components/RigBadge.vue'
import RigTag from '../components/RigTag.vue'
import RigSpinner from '../components/RigSpinner.vue'
import RigProgress from '../components/RigProgress.vue'
import RigSkeleton from '../components/RigSkeleton.vue'
import RigTooltip from '../components/RigTooltip.vue'
import RigButton from '../components/RigButton.vue'
import RigToast from '../components/RigToast.vue'
import { useToast } from '../composables/useToast'

const meta = {
  title: 'Components/Feedback',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Alert: Story = {
  name: 'RigAlert',
  render: () => ({
    components: { RigText, RigAlert },
    setup() {
      const show = ref(true)
      return { show }
    },
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Tones</RigText>
          <RigAlert tone="info" title="Information">Your session will expire in 30 minutes.</RigAlert>
          <RigAlert tone="success" title="Deployed">The latest build went live 2 minutes ago.</RigAlert>
          <RigAlert tone="warning" title="Deprecation notice">This API will be removed in v3. Migrate by March 2026.</RigAlert>
          <RigAlert tone="error" title="Build failed">3 type errors in packages/rig/src — check the console.</RigAlert>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Dismissible</RigText>
          <RigAlert v-model:visible="show" tone="warning" title="Dismissible alert" dismissible>
            Click the × to dismiss. v-model:visible binds to the visible state.
          </RigAlert>
          <RigAlert tone="info" title="No icon" :icon="false">Alert without the status icon.</RigAlert>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">No title</RigText>
          <RigAlert tone="info">Inline informational message with no title.</RigAlert>
          <RigAlert tone="error">Something went wrong. Please try again later.</RigAlert>
        </div>
      </div>
    `,
  }),
}

export const BadgeVsTag: Story = {
  name: 'Badge vs Tag',
  render: () => ({
    components: { RigText, RigBadge, RigTag },
    template: `
      <div class="max-w-2xl space-y-8">
        <div class="space-y-2">
          <RigText variant="heading">Badge vs Tag</RigText>
          <RigText color="secondary">Two similar-looking components with different purposes. Choose based on whether the label represents system-generated information or something the user can act on.</RigText>
        </div>

        <div class="grid sm:grid-cols-2 gap-6">
          <div class="space-y-3 rounded-lg border border-border-subtle p-4">
            <RigText variant="subheading">RigBadge</RigText>
            <RigText variant="caption" color="secondary">Presentational — communicates system status, category, or count. Not interactive. No disabled state. Use when the label is informational only.</RigText>
            <div class="space-y-2 pt-2">
              <div class="flex flex-wrap gap-2">
                <RigBadge tone="success" dot>Online</RigBadge>
                <RigBadge tone="error" variant="solid">Critical</RigBadge>
                <RigBadge tone="warning">Beta</RigBadge>
                <RigBadge tone="info">v2.0.0</RigBadge>
              </div>
            </div>
            <RigText variant="caption" color="muted">Use for: status indicators, version labels, notification counts, category markers.</RigText>
          </div>

          <div class="space-y-3 rounded-lg border border-border-subtle p-4">
            <RigText variant="subheading">RigTag</RigText>
            <RigText variant="caption" color="secondary">User-manageable chip — represents something the user applied or can remove. Supports disabled and removable states. Use when the label is user-controlled data.</RigText>
            <div class="space-y-2 pt-2">
              <div class="flex flex-wrap gap-2">
                <RigTag label="Vue 3" removable />
                <RigTag label="TypeScript" removable />
                <RigTag label="Locked" :disabled="true" />
              </div>
            </div>
            <RigText variant="caption" color="muted">Use for: filter chips, selected categories, applied labels, user-defined tags.</RigText>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Badge: Story = {
  name: 'RigBadge',
  render: () => ({
    components: { RigText, RigBadge },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Tones × soft (default)</RigText>
          <div class="flex flex-wrap gap-2">
            <RigBadge tone="accent">Accent</RigBadge>
            <RigBadge tone="success">Success</RigBadge>
            <RigBadge tone="warning">Warning</RigBadge>
            <RigBadge tone="error">Error</RigBadge>
            <RigBadge tone="info">Info</RigBadge>
            <RigBadge tone="neutral">Neutral</RigBadge>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Variants</RigText>
          <div class="flex flex-wrap gap-2">
            <RigBadge variant="solid" tone="accent">Solid</RigBadge>
            <RigBadge variant="soft" tone="accent">Soft</RigBadge>
            <RigBadge variant="outline" tone="accent">Outline</RigBadge>
          </div>
          <div class="flex flex-wrap gap-2">
            <RigBadge variant="solid" tone="error">Critical</RigBadge>
            <RigBadge variant="soft" tone="warning">Beta</RigBadge>
            <RigBadge variant="outline" tone="success">Stable</RigBadge>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">With dot indicator</RigText>
          <div class="flex flex-wrap gap-2">
            <RigBadge tone="success" dot>Online</RigBadge>
            <RigBadge tone="warning" dot>Away</RigBadge>
            <RigBadge tone="error" dot>Offline</RigBadge>
            <RigBadge tone="neutral" dot>Idle</RigBadge>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes</RigText>
          <div class="flex items-center gap-2">
            <RigBadge size="sm">Small</RigBadge>
            <RigBadge size="md">Medium</RigBadge>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Removable</RigText>
          <div class="flex flex-wrap gap-2">
            <RigBadge removable tone="accent">Design system</RigBadge>
            <RigBadge removable tone="neutral">v1.0.0</RigBadge>
            <RigBadge removable tone="info">TypeScript</RigBadge>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Tag: Story = {
  name: 'RigTag',
  render: () => ({
    components: { RigText, RigTag },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Variants</RigText>
          <div class="flex flex-wrap gap-2">
            <RigTag variant="solid" label="Solid" />
            <RigTag variant="soft" label="Soft" />
            <RigTag variant="outline" label="Outline" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes</RigText>
          <div class="flex flex-wrap items-center gap-2">
            <RigTag size="sm" label="Small" />
            <RigTag size="md" label="Medium" />
            <RigTag size="lg" label="Large" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Removable</RigText>
          <div class="flex flex-wrap gap-2">
            <RigTag removable label="Vue 3" />
            <RigTag removable label="TypeScript" />
            <RigTag removable label="Tailwind CSS" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Disabled</RigText>
          <div class="flex flex-wrap gap-2">
            <RigTag label="Disabled" :disabled="true" />
            <RigTag removable label="Cannot remove" :disabled="true" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const Spinner: Story = {
  name: 'RigSpinner',
  render: () => ({
    components: { RigText, RigSpinner },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes</RigText>
          <div class="flex items-end gap-4">
            <RigSpinner v-for="s in ['xs', 'sm', 'md', 'lg', 'xl']" :key="s" :size="s" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Tones</RigText>
          <div class="flex gap-4">
            <RigSpinner tone="accent" size="md" />
            <RigSpinner tone="muted" size="md" />
            <RigSpinner tone="current" size="md" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">With label (for screen readers)</RigText>
          <div class="flex items-center gap-2">
            <RigSpinner size="sm" label="Loading your data" />
            <RigText variant="caption" color="muted">Loading...</RigText>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Progress: Story = {
  name: 'RigProgress',
  render: () => ({
    components: { RigText, RigProgress },
    template: `
      <div class="space-y-6 max-w-md">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Values</RigText>
          <RigProgress :value="0" label="Empty" />
          <RigProgress :value="25" label="25%" />
          <RigProgress :value="60" label="60%" />
          <RigProgress :value="100" label="Complete" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Tones</RigText>
          <RigProgress :value="70" tone="accent" />
          <RigProgress :value="70" tone="success" />
          <RigProgress :value="70" tone="warning" />
          <RigProgress :value="70" tone="error" />
          <RigProgress :value="70" tone="info" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes</RigText>
          <RigProgress :value="60" size="sm" />
          <RigProgress :value="60" size="md" />
          <RigProgress :value="60" size="lg" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Indeterminate</RigText>
          <RigProgress :indeterminate="true" label="Loading" />
          <RigProgress :indeterminate="true" tone="success" />
        </div>
      </div>
    `,
  }),
}

export const Skeleton: Story = {
  name: 'RigSkeleton',
  render: () => ({
    components: { RigText, RigSkeleton },
    template: `
      <div class="space-y-6 max-w-md">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Variants</RigText>
          <RigSkeleton variant="heading" />
          <RigSkeleton variant="text" :lines="3" />
          <RigSkeleton variant="card" />
          <div class="flex items-center gap-3">
            <RigSkeleton variant="circle" />
            <div class="flex-1 space-y-2">
              <RigSkeleton variant="text" :lines="2" />
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Static (no animation)</RigText>
          <RigSkeleton variant="text" :lines="2" :animated="false" />
        </div>
      </div>
    `,
  }),
}

export const Tooltip: Story = {
  name: 'RigTooltip',
  render: () => ({
    components: { RigText, RigTooltip, RigButton },
    template: `
      <div class="space-y-8">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Placements</RigText>
          <div class="flex flex-wrap gap-8 pt-8 pb-8 px-8 justify-center">
            <RigTooltip content="Top tooltip" placement="top">
              <RigButton variant="outline">Top</RigButton>
            </RigTooltip>
            <RigTooltip content="Bottom tooltip" placement="bottom">
              <RigButton variant="outline">Bottom</RigButton>
            </RigTooltip>
            <RigTooltip content="Left tooltip" placement="left">
              <RigButton variant="outline">Left</RigButton>
            </RigTooltip>
            <RigTooltip content="Right tooltip" placement="right">
              <RigButton variant="outline">Right</RigButton>
            </RigTooltip>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">With delay</RigText>
          <RigTooltip content="Appears after 500ms" :delay="500">
            <RigButton variant="ghost">Hover (delayed)</RigButton>
          </RigTooltip>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Disabled</RigText>
          <RigTooltip content="This tooltip is disabled" :disabled="true">
            <RigButton variant="ghost">No tooltip</RigButton>
          </RigTooltip>
        </div>
      </div>
    `,
  }),
}

export const TooltipOverflow: Story = {
  name: 'Tooltip — overflow limitation',
  render: () => ({
    components: { RigText, RigTooltip, RigButton },
    template: `
      <div class="max-w-xl space-y-8">
        <div class="space-y-2">
          <RigText variant="subheading">Overflow clipping</RigText>
          <RigText variant="caption" color="secondary">
            RigTooltip uses CSS absolute positioning relative to its inline wrapper. Inside an
            <code class="font-mono text-accent text-xs">overflow-hidden</code> container the tooltip will be clipped.
          </RigText>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Clipped (overflow-hidden)</RigText>
          <div class="border border-status-error/40 rounded overflow-hidden p-4">
            <RigTooltip content="I am clipped by overflow-hidden" placement="top">
              <RigButton variant="outline">Hover me — tooltip clips</RigButton>
            </RigTooltip>
          </div>
          <RigText variant="caption" color="muted">The red border marks the overflow-hidden boundary.</RigText>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Workaround — overflow-visible ancestor</RigText>
          <div class="border border-border-subtle rounded overflow-visible p-4">
            <RigTooltip content="I render correctly with overflow-visible" placement="top">
              <RigButton variant="outline">Hover me — tooltip visible</RigButton>
            </RigTooltip>
          </div>
          <RigText variant="caption" color="muted">
            Ensure the tooltip's nearest scrolling ancestor uses <code class="font-mono text-accent text-xs">overflow: visible</code>.
            A Teleport-based rewrite that avoids this constraint is planned for v3.
          </RigText>
        </div>
      </div>
    `,
  }),
}

export const Toast: Story = {
  name: 'RigToast',
  render: () => ({
    components: { RigText, RigToast, RigButton },
    setup() {
      const toast = useToast()
      const showSuccess = () =>
        toast.show({
          title: 'Saved',
          description: 'Your changes have been saved.',
          tone: 'success',
          dismissible: true,
        })
      const showError = () =>
        toast.show({
          title: 'Failed',
          description: 'Could not save changes. Please try again.',
          tone: 'error',
          dismissible: true,
        })
      const showWarning = () =>
        toast.show({
          title: 'Heads up',
          description: 'This action may take a few minutes.',
          tone: 'warning',
        })
      const showInfo = () =>
        toast.show({
          title: 'Update available',
          description: 'A new version is ready to install.',
          tone: 'info',
          action: { label: 'Install now', onClick: () => {} },
        })
      const showNeutral = () =>
        toast.show({
          title: 'Notification',
          description: 'You have 3 new messages.',
          tone: 'neutral',
          dismissible: true,
        })
      return { showSuccess, showError, showWarning, showInfo, showNeutral }
    },
    template: `
      <div class="space-y-4">
        <RigText variant="overline" color="accent">Toast tones — click to trigger</RigText>
        <div class="flex flex-wrap gap-3">
          <RigButton tone="accent" variant="outline" @click="showSuccess">Success toast</RigButton>
          <RigButton tone="danger" variant="outline" @click="showError">Error toast</RigButton>
          <RigButton tone="neutral" variant="outline" @click="showWarning">Warning toast</RigButton>
          <RigButton tone="neutral" variant="outline" @click="showInfo">Info + action</RigButton>
          <RigButton tone="neutral" variant="outline" @click="showNeutral">Neutral toast</RigButton>
        </div>
        <RigText variant="caption" color="muted">Toasts stack in the bottom-right corner and auto-dismiss after 5 seconds.</RigText>
        <RigToast />
      </div>
    `,
  }),
}
