// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-14',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'PasteSVG - SVG to Image Converter',
      meta: [
        {
          name: 'description',
          content:
            'Convert SVG code to displayable images with real-time preview',
        },
      ],
    },
  },
  nitro: {
    preset: 'cloudflare_module',
    externals: {
      inline: ['vue', '@vue/server-renderer', 'devalue', 'unhead'],
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
});
