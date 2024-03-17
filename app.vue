<template>
  <nuxt-layout :class="{rtl: rtlNeededLanguages.includes(locale)}">
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const rtlNeededLanguages = ['fa']
</script>