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
    '@netlify/nuxt',
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
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css'
        }
      ],
      script: [
        {
          src: 'https://web3forms.com/client/script.js',
          async: true,
          defer: true
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js'
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-sql.min.js'
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js'
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
      accessKey: process.env.ACCESS_KEY,
      
      // Firebase Configuration
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
      }
    }
  },
  build: {
    transpile: ['gsap'],
  },
  
  nitro: {
    // Plain static output in .output/public; stops Nitro auto-picking a host preset (e.g. vercel-static).
    preset: 'static',
    prerender: {
      crawlLinks: true,
      failOnError: false,
      ignore: ['/www.linkedin.com', '/www.linkedin.com/in/oscar-mcintosh', '/api/contact']
    }
  }
  
})
