"use client";

import { useState, useEffect } from "react";
import type { Swatch } from "./ColorPaletteGenerator.types";
import { generatePalette, HarmonyType, ModeType } from "./utils";

const CURRENT_KEY = "palette_current";
const HISTORY_KEY = "palette_history";

export function usePaletteStorage(
  defaultHarmony: HarmonyType,
  defaultMode: ModeType
) {
  const [colors, setColors] = useState<Swatch[]>([]);
  const [harmony, setHarmony] = useState<HarmonyType>(defaultHarmony);
  const [mode, setMode] = useState<ModeType>(defaultMode);

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem(CURRENT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setColors(parsed);
        }
      } catch (err) {
        console.error("Erreur chargement palette", err);
      }
    } else {
      setColors(generatePalette(defaultHarmony, defaultMode));
    }
  }, [defaultHarmony, defaultMode]);

  // Sauvegarder automatiquement la palette courante
  useEffect(() => {
    if (colors.length > 0) {
      localStorage.setItem(CURRENT_KEY, JSON.stringify(colors));
    }
  }, [colors]);

  // Historique limité à 5
  const saveToHistory = (palette: Swatch[]) => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const history: Swatch[][] = raw ? JSON.parse(raw) : [];

      const newHistory = [palette, ...history].slice(0, 5);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (err) {
      console.error("Erreur sauvegarde historique", err);
    }
  };

  const loadHistory = (): Swatch[][] => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return {
    colors,
    setColors,
    harmony,
    setHarmony,
    mode,
    setMode,
    saveToHistory,
    loadHistory,
  };
}
