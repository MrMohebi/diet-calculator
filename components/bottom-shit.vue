<template>
  <div class="bottom-shit" :style="{maxHeight: model?'fit-content':'120px'}">
    <Button :icon="'pi '+ (model ? ' pi-angle-down ':' pi-angle-up ')" text rounded aria-label="extend" @click="model = !model"/>
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue!;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

</script>

<style scoped lang="scss">
.bottom-shit{
  width:100vw;
  padding: 5px 15px 5px 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  z-index: 999
}
</style>