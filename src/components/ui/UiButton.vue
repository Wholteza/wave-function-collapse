<script setup lang="ts">
const emit = defineEmits(["click"]);
</script>
<template>
  <button @click="() => emit('click')"><slot></slot></button>
</template>
<style scoped lang="scss">
@import "../../assets/variables.scss";
button {
  background-color: $palette-bg3;
  color: $color-foreground;
  border: none;
  font-size: $font-size-large;
  font-family: "Monospace";
  box-shadow: $space-small $space-small 0px 0px $palette-fg4;
  padding: $space-normal;
  margin: $space-normal;
  cursor: pointer;
}
</style>
