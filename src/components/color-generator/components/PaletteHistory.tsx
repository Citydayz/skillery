"use client";

import chroma from "chroma-js";
import type { Swatch } from "../types";

export default function PaletteHistory({
  history,
  onRestore,
}: {
  history: Swatch[][];
  onRestore: (index: number) => void;
}) {
  return (
    <div className="my-12 px-4">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Historique des palettes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {history.map((palette, idx) => (
          <div
            key={idx}
            className="relative rounded-3xl bg-gray-50 p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] border border-gray-200 transition hover:shadow-md hover:scale-[1.01]"
          >
            <div className="flex justify-center gap-1 mb-4">
              {palette.map((color, colorIdx) => (
                <div
                  key={`${color.id}-${idx}-${colorIdx}`}
                  className="w-6 h-6 rounded-xl shadow-inner"
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
              className="w-full bg-[#00ADB5] hover:bg-[#00cfd9] text-white text-sm py-2 rounded-xl font-medium transition"
            >
              🔁 Restaurer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
