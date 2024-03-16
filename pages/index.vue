<template>
  <div>
    <meals :style="{maxWidth:$isMobile? '100%': '50%'}"/>
  </div>
</template>

<script setup lang="ts">
import Meals from "~/components/meals.vue"

const { $isMobile } = useNuxtApp()

</script>

<style scoped lang="scss">

</style>