"use client";

import { useState } from "react";
import PreviewCard from "../mockups/PreviewCard";
import PreviewButton from "../mockups/PreviewButton";
import PreviewSection from "../mockups/PreviewSection";
import PreviewTypography from "../mockups/PreviewTypography";
import PreviewFooter from "./PreviewFooter";
import { usePaletteStore } from "../../hooks/usePaletteStore";
import { generatePalette } from "../../logic/utils";
import { transformForDarkMode } from "../../logic/transformDarkPalette";

export default function PalettePreview() {
  const [isDark, setIsDark] = useState(false);
  const toggleMode = () => setIsDark((prev) => !prev);

  const colors = usePaletteStore((state) => state.palette);
  const setColors = usePaletteStore((state) => state.setPalette);
  const harmony = usePaletteStore((state) => state.harmony);
  const mode = usePaletteStore((state) => state.mode);

  const handleRegenerate = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const generated = generatePalette(harmony, mode, baseHue);

    const unlockedCount = colors.filter((c) => !c.locked).length;
    const extended = Array.from({ length: unlockedCount }, (_, i) => {
      const base = generated[i % generated.length];
      return { ...base, id: crypto.randomUUID() };
    });

    const updated = colors.map((c) => (c.locked ? c : extended.shift()!));
    setColors(updated);
  };

  const previewColors = isDark ? transformForDarkMode(colors) : colors;

  return (
    <>
      <div className="w-[60%] mx-auto mt-12 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PreviewCard colors={previewColors} isDark={isDark} />
          <PreviewButton colors={previewColors} isDark={isDark} />
          <PreviewSection colors={previewColors} isDark={isDark} />
          <PreviewTypography colors={previewColors} isDark={isDark} />
        </div>
      </div>

      <PreviewFooter
        previewColors={previewColors}
        onGenerate={handleRegenerate}
        isDark={isDark}
        toggleMode={toggleMode}
      />
    </>
  );
}
