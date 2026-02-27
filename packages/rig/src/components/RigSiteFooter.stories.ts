import type { Meta, StoryObj } from '@storybook/vue3'
import RigSiteFooter from './RigSiteFooter.vue'

const meta = {
  title: 'Components/SiteFooter',
  component: RigSiteFooter,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Standardized footer for all Amulet imprint sites. Includes contact email, maker's stamp with home link, and copyright. Optional corpus fragment for ambient texture.",
      },
    },
  },
  argTypes: {
    email: {
      control: 'text',
      description: 'Contact email address',
    },
    imprintName: {
      control: 'text',
      description: 'Imprint name for copyright line',
    },
    homeUrl: {
      control: 'text',
      description: "URL for the maker's stamp link",
    },
    corpusFragment: {
      control: 'text',
      description: 'Ambient text fragment',
    },
    year: {
      control: 'number',
      description: 'Copyright year',
    },
  },
} satisfies Meta<typeof RigSiteFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'labs@amulet.ink',
    imprintName: 'Labs',
  },
}

export const WithCorpusFragment: Story = {
  args: {
    email: 'press@amulet.ink',
    imprintName: 'Press',
    corpusFragment: 'Low tide.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with an ambient corpus fragment — the sound of a place being a place.',
      },
    },
  },
}

export const Workshop: Story = {
  args: {
    email: 'workshop@amulet.ink',
    imprintName: 'Workshop',
    corpusFragment: 'Frost on the sill.',
  },
}

export const Studio: Story = {
  args: {
    email: 'studio@amulet.ink',
    imprintName: 'Studio',
  },
}

export const AllRooms: Story = {
  args: {
    email: 'labs@amulet.ink',
    imprintName: 'Labs',
  },
  render: () => ({
    components: { RigSiteFooter },
    template: `
      <div class="space-y-8">
        <RigSiteFooter email="labs@amulet.ink" imprint-name="Labs" />
        <RigSiteFooter email="press@amulet.ink" imprint-name="Press" corpus-fragment="Low tide." />
        <RigSiteFooter email="workshop@amulet.ink" imprint-name="Workshop" corpus-fragment="Frost on the sill." />
        <RigSiteFooter email="studio@amulet.ink" imprint-name="Studio" />
        <RigSiteFooter email="interactive@amulet.ink" imprint-name="Interactive" corpus-fragment="The windows are in." />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'All five experiential room footers. Same bones, different names.' },
    },
  },
}
