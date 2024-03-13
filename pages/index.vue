<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <template v-for="(meal, iMeal) in meals">
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

        <div v-for="(food, iFood) in meal.foods" style="display: flex; flex-direction: column; align-items: center;justify-content: center; margin-bottom: 20px">
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
                @change="()=>onChangeFood(food.fdc_id)"
            />
            <Dropdown
                style="width: 90px"
                v-model="units[0][0].unit"
                :options="units[0]"
                :optionLabel="`name_${locale}`"
                :placeholder="$t('select')"
                optionValue="unit"
            />
            <InputNumber :input-style="{maxWidth: '50px'}" v-model="food.amount"/>
          </div>

          <div style="width: 100%;display: flex; flex-direction: row; align-items: center;">
            <InlineMessage style="width: 100%" severity="secondary">sdfsdf</InlineMessage>
            <Button icon="pi pi-trash" severity="danger" text @click="()=>onRemoveFood(iMeal, iFood)" style="justify-content: start; width:20px;height: 25px; margin: 0 10px"/>
          </div>
          <Divider />
        </div>

        <Button icon="pi pi-plus" rounded style="margin-left: auto;margin-right: auto;" @click="()=>onAddFood(iMeal)"/>

      </Fieldset>
    </template>


    <Button icon="pi pi-plus" severity="help" rounded style="margin: 10px;" @click="onAddMeal"/>


  </div>
</template>

<script setup lang="ts">
import Fieldset from 'primevue/fieldset';
import Inplace from 'primevue/inplace';
import Button from 'primevue/button';
import foods from "~/consts/foods";

const {t, locale} = useI18n()

const DEFAULT_FOOD = {fdc_id:-1, amount:100}
const DEFAULT_MEAL = {mealName: t('toEdit'), foods:[DEFAULT_FOOD]}

const onChangeFood = async (fcd_id) => {
  const res = await $fetch(`/api/food/${fcd_id}`)
  console.log(res);
}


const units = reactive([
  [
    {
      unit:"g",
      name_fa:"گرم",
      name_en:"gram"
    }
  ]
])

const meals = reactive([
  {
    mealName: t('firstMeal'),
    foods:[
      DEFAULT_FOOD
    ]
  }
])


const onAddFood = (mealIndex)=>{
  meals[mealIndex].foods.push(DEFAULT_FOOD)
}

const onRemoveFood =(mealIndex, foodIndex) => {
  if(meals[mealIndex].foods.length > 1)
    meals[mealIndex].foods.splice(foodIndex,1)
}
const onAddMeal = () => {
  meals.push(DEFAULT_MEAL)
}

const onRemoveMeal = (index) =>{
  if(meals.length > 1)
    meals.splice(index,1)
}

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
    font-size: 12px
  }
}
</style>