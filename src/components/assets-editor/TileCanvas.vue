<script setup lang="ts">
import Colors from "@/constants/colors";
import { computed, onMounted, ref, watch } from "vue";
import type { Mosaic, Coordinate } from "./types";

const props = defineProps<{
  editable?: boolean;
  mosaic: Mosaic;
  color?: string;
}>();

const canvasRef = ref<HTMLCanvasElement>();
const sizeInPixels = computed(() => {
  const rect = canvasRef.value?.getBoundingClientRect();
  return rect?.right ?? undefined;
});

const mosaic = ref<Mosaic>(props.mosaic);
const squaresPerSide = computed(() => Math.sqrt(mosaic.value.squares.length));
const squareSizeInPixels = computed(() => {
  if (!sizeInPixels.value) return 0;
  return sizeInPixels.value / squaresPerSide.value;
});

const context = computed<CanvasRenderingContext2D | undefined>(
  () => canvasRef.value?.getContext("2d") ?? undefined
);

const draw = () => {
  const ctx = context.value;
  const squares = mosaic.value.squares;
  if (!ctx) return;
  squares.forEach((s, index) => {
    const area = getSquareArea(index);
    ctx.fillStyle = s.color;
    ctx.fillRect(area.x.min, area.y.min, area.x.max, area.y.max);
    ctx.strokeStyle = Colors.bg2;
    ctx.strokeRect(area.x.min, area.y.min, area.x.max, area.y.max);
  });
};

onMounted(() => {
  window.requestAnimationFrame(draw);
});

watch(
  [context, mosaic, sizeInPixels, squareSizeInPixels],
  () => {
    window.requestAnimationFrame(draw);
  },
  { deep: true, immediate: true }
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

const getGlobalSquareArea = (squareArea: Area): Area => {
  const rect = canvasRef.value?.getBoundingClientRect();
  const globalX = rect?.x ?? 0;
  const globalY = rect?.y ?? 0;
  return {
    x: {
      min: squareArea.x.min + globalX,
      max: squareArea.x.max + globalX,
    },
    y: {
      min: squareArea.y.min + globalY,
      max: squareArea.y.max + globalY,
    },
  };
};

const findSquare = (coordinate: Coordinate) => {
  const square = mosaic.value.squares.find((s, index) =>
    isWithinSquareArea(getSquareArea(index), coordinate)
  );
  return square;
};

const isWithinSquareArea = (area: Area, { x, y }: Coordinate) => {
  const isWithinX = area.x.min <= x && x <= area.x.max;
  const isWithinY = area.y.min <= y && y <= area.y.max;
  return isWithinX && isWithinY;
};

const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent) => {
  var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY,
  };
};

const handleCanvasClick = (event: MouseEvent) => {
  if (!props.editable) return;
  const mousePosition = canvasRef.value && getMousePos(canvasRef.value, event);
  const square = findSquare({
    x: mousePosition?.x ?? 0,
    y: mousePosition?.y ?? 0,
  });
  if (!square) return;
  square.color = props.color ?? "#000000";
  if (!context.value) return;
  draw();
};
</script>

<template>
  <canvas
    :width="sizeInPixels"
    :height="sizeInPixels"
    ref="canvasRef"
    @click="handleCanvasClick"
  >
    fallback text
  </canvas>
</template>

<style scoped lang="scss">
@import "../../assets/variables.scss";
canvas {
  background-color: $palette-bg2;
  padding: $space-small;
  margin: $space-normal;
  box-shadow: $space-small $space-small 0 0 $color-box-shadow;
}
</style>
