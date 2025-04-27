"use client";

import { useState } from "react";
import { FiLock, FiUnlock, FiCopy, FiX } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import chroma from "chroma-js";
import type { Swatch } from "../color-generator/ColorPaletteGenerator.types";
import SwatchEditor from "../color-generator/SwatchEditor";

const harmonyOptions = {
  analogues: [0, -10, 10, 30, -30],
  complementaire: [0, 180, -30, 30, 150],
  triadique: [0, 120, 240, 60, 180],
} as const;

const modeOptions = ["normal", "pastel", "dark", "monochrome"] as const;

type HarmonyType = keyof typeof harmonyOptions;
type ModeType = (typeof modeOptions)[number];

// 👉 Fonction de génération adaptée au "mode"
const generateColor = (h: number, mode: ModeType): Swatch => {
  let s = 60 + Math.random() * 20;
  let l = 45 + Math.random() * 15;

  if (mode === "pastel") {
    s = 30 + Math.random() * 20; // Saturation plus faible
    l = 70 + Math.random() * 10; // Luminosité plus forte
  } else if (mode === "dark") {
    s = 60 + Math.random() * 10; // Saturation assez forte
    l = 20 + Math.random() * 10; // Luminosité faible
  } else if (mode === "monochrome") {
    s = 0; // Saturation 0 (gris)
    l = 20 + Math.random() * 60;
  }

  const a = 1;
  const hex = chroma.hsl(h, s / 100, l / 100).hex();
  return {
    id: crypto.randomUUID(),
    hex,
    h,
    s: Math.round(s),
    l: Math.round(l),
    a,
    locked: false,
  };
};

export default function ColorPaletteGenerator() {
  const [harmony, setHarmony] = useState<HarmonyType>("analogues");
  const [mode, setMode] = useState<ModeType>("normal");
  const [colors, setColors] = useState<Swatch[]>(
    generatePalette("analogues", "normal")
  );
  const [selectedSwatchId, setSelectedSwatchId] = useState<string | null>(null);

  function generatePalette(type: HarmonyType, mode: ModeType) {
    const baseHue = Math.floor(Math.random() * 360);
    const offsets = harmonyOptions[type];
    return offsets.map((offset) =>
      generateColor((baseHue + offset + 360) % 360, mode)
    );
  }

  const regenerate = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const offsets = harmonyOptions[harmony];
    setColors((prev) =>
      prev.map((c, i) =>
        c.locked
          ? c
          : generateColor(
              (baseHue + offsets[i % offsets.length] + 360) % 360,
              mode
            )
      )
    );
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
    setColors((prev) => [...prev, generateColor(baseHue, mode)]);
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

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-gray-800 relative">
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { marginBottom: "5px" } }}
      />

      <div className="w-full max-w-[90%] sm:max-w-[80%] mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#00ADB5]">
          Générateur de palette de couleurs
        </h1>

        {/* Sélecteurs */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {/* Select harmonie */}
          <div className="flex flex-col items-center">
            <label className="text-gray-600 mb-2 text-sm">
              Type d'harmonie
            </label>
            <select
              value={harmony}
              onChange={(e) => {
                const newHarmony = e.target.value as HarmonyType;
                setHarmony(newHarmony);
                setColors(() => {
                  const count = colors.length;
                  return generatePalette(newHarmony, mode).slice(0, count);
                });
              }}
              className="px-4 py-2 rounded-lg border bg-white shadow-sm"
            >
              {Object.keys(harmonyOptions).map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Select mode */}
          <div className="flex flex-col items-center">
            <label className="text-gray-600 mb-2 text-sm">
              Style de couleur
            </label>
            <select
              value={mode}
              onChange={(e) => {
                const newMode = e.target.value as ModeType;
                setMode(newMode);
                setColors(() => {
                  const count = colors.length;
                  return generatePalette(harmony, newMode).slice(0, count);
                });
              }}
              className="px-4 py-2 rounded-lg border bg-white shadow-sm"
            >
              {modeOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Palette */}
        <div className="flex flex-wrap justify-center gap-4">
          {colors.map((color) => {
            const rgba = chroma(color.hex).alpha(color.a);
            const cssColor = rgba.css();
            const hexWithAlpha = rgba.hex("rgba");

            return (
              <div key={color.id} className="space-y-2 w-[240px]">
                <div
                  className="relative rounded-xl shadow h-[320px] flex flex-col justify-between items-center p-4 text-white cursor-pointer"
                  style={{ backgroundColor: cssColor }}
                  onClick={() =>
                    setSelectedSwatchId((prev) =>
                      prev === color.id ? null : color.id
                    )
                  }
                >
                  {/* Supprimer */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeColor(color.id);
                    }}
                    className="absolute top-2 left-2 text-white bg-black/30 rounded-full p-1 hover:bg-black/50 z-10"
                  >
                    <FiX size={14} />
                  </button>

                  {/* Lock */}
                  <div className="self-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLock(color.id);
                      }}
                      className="text-white opacity-80 hover:opacity-100"
                    >
                      {color.locked ? <FiLock /> : <FiUnlock />}
                    </button>
                  </div>

                  {/* Code couleur */}
                  <span className="text-xs font-mono mb-2 bg-black/30 px-2 py-1 rounded">
                    {hexWithAlpha}
                  </span>

                  {/* Copier */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(color);
                    }}
                    className="text-sm font-mono bg-black/30 px-3 py-1 rounded backdrop-blur hover:bg-black/50 transition"
                  >
                    Copier
                    <FiCopy className="inline ml-2 text-xs" />
                  </button>
                </div>

                {selectedSwatchId === color.id && (
                  <SwatchEditor
                    swatch={color}
                    onChange={updateSwatch}
                    onClose={() => setSelectedSwatchId(null)}
                  />
                )}
              </div>
            );
          })}

          {/* Ajouter une couleur */}
          <div
            onClick={addColor}
            className="w-[240px] h-[320px] border-2 border-dashed border-[#00ADB5] flex items-center justify-center text-4xl text-[#00ADB5] rounded-xl cursor-pointer hover:bg-[#00ADB5]/10 transition"
          >
            +
          </div>
        </div>

        {/* Bouton de génération */}
        <div className="text-center mt-10">
          <button
            onClick={regenerate}
            className="bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-6 py-3 rounded-lg font-semibold"
          >
            🔄 Générer une nouvelle palette
          </button>
        </div>
      </div>
    </div>
  );
}
