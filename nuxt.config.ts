// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint'
  ],
  colorMode: {
    preference: 'system', // Default to system preference
    fallback: 'light', // Fallback mode if system preference is not detectable
    storageKey: 'nuxt-color-mode' // Optional: Customize storage key
  },

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})
