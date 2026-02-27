import type { Meta, StoryObj } from '@storybook/vue3'
import RigText from '../components/RigText.vue'
import RigIcon from '../components/RigIcon.vue'
import RigDivider from '../components/RigDivider.vue'
import RigSurface from '../components/RigSurface.vue'
import RigAvatar from '../components/RigAvatar.vue'

const meta = {
  title: 'Components/Primitives',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Text: Story = {
  name: 'RigText',
  render: () => ({
    components: { RigText },
    template: `
      <div class="space-y-6 max-w-2xl">
        <div class="space-y-2">
          <RigText variant="overline" color="accent">Variants</RigText>
          <RigText variant="display">Display — The quick brown fox</RigText>
          <RigText variant="heading">Heading — The quick brown fox</RigText>
          <RigText variant="subheading">Subheading — The quick brown fox</RigText>
          <RigText variant="body">Body — The quick brown fox jumps over the lazy dog. This is a longer paragraph to show line height and comfortable reading measure.</RigText>
          <RigText variant="caption" color="secondary">Caption — Supplementary context, timestamps, footnotes</RigText>
          <RigText variant="overline" color="accent">Overline label</RigText>
          <RigText variant="mono">Mono — const answer = 42</RigText>
        </div>

        <div class="space-y-2">
          <RigText variant="overline" color="accent">Colors</RigText>
          <div class="flex flex-wrap gap-4">
            <RigText color="primary">primary</RigText>
            <RigText color="secondary">secondary</RigText>
            <RigText color="muted">muted</RigText>
            <RigText color="accent">accent</RigText>
            <RigText color="success">success</RigText>
            <RigText color="warning">warning</RigText>
            <RigText color="error">error</RigText>
            <RigText color="info">info</RigText>
          </div>
        </div>

        <div class="space-y-2">
          <RigText variant="overline" color="accent">Weights</RigText>
          <div class="space-y-1">
            <RigText weight="light">Light — 300</RigText>
            <RigText weight="normal">Normal — 400</RigText>
            <RigText weight="medium">Medium — 500</RigText>
            <RigText weight="semibold">Semibold — 600</RigText>
            <RigText weight="bold">Bold — 700</RigText>
          </div>
        </div>

        <div class="space-y-2">
          <RigText variant="overline" color="accent">Semantic elements</RigText>
          <RigText as="h1" variant="heading">h1 element</RigText>
          <RigText as="h2" variant="subheading">h2 element</RigText>
          <RigText as="code" variant="mono">code element</RigText>
          <RigText as="label" variant="caption" color="secondary">label element</RigText>
        </div>

        <div class="space-y-2">
          <RigText variant="overline" color="accent">Truncation</RigText>
          <div class="max-w-xs">
            <RigText truncate>This very long text will be truncated with an ellipsis when it exceeds the container width</RigText>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Icon: Story = {
  name: 'RigIcon',
  render: () => ({
    components: { RigText, RigIcon },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes</RigText>
          <div class="flex items-end gap-4">
            <div class="flex flex-col items-center gap-2">
              <RigIcon name="mdi:star" size="xs" />
              <RigText variant="caption" color="muted">xs</RigText>
            </div>
            <div class="flex flex-col items-center gap-2">
              <RigIcon name="mdi:star" size="sm" />
              <RigText variant="caption" color="muted">sm</RigText>
            </div>
            <div class="flex flex-col items-center gap-2">
              <RigIcon name="mdi:star" size="md" />
              <RigText variant="caption" color="muted">md</RigText>
            </div>
            <div class="flex flex-col items-center gap-2">
              <RigIcon name="mdi:star" size="lg" />
              <RigText variant="caption" color="muted">lg</RigText>
            </div>
            <div class="flex flex-col items-center gap-2">
              <RigIcon name="mdi:star" size="xl" />
              <RigText variant="caption" color="muted">xl</RigText>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Colors</RigText>
          <div class="flex gap-4">
            <RigIcon name="mdi:circle" color="primary" />
            <RigIcon name="mdi:circle" color="secondary" />
            <RigIcon name="mdi:circle" color="muted" />
            <RigIcon name="mdi:circle" color="accent" />
            <RigIcon name="mdi:circle" color="success" />
            <RigIcon name="mdi:circle" color="warning" />
            <RigIcon name="mdi:circle" color="error" />
            <RigIcon name="mdi:circle" color="info" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Common icons (mdi set)</RigText>
          <div class="flex flex-wrap gap-4">
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:home" size="md" />
              <RigText variant="caption" color="muted">home</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:magnify" size="md" />
              <RigText variant="caption" color="muted">magnify</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:bell" size="md" />
              <RigText variant="caption" color="muted">bell</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:account" size="md" />
              <RigText variant="caption" color="muted">account</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:cog" size="md" />
              <RigText variant="caption" color="muted">cog</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:check" size="md" color="success" />
              <RigText variant="caption" color="muted">check</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:close" size="md" color="error" />
              <RigText variant="caption" color="muted">close</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:arrow-right" size="md" />
              <RigText variant="caption" color="muted">arrow-right</RigText>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Surface: Story = {
  name: 'RigSurface',
  render: () => ({
    components: { RigText, RigSurface },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Elevations</RigText>
          <div class="grid grid-cols-2 gap-4">
            <RigSurface elevation="sunken" padding="md" border>
              <RigText variant="mono" color="muted">sunken</RigText>
              <RigText variant="caption" color="muted">Below base level</RigText>
            </RigSurface>
            <RigSurface elevation="base" padding="md" border>
              <RigText variant="mono" color="muted">base</RigText>
              <RigText variant="caption" color="muted">Default page background</RigText>
            </RigSurface>
            <RigSurface elevation="raised" padding="md" border>
              <RigText variant="mono" color="muted">raised</RigText>
              <RigText variant="caption" color="muted">Cards, panels</RigText>
            </RigSurface>
            <RigSurface elevation="overlay" padding="md" border>
              <RigText variant="mono" color="muted">overlay</RigText>
              <RigText variant="caption" color="muted">Dropdowns, popovers</RigText>
            </RigSurface>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Border strengths</RigText>
          <div class="flex gap-4">
            <RigSurface padding="md" border="subtle" rounded>
              <RigText variant="caption">subtle</RigText>
            </RigSurface>
            <RigSurface padding="md" border="default" rounded>
              <RigText variant="caption">default</RigText>
            </RigSurface>
            <RigSurface padding="md" border="strong" rounded>
              <RigText variant="caption">strong</RigText>
            </RigSurface>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Padding scale</RigText>
          <div class="flex gap-4 items-start">
            <RigSurface v-for="p in ['sm', 'md', 'lg', 'xl']" :key="p" :padding="p" border rounded>
              <RigText variant="caption" color="muted">{{ p }}</RigText>
            </RigSurface>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Divider: Story = {
  name: 'RigDivider',
  render: () => ({
    components: { RigText, RigDivider },
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Horizontal variants</RigText>
          <RigDivider variant="subtle" />
          <RigDivider variant="default" />
          <RigDivider variant="strong" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">With label</RigText>
          <RigDivider label="or continue with" />
          <RigDivider variant="strong" label="Section break" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Vertical</RigText>
          <div class="flex items-center h-12 gap-4">
            <RigText>Left content</RigText>
            <RigDivider orientation="vertical" />
            <RigText>Right content</RigText>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Avatar: Story = {
  name: 'RigAvatar',
  render: () => ({
    components: { RigText, RigAvatar },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes — initials fallback</RigText>
          <div class="flex items-end gap-4">
            <RigAvatar v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size" :size="size" name="Jane Doe" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Shapes</RigText>
          <div class="flex gap-4">
            <div class="flex flex-col items-center gap-2">
              <RigAvatar shape="circle" name="AL" size="lg" />
              <RigText variant="caption" color="muted">circle</RigText>
            </div>
            <div class="flex flex-col items-center gap-2">
              <RigAvatar shape="square" name="AL" size="lg" />
              <RigText variant="caption" color="muted">square</RigText>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Multi-word initials</RigText>
          <div class="flex gap-4 items-center">
            <RigAvatar name="Andrew Passanisi" size="md" />
            <RigAvatar name="Amulet Laboratories" size="md" />
            <RigAvatar name="Single" size="md" />
            <RigAvatar size="md" />
          </div>
        </div>
      </div>
    `,
  }),
}
