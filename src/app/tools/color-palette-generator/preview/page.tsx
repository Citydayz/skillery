"use client";

import { useEffect, useState } from "react";
import type { Swatch } from "@/components/color-generator/ColorPaletteGenerator.types";
import PalettePreview from "@/components/color-generator/preview/PalettePreview";
import { useRouter } from "next/navigation";

export default function ColorPreviewPage() {
  const [colors, setColors] = useState<Swatch[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("preview_palette");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setColors(parsed);
      } catch (err) {
        console.error("Palette JSON invalide :", err);
      }
    } else {
      // Si pas de palette => redirection vers le générateur
      router.push("/tools/color-palette-generator");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🎨 Aperçu de votre palette
      </h1>
      <PalettePreview colors={colors} />
      <div className="mt-10 text-center">
        <button
          onClick={() => router.push("/tools/color-palette-generator")}
          className="px-6 py-3 bg-[#00ADB5] text-white rounded-lg hover:bg-[#00cfd9] transition"
        >
          🔙 Retour au générateur
        </button>
      </div>
    </div>
  );
}
