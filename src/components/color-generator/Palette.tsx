"use client";

import chroma from "chroma-js";
import toast from "react-hot-toast";
import { useState } from "react";
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

import type { Swatch } from "./ColorPaletteGenerator.types";
import SwatchEditor from "./SwatchEditor";
import {
  generatePalette,
  harmonyOptions,
  modeOptions,
  HarmonyType,
  ModeType,
} from "./utils";
import { usePaletteStorage } from "./usePaletteStorage";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";
import PaletteHistory from "./PaletteHistory";
import DraggableSwatch from "./DraggableSwatch";

export default function Palette() {
  const {
    colors,
    setColors,
    harmony,
    setHarmony,
    mode,
    setMode,
    saveToHistory,
    loadHistory,
  } = usePaletteStorage("analogues", "normal");

  const [selectedSwatchId, setSelectedSwatchId] = useState<string | null>(null);
  const [hoveredSwatchId, setHoveredSwatchId] = useState<string | null>(null);
  const history = loadHistory();

  const regenerate = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const basePalette = generatePalette(harmony, mode, baseHue);

    const unlockedCount = colors.filter((c) => !c.locked).length;

    // Étendre ou boucler la palette générée pour couvrir tous les non-verrouillés
    const extendedPalette = Array.from({ length: unlockedCount }, (_, i) => {
      const base = basePalette[i % basePalette.length];
      return {
        ...base,
        id: crypto.randomUUID(), // ✅ ID unique
      };
    });

    saveToHistory(colors);

    const updated: Swatch[] = [];
    let genIndex = 0;

    for (const c of colors) {
      if (c.locked) {
        updated.push(c);
      } else {
        updated.push(extendedPalette[genIndex++]);
      }
    }

    setColors(updated);
  };

  const toggleLock = (id: string) => {
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, locked: !c.locked } : c))
    );
  };

  const copyToClipboard = (color: Swatch) => {
    const { hex, a } = color;
    const hexWithAlpha = chroma(hex).alpha(a).hex("rgba");
    navigator.clipboard.writeText(hexWithAlpha);
    toast.success(`${hexWithAlpha} copié`);
  };

  const updateSwatch = (updated: Swatch) => {
    setColors((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const addColor = () => {
    const baseHue =
      colors.length > 0 ? colors[colors.length - 1].h : Math.random() * 360;
    const newColor = chroma.hsl(baseHue, 0.6, 0.5).hex();

    let newId: string;
    do {
      newId = crypto.randomUUID();
    } while (colors.some((c) => c.id === newId));

    const swatch: Swatch = {
      id: newId,
      hex: newColor,
      h: baseHue,
      s: 60,
      l: 50,
      a: 1,
      locked: false,
    };
    setColors((prev) => [...prev, swatch]);
    toast.success("🎨 Couleur ajoutée");
  };

  const removeColor = (id: string) => {
    if (colors.length <= 2) {
      toast.error("Tu dois garder au moins 2 couleurs !");
      return;
    }
    setColors((prev) => prev.filter((c) => c.id !== id));
    toast("🗑️ Couleur supprimée", {
      icon: "💥",
      style: { background: "#fef3c7", color: "#92400e" },
    });
  };

  const restoreFromHistory = (index: number) => {
    const palette = history[index];
    if (palette) {
      const uniqueIds = new Set<string>();
      const uniquePalette = palette.map((c) => {
        let newId: string = c.id;
        while (uniqueIds.has(newId)) {
          newId = crypto.randomUUID();
        }
        uniqueIds.add(newId);
        return { ...c, id: newId };
      });
      setColors(uniquePalette);
    }
  };

  useKeyboardShortcuts({
    regenerate,
    addColor,
    removeColor,
    toggleLock,
    hoveredSwatchId,
    setSelectedSwatchId,
    history,
    restoreFromHistory,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = colors.findIndex((c) => c.id === active.id);
      const newIndex = colors.findIndex((c) => c.id === over.id);
      setColors((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <label
              htmlFor="harmony"
              className="text-sm font-medium text-gray-700"
            >
              Harmonie :
            </label>
            <select
              id="harmony"
              value={harmony}
              onChange={(e) => setHarmony(e.target.value as HarmonyType)}
              className="border px-4 py-2 rounded"
            >
              {Object.keys(harmonyOptions).map((opt) => (
                <option key={opt} value={opt}>
                  {opt
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="mode" className="text-sm font-medium text-gray-700">
              Mode :
            </label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as ModeType)}
              className="border px-4 py-2 rounded"
            >
              {modeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-100 text-gray-700 text-sm text-center py-2 px-4 rounded shadow-sm max-w-3xl">
          ⌨️ <strong>Raccourcis clavier</strong> :
          <span className="inline-block mx-2">A = Ajouter</span> |
          <span className="inline-block mx-2">R = Régénérer</span> |
          <span className="inline-block mx-2">←/→ = Naviguer</span> |
          <span className="inline-block mx-2">Suppr = Supprimer</span> |
          <span className="inline-block mx-2">L = Verrouiller</span>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={colors.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {colors.map((color) => (
              <DraggableSwatch
                key={color.id}
                swatch={color}
                onClick={() =>
                  setSelectedSwatchId((prev) =>
                    prev === color.id ? null : color.id
                  )
                }
                onRemove={() => removeColor(color.id)}
                onToggleLock={() => toggleLock(color.id)}
                onCopy={() => copyToClipboard(color)}
                isSelected={selectedSwatchId === color.id}
                onHover={() => setHoveredSwatchId(color.id)}
                onHoverOut={() =>
                  setHoveredSwatchId((prev) =>
                    prev === color.id ? null : prev
                  )
                }
              >
                <SwatchEditor
                  swatch={color}
                  onChange={updateSwatch}
                  onClose={() => setSelectedSwatchId(null)}
                />
              </DraggableSwatch>
            ))}
            <div
              onClick={addColor}
              className="w-[240px] h-[320px] border-2 border-dashed border-[#00ADB5] flex items-center justify-center text-4xl text-[#00ADB5] rounded-xl cursor-pointer hover:bg-[#00ADB5]/10 transition"
            >
              +
            </div>
          </div>
        </SortableContext>
      </DndContext>

      <div className="text-center mt-10">
        <button
          onClick={regenerate}
          className="bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-6 py-3 rounded-lg font-semibold"
        >
          🔄 Générer une nouvelle palette
        </button>
      </div>

      <PaletteHistory history={history} onRestore={restoreFromHistory} />
    </div>
  );
}
