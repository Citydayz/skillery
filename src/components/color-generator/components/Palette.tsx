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

export default function Palette() {
  const colors = usePaletteStore((state) => state.palette);
  const setColors = usePaletteStore((state) => state.setPalette);
  const addColor = usePaletteStore((state) => state.addColor);
  const removeColor = usePaletteStore((state) => state.removeColor);
  const removeColorById = usePaletteStore((state) => state.removeColorById);

  const {
    harmony,
    setHarmony,
    mode,
    setMode,
    saveToHistory,
    loadHistory,
    saveFavorite,
  } = usePaletteStorage("analogues", "normal");

  const [selectedSwatchId, setSelectedSwatchId] = useState<string | null>(null);
  const [hoveredSwatchId, setHoveredSwatchId] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const history = loadHistory();
  const router = useRouter();

  const regenerate = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const basePalette = generatePalette(harmony, mode, baseHue);
    const unlockedCount = colors.filter((c) => !c.locked).length;

    const extendedPalette = Array.from({ length: unlockedCount }, (_, i) => {
      const base = basePalette[i % basePalette.length];
      return {
        ...base,
        id: crypto.randomUUID(),
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
    setColors(
      colors.map((c) => (c.id === id ? { ...c, locked: !c.locked } : c))
    );
  };

  const copyToClipboard = (color: Swatch) => {
    const { hex, a } = color;
    const hexWithAlpha = chroma(hex).alpha(a).hex("rgba");
    navigator.clipboard.writeText(hexWithAlpha);
    toast.success(`${hexWithAlpha} copié`);
  };

  const updateSwatch = (updated: Swatch) => {
    setColors(colors.map((c) => (c.id === updated.id ? updated : c)));
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

  const handleSaveToFavorites = async () => {
    const MySwal = withReactContent(Swal);
    const { value: name } = await MySwal.fire({
      title: "Nom de ta palette",
      input: "text",
      inputPlaceholder: "Ex : Sunset Vibes",
      confirmButtonText: "Sauvegarder",
      showCancelButton: true,
    });

    if (name) {
      saveFavorite(name, colors);
      toast.success(`⭐ Palette "${name}" ajoutée aux favoris !`);
    }
  };

  const handleOpenPreview = () => {
    router.push("/tools/color-palette-generator/preview");
  };

  useKeyboardShortcuts({
    regenerate,
    addColor,
    removeColor: () => {
      if (colors.length > 2) removeColor();
    },
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
      setColors(arrayMove(colors, oldIndex, newIndex));
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <label
              htmlFor="harmony"
              className="text-sm text-gray-600 font-medium min-w-[120px] text-right"
            >
              Harmonie
            </label>
            <select
              id="harmony"
              value={harmony}
              onChange={(e) => setHarmony(e.target.value as HarmonyType)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent"
            >
              {Object.keys(harmonyOptions).map((key) => (
                <option key={key} value={key}>
                  {harmonyLabels[key] || key}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="mode"
              className="text-sm text-gray-600 font-medium min-w-[120px] text-right"
            >
              Mode
            </label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as ModeType)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent"
            >
              {modeOptions.map((m) => (
                <option key={m} value={m}>
                  {modeLabels[m] || m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-100 text-gray-700 text-sm text-center py-2 px-4 rounded shadow-sm max-w-3xl">
          ⌨️ <strong>Raccourcis clavier</strong> :
          <span className="inline-block mx-2">A = Ajouter</span> |
          <span className="inline-block mx-2">R = Régénérer</span> |
          <span className="inline-block mx-2">D = Supprimer</span> |
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
                onRemove={() => removeColorById(color.id)}
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

      <div className="mt-10 flex flex-col items-center gap-4">
        <button
          onClick={regenerate}
          className="bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-6 py-3 rounded-xl font-semibold shadow-lg w-[250px]"
        >
          🔄 Générer une nouvelle palette
        </button>

        <div className="flex gap-4">
          <button
            onClick={handleSaveToFavorites}
            className="border border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10 px-5 py-2 rounded-xl font-medium shadow w-[200px]"
          >
            ⭐ Ajouter aux favoris
          </button>
          <button
            onClick={() => setShowFavorites(true)}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-2 rounded-xl font-medium shadow w-[200px]"
          >
            📂 Voir mes favoris
          </button>
          <button
            onClick={handleOpenPreview}
            className="border border-indigo-400 text-indigo-600 hover:bg-indigo-50 px-5 py-2 rounded-xl font-medium shadow w-[200px]"
          >
            🎨 Aperçu dans un modèle
          </button>
        </div>
      </div>

      <PaletteHistory history={history} onRestore={restoreFromHistory} />

      {showFavorites && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowFavorites(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              ⭐ Palettes favorites
            </h2>
            <FavoritePalettes
              onLoad={(colors) => {
                setColors(colors);
                setShowFavorites(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
