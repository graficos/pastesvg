// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'PasteSVG - SVG to Image Converter',
      meta: [
        { name: 'description', content: 'Convert SVG code to displayable images with real-time preview' }
      ]
    }
  }
})