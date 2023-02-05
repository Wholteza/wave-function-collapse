<script setup lang="ts">
import Colors from "@/constants/colors";
import { computed, ref, watch } from "vue";
import type { Mosaic, Coordinate } from "./types";

const props = defineProps<{
  editable?: boolean;
  sizeInPixels: number;
  mosaic: Mosaic;
  color?: string;
}>();

const mosaic = ref<Mosaic>(props.mosaic);
const squaresPerSide = ref<number>(Math.sqrt(props.mosaic.squares.length));
const squareSizeInPixels = ref<number>(
  props.sizeInPixels / squaresPerSide.value
);
const canvasRef = ref<HTMLCanvasElement>();
const context = computed<CanvasRenderingContext2D | undefined>(
  () => canvasRef.value?.getContext("2d") ?? undefined
);

watch(
  [context, props.mosaic, mosaic],
  () => {
    if (!context?.value) return;
    draw(context.value, mosaic.value);
  },
  { deep: true }
);

type Area = {
  x: {
    min: number;
    max: number;
  };
  y: {
    min: number;
    max: number;
  };
};

const getSquareArea = (squareIndex: number): Area => {
  const xOrigin =
    (squareIndex % squaresPerSide.value) * squareSizeInPixels.value;
  const yOrigin =
    Math.floor(squareIndex / squaresPerSide.value) * squareSizeInPixels.value;
  return {
    x: {
      min: xOrigin,
      max: xOrigin + squareSizeInPixels.value - 1,
    },
    y: {
      min: yOrigin,
      max: yOrigin + squareSizeInPixels.value - 1,
    },
  };
};

const draw = (context: CanvasRenderingContext2D, { squares }: Mosaic) => {
  squares.forEach((s, index) => {
    const area = getSquareArea(index);
    context.fillStyle = s.color;
    context.fillRect(area.x.min, area.y.min, area.x.max, area.y.max);
    context.strokeStyle = Colors.bg2;
    context.strokeRect(area.x.min, area.y.min, area.x.max, area.y.max);
  });
};

const findSquare = (coordinate: Coordinate) =>
  mosaic.value.squares.find((s, index) =>
    isWithinSquareArea(getSquareArea(index), coordinate)
  );

const isWithinSquareArea = (area: Area, { x, y }: Coordinate) => {
  const isWithinX = area.x.min <= x && x <= area.x.max;
  const isWithinY = area.y.min <= y && y <= area.y.max;
  return isWithinX && isWithinY;
};

const handleCanvasClick = ({ x, y }: MouseEvent) => {
  if (!props.editable) return;
  const square = findSquare({ x, y });
  if (!square) return;
  square.color = props.color ?? "#000000";
  if (!context.value) return;
  draw(context.value, mosaic.value);
};
</script>

<template>
  <canvas
    :width="props.sizeInPixels"
    :height="props.sizeInPixels"
    ref="canvasRef"
    @click="handleCanvasClick"
  >
    fallback text
  </canvas>
</template>

<style scoped lang="scss">
@import "../../assets/variables.scss";
canvas {
  margin: $space-normal;
  box-shadow: 3px 3px 0 0 $color-box-shadow;
}
</style>
