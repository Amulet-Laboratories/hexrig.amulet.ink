import type { StorybookConfig } from '@storybook/vue3-vite'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: ['../packages/rig/src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-links', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const vue = (await import('@vitejs/plugin-vue')).default
    const Icons = (await import('unplugin-icons/vite')).default
    const IconsResolver = (await import('unplugin-icons/resolver')).default
    const Components = (await import('unplugin-vue-components/vite')).default

    // Add Vue plugin if not already present
    const hasVuePlugin = config.plugins?.some(
      (p: any) =>
        p &&
        (p.name === 'vite:vue' ||
          (Array.isArray(p) && p.some((pp: any) => pp?.name === 'vite:vue'))),
    )
    if (!hasVuePlugin) {
      config.plugins = config.plugins ?? []
      config.plugins.push(vue())
    }

    // Add unplugin-icons + auto-resolver
    config.plugins = config.plugins ?? []
    config.plugins.push(
      Icons({
        compiler: 'vue3',
        autoInstall: false,
      }),
      Components({
        resolvers: [
          IconsResolver({
            prefix: 'icon',
          }),
        ],
        dts: false,
      }),
    )

    // Alias Vue to the full build (includes template compiler for inline templates)
    const { createRequire } = await import('module')
    const req = createRequire(import.meta.url)
    const vuePath = req.resolve('vue/dist/vue.esm-bundler.js')
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      vue: vuePath,
    }

    // Include rig's tailwind config for processing
    config.css = config.css ?? {}
    config.css.postcss = {
      plugins: [
        (await import('tailwindcss')).default({
          config: './packages/rig/tailwind.config.ts',
        }),
        (await import('autoprefixer')).default(),
      ],
    }

    // Allow Vite to serve files from the full workspace root
    const rootDir = resolve(__dirname, '..')
    config.server = config.server ?? {}
    config.server.fs = config.server.fs ?? {}
    config.server.fs.allow = [rootDir]

    return config
  },
}

export default config
