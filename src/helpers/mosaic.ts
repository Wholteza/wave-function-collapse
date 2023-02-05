import type { Square } from "@/components/assets-editor/types";
import { getRandomColorHex } from "./color";

export const generateSquares = (squaresPerSide: number): Square[] => {
  return Array.from({ length: squaresPerSide * squaresPerSide }, () => ({
    color: getRandomColorHex(),
  }));
};
