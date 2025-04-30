"use client";

import chroma from "chroma-js";
import type { Swatch } from "./ColorPaletteGenerator.types";

export default function PaletteHistory({
  history,
  onRestore,
}: {
  history: Swatch[][];
  onRestore: (index: number) => void;
}) {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-4 text-center">Historique</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {history.map((palette, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-2 bg-white shadow hover:shadow-md transition"
          >
            <div className="flex space-x-1 mb-2">
              {palette.map((color, colorIdx) => (
                <div
                  key={`${color.id}-${idx}-${colorIdx}`} // <- clé unique corrigée
                  className="w-6 h-6 rounded"
                  style={{
                    backgroundColor: chroma(color.hex).alpha(color.a).css(),
                  }}
                  title={color.hex}
                />
              ))}
            </div>
            <button
              onClick={() => onRestore(idx)}
              className="text-xs px-3 py-1 rounded bg-[#00ADB5] text-white hover:bg-[#00cfd9] transition w-full"
            >
              Restaurer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
