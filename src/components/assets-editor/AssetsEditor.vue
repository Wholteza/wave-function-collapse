<script setup lang="ts">
import { computed, ref, watch } from "vue";

type Coordinate = {
  x: number;
  y: number;
};

type Square = {
  origin: Coordinate;
  size: {
    width: number;
    height: number;
  };
  color: string;
};

const squaresPerSide = ref<number>(3);
const color = ref<string>("#000000");
const SIDE_IN_PIXELS = 300;

const canvasRef = ref<HTMLCanvasElement>();
const context = computed<CanvasRenderingContext2D | undefined>(
  () => canvasRef.value?.getContext("2d") ?? undefined
);

const toTwoDigitHex = (number: number) => {
  let asHex = number.toString(16);
  if (asHex.length == 1) asHex = `0${asHex}`;
  return asHex;
};

const squares = computed<Square[]>(() => {
  const size = SIDE_IN_PIXELS / squaresPerSide.value;
  return Array.from(
    { length: squaresPerSide.value * squaresPerSide.value },
    (_, index) => {
      const x = (index % squaresPerSide.value) * size;
      const y = Math.floor(index / squaresPerSide.value) * size;
      const square = {
        origin: { x, y },
        size: { width: size, height: size },
        color: `#${toTwoDigitHex(Math.floor(x / 2))}${toTwoDigitHex(
          Math.floor(y / 2)
        )}00`,
      };
      console.log(square.color);
      return square;
    }
  );
});

watch(
  [context, squaresPerSide],
  () => {
    console.log("draw   ");
    if (!context?.value) return;
    draw(context.value, squares.value);
  },
  { deep: true }
);

const draw = (context: CanvasRenderingContext2D, squares: Square[]) => {
  squares.forEach((s) => {
    context.fillStyle = s.color;
    context.fillRect(s.origin.x, s.origin.y, s.size.width, s.size.height);
    context.strokeStyle = "#ffffff";
    context.strokeRect(s.origin.x, s.origin.y, s.size.width, s.size.height);
  });
};

const findSquare = (coordinate: Coordinate) =>
  squares.value.find((s) => isWithinSquareArea(s, coordinate));

const isWithinSquareArea = (square: Square, { x, y }: Coordinate) => {
  const isWithinX =
    square.origin.x <= x && x <= square.origin.x + square.size.width;
  const isWithinY =
    square.origin.y <= y && y <= square.origin.y + square.size.height;
  return isWithinX && isWithinY;
};

const handleCanvasClick = ({ x, y }: MouseEvent) => {
  const square = findSquare({ x, y });
  console.log(square);
  if (!square) return;
  square.color = color.value;
  if (!context.value) return;
  draw(context.value, squares.value);
};
</script>

<template>
  <canvas width="300" height="300" ref="canvasRef" @click="handleCanvasClick">
    fallback text
  </canvas>
  Squares
  <input type="number" step="1" v-model="squaresPerSide" />
  color
  <input type="color" v-model="color" />
</template>

<style scoped></style>
