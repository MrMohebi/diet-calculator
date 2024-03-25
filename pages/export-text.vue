<template>
  <div>
    <SelectButton v-model="locale" :options="['fa', 'en']" aria-labelledby="lang" class="select-lang"/>
    <div style="user-select: text; margin: 20px 0 0 0">
      <div v-if="requiredCalories > 0">
        <span>{{ $t('dailyRequiredCalories') }}: {{ numberWithCommas(requiredCalories) }} {{ $t('kcl') }}</span>
      </div>

      <div v-if="requiredPortion[0] > 0">
        <span>{{ $t('dailyRequiredPortions') }}: {{ numberWithCommas(requiredPortion[0]) }} {{ $t('to') }} {{ numberWithCommas(requiredPortion[1]) }} {{ $t('gram') }}</span>
      </div>

      <br/>

      <div v-for="(meal, index) in meals">
        {{ meal.mealName }} =>
        <span v-for="(food, iFood) in meal.foods">
          <span>
            {{ foods.find(i => i.fdc_id == food.fdc_id)?.[`name_${locale}`] }}
          </span>
          <span> ({{ numberWithCommas(food.amount) }} {{ $t('gram') }}) </span>
          <span v-if="iFood !== meal.foods.length-1"> - </span>
        </span>
      </div>

      <br/>


      <div>
        <div v-if="totalNutrients.energy >0">{{ $t('total') }}  {{ $t('energy') }}: {{numberWithCommas(totalNutrients.energy)}} {{ $t('kcl') }}</div>
        <div v-if="totalNutrients.portion >0">{{ $t('total') }}  {{ $t('portion') }}: {{numberWithCommas(totalNutrients.portion)}} {{ $t('gram') }}</div>
        <div v-if="totalNutrients.carbohydrate >0">{{ $t('total') }}  {{ $t('carbohydrate') }}: {{numberWithCommas(totalNutrients.carbohydrate)}} {{ $t('gram') }}</div>
        <div v-if="totalNutrients.sugar >0">{{ $t('total') }}  {{ $t('sugar') }}: {{numberWithCommas(totalNutrients.sugar)}} {{ $t('gram') }}</div>
        <div v-if="totalNutrients.fiber >0">{{ $t('total') }}  {{ $t('fiber') }}: {{numberWithCommas(totalNutrients.fiber)}} {{ $t('gram') }}</div>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import foods from "~/consts/foods";

definePageMeta({
  layout: "empty"
})

const {locale} = useI18n()
import {useNutrients} from "~/composables/nutrients/useNutrients";
import {useTdee} from "~/composables/tdee/useTdee";
import numberWithCommas from "~/utils/numberWithCommas";

const {
  meals,
  totalNutrients
} = useNutrients()
const {requiredCalories, requiredPortion} = useTdee()

</script>

<style scoped lang="scss">

</style>