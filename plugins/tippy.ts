import { directive as VTippy } from 'vue-tippy'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('tippy', VTippy)
})