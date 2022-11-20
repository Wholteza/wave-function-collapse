<script setup lang="ts">
import { ref } from "vue";
import TileCanvas from "./components/assets-editor/TileCanvas.vue";
import type { Mosaic } from "./components/assets-editor/types";
import { generateSquares } from "./helpers/mosaic";

const SIDE_IN_PIXELS = 300;

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
  <TileCanvas
    editable
    :mosaic="mosaic"
    :size-in-pixels="SIDE_IN_PIXELS"
    :color="color"
  />
  <input type="number" step="1" v-model="squaresPerSide" />
  color
  <input type="color" v-model="color" />
  <button @click="handleOnNext">Next</button>
  <TileCanvas
    v-for="(m, index) in oldMosaic"
    :mosaic="m"
    :size-in-pixels="30"
    :key="index"
  />
</template>

<style scoped></style>
