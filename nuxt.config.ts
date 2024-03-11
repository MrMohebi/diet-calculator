// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    FDC_API_KEY: 'ZK28BIF4kIQ79MdkTs4Cau17wf7hLKow2TRaUgfs'
  },
  storage: {
    db: {
      driver: 'fs',
      base: './.data/db'
    }
  }
})
