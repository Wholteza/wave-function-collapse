<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  value: number | undefined;
  step?: number | undefined;
}>();
const emit = defineEmits<{
  (e: "change", value: number): void;
}>();

const value = ref(props.value);
watch(value, (newValue) => emit("change", newValue ?? 0));
</script>

<template>
  <input type="number" v-model="value" :step="props.step" />
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
