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
      title: 'Oscar McIntosh - Data Analyst Portfolio',
      meta: [
        { name: 'description', content: 'Data Analyst specializing in SQL, Snowflake, and large dataset analysis. Transforming complex data into actionable business insights.'}
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
        }
      ],
      script: [
        {
          src: 'https://web3forms.com/client/script.js',
          async: true,
          defer: true
        }
      ]
    }
  },
  css: [
    '~/assets/css/main.css',
  '~/assets/css/style.css'
],

  runtimeConfig: {

    public: {
      // API_BEARER_TOKEN: process.env.VUE_APP_API_BEARER_TOKEN,
      // API: process.env.VUE_APP_API,

      apiKey: process.env.API_KEY,
      apiUrl: process.env.API_URL,
      accessKey: process.env.ACCESS_KEY
    }
  },
  build: {
    transpile: ['gsap'],
  },

  serverMiddleware: [
    { path: '/api/contact', handler: '~/api/contact.js' }
  ],
  
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      ignore: ['/www.linkedin.com', '/www.linkedin.com/in/oscar-mcintosh']
    }
  }
  
})
