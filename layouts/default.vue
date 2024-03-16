<template>
  <div :style="{maxWidth:$isMobile? '100%': '70%'}"  class="mx-auto" >
    <slot />
  </div>
</template>

<script setup lang="ts">

const { $isMobile } = useNuxtApp()

</script>
