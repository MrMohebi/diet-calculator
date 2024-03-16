<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <template v-for="(meal, iMeal) in meals" :key="`meal_${iMeal}`">
      <Fieldset :toggleable="true" style="width: 100%;">
        <template #legend class="h-[70px]">
          <Inplace :closable="true" close-icon="pi pi-check">
            <template #display>
              {{ meal.mealName || $t('toEdit') }}
            </template>
            <template #content>
              <InputText v-model="meal.mealName" autofocus style="max-width:200px"/>
            </template>
          </Inplace>
          <Button icon="pi pi-trash" severity="danger" text @click="()=>onRemoveMeal(iMeal)" style="justify-content: start; width:43px;height: 43px;"/>
        </template>

        <div v-for="(food, iFood) in meal.foods" style="display: flex; flex-direction: column; align-items: center;justify-content: center; margin-bottom: 20px" :key="`food_${iFood}`">
          <div style="display: flex; flex-direction: row; align-items: center;justify-content: center; width: 100%;; margin-bottom: 10px">
            <Dropdown
                style="width: 100%"
                v-model="food.fdc_id"
                :options="foods"
                :optionLabel="`name_${locale}`"
                :placeholder="$t('select')"
                optionValue="fdc_id"
                filter
                class="w-full md:w-14rem"
                @change="()=>onChangeFood(food.fdc_id, iMeal, iFood)"
            />
            <Dropdown
                style="width: 90px"
                v-model="units[0][0].unit"
                :options="units[0]"
                :optionLabel="`name_${locale}`"
                :placeholder="$t('select')"
                optionValue="unit"
            />
            <InputNumber :input-style="{maxWidth: '50px'}" v-model="food.amount" :min="0"/>
          </div>

          <div style="width: 100%;display: flex; flex-direction: row; align-items: center;">
            <InlineMessage style="width: 100%" severity="secondary">
              <DataTable :loading="isLoadingFoodData[iMeal.toString()+iFood.toString()] ?? false" :value="calculateFoodNutrients(food,units[0][0].gram)" style="width:100%;">
                <Column field="energy" :header="$t('energy')">
                  <template #body="{data,field}" >
                    <template v-if="data[field]<0">
                      <span>{{$t('unknown')}}</span>
                    </template>
                    <template  v-else>
                      <span>{{numberWithCommas(data[field])}}</span><span>Kcl</span>
                    </template>
                  </template>
                </Column>
                <Column field="portion" :header="$t('portion')">
                  <template #body="{data,field}" >
                    <template v-if="data[field]<0">
                      <span>{{$t('unknown')}}</span>
                    </template>
                    <template  v-else>
                      <span>{{numberWithCommas(data[field])}}</span><span>g</span>
                    </template>
                  </template>
                </Column>
                <Column field="carbohydrate" :header="$t('carbohydrate')">
                  <template #body="{data,field}" >
                    <template v-if="data[field]<0">
                      <span>{{$t('unknown')}}</span>
                    </template>
                    <template  v-else>
                      <span>{{numberWithCommas(data[field])}}</span><span>g</span>
                    </template>
                  </template>
                </Column>
                <Column field="sugar" :header="$t('sugar')">
                  <template #body="{data,field}" >
                    <template v-if="data[field]<0">
                      <span>{{$t('unknown')}}</span>
                    </template>
                    <template  v-else>
                      <span>{{numberWithCommas(data[field])}}</span><span>g</span>
                    </template>
                  </template>
                </Column>
                <Column field="fiber" :header="$t('fiber')">
                  <template #body="{data,field}" >
                    <template v-if="data[field]<0">
                      <span>{{$t('unknown')}}</span>
                    </template>
                    <template  v-else>
                      <span>{{numberWithCommas(data[field])}}</span><span>g</span>
                    </template>
                  </template>
                </Column>
              </DataTable>
            </InlineMessage>
            <Button icon="pi pi-trash" severity="danger" text @click="()=>onRemoveFood(iMeal, iFood)" style="justify-content: start; width:20px;height: 25px; margin: 0 10px"/>
          </div>
          <Divider />
        </div>

        <div class="center-content" style=";margin-left: auto;margin-right: auto; width:100%; transform: translate(0, -20px);">
          <Button icon="pi pi-plus" rounded style="" @click="()=>onAddFood(iMeal)"/>
        </div>
        <div v-if="Object.values(calculateMaleNutrients(meal.foods,units[0][0].gram)[0]).reduce((a, b) => a + b, 0) > 0">
          <div style="font-size:12px;margin-bottom:10px">{{$t('mealNutrients')}}:</div>
          <DataTable :loading="false" :value="calculateMaleNutrients(meal.foods,units[0][0].gram)" style="width:100%;">
            <Column field="energy" :header="$t('energy')">
              <template #body="{data,field}" >
                <template v-if="data[field]<0">
                  <span>{{$t('unknown')}}</span>
                </template>
                <template  v-else>
                  <span>{{numberWithCommas(data[field])}}</span><span>Kcl</span>
                </template>
              </template>
            </Column>
            <Column field="portion" :header="$t('portion')">
              <template #body="{data,field}" >
                <template v-if="data[field]<0">
                  <span>{{$t('unknown')}}</span>
                </template>
                <template  v-else>
                  <span>{{numberWithCommas(data[field])}}</span><span>g</span>
                </template>
              </template>
            </Column>
            <Column field="carbohydrate" :header="$t('carbohydrate')">
              <template #body="{data,field}" >
                <template v-if="data[field]<0">
                  <span>{{$t('unknown')}}</span>
                </template>
                <template  v-else>
                  <span>{{numberWithCommas(data[field])}}</span><span>g</span>
                </template>
              </template>
            </Column>
            <Column field="sugar" :header="$t('sugar')">
              <template #body="{data,field}" >
                <template v-if="data[field]<0">
                  <span>{{$t('unknown')}}</span>
                </template>
                <template  v-else>
                  <span>{{numberWithCommas(data[field])}}</span><span>g</span>
                </template>
              </template>
            </Column>
            <Column field="fiber" :header="$t('fiber')">
              <template #body="{data,field}" >
                <template v-if="data[field]<0">
                  <span>{{$t('unknown')}}</span>
                </template>
                <template  v-else>
                  <span>{{numberWithCommas(data[field])}}</span><span>g</span>
                </template>
              </template>
            </Column>
          </DataTable>
        </div>

      </Fieldset>
    </template>


    <Button icon="pi pi-plus" severity="help" rounded style="margin: 10px;" @click="onAddMeal"/>


  </div>
</template>

<script setup lang="ts">

import Fieldset from "primevue/fieldset";
import Button from "primevue/button";
import Inplace from "primevue/inplace";
import numberWithCommas from "~/utils/numberWithCommas";
import foods from "~/consts/foods";


import {useNutrients} from "~/composables/nutrients/useNutrients";

const {locale} = useI18n()

const {
  onChangeFood,
  onAddFood,
  onRemoveFood,
  onAddMeal,
  onRemoveMeal,
  meals,
  calculateFoodNutrients,
  calculateMaleNutrients,
  isLoadingFoodData,
  units
} = useNutrients()




</script>

<style scoped lang="scss">
:deep(.p-dropdown-filter){
  transform: translate(-30px, 0);
  background: red;
}
:deep(.p-inplace-content){
  .p-button-icon-only{
    justify-content: start;
    height: 43px;
    width:43px;
  }
}
:deep(.p-inplace-display){
  padding:4px;
  margin-right: 4px;
  margin-left: 4px;
}
:deep(.p-inline-message){
  padding: 2px 4px;
  .p-inline-message-text{
    font-size: 12px;
    width: 100%;
  }
}


:deep(.p-datatable-thead > tr > th){
  padding: 2px 4px;
  font-size: 10px;
  width:20px;
}
:deep(.p-datatable-tbody > tr > td) {
  width:20px;
  padding: 4px 4px;
  font-size: 12px;
  text-align: center;
}
:deep(.p-column-header-content) {
  justify-content: center;
}
</style>