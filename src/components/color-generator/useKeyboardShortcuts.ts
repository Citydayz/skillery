"use client";

import { useEffect } from "react";
import type { Swatch } from "./ColorPaletteGenerator.types";

export function useKeyboardShortcuts({
  regenerate,
  addColor,
  removeColor,
  toggleLock,
  hoveredSwatchId,
  setSelectedSwatchId,
  history,
  restoreFromHistory,
}: {
  regenerate: () => void;
  addColor: () => void;
  removeColor: (id: string) => void;
  toggleLock: (id: string) => void;
  hoveredSwatchId: string | null;
  setSelectedSwatchId: (id: string | null) => void;
  history: Swatch[][];
  restoreFromHistory: (index: number) => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "r") {
        e.preventDefault();
        regenerate();
      }

      if (key === "a") {
        e.preventDefault();
        addColor();
      }

      if ((key === "d" || key === "backspace") && hoveredSwatchId) {
        e.preventDefault();
        removeColor(hoveredSwatchId);
      }

      if (key === "l" && hoveredSwatchId) {
        e.preventDefault();
        toggleLock(hoveredSwatchId);
      }

      if (key === "escape") {
        setSelectedSwatchId(null);
      }

      if (["1", "2", "3", "4", "5"].includes(key)) {
        const index = parseInt(key, 10) - 1;
        if (history[index]) {
          e.preventDefault();
          restoreFromHistory(index);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [
    regenerate,
    addColor,
    removeColor,
    toggleLock,
    hoveredSwatchId,
    setSelectedSwatchId,
    history,
    restoreFromHistory,
  ]);
}
