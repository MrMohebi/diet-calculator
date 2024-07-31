<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup lang="ts">
import {useNutrientsStore} from "~/composables/nutrients/nutrients.store";
import {MEALS_LS, TDEE_LS} from "~/consts/keys";
import {useTdeeStore} from "~/composables/tdee/tdee.store";
import {useDBStore} from "~/composables/db/db.store";


const { locale, setLocaleCookie } = useI18n()
const nutrientsStore = useNutrientsStore()
const tdeeStore = useTdeeStore()


const rtlNeededLanguages = ['fa']

useHead({
  bodyAttrs: {
    class:  computed(()=>(rtlNeededLanguages.includes(locale.value) ? 'rtl' : 'ltr'))
  }
})

nutrientsStore.$subscribe((mutation, state) => {
  if(!mutation.events.target.hasOwnProperty('meals')){
    localStorage.setItem(MEALS_LS, JSON.stringify(state))
  }
})
tdeeStore.$subscribe((mutation, state) => {
  localStorage.setItem(TDEE_LS, JSON.stringify(state))
})
onMounted(()=>{
  nutrientsStore.loadFromLS()
  tdeeStore.loadFromLS()
})

watch(locale,(value)=>{
  setLocaleCookie(value)
})

</script>