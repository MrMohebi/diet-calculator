<template>
  <div class="row">
    <div :class="{'desktop-total-container': !$isMobile}">
      <bottom-shit v-if="$isMobile" v-model="isOpenBmr" :topShit="true" :icon-outlined="false" icon-severity="info">
        <template #header>
          <div style="width: 100%;justify-content: space-between;flex-direction: row-reverse;align-items: center;" class="row">
            <SelectButton v-model="locale" :options="['fa', 'en']" aria-labelledby="lang"  class="select-lang"/>
            <div>
              <span v-if="!isOpenBmr" style="color: rgb(91 145 173)">
                {{$t('enterBodyData')}}
              </span>
            </div>
          </div>
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

    <div :style="{width:$isMobile? '100%': '100%', padding:'0 20px', paddingBottom:$isMobile?'130px':0, paddingTop:$isMobile?'50px':0}" class=" animate__animated animate__fadeInUp">
      <Message v-if="selectedPlan.id >0" :closable="false" icon="" style="width: 100%;" severity="info">
        <template #messageicon>
          <div></div>
        </template>
        <div style="width: 100%;" class="col">
          <div style="margin-bottom:20px">
            {{ $t('loadedPlan') }}:
          </div>
          <div style="width: 100%" class="row justify-between">
            <div>{{$t('title')}}: </div>
            <div>{{selectedPlan.title}}</div>
          </div>
          <div style="width: 100%" class="row justify-between">
            <div>{{$t('author')}}: </div>
            <div>{{selectedPlan.author}}</div>
          </div>
          <div style="max-width:600px; overflow:hidden" class="row justify-between">
            <div>{{$t('description')}}: </div>
            <div>{{selectedPlan.details}}</div>
          </div>
        </div>
      </Message>
      <meals />
    </div>

  </div>
</template>

<script setup lang="ts">
import Message from 'primevue/message';

import Meals from "~/components/meals.vue"
import SumNutrients from "~/components/sumNutrients.vue";
import {usePlans} from "~/composables/plans/usePlans";

const {getPlan, selectedPlan} = usePlans()

const route = useRoute()

const bottomShit = resolveComponent('bottom-shit')
const Fieldset = resolveComponent('Fieldset')

const { $isMobile } = useNuxtApp()
const { locale } = useI18n()
const isOpenSum = ref(false)
const isOpenBmr = ref(false)

onMounted(async ()=>{
  if(route.query.hasOwnProperty('planId') && route.query.planId > 0){
    getPlan(route.query.planId)
  }
})

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
:deep(.p-message-text){
  width: 100%;
}
</style>