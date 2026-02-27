# @amulet-laboratories/site

Documentation site for the HexRig design system. This is a private Vite + Vue 3 application — it is not published to npm. Library documentation is in Storybook, not here.

## What this is

- A landing page and demo app hosted at [hexrig.amulet.ink](https://hexrig.amulet.ink)
- Storybook is built alongside the site and served at `/storybook`
- Source of truth for component docs is the Storybook stories in `packages/rig/src/stories/`

## Running locally

```bash
# From the monorepo root
pnpm dev

# Or from this package
cd packages/site
pnpm dev        # Vite dev server at http://localhost:5173
```

Build Storybook separately:

```bash
# From the monorepo root
pnpm storybook   # dev at http://localhost:6006
```

## Structure

```
src/
├── components/   Brand-only components — not part of the published @amulet-laboratories/rig library
│   ├── RigMakerStamp.vue     — "Made with Rig" attribution stamp
│   ├── RigOrnament.vue       — decorative SVG corner ornament
│   ├── RigNotifyForm.vue     — email notify form (Netlify form)
│   └── RigSiteFooter.vue     — site footer composition
├── sections/     Page section components used by App.vue
└── App.vue       Root app — composes sections into the landing page
```

## Important notes

- **Brand components** (`src/components/`) live here, not in the published library. Do not re-export them from `packages/rig`.
- **Netlify forms** use a raw `<input name="...">` — `RigInput` does not forward `name` to the inner input, so it cannot be used for Netlify form fields.
- **Theme:** The site uses the `hearth` theme in dark mode as its primary look.
