# Contributing to HexRig

Thank you for your interest in contributing to HexRig.

## Development Setup

```bash
pnpm install
pnpm build
pnpm dev
```

## Branch Strategy

- `main` — protected, deploy target
- Direct push for solo work, PRs for contractor contributions

## Code Standards

- TypeScript strict mode, no `any`
- Vue 3 Composition API with `<script setup lang="ts">`
- Tailwind CSS only — no `<style>` blocks
- 2-space indent, no semicolons, single quotes, trailing commas
- Commit messages: imperative mood (`feat: add form validation`)

## Testing

```bash
pnpm test        # run once
pnpm test:watch  # watch mode
```

All new components and composables must include tests in `src/__tests__/`.

## Linting & Formatting

```bash
pnpm lint        # check
pnpm lint:fix    # auto-fix
pnpm format      # format all files
```
