import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
    'nuxt-auth-utils'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  css: [
    'primeicons/primeicons.css'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  vite: {
    optimizeDeps: {
      exclude: ["primevue"]
    }
  },
  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24 * 7
    },
    databaseUrl: process.env.DATABASE_URL || ""
  }
})
