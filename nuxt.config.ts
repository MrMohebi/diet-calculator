// https://nuxt.com/docs/api/configuration/nuxt-config
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    FDC_API_KEY: 'ZK28BIF4kIQ79MdkTs4Cau17wf7hLKow2TRaUgfs'
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
  },
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css',
    join(currentDir, './assets/css/main.scss'),
  ],
  // @ts-ignore
  storage: {
    db: {
      driver: 'fs',
      base: './.data/db'
    }
  },
})
