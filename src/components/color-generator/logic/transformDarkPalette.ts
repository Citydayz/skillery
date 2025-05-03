// logic/transformDarkPalette.ts
import type { Swatch } from "../types";
import chroma from "chroma-js";

/**
 * Inverse chaque couleur de la palette (r, g, b → 255 - r, 255 - g, 255 - b)
 */
export function transformForDarkMode(palette: Swatch[]): Swatch[] {
  return palette.map((swatch) => {
    const [r, g, b] = chroma(swatch.hex).rgb();
    const invertedColor = chroma([255 - r, 255 - g, 255 - b]).hex();

    return {
      ...swatch,
      hex: invertedColor,
    };
  });
}
