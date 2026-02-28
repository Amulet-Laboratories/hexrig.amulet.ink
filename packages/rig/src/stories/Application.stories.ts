import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigButton from '../components/RigButton.vue'
import RigIcon from '../components/RigIcon.vue'
import RigHeader from '../components/RigHeader.vue'
import RigPage from '../components/RigPage.vue'
import RigPanel from '../components/RigPanel.vue'
import RigSidebar from '../components/RigSidebar.vue'
import RigSidebarSection from '../components/RigSidebarSection.vue'
import RigSidebarItem from '../components/RigSidebarItem.vue'
import RigAppShell from '../components/RigAppShell.vue'
import RigStatus from '../components/RigStatus.vue'
import RigInput from '../components/RigInput.vue'
import RigConfirm from '../components/RigConfirm.vue'
import RigEmpty from '../components/RigEmpty.vue'

const meta = {
  title: 'Components/Application',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Header: Story = {
  name: 'RigHeader',
  render: () => ({
    components: { RigText, RigButton, RigIcon, RigHeader, RigInput },
    template: `
      <div class="space-y-6">
        <div class="border border-border-subtle rounded overflow-hidden">
          <RigHeader title="Tower Dashboard">
            <template #leading>
              <RigIcon name="mdi:hexagon-outline" size="md" color="accent" />
            </template>
            <template #trailing>
              <RigButton variant="ghost" size="sm">
                <RigIcon name="mdi:bell-outline" size="sm" />
              </RigButton>
              <RigButton variant="ghost" size="sm">
                <RigIcon name="mdi:cog-outline" size="sm" />
              </RigButton>
            </template>
          </RigHeader>
        </div>

        <div class="border border-border-subtle rounded overflow-hidden">
          <RigHeader>
            <template #leading>
              <RigButton variant="ghost" size="sm">
                <RigIcon name="mdi:menu" size="sm" />
              </RigButton>
            </template>
            <template #title>
              <span class="text-base font-semibold text-accent font-display">Amulet</span>
            </template>
            <template #center>
              <RigInput placeholder="Search..." size="sm" class="max-w-sm" />
            </template>
            <template #trailing>
              <RigButton variant="outline" size="sm">Sign in</RigButton>
            </template>
          </RigHeader>
        </div>

        <div class="border border-border-subtle rounded overflow-hidden">
          <RigHeader title="Minimal" :bordered="false" />
        </div>
      </div>
    `,
  }),
  parameters: { layout: 'padded' },
}

export const Page: Story = {
  name: 'RigPage',
  render: () => ({
    components: { RigText, RigButton, RigPage, RigPanel },
    template: `
      <div class="space-y-8">
        <div class="border border-border-subtle rounded overflow-hidden h-[400px]">
          <RigPage title="Repository Overview" description="Manage your project settings and configuration.">
            <template #actions>
              <RigButton variant="outline" size="sm">Export</RigButton>
              <RigButton size="sm">New project</RigButton>
            </template>
            <div class="grid gap-4 sm:grid-cols-2">
              <RigPanel title="Status"><RigText color="secondary">All systems operational.</RigText></RigPanel>
              <RigPanel title="Activity"><RigText color="secondary">12 commits this week.</RigText></RigPanel>
            </div>
          </RigPage>
        </div>

        <div class="px-4 space-y-3">
          <RigText variant="overline" color="accent">Max widths</RigText>
          <div v-for="w in ['sm', 'md', 'lg', 'xl', 'full']" :key="w" class="border border-border-subtle rounded overflow-hidden">
            <RigPage :title="'max-width: ' + w" :max-width="w">
              <RigText color="muted" variant="caption">Content area constrained to {{ w }}.</RigText>
            </RigPage>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Panel: Story = {
  name: 'RigPanel',
  render: () => ({
    components: { RigText, RigButton, RigPanel },
    template: `
      <div class="space-y-6 max-w-lg p-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Standard panel</RigText>
          <RigPanel title="Health Summary" description="Current system status overview">
            <RigText color="secondary">All services running. Last check 2 minutes ago.</RigText>
            <template #footer>
              <RigButton variant="ghost" size="sm">View details</RigButton>
            </template>
          </RigPanel>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Collapsible</RigText>
          <RigPanel title="Advanced Settings" description="Fine-tune configuration" collapsible :default-open="false">
            <RigText color="secondary">Cache TTL, retry policies, rate limits, and other advanced configuration options.</RigText>
          </RigPanel>
          <RigPanel title="Open by default" collapsible :default-open="true">
            <RigText color="secondary">This panel starts open and can be collapsed.</RigText>
          </RigPanel>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">With actions</RigText>
          <RigPanel title="Deployment" description="Manage deployments">
            <template #actions>
              <RigButton variant="ghost" size="sm">Rollback</RigButton>
              <RigButton size="sm">Deploy</RigButton>
            </template>
            <RigText color="secondary">Latest deploy: v2.1.0 — 3 hours ago.</RigText>
          </RigPanel>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">No padding / no border</RigText>
          <RigPanel title="Flush content" :padded="false" :bordered="false">
            <div class="divide-y divide-border-subtle">
              <div class="px-4 py-3"><RigText color="secondary">Row 1</RigText></div>
              <div class="px-4 py-3"><RigText color="secondary">Row 2</RigText></div>
              <div class="px-4 py-3"><RigText color="secondary">Row 3</RigText></div>
            </div>
          </RigPanel>
        </div>
      </div>
    `,
  }),
  parameters: { layout: 'padded' },
}

export const Sidebar: Story = {
  name: 'RigSidebar',
  render: () => ({
    components: { RigText, RigButton, RigIcon, RigSidebar, RigSidebarSection, RigSidebarItem, RigStatus },
    setup() {
      const collapsed = ref(false)
      const active = ref('dashboard')
      return { collapsed, active }
    },
    template: `
      <div class="space-y-6 p-6">
        <div class="flex gap-3 items-center">
          <RigButton variant="outline" size="sm" @click="collapsed = !collapsed">
            {{ collapsed ? 'Expand' : 'Collapse' }}
          </RigButton>
          <RigText variant="caption" color="muted">Active: {{ active }}</RigText>
        </div>

        <div class="flex border border-border-subtle rounded overflow-hidden h-[480px]">
          <RigSidebar :collapsed="collapsed" :width="220" :collapsed-width="56">
            <template #header="{ collapsed: c }">
              <div class="flex items-center gap-2">
                <RigIcon name="mdi:hexagon-outline" size="md" color="accent" />
                <span v-if="!c" class="text-sm font-semibold text-text-primary font-display">Tower</span>
              </div>
            </template>

            <RigSidebarSection title="Main">
              <RigSidebarItem
                icon="mdi:view-dashboard-outline"
                label="Dashboard"
                :active="active === 'dashboard'"
                @click="active = 'dashboard'"
              />
              <RigSidebarItem
                icon="mdi:source-repository"
                label="Repositories"
                :active="active === 'repos'"
                badge="22"
                @click="active = 'repos'"
              />
              <RigSidebarItem
                icon="mdi:chart-timeline-variant"
                label="Analytics"
                :active="active === 'analytics'"
                @click="active = 'analytics'"
              />
            </RigSidebarSection>

            <RigSidebarSection title="Settings">
              <RigSidebarItem
                icon="mdi:cog-outline"
                label="Configuration"
                :active="active === 'config'"
                @click="active = 'config'"
              />
              <RigSidebarItem
                icon="mdi:account-group-outline"
                label="Team"
                :active="active === 'team'"
                @click="active = 'team'"
              />
            </RigSidebarSection>

            <template #footer="{ collapsed: c }">
              <RigSidebarItem
                icon="mdi:help-circle-outline"
                label="Help"
                @click="active = 'help'"
              />
            </template>
          </RigSidebar>

          <div class="flex-1 p-6">
            <RigText variant="heading">{{ active }}</RigText>
            <RigText color="muted" class="mt-2">Content area for the selected section.</RigText>
          </div>
        </div>
      </div>
    `,
  }),
}

export const AppShell: Story = {
  name: 'RigAppShell',
  render: () => ({
    components: {
      RigText, RigButton, RigIcon, RigAppShell, RigHeader,
      RigSidebarSection, RigSidebarItem, RigPage, RigPanel, RigStatus,
    },
    setup() {
      const collapsed = ref(false)
      const active = ref('dashboard')
      return { collapsed, active }
    },
    template: `
      <div class="border border-border-subtle rounded overflow-hidden h-[600px]">
        <RigAppShell
          v-model:sidebar-collapsed="collapsed"
          :sidebar-width="220"
          :sidebar-collapsed-width="56"
        >
          <template #header>
            <RigHeader title="Tower">
              <template #leading>
                <RigButton variant="ghost" size="sm" @click="collapsed = !collapsed">
                  <RigIcon name="mdi:menu" size="sm" />
                </RigButton>
              </template>
              <template #trailing>
                <RigStatus status="healthy" label="All systems" pulse />
              </template>
            </RigHeader>
          </template>

          <template #sidebar="{ collapsed: c }">
            <RigSidebarSection title="Navigation">
              <RigSidebarItem
                icon="mdi:view-dashboard-outline"
                label="Dashboard"
                :active="active === 'dashboard'"
                @click="active = 'dashboard'"
              />
              <RigSidebarItem
                icon="mdi:source-repository"
                label="Repos"
                :active="active === 'repos'"
                badge="22"
                @click="active = 'repos'"
              />
              <RigSidebarItem
                icon="mdi:wrench-outline"
                label="Tools"
                :active="active === 'tools'"
                @click="active = 'tools'"
              />
            </RigSidebarSection>
          </template>

          <RigPage :title="active" description="Application shell with header, sidebar, and main content area.">
            <template #actions>
              <RigButton size="sm">Action</RigButton>
            </template>
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <RigPanel title="Sites" description="Treehouse family">
                <RigText variant="display" color="accent">8</RigText>
              </RigPanel>
              <RigPanel title="Engagements" description="Client work">
                <RigText variant="display" color="accent">6</RigText>
              </RigPanel>
              <RigPanel title="Software" description="Artifacts">
                <RigText variant="display" color="accent">5</RigText>
              </RigPanel>
            </div>
          </RigPage>

          <template #footer>
            <div class="flex items-center justify-between px-4 py-2 border-t border-border bg-surface-base text-xs text-text-muted">
              <span>Amulet Laboratories</span>
              <span>v2.1.0</span>
            </div>
          </template>
        </RigAppShell>
      </div>
    `,
  }),
}

export const Confirm: Story = {
  name: 'RigConfirm',
  render: () => ({
    components: { RigText, RigButton, RigConfirm },
    setup() {
      const dangerOpen = ref(false)
      const warningOpen = ref(false)
      const loadingOpen = ref(false)
      const isLoading = ref(false)

      const handleLoadingConfirm = () => {
        isLoading.value = true
        setTimeout(() => {
          isLoading.value = false
          loadingOpen.value = false
        }, 2000)
      }

      return { dangerOpen, warningOpen, loadingOpen, isLoading, handleLoadingConfirm }
    },
    template: `
      <div class="space-y-6 p-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Tones</RigText>
          <div class="flex gap-3">
            <RigButton tone="danger" variant="outline" @click="dangerOpen = true">Delete project</RigButton>
            <RigButton tone="neutral" variant="outline" @click="warningOpen = true">Archive repos</RigButton>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">With loading state</RigText>
          <RigButton variant="outline" @click="loadingOpen = true">Delete with async</RigButton>
        </div>

        <RigConfirm
          v-model="dangerOpen"
          title="Delete project?"
          description="This will permanently remove the project and all associated data. This action cannot be undone."
          confirm-label="Delete"
          tone="danger"
          @confirm="dangerOpen = false"
        />

        <RigConfirm
          v-model="warningOpen"
          title="Archive repositories?"
          description="Archived repos will be moved to cold storage. You can restore them later."
          confirm-label="Archive"
          tone="warning"
          @confirm="warningOpen = false"
        />

        <RigConfirm
          v-model="loadingOpen"
          title="Delete item?"
          description="Simulates a 2-second async operation."
          confirm-label="Delete"
          tone="danger"
          :loading="isLoading"
          @confirm="handleLoadingConfirm"
        />
      </div>
    `,
  }),
  parameters: { layout: 'padded' },
}

export const Status: Story = {
  name: 'RigStatus',
  render: () => ({
    components: { RigText, RigStatus },
    template: `
      <div class="space-y-6 p-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">All statuses</RigText>
          <div class="flex flex-wrap gap-4">
            <RigStatus v-for="s in ['healthy', 'active', 'warning', 'wip', 'critical', 'error', 'info', 'neutral', 'stub', 'pending', 'archived']" :key="s" :status="s" :label="s" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">With pulse</RigText>
          <div class="flex flex-wrap gap-4">
            <RigStatus status="healthy" label="Online" pulse />
            <RigStatus status="warning" label="Degraded" pulse />
            <RigStatus status="critical" label="Down" pulse />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes</RigText>
          <div class="flex items-center gap-4">
            <RigStatus status="active" label="Small" size="sm" />
            <RigStatus status="active" label="Medium" size="md" />
            <RigStatus status="active" label="Large" size="lg" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Dot only (no label)</RigText>
          <div class="flex gap-2">
            <RigStatus status="healthy" />
            <RigStatus status="warning" />
            <RigStatus status="error" />
            <RigStatus status="neutral" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">In context — repo statuses</RigText>
          <div class="space-y-2 max-w-xs">
            <div class="flex items-center justify-between"><RigText variant="caption">amulet.ink</RigText><RigStatus status="active" label="active" size="sm" /></div>
            <div class="flex items-center justify-between"><RigText variant="caption">hexrig.amulet.ink</RigText><RigStatus status="active" label="active" size="sm" pulse /></div>
            <div class="flex items-center justify-between"><RigText variant="caption">press.amulet.ink</RigText><RigStatus status="pending" label="pending" size="sm" /></div>
            <div class="flex items-center justify-between"><RigText variant="caption">tower.amulet.ink</RigText><RigStatus status="wip" label="wip" size="sm" /></div>
            <div class="flex items-center justify-between"><RigText variant="caption">portfolio.amulet.ink</RigText><RigStatus status="stub" label="stub" size="sm" /></div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: { layout: 'padded' },
}

export const Empty: Story = {
  name: 'RigEmpty',
  render: () => ({
    components: { RigText, RigEmpty },
    template: `
      <div class="space-y-8 p-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Standard empty state</RigText>
          <div class="border border-border-subtle rounded">
            <RigEmpty
              icon="mdi:folder-open-outline"
              title="No projects yet"
              description="Create your first project to get started."
              action-label="Create project"
            />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Search results</RigText>
          <div class="border border-border-subtle rounded">
            <RigEmpty
              icon="mdi:magnify"
              title="No results found"
              description="Try adjusting your search terms or filters."
              action-label="Clear search"
              action-variant="ghost"
            />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Minimal (title only)</RigText>
          <div class="border border-border-subtle rounded">
            <RigEmpty title="Nothing here" />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Custom slot content</RigText>
          <div class="border border-border-subtle rounded">
            <RigEmpty title="Ignored">
              <div class="space-y-2">
                <p class="text-4xl">&#128640;</p>
                <RigText variant="subheading">Custom empty state</RigText>
                <RigText color="muted" variant="caption">Override the default rendering with any content.</RigText>
              </div>
            </RigEmpty>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: { layout: 'padded' },
}
