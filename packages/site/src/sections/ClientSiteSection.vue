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
import {
  galleryImages,
  navItems,
  contactFields,
  hoursData,
  pricingSections,
} from '@/data/client-site-demo'

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
                subheadline="Hex + Rig: nine themes, 58 components, WCAG AAA."
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
              <RigText as="h4" variant="heading" class="text-base mb-2">58 Components</RigText>
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
