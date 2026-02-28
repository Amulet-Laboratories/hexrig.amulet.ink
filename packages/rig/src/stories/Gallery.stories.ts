import type { Meta, StoryObj } from '@storybook/vue3'
import RigGallery from '../components/RigGallery.vue'
import RigText from '../components/RigText.vue'

const meta = {
  title: 'Components/Gallery',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

const placeholderImages = [
  { src: 'https://picsum.photos/seed/a/800/600', alt: 'Landscape photo 1', caption: 'Mountain vista at sunrise' },
  { src: 'https://picsum.photos/seed/b/800/600', alt: 'Landscape photo 2', caption: 'Coastal cliffs' },
  { src: 'https://picsum.photos/seed/c/800/600', alt: 'Landscape photo 3' },
  { src: 'https://picsum.photos/seed/d/800/600', alt: 'Landscape photo 4', caption: 'Forest trail' },
  { src: 'https://picsum.photos/seed/e/800/600', alt: 'Landscape photo 5' },
  { src: 'https://picsum.photos/seed/f/800/600', alt: 'Landscape photo 6', caption: 'Desert sunset' },
]

export const Default: Story = {
  name: 'Default (3 columns, lightbox)',
  render: () => ({
    components: { RigGallery, RigText },
    setup: () => ({ images: placeholderImages }),
    template: `
      <div class="space-y-4">
        <RigText as="h2" variant="heading">Gallery</RigText>
        <RigGallery :images="images" />
      </div>
    `,
  }),
}

export const CustomColumns: Story = {
  name: '4 columns, square aspect',
  render: () => ({
    components: { RigGallery, RigText },
    setup: () => ({ images: placeholderImages }),
    template: `
      <div class="space-y-4">
        <RigText as="h2" variant="heading">4 Columns, Square</RigText>
        <RigGallery :images="images" :columns="4" aspect-ratio="square" gap="sm" />
      </div>
    `,
  }),
}

export const WithoutLightbox: Story = {
  name: 'Without lightbox',
  render: () => ({
    components: { RigGallery, RigText },
    setup: () => ({ images: placeholderImages.slice(0, 3) }),
    template: `
      <div class="space-y-4">
        <RigText as="h2" variant="heading">No Lightbox</RigText>
        <RigGallery :images="images" :lightbox="false" />
      </div>
    `,
  }),
}

export const Captions: Story = {
  name: 'With captions in lightbox',
  render: () => ({
    components: { RigGallery, RigText },
    setup: () => ({ images: placeholderImages }),
    template: `
      <div class="space-y-4">
        <RigText as="h2" variant="heading">Click images to see captions</RigText>
        <RigGallery :images="images" :columns="2" aspect-ratio="16/9" />
      </div>
    `,
  }),
}
