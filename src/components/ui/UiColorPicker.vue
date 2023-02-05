<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  value: string;
}>();
const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

const value = ref<string>(props.value);
watch(value, (newValue) => emit("change", newValue ?? "#FF69B4"));
</script>

<template>
  <input type="color" v-model="value" />
</template>

<style scoped lang="scss">
@import "../../assets/variables.scss";

input {
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: $color-background-secondary;
  color: $color-foreground;
  font-size: $font-size-large;
  padding: $space-small;
  margin: $space-normal;
  box-shadow: $space-small $space-small 0 0 $color-box-shadow;
  box-sizing: content-box;
  cursor: pointer;
}
</style>
