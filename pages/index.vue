<template>
  <div class="row">
    <component
      :is="$isMobile? bottomShit : Fieldset"
      v-model="isOpen"
      :legend="`${$t('total')}:`"
      :class="{'desktop-total-container': !$isMobile}"
      >
      <sum-nutrients />
    </component>


    <meals :style="{width:$isMobile? '100%': '100%', padding:'0 20px', paddingBottom:$isMobile?'130px':0}"/>

  </div>
</template>

<script setup lang="ts">
import Meals from "~/components/meals.vue"
import SumNutrients from "~/components/sumNutrients.vue";

const bottomShit = resolveComponent('bottom-shit')
const Fieldset = resolveComponent('Fieldset')

const { $isMobile } = useNuxtApp()
const isOpen = ref(false)

</script>

<style scoped lang="scss">
.desktop-total-container{
  width:100%;
  padding:0 20px;
  margin: 14px 0 0 0
}
</style>