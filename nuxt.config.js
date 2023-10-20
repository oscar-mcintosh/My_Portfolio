// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from "nuxt";
import { resolve } from "path"

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, "/")
  },

  modules: [
    '@pinia/nuxt',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'My Portfolio',
      meta: [
        { name: 'description', content: 'A site to display my projects'}
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
        }
      ]
    }
  },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {

    public: {
      // API_BEARER_TOKEN: process.env.VUE_APP_API_BEARER_TOKEN,
      // API: process.env.VUE_APP_API,

      apiKey: process.env.API_KEY,
      apiUrl: process.env.API_URL,
  

    }
  },

  
})
