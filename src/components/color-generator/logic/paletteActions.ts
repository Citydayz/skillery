import chroma from "chroma-js";
import type { Swatch } from "../types";

export function generateRandomColor(baseHue?: number): Swatch {
  const h = baseHue ?? Math.floor(Math.random() * 360);
  const hex = chroma.hsl(h, 0.6, 0.5).hex();
  return {
    id: crypto.randomUUID(),
    hex,
    h,
    s: 60,
    l: 50,
    a: 1,
    locked: false,
  };
}

export function addSwatch(palette: Swatch[]): Swatch[] {
  const lastHue = palette.length ? palette[palette.length - 1].h : undefined;
  const newColor = generateRandomColor(lastHue);
  return [...palette, newColor];
}

export function removeSwatch(palette: Swatch[], id?: string): Swatch[] {
  if (palette.length <= 2) return palette;
  if (!id) return palette.slice(0, -1);
  return palette.filter((c) => c.id !== id);
}

export function toggleSwatchLock(palette: Swatch[], id: string): Swatch[] {
  return palette.map((c) => (c.id === id ? { ...c, locked: !c.locked } : c));
}
