<template>
  <nuxt-layout :class="{rtl: rtlNeededLanguages.includes(locale)}">
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup lang="ts">
import {useNutrientsStore} from "~/composables/nutrients/nutrients.store";
import {MEALS_LS} from "~/consts/keys";

const { locale, setLocaleCookie } = useI18n()
const nutrientsStore = useNutrientsStore()

const rtlNeededLanguages = ['fa']

nutrientsStore.$subscribe((mutation, state) => {
  localStorage.setItem(MEALS_LS, JSON.stringify(state))
})
onMounted(()=>{
  nutrientsStore.loadFromLS()
})

watch(locale,(value)=>{
  setLocaleCookie(value)
})

</script>