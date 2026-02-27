<script setup lang="ts">
import { ref } from 'vue'
import {
  RigButton,
  RigCard,
  RigInput,
  RigSelect,
  RigCheckbox,
  RigSwitch,
  RigText,
  RigDivider,
  RigBadge,
  RigAvatar,
  RigAlert,
  RigBreadcrumb,
  RigTabs,
  RigSkeleton,
} from '@amulet-laboratories/rig'

// --- Form state ---
const displayName = ref('Anthony Passanisi')
const email = ref('anthony@amulet.ink')
const defaultTheme = ref('hearth')
const emailNotifications = ref(true)
const weeklyDigest = ref(false)
const darkMode = ref(true)
const reducedMotion = ref(false)

// --- Section state ---
const activePanel = ref('profile')
const saved = ref(false)
const loading = ref(false)

const onSave = () => {
  loading.value = true
  saved.value = false
  setTimeout(() => {
    loading.value = false
    saved.value = true
    setTimeout(() => {
      saved.value = false
    }, 4000)
  }, 1200)
}

const onReset = () => {
  displayName.value = 'Anthony Passanisi'
  email.value = 'anthony@amulet.ink'
  defaultTheme.value = 'hearth'
  emailNotifications.value = true
  weeklyDigest.value = false
  darkMode.value = true
  reducedMotion.value = false
  saved.value = false
}
</script>

<template>
  <section class="relative py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Composition</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        Components in concert.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg mb-16 max-w-xl">
        Fifteen components, one coherent form. Switch themes and watch every surface, control, and
        label respond in unison.
      </p>

      <!-- Interactive settings panel -->
      <div v-reveal>
        <RigCard elevation="prominent">
          <!-- Header -->
          <div class="px-6 pt-6 pb-4 border-b border-border-subtle">
            <div class="flex items-center justify-between mb-4">
              <RigBreadcrumb
                :items="[
                  { label: 'App', href: '#' },
                  { label: 'Settings', href: '#' },
                  { label: 'Profile' },
                ]"
              />
              <RigBadge variant="soft" tone="accent" dot>v2.0.0</RigBadge>
            </div>
            <div class="flex items-center gap-4">
              <RigAvatar :name="displayName" size="lg" />
              <div>
                <RigText variant="heading">{{ displayName || 'Unnamed' }}</RigText>
                <RigText variant="caption" color="muted">{{ email || 'No email set' }}</RigText>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="px-6 pt-4">
            <RigTabs
              v-model="activePanel"
              :tabs="[
                { value: 'profile', label: 'Profile' },
                { value: 'preferences', label: 'Preferences' },
                { value: 'loading', label: 'Loading state' },
              ]"
            />
          </div>

          <!-- Panel content -->
          <div class="px-6 py-6">
            <!-- Profile panel -->
            <div v-if="activePanel === 'profile'" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <RigInput
                  v-model="displayName"
                  label="Display name"
                  description="Visible to other team members."
                />
                <RigInput v-model="email" label="Email" type="email" />
              </div>
              <RigSelect
                v-model="defaultTheme"
                label="Default theme"
                description="Applied when no user preference is detected."
                :options="[
                  { value: 'hearth', label: 'Hearth — warm amber' },
                  { value: 'abyss', label: 'Abyss — deep indigo' },
                  { value: 'reef', label: 'Reef — teal cyan' },
                  { value: 'ember', label: 'Ember — burnt orange' },
                  { value: 'grove', label: 'Grove — forest green' },
                  { value: 'cove', label: 'Cove — cool violet' },
                  { value: 'slate', label: 'Slate — neutral cool' },
                  { value: 'keep', label: 'Keep — pure neutral' },
                  { value: 'linen', label: 'Linen — warm neutral' },
                ]"
              />
            </div>

            <!-- Preferences panel -->
            <div v-else-if="activePanel === 'preferences'" class="space-y-5">
              <div>
                <RigText variant="subheading" class="mb-4">Notifications</RigText>
                <div class="space-y-3">
                  <RigCheckbox
                    v-model="emailNotifications"
                    label="Email notifications"
                    description="Receive alerts when components are updated."
                  />
                  <RigCheckbox
                    v-model="weeklyDigest"
                    label="Weekly digest"
                    description="Summary of changes across the design system."
                  />
                </div>
              </div>
              <RigDivider />
              <div>
                <RigText variant="subheading" class="mb-4">Appearance</RigText>
                <div class="space-y-3">
                  <RigSwitch v-model="darkMode" label="Dark mode" />
                  <RigSwitch
                    v-model="reducedMotion"
                    label="Reduce motion"
                    description="Minimize animations and transitions."
                  />
                </div>
              </div>
            </div>

            <!-- Loading state panel -->
            <div v-else class="space-y-5">
              <RigText variant="caption" color="muted"
                >Skeleton variants as content placeholders — used while data loads.</RigText
              >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="space-y-3">
                  <RigSkeleton variant="text" />
                  <RigSkeleton variant="rect" />
                </div>
                <div class="space-y-3">
                  <RigSkeleton variant="text" />
                  <RigSkeleton variant="rect" />
                </div>
              </div>
              <RigSkeleton variant="text" :lines="2" />
              <div class="flex gap-3 items-start">
                <RigSkeleton variant="circle" />
                <div class="flex-1 space-y-2">
                  <RigSkeleton variant="heading" />
                  <RigSkeleton variant="text" :lines="2" />
                </div>
              </div>
            </div>
          </div>

          <!-- Success alert -->
          <div v-if="saved" class="px-6 pb-2">
            <RigAlert tone="success" title="Settings saved" dismissible @dismiss="saved = false" />
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-border-subtle flex items-center justify-end gap-3">
            <RigButton variant="ghost" tone="neutral" @click="onReset">Reset</RigButton>
            <RigButton variant="solid" tone="accent" :loading="loading" @click="onSave"
              >Save changes</RigButton
            >
          </div>
        </RigCard>
      </div>
    </div>
  </section>
</template>
