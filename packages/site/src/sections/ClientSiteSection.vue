<script setup lang="ts">
import { ref } from 'vue'
import {
  RigSurface,
  RigNavbar,
  RigHero,
  RigCardGrid,
  RigCard,
  RigContactForm,
  RigTestimonial,
  RigHoursDisplay,
  RigPricingTable,
  RigGallery,
  RigText,
  RigIcon,
} from '@amulet-laboratories/rig'

import type { NavbarItem, ContactFormField, GalleryImage } from '@amulet-laboratories/rig'

// SVG gallery placeholders - 6 abstract geometric designs using Amulet brand palette
const createSvgDataUrl = (path: string): string => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
    <defs>
      <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' style='stop-color:%230f0d0a;stop-opacity:1' />
        <stop offset='100%' style='stop-color:%23f5f1ed;stop-opacity:0.95' />
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(%23grad)'/>
    ${path}
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const galleryImages: GalleryImage[] = [
  {
    src: createSvgDataUrl(
      `<g stroke='%23c9956d' stroke-width='2' fill='none'>
        <circle cx='400' cy='300' r='200'/>
        <circle cx='400' cy='300' r='150'/>
        <circle cx='400' cy='300' r='100'/>
        <circle cx='400' cy='300' r='50'/>
      </g>`,
      'Rings',
    ),
    alt: 'Concentric rings pattern',
    caption: 'Pattern I — Rings',
  },
  {
    src: createSvgDataUrl(
      `<g stroke='%23c9956d' stroke-width='1.5' fill='none'>
        <line x1='0' y1='0' x2='800' y2='600'/>
        <line x1='100' y1='0' x2='900' y2='600'/>
        <line x1='200' y1='0' x2='1000' y2='600'/>
        <line x1='300' y1='0' x2='1100' y2='600'/>
        <line x1='400' y1='0' x2='1200' y2='600'/>
        <line x1='500' y1='0' x2='1300' y2='600'/>
        <line x1='600' y1='0' x2='1400' y2='600'/>
        <line x1='700' y1='0' x2='1500' y2='600'/>
        <line x1='800' y1='0' x2='1600' y2='600'/>
      </g>`,
      'Stripes',
    ),
    alt: 'Diagonal stripe pattern',
    caption: 'Pattern II — Stripes',
  },
  {
    src: createSvgDataUrl(
      `<g stroke='%23c9956d' stroke-width='1' fill='%23c9956d' fill-opacity='0.3'>
        <circle cx='200' cy='150' r='8'/>
        <circle cx='600' cy='250' r='8'/>
        <circle cx='150' cy='450' r='8'/>
        <circle cx='750' cy='100' r='8'/>
        <circle cx='400' cy='500' r='8'/>
        <line x1='200' y1='150' x2='600' y2='250'/>
        <line x1='200' y1='150' x2='400' y2='500'/>
        <line x1='600' y1='250' x2='750' y2='100'/>
        <line x1='600' y1='250' x2='150' y2='450'/>
      </g>`,
      'Network',
    ),
    alt: 'Network nodes pattern',
    caption: 'Pattern III — Nodes',
  },
  {
    src: createSvgDataUrl(
      `<g stroke='%23c9956d' stroke-width='2' fill='none'>
        <polyline points='100,400 150,200 200,400 250,200 300,400 350,200 400,400 450,200 500,400 550,200 600,400 650,200 700,400 750,200 800,400'/>
        <polyline points='100,300 150,100 200,300 250,100 300,300 350,100 400,300 450,100 500,300 550,100 600,300 650,100 700,300 750,100 800,300'/>
      </g>`,
      'Chevrons',
    ),
    alt: 'Chevron wave pattern',
    caption: 'Pattern IV — Chevrons',
  },
  {
    src: createSvgDataUrl(
      `<g stroke='%23c9956d' stroke-width='1' fill='none'>
        <line x1='50' y1='100' x2='750' y2='100' stroke-width='3'/>
        <line x1='100' y1='150' x2='700' y2='150' stroke-width='1'/>
        <line x1='50' y1='200' x2='750' y2='200' stroke-width='2'/>
        <line x1='100' y1='250' x2='700' y2='250' stroke-width='1'/>
        <line x1='50' y1='300' x2='750' y2='300' stroke-width='3'/>
        <circle cx='50' cy='100' r='4' fill='%23c9956d'/>
        <circle cx='750' cy='100' r='4' fill='%23c9956d'/>
        <circle cx='50' cy='300' r='4' fill='%23c9956d'/>
        <circle cx='750' cy='300' r='4' fill='%23c9956d'/>
      </g>`,
      'Lines',
    ),
    alt: 'Horizontal lines with terminals',
    caption: 'Pattern V — Lines',
  },
  {
    src: createSvgDataUrl(
      `<g stroke='%23c9956d' stroke-width='1.5' fill='none'>
        <line x1='100' y1='100' x2='700' y2='100'/>
        <line x1='100' y1='150' x2='700' y2='150'/>
        <line x1='100' y1='200' x2='700' y2='200'/>
        <line x1='100' y1='250' x2='700' y2='250'/>
        <line x1='100' y1='300' x2='700' y2='300'/>
        <line x1='100' y1='350' x2='700' y2='350'/>
        <line x1='100' y1='400' x2='700' y2='400'/>
        <line x1='100' y1='450' x2='700' y2='450'/>
        <line x1='100' y1='500' x2='700' y2='500'/>
        <line x1='150' y1='50' x2='150' y2='550'/>
        <line x1='200' y1='50' x2='200' y2='550'/>
        <line x1='250' y1='50' x2='250' y2='550'/>
        <line x1='300' y1='50' x2='300' y2='550'/>
        <line x1='350' y1='50' x2='350' y2='550'/>
        <line x1='400' y1='50' x2='400' y2='550'/>
        <line x1='450' y1='50' x2='450' y2='550'/>
        <line x1='500' y1='50' x2='500' y2='550'/>
        <line x1='550' y1='50' x2='550' y2='550'/>
        <line x1='600' y1='50' x2='600' y2='550'/>
        <line x1='650' y1='50' x2='650' y2='550'/>
        <line x1='700' y1='50' x2='700' y2='550'/>
      </g>`,
      'Grid',
    ),
    alt: 'Grid pattern',
    caption: 'Pattern VI — Grid',
  },
]

// Navigation demo
const navItems: NavbarItem[] = [
  { label: 'Work', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'About', href: '#' },
  {
    label: 'Resources',
    children: [
      { label: 'Blog', href: '#' },
      { label: 'Press Kit', href: '#' },
    ],
  },
]

// Contact form fields
const contactFields: ContactFormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  {
    name: 'service',
    label: 'Service',
    type: 'select',
    required: true,
    options: [
      { value: 'site', label: 'New website' },
      { value: 'redesign', label: 'Redesign' },
      { value: 'support', label: 'Ongoing support' },
    ],
  },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
]

// Hours display data
const hoursData = [
  { day: 'Monday', open: '7:00 AM', close: '4:00 PM' },
  { day: 'Tuesday', open: '7:00 AM', close: '4:00 PM' },
  { day: 'Wednesday', open: '7:00 AM', close: '4:00 PM' },
  { day: 'Thursday', open: '7:00 AM', close: '4:00 PM' },
  { day: 'Friday', open: '7:00 AM', close: '5:00 PM' },
  { day: 'Saturday', open: '8:00 AM', close: '3:00 PM' },
  { day: 'Sunday', closed: true },
]

// Pricing data
const pricingSections = [
  {
    title: 'Web Services',
    description: 'Flat-rate creative work for small businesses.',
    items: [
      {
        name: 'Discovery & Strategy',
        price: 750,
        description: 'A 2-hour session to map your needs.',
      },
      { name: 'New Website', price: 3500, badge: 'Most Popular' },
      { name: 'Redesign', price: 2500 },
      { name: 'Monthly Care Plan', price: 175, description: 'Hosting, updates, and support.' },
    ],
  },
]

// State for demo
const hoursTimezone = ref('CST')
const hoursShowStatus = ref(true)
const hoursHighlightToday = ref(true)
</script>

<template>
  <section class="relative py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Components</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        For the sites you build.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg mb-16 max-w-xl">
        Tier 3 client site components: complete, composable, ready to deploy.
      </p>

      <!-- RigNavbar -->
      <div v-reveal class="grid grid-cols-1 gap-4 mb-8">
        <RigSurface class="panel-lift">
          <RigText as="h3" variant="heading" class="mb-4">RigNavbar</RigText>
          <RigText variant="caption" color="muted" class="mb-6 block">
            Full navigation bar with dropdown support, sticky mode, and transparent fade-in on
            scroll.
          </RigText>
          <RigNavbar
            brand="Amulet"
            brand-href="#"
            :items="navItems"
            sticky
            bordered
            class="border border-border-subtle rounded-lg overflow-hidden"
          />
        </RigSurface>
      </div>

      <!-- RigHero -->
      <div v-reveal class="grid grid-cols-1 gap-4 mb-8">
        <RigSurface class="panel-lift">
          <RigText as="h3" variant="heading" class="mb-4">RigHero</RigText>
          <RigText variant="caption" color="muted" class="mb-6 block">
            Hero banners with multiple alignments and sizes. Supports CTA buttons and optional
            overlay.
          </RigText>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border border-border-subtle rounded-lg overflow-hidden">
              <RigHero
                headline="A different kind of design system"
                subheadline="Hex + Rig: nine themes, 56 components, WCAG AAA."
                cta-label="Browse"
                secondary-cta-label="Docs"
                align="center"
                size="md"
              />
            </div>
            <div class="border border-border-subtle rounded-lg overflow-hidden">
              <RigHero
                headline="Coffee, connection, community."
                subheadline="Locally roasted. Always fresh."
                cta-label="Order Now"
                align="left"
                size="sm"
              />
            </div>
          </div>
        </RigSurface>
      </div>

      <!-- RigCardGrid -->
      <div v-reveal class="grid grid-cols-1 gap-4 mb-8">
        <RigSurface class="panel-lift">
          <RigText as="h3" variant="heading" class="mb-4">RigCardGrid</RigText>
          <RigText variant="caption" color="muted" class="mb-6 block">
            Responsive auto-fit grid that adapts to container width and available space.
          </RigText>
          <RigCardGrid min-card-width="240px" gap="md">
            <RigCard elevation="raised">
              <RigIcon name="mdi:palette" size="lg" color="accent" class="mb-3" />
              <RigText as="h4" variant="heading" class="text-base mb-2">Theming</RigText>
              <RigText variant="caption" color="muted">
                Nine complete design worlds with light and dark modes.
              </RigText>
            </RigCard>
            <RigCard elevation="raised">
              <RigIcon name="mdi:package" size="lg" color="accent" class="mb-3" />
              <RigText as="h4" variant="heading" class="text-base mb-2">56 Components</RigText>
              <RigText variant="caption" color="muted">
                Production-ready, fully accessible components.
              </RigText>
            </RigCard>
            <RigCard elevation="raised">
              <RigIcon name="mdi:shield-check" size="lg" color="accent" class="mb-3" />
              <RigText as="h4" variant="heading" class="text-base mb-2">WCAG AAA</RigText>
              <RigText variant="caption" color="muted">
                Meets the highest accessibility standards.
              </RigText>
            </RigCard>
            <RigCard elevation="raised">
              <RigIcon name="mdi:vuejs" size="lg" color="accent" class="mb-3" />
              <RigText as="h4" variant="heading" class="text-base mb-2">Vue 3 + TypeScript</RigText>
              <RigText variant="caption" color="muted">
                Modern, strict, composable component library.
              </RigText>
            </RigCard>
            <RigCard elevation="raised">
              <RigIcon name="mdi:palette-advanced" size="lg" color="accent" class="mb-3" />
              <RigText as="h4" variant="heading" class="text-base mb-2">Token System</RigText>
              <RigText variant="caption" color="muted">
                CSS custom properties, zero runtime overhead.
              </RigText>
            </RigCard>
            <RigCard elevation="raised">
              <RigIcon name="mdi:file-document" size="lg" color="accent" class="mb-3" />
              <RigText as="h4" variant="heading" class="text-base mb-2">Full Docs</RigText>
              <RigText variant="caption" color="muted">
                Storybook with live examples for every component.
              </RigText>
            </RigCard>
          </RigCardGrid>
        </RigSurface>
      </div>

      <!-- RigContactForm -->
      <div v-reveal class="grid grid-cols-1 gap-4 mb-8">
        <RigSurface class="panel-lift">
          <RigText as="h3" variant="heading" class="mb-4">RigContactForm</RigText>
          <RigText variant="caption" color="muted" class="mb-6 block">
            Built-in Netlify Forms integration with validation, error handling, and success states.
          </RigText>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RigContactForm
              form-name="demo-contact-full"
              :fields="contactFields"
              submit-label="Send Message"
              :compact="false"
            />
            <div>
              <RigText variant="caption" color="muted" class="block mb-4">
                Compact variant:
              </RigText>
              <RigContactForm
                form-name="demo-contact-compact"
                :fields="contactFields"
                submit-label="Submit"
                :compact="true"
              />
            </div>
          </div>
        </RigSurface>
      </div>

      <!-- RigTestimonial -->
      <div v-reveal class="grid grid-cols-1 gap-4 mb-8">
        <RigSurface class="panel-lift">
          <RigText as="h3" variant="heading" class="mb-4">RigTestimonial</RigText>
          <RigText variant="caption" color="muted" class="mb-6 block">
            Three variants for showcasing client feedback: card, inline, and featured.
          </RigText>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RigTestimonial
              variant="card"
              quote="Working with Amulet changed what I thought a website could be."
              author="Martina V."
              role="Owner, Botanica"
              :rating="5"
            />
            <RigTestimonial
              variant="inline"
              quote="Delivered on time, on budget, and somehow still beautiful."
              author="James P."
              role="Director, Crestwood Hotel"
            />
            <div class="md:col-span-1 flex">
              <RigTestimonial
                variant="featured"
                quote="Our new site books more tables than the phone ever did."
                author="Sofia R."
                role="Proprietor, La Ferme"
                :rating="5"
              />
            </div>
          </div>
        </RigSurface>
      </div>

      <!-- RigHoursDisplay -->
      <div v-reveal class="grid grid-cols-1 gap-4 mb-8">
        <RigSurface class="panel-lift">
          <RigText as="h3" variant="heading" class="mb-4">RigHoursDisplay</RigText>
          <RigText variant="caption" color="muted" class="mb-6 block">
            Business hours display with live "Open Now" status, timezone support, and compact mode.
          </RigText>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <RigText variant="overline" color="accent" class="mb-3 block">Full Mode</RigText>
              <RigHoursDisplay
                :hours="hoursData"
                :timezone="hoursTimezone"
                :show-status="hoursShowStatus"
                :highlight-today="hoursHighlightToday"
                :compact="false"
              />
            </div>
            <div>
              <RigText variant="overline" color="accent" class="mb-3 block">Compact Mode</RigText>
              <RigHoursDisplay
                :hours="hoursData"
                :show-status="hoursShowStatus"
                :highlight-today="hoursHighlightToday"
                :compact="true"
              />
            </div>
          </div>
        </RigSurface>
      </div>

      <!-- RigPricingTable -->
      <div v-reveal class="grid grid-cols-1 gap-4 mb-8">
        <RigSurface class="panel-lift">
          <RigText as="h3" variant="heading" class="mb-4">RigPricingTable</RigText>
          <RigText variant="caption" color="muted" class="mb-6 block">
            Multiple variants for pricing displays: list with dotted leaders, card grid, or table.
          </RigText>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <RigText variant="overline" color="accent" class="mb-3 block">List Variant</RigText>
              <RigPricingTable :sections="pricingSections" variant="list" :compact="false" />
            </div>
            <div>
              <RigText variant="overline" color="accent" class="mb-3 block">Card Variant</RigText>
              <RigPricingTable :sections="pricingSections" variant="card" :compact="true" />
            </div>
          </div>
        </RigSurface>
      </div>

      <!-- RigGallery -->
      <div v-reveal class="grid grid-cols-1 gap-4 mb-8">
        <RigSurface class="panel-lift">
          <RigText as="h3" variant="heading" class="mb-4">RigGallery</RigText>
          <RigText variant="caption" color="muted" class="mb-6 block">
            Responsive image gallery with optional lightbox. Click any image to open the lightbox.
          </RigText>
          <RigGallery :images="galleryImages" :columns="3" gap="md" aspect-ratio="4/3" lightbox />
        </RigSurface>
      </div>
    </div>
  </section>
</template>
