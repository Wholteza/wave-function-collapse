<script setup lang="ts">
import { computed, ref, watch } from "vue";

type Square = {
  origin: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  color: {
    red: number;
    green: number;
    blue: number;
  };
};

const squaresPerSide = ref<number>(3);
const SIDE_IN_PIXELS = 300;

const canvasRef = ref<HTMLCanvasElement>();
const context = computed<CanvasRenderingContext2D | undefined>(
  () => canvasRef.value?.getContext("2d") ?? undefined
);

const squares = computed<Square[]>(() => {
  const size = SIDE_IN_PIXELS / squaresPerSide.value;
  return Array.from(
    { length: squaresPerSide.value * squaresPerSide.value },
    (_, index) => {
      const x = (index % squaresPerSide.value) * size;
      const y = Math.floor(index / squaresPerSide.value) * size;
      return {
        origin: { x, y },
        size: { width: size, height: size },
        color: {
          red: x / 2,
          green: y / 2,
          blue: 0,
        },
      };
    }
  );
});

watch([context, squaresPerSide], () => {
  if (!context?.value) return;
  draw(context.value, squares.value);
});

const draw = (context: CanvasRenderingContext2D, squares: Square[]) => {
  squares.forEach((s) => {
    context.fillStyle = `rgb(${s.color.red},${s.color.green},${s.color.blue})`;
    context.fillRect(s.origin.x, s.origin.y, s.size.width, s.size.height);
  });
};
</script>

<template>
  <canvas width="300" height="300" ref="canvasRef"> fallback text </canvas>
  <input type="number" step="1" v-model="squaresPerSide" />
</template>

<style scoped></style>
