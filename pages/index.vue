<template>
  <div class="row">
    <div :class="{'desktop-total-container': !$isMobile}">
      <bottom-shit v-if="$isMobile" v-model="isOpenBmr" :topShit="true">
        <template #header>
          <SelectButton v-model="locale" :options="['fa', 'en']" aria-labelledby="lang"  class="select-lang"  style="margin-right: auto;"/>
        </template>
        <bmr/>
      </bottom-shit>
      <Fieldset v-else :legend="`BMR`">
        <bmr/>
      </Fieldset>


      <component
          :is="$isMobile? bottomShit : Fieldset"
          v-model="isOpenSum"
          :legend="`${$t('total')}:`"

      >
        <sum-nutrients />
      </component>
    </div>


    <meals :style="{width:$isMobile? '100%': '100%', padding:'0 20px', paddingBottom:$isMobile?'130px':0, paddingTop:$isMobile?'50px':0}" class=" animate__animated animate__fadeInUp"/>

  </div>
</template>

<script setup lang="ts">
import Meals from "~/components/meals.vue"
import SumNutrients from "~/components/sumNutrients.vue";

const bottomShit = resolveComponent('bottom-shit')
const Fieldset = resolveComponent('Fieldset')

const { $isMobile } = useNuxtApp()
const { locale } = useI18n()
const isOpenSum = ref(false)
const isOpenBmr = ref(false)

</script>

<style scoped lang="scss">
.desktop-total-container{
  width:100%;
  padding:0 20px;
  margin: 14px 0 0 0
}
.select-lang{
  :deep(.p-button-label){
    font-size: 12px;
  }
}

</style>