import chroma from "chroma-js";
import type { Swatch } from "./types";

export const harmonyOptions = {
  analogues: [0, -10, 10, 30, -30],
  complementaire: [0, 180, -30, 30, 150],
  triadique: [0, 120, 240, 60, 180],
  splitComplementaire: [0, 150, 210],
  tetradique: [0, 60, 180, 240],
  carre: [0, 90, 180, 270],
  doubleComplementaire: [0, 30, 180, 210],
  accentueAnalogue: [0, 30, -30, 180],
} as const;

export const modeOptions = ["normal", "pastel", "dark", "monochrome"] as const;

export type HarmonyType = keyof typeof harmonyOptions;
export type ModeType = (typeof modeOptions)[number];

export const generateColor = (h: number, mode: ModeType): Swatch => {
  let s = 60 + Math.random() * 20;
  let l = 45 + Math.random() * 15;

  if (mode === "pastel") {
    s = 30 + Math.random() * 20;
    l = 70 + Math.random() * 10;
  } else if (mode === "dark") {
    s = 60 + Math.random() * 10;
    l = 20 + Math.random() * 10;
  } else if (mode === "monochrome") {
    s = 0;
    l = 20 + Math.random() * 60;
  }

  const a = 1;
  const hex = chroma.hsl(h, s / 100, l / 100).hex();
  return {
    id: crypto.randomUUID(),
    hex,
    h,
    s: Math.round(s),
    l: Math.round(l),
    a,
    locked: false,
  };
};

export const generatePalette = (
  type: HarmonyType,
  mode: ModeType,
  baseHue: number = Math.floor(Math.random() * 360)
): Swatch[] => {
  const offsets = harmonyOptions[type];
  return offsets.map((offset) =>
    generateColor((baseHue + offset + 360) % 360, mode)
  );
};
