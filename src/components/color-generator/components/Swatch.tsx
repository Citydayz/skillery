// src/components/tools/Swatch.tsx
"use client";

import { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import type { Swatch } from "../types";

export default function ColorSwatch({
  swatch,
  onChange,
  onLockToggle,
}: {
  swatch: Swatch;
  onChange: (updated: Swatch) => void;
  onLockToggle: () => void;
}) {
  const [showEditor, setShowEditor] = useState(false);

  const update = (partial: Partial<Swatch>) =>
    onChange({ ...swatch, ...partial });

  return (
    <div
      className="relative w-40 h-40 rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all"
      style={{ backgroundColor: swatch.hex }}
      onClick={() => setShowEditor((prev) => !prev)}
    >
      <button
        className="absolute top-2 right-2 text-white bg-black/30 rounded-full p-1 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onLockToggle();
        }}
      >
        {swatch.locked ? <Lock size={16} /> : <Unlock size={16} />}
      </button>

      {showEditor && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-3 text-xs">
          <label>HEX</label>
          <input
            className="w-full px-2 py-1 border rounded font-mono"
            value={swatch.hex}
            onChange={(e) => update({ hex: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
