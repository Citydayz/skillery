import { create } from "zustand";
import type { Swatch } from "../types"; // adapte le chemin si besoin

interface PaletteState {
  palette: Swatch[];
  setPalette: (newPalette: Swatch[]) => void;
  addColor: () => void;
  removeColor: () => void;
  removeColorById: (id: string) => void;
}

export const usePaletteStore = create<PaletteState>((set, get) => ({
  palette: [],

  setPalette: (newPalette) => set({ palette: newPalette }),

  addColor: () => {
    const newColor: Swatch = {
      id: crypto.randomUUID(),
      hex: "#000000",
      h: 0,
      s: 0,
      l: 0,
      a: 1,
      locked: false,
    };
    set({ palette: [...get().palette, newColor] });
  },

  removeColor: () => {
    const updated = [...get().palette];
    updated.pop();
    set({ palette: updated });
  },

  removeColorById: (id) => {
    const updated = get().palette.filter((color) => color.id !== id);
    set({ palette: updated });
  },
}));
