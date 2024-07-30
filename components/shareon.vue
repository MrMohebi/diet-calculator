<template>
  <div class="shareon" :data-url="text">
    <a class="telegram"></a>
    <a class="twitter"></a>
    <a class="whatsapp"></a>
    <a class="copy-url"></a>
  </div>
</template>

<script setup>
import {init} from "shareon";

defineProps({
  text: {
    type: String,
    required:true,
  },
})

onMounted(()=>{
  init();
})
</script>

<style scoped lang="scss">

</style>