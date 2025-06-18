"use client";

import chroma from "chroma-js";
import toast from "react-hot-toast";
import { useState, useCallback, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";

import type { Swatch } from "../types";
import SwatchEditor from "./SwatchEditor";
import {
  generatePalette,
  harmonyOptions,
  modeOptions,
  HarmonyType,
  ModeType,
} from "../logic/utils";
import { usePaletteStorage } from "../hooks/usePaletteStorage";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import PaletteHistory from "./PaletteHistory";
import DraggableSwatch from "./DraggableSwatch";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FavoritePalettes from "./FavoritePalettes";
import { usePaletteStore } from "../hooks/usePaletteStore";
import {
  toggleSwatchLock,
  removeSwatch,
  addSwatch,
} from "../logic/paletteActions";

const harmonyLabels: Record<string, string> = {
  analogues: "Analogues",
  complementaire: "Complémentaire",
  triadique: "Triadique",
  splitComplementaire: "Split complémentaire",
  tetradique: "Tétradique",
  carre: "Carré",
  doubleComplementaire: "Double complémentaire",
  accentueAnalogue: "Accentué analogue",
};

const modeLabels: Record<string, string> = {
  normal: "Normal",
  pastel: "Pastel",
  dark: "Sombre",
  monochrome: "Monochrome",
};

const MySwal = withReactContent(Swal);

export default function Palette() {
  const router = useRouter();
  const [selectedSwatchId, setSelectedSwatchId] = useState<string | null>(null);
  const [hoveredSwatchId, setHoveredSwatchId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const {
    colors,
    setColors,
    harmony,
    setHarmony,
    mode,
    setMode,
    history,
    addToHistory,
    restoreFromHistory,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = usePaletteStorage("analogues", "normal");

  // Optimisation des capteurs pour le drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Mémoisation des options de tri
  const sortableItems = useMemo(() => colors.map((c) => c.id), [colors]);

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        setColors((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    },
    [setColors]
  );

  const handleRegenerate = useCallback(() => {
    const baseHue = Math.floor(Math.random() * 360);
    const generated = generatePalette(harmony, mode, baseHue);

    const unlockedCount = colors.filter((c) => !c.locked).length;
    const extended = Array.from({ length: unlockedCount }, (_, i) => {
      const base = generated[i % generated.length];
      return { ...base, id: crypto.randomUUID() };
    });

    const updated = colors.map((c) => (c.locked ? c : extended.shift()!));
    setColors(updated);
    addToHistory(updated);
  }, [colors, harmony, mode, setColors, addToHistory]);

  const handleAddColor = useCallback(() => {
    const baseHue = colors.length
      ? colors[colors.length - 1].h
      : Math.random() * 360;
    const newColor = generatePalette(harmony, mode, baseHue)[0];
    const swatch: Swatch = { ...newColor, id: crypto.randomUUID() };
    const updated = [...colors, swatch];
    setColors(updated);
    addToHistory(updated);
  }, [colors, harmony, mode, setColors, addToHistory]);

  const handleRemoveColor = useCallback(
    (id: string) => {
      if (colors.length <= 2) {
        toast.error("Une palette doit contenir au moins 2 couleurs");
        return;
      }
      const updated = colors.filter((c) => c.id !== id);
      setColors(updated);
      addToHistory(updated);
    },
    [colors, setColors, addToHistory]
  );

  const handleToggleLock = useCallback(
    (id: string) => {
      const updated = colors.map((c) =>
        c.id === id ? { ...c, locked: !c.locked } : c
      );
      setColors(updated);
      addToHistory(updated);
    },
    [colors, setColors, addToHistory]
  );

  const handleSaveFavorite = useCallback(async () => {
    const { value: name } = await MySwal.fire({
      title: "Nommer la palette",
      input: "text",
      inputPlaceholder: "Ma palette favorite",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Le nom est requis";
        }
        if (favorites.some((f) => f.name === value)) {
          return "Ce nom est déjà utilisé";
        }
      },
    });

    if (name) {
      addToFavorites({
        id: crypto.randomUUID(),
        name,
        colors,
        createdAt: new Date().toISOString(),
      });
      toast.success("Palette sauvegardée dans les favoris");
    }
  }, [colors, favorites, addToFavorites]);

  // Optimisation des raccourcis clavier
  useKeyboardShortcuts({
    regenerate: handleRegenerate,
    addColor: handleAddColor,
    removeColor: handleRemoveColor,
    toggleLock: handleToggleLock,
    hoveredSwatchId,
    setSelectedSwatchId,
    history,
    restoreFromHistory,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <select
            value={harmony}
            onChange={(e) => setHarmony(e.target.value as HarmonyType)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          >
            {Object.entries(harmonyLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as ModeType)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          >
            {Object.entries(modeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Historique
          </button>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Favoris
          </button>
          <button
            onClick={handleSaveFavorite}
            className="px-4 py-2 bg-[#00ADB5] hover:bg-[#00cfd9] text-white rounded-lg transition"
          >
            Sauvegarder
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortableItems}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {colors.map((swatch) => (
              <DraggableSwatch
                key={swatch.id}
                swatch={swatch}
                isSelected={selectedSwatchId === swatch.id}
                onSelect={() => setSelectedSwatchId(swatch.id)}
                onHover={() => setHoveredSwatchId(swatch.id)}
                onUnhover={() => setHoveredSwatchId(null)}
                onRemove={() => handleRemoveColor(swatch.id)}
                onToggleLock={() => handleToggleLock(swatch.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {selectedSwatchId && (
        <SwatchEditor
          swatch={colors.find((c) => c.id === selectedSwatchId)!}
          onChange={(updated) => {
            const newColors = colors.map((c) =>
              c.id === selectedSwatchId ? updated : c
            );
            setColors(newColors);
            addToHistory(newColors);
          }}
          onClose={() => setSelectedSwatchId(null)}
        />
      )}

      {showHistory && (
        <PaletteHistory
          history={history}
          onRestore={restoreFromHistory}
          onClose={() => setShowHistory(false)}
        />
      )}

      {showFavorites && (
        <FavoritePalettes
          favorites={favorites}
          onRestore={(palette) => {
            setColors(palette.colors);
            addToHistory(palette.colors);
            setShowFavorites(false);
          }}
          onDelete={removeFromFavorites}
          onClose={() => setShowFavorites(false)}
        />
      )}
    </div>
  );
}
