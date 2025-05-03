"use client";

import { useState, useEffect } from "react";
import type { Swatch } from "../types";
import {
  generatePalette,
  HarmonyType,
  ModeType,
  harmonyOptions,
  modeOptions,
} from "../logic/utils";
import { v4 as uuidv4 } from "uuid";

const CURRENT_KEY = "palette_current";
const HISTORY_KEY = "palette_history";
const HARMONY_KEY = "palette_harmony";
const MODE_KEY = "palette_mode";
const FAVORITES_KEY = "palette_favorites"; // ✅ nouveau

export interface FavoritePalette {
  id: string;
  name: string;
  colors: Swatch[];
  createdAt: string;
}

function validateAndFixSwatches(swatches: any[]): Swatch[] {
  const seenIds = new Set<string>();

  return swatches
    .filter((swatch) => swatch && typeof swatch === "object")
    .map((swatch) => {
      let id = swatch.id;
      if (!id || seenIds.has(id)) {
        id = crypto.randomUUID();
      }
      seenIds.add(id);

      return {
        ...swatch,
        id,
        hex: swatch.hex || "#000000",
        h: typeof swatch.h === "number" ? swatch.h : 0,
        s: typeof swatch.s === "number" ? swatch.s : 60,
        l: typeof swatch.l === "number" ? swatch.l : 50,
        a: typeof swatch.a === "number" ? swatch.a : 1,
        locked: !!swatch.locked,
      };
    });
}

export function usePaletteStorage(
  defaultHarmony: HarmonyType,
  defaultMode: ModeType
) {
  const initialHarmony = (() => {
    const saved = localStorage.getItem(HARMONY_KEY);
    return saved && Object.keys(harmonyOptions).includes(saved)
      ? (saved as HarmonyType)
      : defaultHarmony;
  })();

  const initialMode = (() => {
    const saved = localStorage.getItem(MODE_KEY);
    return saved && modeOptions.includes(saved as ModeType)
      ? (saved as ModeType)
      : defaultMode;
  })();

  const [colors, setColors] = useState<Swatch[]>([]);
  const [harmony, setHarmony] = useState<HarmonyType>(initialHarmony);
  const [mode, setMode] = useState<ModeType>(initialMode);

  // ✅ État des favoris
  const [favorites, setFavorites] = useState<FavoritePalette[]>(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Charger palette au démarrage
  useEffect(() => {
    const savedColors = localStorage.getItem(CURRENT_KEY);

    if (savedColors) {
      try {
        const parsed = JSON.parse(savedColors);
        if (Array.isArray(parsed)) {
          const validColors = validateAndFixSwatches(parsed);
          setColors(validColors);
          return;
        }
      } catch (err) {
        console.error("Erreur chargement palette", err);
      }
    }

    // fallback initial
    setColors(generatePalette(initialHarmony, initialMode));
  }, [initialHarmony, initialMode]);

  // Sauvegarder automatiquement la palette courante
  useEffect(() => {
    if (colors.length > 0) {
      localStorage.setItem(CURRENT_KEY, JSON.stringify(colors));
    }
  }, [colors]);

  // Sauvegarder harmony et mode
  useEffect(() => {
    localStorage.setItem(HARMONY_KEY, harmony);
  }, [harmony]);

  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

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
      return Array.isArray(parsed) ? parsed.map(validateAndFixSwatches) : [];
    } catch {
      return [];
    }
  };

  // ✅ Favoris : sauvegarde
  const saveFavorite = (name: string, colors: Swatch[]) => {
    const newFav: FavoritePalette = {
      id: uuidv4(),
      name,
      colors,
      createdAt: new Date().toISOString(),
    };
    const updated = [...favorites, newFav];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    setFavorites(updated);
  };

  // ✅ Favoris : suppression
  const deleteFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    setFavorites(updated);
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
    // ✅ Favoris
    favorites,
    saveFavorite,
    deleteFavorite,
  };
}
