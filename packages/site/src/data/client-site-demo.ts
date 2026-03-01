/**
 * Demo data for the ClientSiteSection.
 *
 * Mock gallery images, navigation, contact fields, business hours,
 * and pricing used to showcase Tier 3 client-site components.
 */

import type { NavbarItem, ContactFormField, GalleryImage } from '@amulet-laboratories/rig'

// ---------------------------------------------------------------------------
// Gallery — procedural SVG placeholders
// ---------------------------------------------------------------------------

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

export const galleryImages: GalleryImage[] = [
  {
    src: createSvgDataUrl(
      `<g stroke='%23c9956d' stroke-width='2' fill='none'>
        <circle cx='400' cy='300' r='200'/>
        <circle cx='400' cy='300' r='150'/>
        <circle cx='400' cy='300' r='100'/>
        <circle cx='400' cy='300' r='50'/>
      </g>`,
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
    ),
    alt: 'Grid pattern',
    caption: 'Pattern VI — Grid',
  },
]

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const navItems: NavbarItem[] = [
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

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------

export const contactFields: ContactFormField[] = [
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

// ---------------------------------------------------------------------------
// Business hours
// ---------------------------------------------------------------------------

export const hoursData = [
  { day: 'Monday', open: '7:00 AM', close: '4:00 PM' },
  { day: 'Tuesday', open: '7:00 AM', close: '4:00 PM' },
  { day: 'Wednesday', open: '7:00 AM', close: '4:00 PM' },
  { day: 'Thursday', open: '7:00 AM', close: '4:00 PM' },
  { day: 'Friday', open: '7:00 AM', close: '5:00 PM' },
  { day: 'Saturday', open: '8:00 AM', close: '3:00 PM' },
  { day: 'Sunday', closed: true },
]

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export const pricingSections = [
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
