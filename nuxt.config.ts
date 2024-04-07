// https://nuxt.com/docs/api/configuration/nuxt-config
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    FDC_API_KEY: 'ZK28BIF4kIQ79MdkTs4Cau17wf7hLKow2TRaUgfs',

    public: {
      FOODS_LIST_URL: "https://raw.githubusercontent.com/MrMohebi/diet-calculator/master/___default-contents/foods.json",
      PLANS_LIST_URL: "https://raw.githubusercontent.com/MrMohebi/diet-calculator/master/___default-contents/plans.json"
    }
  },
  app: {
    head: {
      title:"Diet Calculator",
      charset: "utf-8",
      meta: [{ name: "theme-color", content: "#36ff00" }],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
        {
          hid: "apple-touch-icon",
          rel: "apple-touch-icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },
  modules: [
    'nuxt-primevue',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  primevue: {
    /* Options */
  },
  i18n: {
    // Module Options
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'dc-lang',
      redirectOn: 'root',
      fallbackLocale: 'fa'
    },
  },
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css',
    'animate.css',
    join(currentDir, './assets/css/main.scss'),
  ],
  // @ts-ignore
  storage: {
    db: {
      driver: 'fs',
      base: './.data/db'
    }
  },
  vite: {
    optimizeDeps: {
      include: ["qs"],
    },
  },
})
