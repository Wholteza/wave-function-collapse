import type { Square } from "@/components/assets-editor/types";
import { decimalToTwoDigitHex } from "./color";

export const generateSquares = (squaresPerSide: number): Square[] => {
  return Array.from({ length: squaresPerSide * squaresPerSide }, (_, index) => {
    const square = {
      color: `#${decimalToTwoDigitHex(
        Math.floor((index * 10) / 2)
      )}${decimalToTwoDigitHex(Math.floor((index * 10) / 2))}00`,
    };
    return square;
  });
};
