import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import RigGallery from '@rig/components/RigGallery.vue'
import type { GalleryImage } from '../types'

const stubs = { Teleport: true, Transition: true }

const images: GalleryImage[] = [
  { src: '/img/1.jpg', alt: 'Photo 1', caption: 'First photo' },
  { src: '/img/2.jpg', alt: 'Photo 2' },
  { src: '/img/3.jpg', alt: 'Photo 3', thumbnail: '/img/3-thumb.jpg' },
]

const mountGallery = (props: Record<string, unknown> = {}) =>
  mount(RigGallery, {
    props: { images, ...props },
    global: { stubs },
  })

describe('RigGallery', () => {
  beforeEach(() => {
    document.body.style.overflow = ''
    const key = Symbol.for('rig-scroll-lock')
    const g = globalThis as unknown as Record<
      symbol,
      { value: number; savedOverflow: string } | undefined
    >
    if (g[key]) {
      g[key]!.value = 0
      g[key]!.savedOverflow = ''
    }
  })

  it('renders all images in grid', () => {
    const wrapper = mountGallery()
    const imgs = wrapper.findAll('img')
    expect(imgs).toHaveLength(3)
  })

  it('applies lazy loading on images', () => {
    const wrapper = mountGallery()
    const imgs = wrapper.findAll('img')
    for (const img of imgs) {
      expect(img.attributes('loading')).toBe('lazy')
    }
  })

  it('applies aspect ratio style', () => {
    const wrapper = mountGallery({ aspectRatio: 'square' })
    const buttons = wrapper.findAll('button')
    const el = buttons[0].element as HTMLElement
    expect(el.style.aspectRatio).toBe('1 / 1')
  })

  it('opens lightbox on image click when lightbox=true', async () => {
    const wrapper = mountGallery({ lightbox: true })
    await wrapper.findAll('button')[0].trigger('click')
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('does not open lightbox when lightbox=false', async () => {
    const wrapper = mountGallery({ lightbox: false })
    await wrapper.findAll('button')[0].trigger('click')
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('navigates to next image on ArrowRight', async () => {
    const wrapper = mountGallery()
    await wrapper.findAll('button')[0].trigger('click')
    await nextTick()
    const dialog = wrapper.find('[role="dialog"]')
    await dialog.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(wrapper.find('[role="dialog"]').attributes('aria-label')).toContain('2 of 3')
  })

  it('navigates to prev image on ArrowLeft', async () => {
    const wrapper = mountGallery()
    await wrapper.findAll('button')[0].trigger('click')
    await nextTick()
    const dialog = wrapper.find('[role="dialog"]')
    await dialog.trigger('keydown', { key: 'ArrowLeft' })
    await nextTick()
    // Wraps around: 0 - 1 + 3 = 2 (index 2, image 3 of 3)
    expect(wrapper.find('[role="dialog"]').attributes('aria-label')).toContain('3 of 3')
  })

  it('closes lightbox on Escape', async () => {
    const wrapper = mountGallery()
    await wrapper.findAll('button')[0].trigger('click')
    await nextTick()
    await wrapper.find('[role="dialog"]').trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('closes lightbox on close button click', async () => {
    const wrapper = mountGallery()
    await wrapper.findAll('button')[0].trigger('click')
    await nextTick()
    await wrapper.find('button[aria-label="Close lightbox"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('shows image counter in lightbox', async () => {
    const wrapper = mountGallery()
    await wrapper.findAll('button')[0].trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('1 / 3')
  })

  it('emits image-click event', async () => {
    const wrapper = mountGallery()
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('image-click')).toBeTruthy()
    expect(wrapper.emitted('image-click')![0][1]).toBe(0)
  })

  it('uses thumbnail when provided', () => {
    const wrapper = mountGallery()
    const imgs = wrapper.findAll('img')
    expect(imgs[2].attributes('src')).toBe('/img/3-thumb.jpg')
  })
})
