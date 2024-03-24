<template>
  <div style="margin: 5px 0" class="space-y-4">
    <div class="col space-y-4">
      <div class="row space-x-4">
        <Dropdown
            style="width: 120px;"
            v-model="gender"
            :options="[$t('male'), $t('female')]"
            :placeholder="$t('gender')"
            variant="filled"
        />
        <InputNumber v-model="age" variant="filled" :min="1" :max="110" suffix="" :placeholder="`${$t('age')}`" :input-style="{width:'55px'}"/>
        <InputNumber v-model="height" variant="filled" :min="1" :max="300" suffix=" cm" :placeholder="`${$t('height')}-${$t('centiMeters')}`" :input-style="{width:'100%'}"/>
        <InputNumber v-model="weight" variant="filled" :min="1" :max="200" suffix=" kg" :placeholder="`${$t('weight')}-${$t('kiloGrams')}`" :input-style="{width:'100%'}"/>
      </div>

      <InputNumber v-model="gymKC" :placeholder="$t('gymKC')" suffix=" kcl"/>
    </div>

    <Button :label="$t('calculate')" severity="secondary" @click="getTdee"/>

    <div>
      <div class="space-x-4 row">
        <div>{{$t('dailyRequiredCalories')}}:</div>
        <template v-if="tdee?.bmr >0">
          <div>{{numberWithCommas(tdee.bmr + (gymKC ?? 0)) }}</div>
          <div>kcl</div>
        </template>
        <div v-else>{{ $t('unknown') }}</div>
      </div>
      <div class="row space-x-2">
        <div>{{$t('dailyRequiredPortions')}}:</div>
        <template v-if="requiredPortion[0] >= 0">
          <div>{{numberWithCommas(requiredPortion[0]) }}</div>
          <div>g</div>
          <div style="margin:0 5px">{{$t('to')}}</div>
          <div>{{numberWithCommas(requiredPortion[1]) }}</div>
          <div>g</div>
        </template>
        <div v-else>{{ $t('unknown') }}</div>
      </div>
    </div>


    <Toast severity="danger" position="bottom-right"/>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import {useTdee} from "~/composables/tdee/useTdee";
import numberWithCommas from "~/utils/numberWithCommas";

const {gender, age, height, weight, getTdee, gymKC, tdee, requiredPortion} = useTdee()
</script>

<style scoped lang="scss">

</style>