<template>
<!--  <div class="bottom-shit" :style="{maxHeight: model?'fit-content':'120px'}">-->
  <div :class="{'top-shit':topShit, 'bottom-shit': !topShit, 'open':model, 'close':!model}">
    <div class="row" style="align-items: center;">
      <Button style="margin: 0 5px" :icon="'pi '+ (model ^ topShit ? ' pi-angle-down ':' pi-angle-up ')" :rounded="iconRounded" :outlined="iconOutlined" :severity="iconSeverity" aria-label="extend" @click="model = !model"/>
      <slot name="header"/>
    </div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  topShit: {
    type: Boolean,
    default:false
  },
  iconRounded:{
    type: Boolean,
    default: true
  },
  iconOutlined:{
    type: Boolean,
    default: true
  },
  iconSeverity:{
    type: String,
    default: "primary"
  },
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
.open:not(.top-shit){
  max-height: 100%;
}

.close:not(.top-shit){
  max-height: 15%;
}

.open:not(.bottom-shit){
  -ms-transform: translate(0, 0);
  transform: translate(0, 0);
}

.close:not(.bottom-shit){
  -ms-transform: translate(0, calc(-100% + 50px));
  transform: translate(0, calc(-100% + 50px))
}

.bottom-shit{
  display: flex;
  flex-direction: column;
  width:100vw;
  padding: 5px 15px 5px 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  z-index: 999
}
.top-shit{
  display: flex;
  flex-direction: column-reverse;
  width:100vw;
  padding: 5px 15px 5px 15px;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 999;

}
</style>