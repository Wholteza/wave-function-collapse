<script setup lang="ts">
const props = defineProps<{
  modelValue: number | undefined;
  step?: number | undefined;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const onInput = (event) => {
  console.log(event);
  emit('update:modelValue', event.)
}
</script>

<template>
  <input
    type="number"
    :value="modelValue"
    :step="props.step"
    @input="
      (value) => {
        $emit('update:modelValue', value);
      }
    "
  />
</template>

<style scoped lang="scss">
@import "../../assets/variables.scss";

input {
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: $palette-bg3;
  color: $color-foreground;
  font-size: $font-size-normal;
  padding: $space-normal;
  margin: $space-normal;
  box-shadow: $space-small $space-small 0 0 $palette-fg4;
  outline: none;
}
</style>
