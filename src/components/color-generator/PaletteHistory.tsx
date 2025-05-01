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
            className="border rounded-xl p-3 bg-white shadow hover:shadow-md transition min-w-[120px]"
          >
            <div className="flex flex-wrap gap-1 justify-start mb-2 max-w-[160px]">
              {palette.map((color, colorIdx) => (
                <div
                  key={`${color.id}-${idx}-${colorIdx}`}
                  className="w-5 h-5 rounded"
                  style={{
                    backgroundColor: chroma(color.hex).alpha(color.a).css(),
                  }}
                  title={`${color.hex.toUpperCase()} (${Math.round(
                    color.a * 100
                  )}%)`}
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
