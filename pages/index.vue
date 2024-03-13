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

        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Fieldset>
    </template>


    <Button icon="pi pi-plus" rounded style="margin: 10px" @click="onAddMeal"/>


  </div>
</template>

<script setup lang="ts">
import Fieldset from 'primevue/fieldset';
import Inplace from 'primevue/inplace';
import Button from 'primevue/button';

const {t} = useI18n()

const meals = reactive([
  {
    mealName: t('firstMeal'),

  }
])

const onAddMeal = () => {
  console.log(meals);
  meals.push(
      {
        mealName: t('toEdit')
      }
  )
}

const onRemoveMeal = (index) =>{
  if(meals.length > 1)
    meals.splice(index,1)
}

</script>

<style scoped lang="scss">
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
</style>