// hooks/usePaletteStore.ts
import { create } from "zustand";
import type { Swatch, HarmonyType, ModeType } from "../types";
import { generatePalette } from "../logic/utils";

const PALETTE_KEY = "color-palette";
const HARMONY_KEY = "color-harmony";
const MODE_KEY = "color-mode";

function generateInitialPalette(): Swatch[] {
  const stored = localStorage.getItem(PALETTE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Swatch[];
    } catch {
      console.warn("Palette corrompue dans localStorage");
    }
  }
  const baseHue = Math.floor(Math.random() * 360);
  return generatePalette("analogues", "normal", baseHue)
    .slice(0, 5)
    .map((c) => ({ ...c, id: crypto.randomUUID() }));
}

function getInitialHarmony(): HarmonyType {
  return (localStorage.getItem(HARMONY_KEY) as HarmonyType) || "analogues";
}

function getInitialMode(): ModeType {
  return (localStorage.getItem(MODE_KEY) as ModeType) || "normal";
}

export const usePaletteStore = create<{
  palette: Swatch[];
  harmony: HarmonyType;
  mode: ModeType;
  setPalette: (newPalette: Swatch[]) => void;
  addColor: () => void;
  removeColor: () => void;
  setHarmony: (value: HarmonyType) => void;
  setMode: (value: ModeType) => void;
}>((set, get) => {
  const initialPalette =
    typeof window !== "undefined" ? generateInitialPalette() : [];
  const initialHarmony =
    typeof window !== "undefined" ? getInitialHarmony() : "analogues";
  const initialMode =
    typeof window !== "undefined" ? getInitialMode() : "normal";

  return {
    palette: initialPalette,
    harmony: initialHarmony,
    mode: initialMode,

    setPalette: (newPalette) => {
      localStorage.setItem(PALETTE_KEY, JSON.stringify(newPalette));
      set({ palette: newPalette });
    },

    setHarmony: (value) => {
      localStorage.setItem(HARMONY_KEY, value);
      set({ harmony: value });
    },

    setMode: (value) => {
      localStorage.setItem(MODE_KEY, value);
      set({ mode: value });
    },

    addColor: () => {
      const current = get().palette;
      const baseHue = current.length
        ? current[current.length - 1].h
        : Math.random() * 360;
      const newColor = generatePalette(get().harmony, get().mode, baseHue)[0];
      const swatch: Swatch = { ...newColor, id: crypto.randomUUID() };
      const updated = [...current, swatch];
      localStorage.setItem(PALETTE_KEY, JSON.stringify(updated));
      set({ palette: updated });
    },

    removeColor: () => {
      const current = get().palette;
      if (current.length <= 2) return;
      const updated = current.slice(0, -1);
      localStorage.setItem(PALETTE_KEY, JSON.stringify(updated));
      set({ palette: updated });
    },
  };
});
