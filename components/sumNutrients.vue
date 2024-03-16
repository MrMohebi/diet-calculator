<template>
  <div>
    <table>
      <tr>
        <td>{{$t('energy')}}: </td>
        <td>
          <template v-if="totalNutrients.energy<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <span>{{numberWithCommas(totalNutrients.energy)}}</span><span>Kcl</span>
          </template>
        </td>
      </tr>
      <tr>
        <td>{{$t('portion')}}: </td>
        <td>
          <template v-if="totalNutrients.portion<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <span>{{numberWithCommas(totalNutrients.portion)}}</span><span>g</span>
          </template>
        </td>
      </tr>
      <tr>
        <td>{{$t('carbohydrate')}}: </td>
        <td>
          <template v-if="totalNutrients.carbohydrate<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <span>{{numberWithCommas(totalNutrients.carbohydrate)}}</span><span>g</span>
          </template>
        </td>
      </tr>
      <tr>
        <td>{{$t('sugar')}}: </td>
        <td>
          <template v-if="totalNutrients.sugar<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <span>{{numberWithCommas(totalNutrients.sugar)}}</span><span>g</span>
          </template>
        </td>
      </tr>
      <tr>
        <td>{{$t('fiber')}}: </td>
        <td>
          <template v-if="totalNutrients.fiber<0">
            <span>{{$t('unknown')}}</span>
          </template>
          <template  v-else>
            <span>{{numberWithCommas(totalNutrients.fiber)}}</span><span>g</span>
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import {useNutrients} from "~/composables/nutrients/useNutrients";
import numberWithCommas from "~/utils/numberWithCommas";

const {totalNutrients} = useNutrients()


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
</style>