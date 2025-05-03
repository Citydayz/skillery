// components/color-generator/paletteActions.ts
import chroma from "chroma-js";
import type { Swatch, HarmonyType, ModeType } from "../types";
import { generatePalette } from "./utils";

export function generateRandomColor(
  harmony: HarmonyType,
  mode: ModeType,
  baseHue?: number
): Swatch {
  const h = baseHue ?? Math.floor(Math.random() * 360);
  const newColor = generatePalette(harmony, mode, h)[0];

  return {
    ...newColor,
    id: crypto.randomUUID(),
    locked: false,
  };
}

export function addSwatch(
  palette: Swatch[],
  harmony: HarmonyType,
  mode: ModeType
): Swatch[] {
  const lastHue = palette.length ? palette[palette.length - 1].h : undefined;
  const newColor = generateRandomColor(harmony, mode, lastHue);
  return [...palette, newColor];
}

export function removeSwatch(palette: Swatch[], id?: string): Swatch[] {
  if (palette.length <= 2) return palette;
  return id ? palette.filter((c) => c.id !== id) : palette.slice(0, -1);
}

export function toggleSwatchLock(palette: Swatch[], id: string): Swatch[] {
  return palette.map((c) => (c.id === id ? { ...c, locked: !c.locked } : c));
}

export function updateSwatch(palette: Swatch[], updated: Swatch): Swatch[] {
  return palette.map((c) => (c.id === updated.id ? updated : c));
}

export function reorderSwatches(
  palette: Swatch[],
  oldIndex: number,
  newIndex: number
): Swatch[] {
  const updated = [...palette];
  const [moved] = updated.splice(oldIndex, 1);
  updated.splice(newIndex, 0, moved);
  return updated;
}
