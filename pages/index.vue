<template>
  <div class="row">
    <Fieldset :legend="`${$t('total')}:`" style="width:100%; padding:0 20px; margin: 14px 0 0 0">
      <sum-nutrients />
    </Fieldset>
    <meals :style="{width:$isMobile? '100%': '100%', padding:'0 20px'}"/>
  </div>
</template>

<script setup lang="ts">
import Meals from "~/components/meals.vue"
import SumNutrients from "~/components/sumNutrients.vue";

const { $isMobile } = useNuxtApp()

</script>

<style scoped lang="scss">

</style>