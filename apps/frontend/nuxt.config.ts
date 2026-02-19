// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/hints', '@nuxt/image'],

  typescript: {
    tsConfig: {
      extends: '../../../packages/config/tsconfig.base.json',
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@artezia/frontend/*': ['./*'],
          '@artezia/backend/*': ['../backend/src/*'],
          '@artezia/database/*': ['../../packages/database/src/*'],
          '@artezia/config/*': ['../../packages/config/src/*'],

          '#app': ['./.nuxt/app'],
          '#imports': ['./.nuxt/imports'],
          '#build': ['./.nuxt/build'],
          '#components': ['./.nuxt/components'],
          '#layouts': ['./.nuxt/layouts'],
          '#pages': ['./.nuxt/pages'],
          '#server': ['./.nuxt/server'],
          '#ui': ['./.nuxt/ui'],
          '#assets': ['./assets'],
          '#public': ['./public'],
        },
      },
    },
  },
});
