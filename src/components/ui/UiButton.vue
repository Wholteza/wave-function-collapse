<script setup lang="ts">
const emit = defineEmits(["click"]);
</script>
<template>
  <button @click="() => emit('click')"><slot></slot></button>
</template>
<style scoped lang="scss">
@import "../../assets/variables.scss";
button {
  background-color: $color-background-secondary;
  color: $color-foreground;
  border: none;
  font-size: $font-size-large;
  font-family: "Monospace";
  box-shadow: 3px 3px 0px 0px $color-box-shadow;
  padding: $space-normal;
  margin: $space-normal;
  cursor: pointer;
}
</style>
