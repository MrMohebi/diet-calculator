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
        <td>{{$t('protein')}}: </td>
        <td style="width: 100%;" class="center-content-row">
          <template v-if="totalNutrients.protein<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <ProgressBar style="width: 100%" v-if="requiredProtein[1] > 0" :value="(totalNutrients.protein /requiredProtein[1]) * 100">
              <div :style="{color: totalNutrients.protein > requiredProtein[1] ? '#b11111' : '',textWrap: 'nowrap' }">
                {{
                  `${numberWithCommas(totalNutrients.protein)} ${$t('from')} ${numberWithCommas(requiredProtein[1])}
                   ${excessedProteinPercentage > 0 ?
                      ' - '+excessedProteinPercentage + "% " + $t('excess')
                      :
                      ' - '+Math.abs(excessedProteinPercentage) + "% " + $t('lack')
                  }
                  `
                }}
              </div>
            </ProgressBar>
            <template v-else>
              <span>{{numberWithCommas(totalNutrients.protein)}}</span><span>g</span>
            </template>
          </template>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <MeterGroup :value="proteinMeter" />
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

    <div class="row" style="justify-content: space-between;">
      <Button :label="$t('getExport')" @click="router.push('/export-text')"/>
      <Button :label="$t('sharePlan')" severity="info" @click="planInfoDialog = true"/>
    </div>

    <Dialog v-model:visible="planInfoDialog" modal :header="$t('sharePlan')" :style="{ width: '25rem' }">
      <div class="space-y-4" style="width: 100%">
        <div class="center-content-row" style="justify-content: space-between;">
          <label for="title" class="font-semibold w-24">{{$t('title')}}({{$t('forced')}}): </label>
          <InputText required v-model="title" id="title" class="flex-auto" autocomplete="off" :invalid="title == null || title.length < 3"/>
        </div>
        <div class="center-content-row" style="justify-content: space-between;">
          <label for="author" class="font-semibold w-24">{{$t('author')}}({{$t('forced')}}): </label>
          <InputText required v-model="author" id="author" class="flex-auto" autocomplete="off" :invalid="author == null || author.length < 3"/>
        </div>
        <div class="center-content-row" style="justify-content: space-between;">
          <label for="description" class="font-semibold w-24">{{$t('description')}}: </label>
          <Textarea v-model="details" id="description" class="flex-auto" autocomplete="off" />
        </div>
        <Button :loading="sharePlanLoading" type="button" :label="$t('save')" @click="sharePlan" :disabled="title.length < 3 || author.length < 3 "></Button>
      </div>
    </Dialog>

    <Dialog v-model:visible="copyLinkDialog" modal :header="$t('copyLink')" :style="{ width: '25rem' }">
      <div v-if="savedPlanId > 0" class="center-content">
        <shareon :text=" currentUrl + '?planId=' + savedPlanId"/>
      </div>
    </Dialog>


  </div>
</template>

<script setup lang="ts">

import Dialog from 'primevue/dialog';
import {useNutrients} from "~/composables/nutrients/useNutrients";
import numberWithCommas from "~/utils/numberWithCommas";
import {useTdee} from "~/composables/tdee/useTdee";
import {useRouter} from "#app";
import {usePlans} from "~/composables/plans/usePlans";


const router = useRouter()



const {
  totalNutrients,
  energyMeter,
  proteinMeter,
  carbohydrateMeter,
  sugarMeter,
  fiberMeter,
} = useNutrients()

const {
  planInfoDialog,
  sharePlan,
  title,
  author,
  details,
  sharePlanLoading,
  copyLinkDialog,
  savedPlanId
} = usePlans()

const {requiredCalories, requiredProtein} = useTdee()

const excessedCaloriesPercentage = computed(()=> Math.round(
    (
        (totalNutrients.value.energy - requiredCalories.value) / requiredCalories.value
    ) * 100
))

const excessedProteinPercentage = computed(()=> Math.round(
    (
        (totalNutrients.value.protein - requiredProtein.value[1]) / requiredProtein.value[1]
    ) * 100
))

const currentUrl = computed(()=> {
  return window.location.href.split("?")[0]
})

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