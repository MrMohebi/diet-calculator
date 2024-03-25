<template>
  <div>
    <table>
      <tr>
        <td>{{$t('energy')}}: </td>
        <td style="width: 100%;" class="center-content-row">
          <template v-if="totalNutrients.energy<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <ProgressBar style="width: 100%" v-if="requiredCalories > 0" :value="(totalNutrients.energy /requiredCalories) * 100">
              <div :style="{color: totalNutrients.energy > requiredCalories ? '#b11111' : '',textWrap: 'nowrap' }">
                {{
                  `${numberWithCommas(totalNutrients.energy)} ${$t('from')} ${numberWithCommas(requiredCalories)}
                   ${excessedCaloriesPercentage > 0 ?
                      ' - '+excessedCaloriesPercentage + "% " + $t('excess')
                      :
                      ' - '+Math.abs(excessedCaloriesPercentage) + "% " + $t('lack')
                    }
                  `
                }}
              </div>
            </ProgressBar>
            <template v-else>
              <span >{{numberWithCommas(totalNutrients.energy)}}</span><span>Kcl</span>
            </template>
          </template>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <MeterGroup :value="energyMeter" />
        </td>
      </tr>
      <tr>
        <td>{{$t('portion')}}: </td>
        <td style="width: 100%;" class="center-content-row">
          <template v-if="totalNutrients.portion<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <ProgressBar style="width: 100%" v-if="requiredPortion[1] > 0" :value="(totalNutrients.portion /requiredPortion[1]) * 100">
              <div :style="{color: totalNutrients.portion > requiredPortion[1] ? '#b11111' : '',textWrap: 'nowrap' }">
                {{
                  `${numberWithCommas(totalNutrients.portion)} ${$t('from')} ${numberWithCommas(requiredPortion[1])}
                   ${excessedPortionPercentage > 0 ?
                      ' - '+excessedPortionPercentage + "% " + $t('excess')
                      :
                      ' - '+Math.abs(excessedPortionPercentage) + "% " + $t('lack')
                  }
                  `
                }}
              </div>
            </ProgressBar>
            <template v-else>
              <span>{{numberWithCommas(totalNutrients.portion)}}</span><span>g</span>
            </template>
          </template>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <MeterGroup :value="portionMeter" />
        </td>
      </tr>
      <tr>
        <td>{{$t('carbohydrate')}}: </td>
        <td style="width: 100%;" class="center-content-row">
          <template v-if="totalNutrients.carbohydrate<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <span>{{numberWithCommas(totalNutrients.carbohydrate)}}</span><span>g</span>
          </template>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <MeterGroup :value="carbohydrateMeter" />
        </td>
      </tr>
      <tr>
        <td>{{$t('sugar')}}: </td>
        <td style="width: 100%;" class="center-content-row">
          <template v-if="totalNutrients.sugar<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <span>{{numberWithCommas(totalNutrients.sugar)}}</span><span>g</span>
          </template>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <MeterGroup :value="sugarMeter" />
        </td>
      </tr>
      <tr>
        <td>{{$t('fiber')}}: </td>
        <td style="width: 100%;" class="center-content-row">
          <template v-if="totalNutrients.fiber<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <span>{{numberWithCommas(totalNutrients.fiber)}}</span><span>g</span>
          </template>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <MeterGroup :value="fiberMeter" />
        </td>
      </tr>
      <tr>
        <td></td>
        <td style="width: 100%;"></td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import {useNutrients} from "~/composables/nutrients/useNutrients";
import numberWithCommas from "~/utils/numberWithCommas";
import {useTdee} from "~/composables/tdee/useTdee";

const {
  totalNutrients,
  energyMeter,
  portionMeter,
  carbohydrateMeter,
  sugarMeter,
  fiberMeter,
} = useNutrients()

const {requiredCalories, requiredPortion} = useTdee()

const excessedCaloriesPercentage = computed(()=> Math.round(
    (
        (totalNutrients.value.energy - requiredCalories.value) / requiredCalories.value
    ) * 100
))

const excessedPortionPercentage = computed(()=> Math.round(
    (
        (totalNutrients.value.portion - requiredPortion.value[1]) / requiredPortion.value[1]
    ) * 100
))

</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

:deep(.p-metergroup-label-text){
  font-size:10px
}
:deep(.p-progressbar-value){
  max-width: 100%;
}
</style>