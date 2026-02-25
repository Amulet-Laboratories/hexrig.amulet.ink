<template>
  <section class="relative py-32 px-6">
    <!-- Section header -->
    <div class="max-w-6xl mx-auto mb-20">
      <div class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Components</span>
      </div>
      <h2 class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight">
        Every piece,<br />considered.
      </h2>
    </div>

    <!-- Component gallery — real components, no explanation needed -->
    <div class="max-w-6xl mx-auto space-y-6">

      <!-- Row 1: Buttons -->
      <div class="bg-surface-raised border border-border-subtle rounded p-8 sm:p-10">
        <div class="flex items-center gap-2 mb-8">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">RigButton</span>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <button class="inline-flex items-center justify-center rounded font-body font-medium transition-colors duration-normal ease-standard px-4 pt-[7px] pb-[9px] text-base min-h-[40px] bg-accent text-text-on-accent hover:bg-accent-hover active:bg-accent-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            Primary
          </button>
          <button class="inline-flex items-center justify-center rounded font-body font-medium transition-colors duration-normal ease-standard px-4 pt-[7px] pb-[9px] text-base min-h-[40px] border-2 border-accent text-accent hover:bg-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            Outline
          </button>
          <button class="inline-flex items-center justify-center rounded font-body font-medium transition-colors duration-normal ease-standard px-4 pt-[7px] pb-[9px] text-base min-h-[40px] text-accent hover:bg-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            Ghost
          </button>
          <button class="inline-flex items-center justify-center rounded font-body font-medium transition-colors duration-normal ease-standard px-4 pt-[7px] pb-[9px] text-base min-h-[40px] bg-surface-raised text-text-primary border border-border hover:bg-surface-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            Neutral
          </button>
          <button class="inline-flex items-center justify-center rounded font-body font-medium transition-colors duration-normal ease-standard px-4 pt-[7px] pb-[9px] text-base min-h-[40px] bg-status-error text-text-inverse hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            Danger
          </button>
          <button class="inline-flex items-center justify-center rounded font-body font-medium px-4 pt-[7px] pb-[9px] text-base min-h-[40px] bg-accent text-text-on-accent opacity-50 pointer-events-none" disabled>
            <svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Loading
          </button>
        </div>
      </div>

      <!-- Row 2: Cards + Input side by side -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Cards -->
        <div class="bg-surface-raised border border-border-subtle rounded p-8 sm:p-10">
          <div class="flex items-center gap-2 mb-8">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">RigCard</span>
          </div>
          <div class="space-y-4">
            <div class="bg-surface-base border border-border rounded overflow-hidden">
              <div class="px-4 pt-4 pb-2 border-b border-border-subtle">
                <span class="font-display text-base text-text-primary">Flat</span>
              </div>
              <div class="p-4">
                <p class="text-sm text-text-secondary">No elevation. Grounded in the surface.</p>
              </div>
            </div>
            <div class="bg-surface-raised shadow-md rounded overflow-hidden">
              <div class="px-4 pt-4 pb-2 border-b border-border-subtle">
                <span class="font-display text-base text-text-primary">Raised</span>
              </div>
              <div class="p-4">
                <p class="text-sm text-text-secondary">Lifted from the surface. Default state.</p>
              </div>
            </div>
            <div class="bg-surface-raised shadow-lg rounded overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-normal">
              <div class="p-4">
                <span class="font-display text-base text-text-primary">Interactive</span>
                <p class="text-sm text-text-muted mt-1">Hover me. Press me.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Inputs -->
        <div class="bg-surface-raised border border-border-subtle rounded p-8 sm:p-10">
          <div class="flex items-center gap-2 mb-8">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">RigInput</span>
          </div>
          <div class="space-y-5">
            <div class="flex flex-col gap-1.5">
              <label class="font-body text-sm font-medium text-text-primary">Display name</label>
              <input
                type="text"
                value="Amulet"
                class="block w-full rounded border bg-surface-sunken px-3 py-2 font-body text-base text-text-primary placeholder:text-text-muted shadow-inner transition-colors duration-fast border-border hover:border-border-strong focus:outline-none focus:border-focus-ring focus:ring-2 focus:ring-focus-ring"
              />
              <p class="text-sm text-text-muted">Your public display name.</p>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="font-body text-sm font-medium text-text-primary">
                Email <span class="text-status-error ml-0.5">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                class="block w-full rounded border bg-surface-sunken px-3 py-2 font-body text-base text-text-primary placeholder:text-text-muted shadow-inner transition-colors duration-fast border-border hover:border-border-strong focus:outline-none focus:border-focus-ring focus:ring-2 focus:ring-focus-ring"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="font-body text-sm font-medium text-text-primary">Error state</label>
              <input
                type="text"
                value="invalid"
                class="block w-full rounded border bg-surface-sunken px-3 py-2 font-body text-base text-text-primary shadow-inner border-status-error focus:outline-none focus:border-focus-ring focus:ring-2 focus:ring-focus-ring"
              />
              <p class="text-sm text-status-error">This field is required.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 3: Alerts + Badges -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Alerts -->
        <div class="bg-surface-raised border border-border-subtle rounded p-8 sm:p-10">
          <div class="flex items-center gap-2 mb-8">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">RigAlert</span>
          </div>
          <div class="space-y-3">
            <div class="flex items-start gap-3 p-4 rounded border border-status-success/30 bg-surface-raised">
              <svg class="w-5 h-5 text-status-success shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div><p class="text-sm font-medium text-text-primary">Changes saved</p></div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded border border-status-warning/30 bg-surface-raised">
              <svg class="w-5 h-5 text-status-warning shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              <div><p class="text-sm font-medium text-text-primary">Approaching rate limit</p></div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded border border-status-error/30 bg-surface-raised">
              <svg class="w-5 h-5 text-status-error shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div><p class="text-sm font-medium text-text-primary">Deployment failed</p></div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded border border-border bg-surface-raised">
              <svg class="w-5 h-5 text-status-info shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div><p class="text-sm font-medium text-text-primary">New version available</p></div>
            </div>
          </div>
        </div>

        <!-- Badges + Dividers + Typography -->
        <div class="bg-surface-raised border border-border-subtle rounded p-8 sm:p-10">
          <div class="flex items-center gap-2 mb-8">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">RigBadge · RigText</span>
          </div>
          <div class="space-y-6">
            <!-- Badges -->
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex items-center gap-1 rounded-full font-body font-medium px-2.5 py-0.5 text-sm bg-accent-muted text-accent">Default</span>
              <span class="inline-flex items-center gap-1 rounded-full font-body font-medium px-2.5 py-0.5 text-sm bg-status-success/10 text-status-success">
                <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
                Live
              </span>
              <span class="inline-flex items-center gap-1 rounded-full font-body font-medium px-2.5 py-0.5 text-sm bg-status-warning/10 text-status-warning">Pending</span>
              <span class="inline-flex items-center gap-1 rounded-full font-body font-medium px-2.5 py-0.5 text-sm border border-status-error text-status-error">Failed</span>
              <span class="inline-flex items-center gap-1 rounded-full font-body font-medium px-2.5 py-0.5 text-sm border border-border text-text-muted">Draft</span>
            </div>

            <!-- Divider -->
            <div class="flex items-center gap-4">
              <div class="flex-1 h-px bg-border-subtle" />
              <span class="text-xs text-text-muted font-mono">Typography</span>
              <div class="flex-1 h-px bg-border-subtle" />
            </div>

            <!-- Type samples -->
            <div class="space-y-3">
              <p class="font-display text-2xl text-text-primary">Display text</p>
              <p class="font-body text-base text-text-primary font-semibold">Heading text</p>
              <p class="font-body text-base text-text-secondary">Body text — secondary color for sustained reading.</p>
              <p class="font-body text-sm text-text-muted">Caption text — muted, contextual.</p>
              <p class="font-mono text-sm text-accent">const theme = 'hearth'</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
