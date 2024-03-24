<template>
  <div :style="{maxWidth:$isMobile? '100%': '70%'}"  class="mx-auto" >
    <SelectButton v-if="!$isMobile" v-model="locale" :options="['fa', 'en']" aria-labelledby="lang"  class="select-lang"/>
    <slot />
  </div>
</template>

<script setup lang="ts">

const { $isMobile } = useNuxtApp()

const { locale } = useI18n()
</script>

<style scoped lang="scss">
.select-lang{
  :deep(.p-button-label){
    font-size: 12px;
  }
}


</style>