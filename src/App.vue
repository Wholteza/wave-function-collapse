<script setup lang="ts">
import { ref } from "vue";
import TileCanvas from "./components/assets-editor/TileCanvas.vue";
import type { Mosaic } from "./components/assets-editor/types";
import UiButton from "./components/ui/UiButton.vue";
import UiColorPicker from "./components/ui/UiColorPicker.vue";
import UiNumberInput from "./components/ui/UiNumberInput.vue";
import { generateSquares } from "./helpers/mosaic";

const squaresPerSide = ref<number>(3);
const color = ref<string>("#000000");
const mosaic = ref<Mosaic>({ squares: generateSquares(squaresPerSide.value) });
const oldMosaic = ref<Mosaic[]>([]);

const handleOnNext = () => {
  oldMosaic.value = [...oldMosaic.value, { ...mosaic.value }];
  mosaic.value = { squares: generateSquares(squaresPerSide.value) };
  console.log(oldMosaic.value.length);
};
</script>

<template>
  <div class="app-container">
    <TileCanvas editable :mosaic="mosaic" :color="color" />
    <div class="options-container">
      <div class="size-picker-container">
        <div>Sides:</div>
        <UiNumberInput
          class="squares-per-side-input"
          :value="squaresPerSide"
          :step="1"
          @change="(value) => (squaresPerSide = value)"
        />
      </div>

      <div class="color-picker-container">
        <div>Color:</div>
        <UiColorPicker
          class="color-input"
          :value="color"
          @change="(newColor) => (color = newColor)"
        />
      </div>
      <UiButton @click="handleOnNext">Next</UiButton>
    </div>

    <TileCanvas v-for="(m, index) in oldMosaic" :mosaic="m" :key="index" />
  </div>
</template>

<style scoped lang="scss">
@import "assets/variables.scss";
.app-container {
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin: 0 auto;
  background-color: $color-background;
  .options-container {
    display: flex;
    flex-direction: column;
    background-color: $palette-bg2;
    box-shadow: $space-small $space-small 0 0 $color-box-shadow;
    margin: $space-normal;
    padding: $space-normal;
    button {
      align-self: center;
    }
    .color-picker-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .color-input {
        width: 10vw;
      }
    }
    .size-picker-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .squares-per-side-input {
        width: 10vw;
      }
    }
  }
}
</style>
