/**
 * API documentation data for the ApiDocsSection.
 *
 * Each entry describes a component's props and usage example.
 * Extracted from ApiDocsSection.vue to keep the template lean.
 */

export interface PropDef {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export interface ComponentDoc {
  id: string
  name: string
  category: string
  description: string
  props: PropDef[]
  usage: string
}

export const componentDocs: ComponentDoc[] = [
  {
    id: 'rig-button',
    name: 'RigButton',
    category: 'Actions',
    description: 'Flexible action trigger supporting four variants, three tones, three sizes.',
    props: [
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'ghost' | 'link'",
        default: "'solid'",
        description: 'Visual style of the button.',
      },
      {
        name: 'tone',
        type: "'accent' | 'neutral' | 'danger'",
        default: "'accent'",
        description: 'Color intent.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Size scale.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction and applies disabled styling.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Shows spinner while maintaining button size.',
      },
      {
        name: 'as',
        type: "'button' | 'a' | 'router-link'",
        default: "'button'",
        description: 'Renders as anchor or router-link for navigation.',
      },
      { name: 'href', type: 'string', description: 'URL when as="a".' },
    ],
    usage: `<RigButton variant="solid" tone="accent">Primary</RigButton>
<RigButton variant="outline" tone="accent">Outline</RigButton>
<RigButton variant="ghost" tone="accent" disabled>Disabled</RigButton>`,
  },
  {
    id: 'rig-input',
    name: 'RigInput',
    category: 'Forms',
    description: 'Text input field with label, description, error state, and type validation.',
    props: [
      {
        name: 'modelValue',
        type: 'string',
        description: 'Bound input value.',
      },
      { name: 'label', type: 'string', description: 'Field label above input.' },
      { name: 'description', type: 'string', description: 'Helper text below label.' },
      { name: 'error', type: 'string', description: 'Error message replaces description.' },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text inside input.',
      },
      {
        name: 'type',
        type: "'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 'tel'",
        default: "'text'",
        description: 'HTML input type.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Marks field as required.',
      },
    ],
    usage: `<RigInput
  label="Display name"
  description="Your public display name."
  placeholder="John Doe"
/>
<RigInput
  label="Email"
  type="email"
  error="Invalid email address."
/>`,
  },
  {
    id: 'rig-select',
    name: 'RigSelect',
    category: 'Forms',
    description: 'Dropdown select field with label, description, and error state.',
    props: [
      {
        name: 'modelValue',
        type: 'string',
        description: 'Selected option value.',
      },
      { name: 'label', type: 'string', description: 'Field label.' },
      {
        name: 'options',
        type: 'Array<{ value: string; label: string }>',
        description: 'Available options.',
      },
      { name: 'description', type: 'string', description: 'Helper text.' },
      { name: 'error', type: 'string', description: 'Error message.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Marks as required.' },
    ],
    usage: `<RigSelect
  label="Theme"
  :options="[
    { value: 'hearth', label: 'Hearth' },
    { value: 'ember', label: 'Ember' },
  ]"
/>`,
  },
  {
    id: 'rig-card',
    name: 'RigCard',
    category: 'Layout',
    description: 'Container with elevation, optional interactive state, and border styling.',
    props: [
      {
        name: 'elevation',
        type: "'flat' | 'raised' | 'prominent'",
        default: "'raised'",
        description: 'Depth level.',
      },
      {
        name: 'interactive',
        type: 'boolean',
        default: 'false',
        description: 'Adds hover and focus states.',
      },
      {
        name: 'as',
        type: 'string',
        default: "'div'",
        description: 'HTML element or component name.',
      },
    ],
    usage: `<RigCard elevation="raised" interactive>
  <div class="p-4">
    <RigText variant="body">Card content</RigText>
  </div>
</RigCard>`,
  },
  {
    id: 'rig-alert',
    name: 'RigAlert',
    category: 'Feedback',
    description: 'Alert box with tone variants, optional icon, dismissible option.',
    props: [
      {
        name: 'tone',
        type: "'success' | 'warning' | 'error' | 'info'",
        default: "'info'",
        description: 'Intent and color.',
      },
      { name: 'title', type: 'string', description: 'Alert heading.' },
      { name: 'description', type: 'string', description: 'Alert body text.' },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'false',
        description: 'Shows close button.',
      },
      { name: 'icon', type: 'boolean', default: 'true', description: 'Shows tone icon.' },
    ],
    usage: `<RigAlert
  tone="success"
  title="Success"
  description="Operation completed successfully."
/>
<RigAlert
  tone="error"
  title="Error"
  description="Something went wrong. Try again."
  dismissible
/>`,
  },
  {
    id: 'rig-badge',
    name: 'RigBadge',
    category: 'Display',
    description: 'Small label with variant and tone options. Supports removable state.',
    props: [
      {
        name: 'variant',
        type: "'solid' | 'soft' | 'outline'",
        default: "'solid'",
        description: 'Visual style.',
      },
      {
        name: 'tone',
        type: "'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'",
        default: "'accent'",
        description: 'Color intent.',
      },
      {
        name: 'size',
        type: "'sm' | 'md'",
        default: "'md'",
        description: 'Size scale.',
      },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Shows colored dot.' },
      {
        name: 'removable',
        type: 'boolean',
        default: 'false',
        description: 'Shows remove button.',
      },
    ],
    usage: `<RigBadge variant="solid" tone="accent">Featured</RigBadge>
<RigBadge variant="soft" tone="success" dot>Active</RigBadge>
<RigBadge variant="outline" tone="error" removable>Removable</RigBadge>`,
  },
  {
    id: 'rig-text',
    name: 'RigText',
    category: 'Typography',
    description: 'Semantic text element with typographic variants and color options.',
    props: [
      {
        name: 'as',
        type: "'p' | 'span' | 'h1-h6' | 'label' | 'code' | 'pre'",
        default: "'p'",
        description: 'HTML element.',
      },
      {
        name: 'variant',
        type: "'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'overline' | 'mono'",
        default: "'body'",
        description: 'Typographic style.',
      },
      {
        name: 'color',
        type: "'primary' | 'secondary' | 'muted' | 'accent' | 'inverse' | 'on-accent' | 'success' | 'warning' | 'error' | 'info'",
        default: "'primary'",
        description: 'Text color.',
      },
      {
        name: 'weight',
        type: "'light' | 'normal' | 'medium' | 'semibold' | 'bold'",
        description: 'Font weight.',
      },
      {
        name: 'align',
        type: "'left' | 'center' | 'right'",
        description: 'Text alignment.',
      },
      { name: 'truncate', type: 'boolean', default: 'false', description: 'Clips overflowing text.' },
    ],
    usage: `<RigText variant="display">Display</RigText>
<RigText variant="heading">Heading</RigText>
<RigText variant="body" color="muted">Body text</RigText>
<RigText variant="caption" weight="bold">Bold caption</RigText>`,
  },
  {
    id: 'rig-icon',
    name: 'RigIcon',
    category: 'Display',
    description: 'SVG icon from Iconify with size and color variants.',
    props: [
      { name: 'name', type: 'string', required: true, description: 'Iconify icon name.' },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Size scale.',
      },
      {
        name: 'color',
        type: "'current' | 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error' | 'info'",
        default: "'current'",
        description: 'Icon color.',
      },
      { name: 'label', type: 'string', description: 'ARIA label for accessibility.' },
      {
        name: 'decorative',
        type: 'boolean',
        default: 'false',
        description: 'Marks icon as decorative (sets aria-hidden).',
      },
    ],
    usage: `<RigIcon name="mdi:star" size="lg" color="accent" />
<RigIcon name="mdi:check" color="success" label="Completed" />
<RigIcon name="mdi:heart" decorative />`,
  },
  {
    id: 'rig-surface',
    name: 'RigSurface',
    category: 'Layout',
    description: 'Base container with elevation, border, padding, and rounding options.',
    props: [
      {
        name: 'as',
        type: "'div' | 'section' | 'article' | 'aside' | 'main' | 'nav' | 'header' | 'footer'",
        default: "'div'",
        description: 'HTML element.',
      },
      {
        name: 'elevation',
        type: "'sunken' | 'base' | 'raised' | 'overlay'",
        default: "'base'",
        description: 'Depth level.',
      },
      {
        name: 'border',
        type: "boolean | 'subtle' | 'default' | 'strong'",
        description: 'Border style.',
      },
      {
        name: 'padding',
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Inner spacing.',
      },
      { name: 'rounded', type: 'boolean', default: 'false', description: 'Rounded corners.' },
    ],
    usage: `<RigSurface elevation="raised" border="subtle" padding="lg" rounded>
  <RigText variant="heading">Panel heading</RigText>
  <p>Panel content</p>
</RigSurface>`,
  },
  {
    id: 'rig-table',
    name: 'RigTable',
    category: 'Data',
    description: 'Data table with sorting, selection, expansion, and loading states.',
    props: [
      {
        name: 'columns',
        type: 'Array<{ key, label, width?, align?, sortable? }>',
        required: true,
        description: 'Column definitions.',
      },
      {
        name: 'rows',
        type: 'Array<Record<string, unknown>>',
        required: true,
        description: 'Table data rows.',
      },
      {
        name: 'rowKey',
        type: 'string',
        default: "'id'",
        description: 'Unique identifier field.',
      },
      { name: 'sortBy', type: 'string', description: 'Current sort column.' },
      {
        name: 'sortDir',
        type: "'asc' | 'desc'",
        default: "'asc'",
        description: 'Sort direction.',
      },
      {
        name: 'selectable',
        type: 'boolean',
        default: 'false',
        description: 'Enables row selection.',
      },
      {
        name: 'expandable',
        type: 'boolean',
        default: 'false',
        description: 'Enables row expansion.',
      },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading state.' },
    ],
    usage: `<RigTable
  :columns="[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', role: 'Designer' },
    { id: 2, name: 'Bob', role: 'Developer' },
  ]"
  selectable
/>`,
  },
  {
    id: 'rig-dialog',
    name: 'RigDialog',
    category: 'Overlays',
    description: 'Modal dialog with title, size variants, and footer slot.',
    props: [
      { name: 'modelValue', type: 'boolean', description: 'Dialog open state.' },
      { name: 'title', type: 'string', description: 'Dialog title.' },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Dialog width.',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'true',
        description: 'Closes on backdrop click.',
      },
      {
        name: 'persistent',
        type: 'boolean',
        default: 'false',
        description: 'Prevents dismissal by backdrop.',
      },
    ],
    usage: `<RigDialog v-model="dialogOpen" title="Confirm action" size="md">
  <p>Are you sure?</p>
  <template #footer>
    <RigButton variant="ghost" tone="neutral" @click="dialogOpen = false">Cancel</RigButton>
    <RigButton variant="solid" tone="accent" @click="dialogOpen = false">Confirm</RigButton>
  </template>
</RigDialog>`,
  },
]
