"use client";

import { useState } from "react";
import type { Swatch } from "../../types";
import Tooltip from "../../../ui/Tooltips";
import { usePaletteStore } from "../../hooks/usePaletteStore";
import { addSwatch, removeSwatch } from "../../logic/paletteActions";
import FavoritePalettes from "../../components/FavoritePalettes";
import DraggableColorBox from "../../components/DraggableColorBox";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

interface Props {
  previewColors: Swatch[];
  onGenerate: () => void;
  isDark: boolean;
  toggleMode: () => void;
}

export default function PreviewFooter({
  previewColors,
  onGenerate,
  isDark,
  toggleMode,
}: Props) {
  const setColors = usePaletteStore((state) => state.setPalette);
  const harmony = usePaletteStore((state) => state.harmony);
  const mode = usePaletteStore((state) => state.mode);
  const [showFavorites, setShowFavorites] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAdd = () => {
    const updated = addSwatch(previewColors, harmony, mode);
    setColors(updated);
  };

  const handleRemove = () => {
    const updated = removeSwatch(previewColors);
    setColors(updated);
  };

  const handleReverse = () => {
    const reversed = [...previewColors].reverse();
    setColors(reversed);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = previewColors.findIndex((c) => c.id === active.id);
    const newIndex = previewColors.findIndex((c) => c.id === over.id);
    const reordered = arrayMove(previewColors, oldIndex, newIndex);
    setColors(reordered);
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full bg-white z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between w-full px-12 py-6">
          {/* Palette + drag + vertical buttons */}
          <div className="flex items-center gap-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={previewColors.map((c) => c.id)}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex items-center gap-1.5 rounded overflow-hidden border border-zinc-200 px-2 py-1">
                  {previewColors.map((color, index) => (
                    <DraggableColorBox
                      key={color.id}
                      swatch={color}
                      index={index}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="flex flex-col gap-2">
              <Tooltip content="Ajouter une couleur" delay={0}>
                <button
                  onClick={handleAdd}
                  className="h-8 w-8 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition text-xl font-semibold"
                >
                  +
                </button>
              </Tooltip>
              <Tooltip content="Supprimer une couleur" delay={0}>
                <button
                  onClick={handleRemove}
                  className="h-8 w-8 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition text-xl font-semibold"
                >
                  –
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap justify-end text-base font-semibold">
            <Tooltip content="Inverser la palette" delay={0}>
              <button
                onClick={handleReverse}
                className="h-12 w-12 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition text-xl"
              >
                🔄
              </button>
            </Tooltip>

            <Tooltip content="Générer une nouvelle palette" delay={0}>
              <button
                onClick={onGenerate}
                className="px-5 h-12 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition"
              >
                🎨 Generate
              </button>
            </Tooltip>

            <Tooltip content="Parcourir les palettes sauvegardées" delay={0}>
              <button
                onClick={() => setShowFavorites(true)}
                className="px-5 h-12 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition"
              >
                📁 Browse
              </button>
            </Tooltip>

            <Tooltip
              content={`Passer en mode ${isDark ? "clair" : "sombre"}`}
              delay={0}
            >
              <button
                onClick={toggleMode}
                className="px-6 h-12 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition"
              >
                {isDark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </Tooltip>
          </div>
        </div>
      </footer>

      {/* FAVORITES MODAL */}
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
              onLoad={(palette) => {
                setColors(palette);
                setShowFavorites(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
