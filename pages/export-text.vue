<template>
  <div>
    <SelectButton v-model="locale" :options="['fa', 'en']" aria-labelledby="lang" class="select-lang"/>
    <div style="user-select: text; margin: 20px 0 0 0">
      <div v-if="requiredCalories > 0">
        <span>{{ $t('dailyRequiredCalories') }}: {{ numberWithCommas(requiredCalories) }} {{ $t('kcl') }}</span>
      </div>

      <div v-if="requiredProtein[0] > 0">
        <span>{{ $t('dailyRequiredProteins') }}: {{ numberWithCommas(requiredProtein[0]) }} {{ $t('to') }} {{ numberWithCommas(requiredProtein[1]) }} {{ $t('gram') }}</span>
      </div>

      <br/>

      <div v-for="(meal, index) in meals">
        {{ meal.mealName }} =>
        <span v-for="(food, iFood) in meal.foods">
          <template v-if="food.fdc_id==-1">
            {{food.customName}}
          </template>
          <template v-else>
            <span>
            {{ foods.find(i => i.fdc_id == food.fdc_id)?.[`name_${locale}`] }}
            </span>
            <span> [ {{ numberWithCommas(food.amount) }} {{ foodLabelGenerator(food.portions.find(i=>i.id == food.selectedPortionId)) }} ] </span>
          </template>
          <span v-if="iFood !== meal.foods.length-1"> - </span>

        </span>
      </div>

      <br/>


      <div>
        <div v-if="totalNutrients.energy >0">{{ $t('total') }}  {{ $t('energy') }}: {{numberWithCommas(totalNutrients.energy)}} {{ $t('kcl') }}</div>
        <div v-if="totalNutrients.protein >0">{{ $t('total') }}  {{ $t('protein') }}: {{numberWithCommas(totalNutrients.protein)}} {{ $t('gram') }}</div>
        <div v-if="totalNutrients.carbohydrate >0">{{ $t('total') }}  {{ $t('carbohydrate') }}: {{numberWithCommas(totalNutrients.carbohydrate)}} {{ $t('gram') }}</div>
        <div v-if="totalNutrients.sugar >0">{{ $t('total') }}  {{ $t('sugar') }}: {{numberWithCommas(totalNutrients.sugar)}} {{ $t('gram') }}</div>
        <div v-if="totalNutrients.fiber >0">{{ $t('total') }}  {{ $t('fiber') }}: {{numberWithCommas(totalNutrients.fiber)}} {{ $t('gram') }}</div>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "empty"
})

const {locale} = useI18n()
import {useNutrients} from "~/composables/nutrients/useNutrients";
import {useTdee} from "~/composables/tdee/useTdee";
import numberWithCommas from "~/utils/numberWithCommas";
import {useFoods} from "~/composables/foods/useFoods";

const {getFoods, foods} = useFoods()
const {
  meals,
  totalNutrients,
  foodLabelGenerator
} = useNutrients()

const {requiredCalories, requiredProtein} = useTdee()

onMounted(()=>{
  getFoods()
})

</script>

<style scoped lang="scss">

</style>