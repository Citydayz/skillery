"use client";

import { useEffect, useRef, useState } from "react";
import chroma from "chroma-js";
import type { Swatch } from "./ColorPaletteGenerator.types";

export default function SwatchEditor({
  swatch,
  onChange,
  onClose,
}: {
  swatch: Swatch;
  onChange: (updated: Swatch) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState(swatch);
  const ref = useRef<HTMLDivElement>(null);

  // Fermer si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    setLocal(swatch);
  }, [swatch]);

  const update = (partial: Partial<Swatch>) => {
    const updated = { ...local, ...partial };
    updated.hex = chroma.hsl(updated.h, updated.s / 100, updated.l / 100).hex();
    setLocal(updated);
    onChange(updated);
  };

  const updateHex = (hex: string) => {
    setLocal((prev) => ({ ...prev, hex }));
    if (chroma.valid(hex)) {
      const [h, s, l] = chroma(hex).hsl();
      onChange({
        ...local,
        hex,
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
      });
    }
  };

  return (
    <div
      ref={ref}
      className="bg-white p-4 rounded-xl text-sm shadow w-full border"
    >
      <label className="block mb-1">HEX</label>
      <input
        className="w-full font-mono border rounded px-2 py-1 mb-3"
        maxLength={9}
        value={local.hex}
        onChange={(e) => updateHex(e.target.value)}
        disabled={swatch.locked}
      />

      <div className="space-y-2">
        <div>
          <label className="block">Hue (H)</label>
          <input
            type="range"
            min={0}
            max={360}
            value={local.h}
            onChange={(e) => update({ h: Number(e.target.value) })}
            className="w-full"
            disabled={swatch.locked}
          />
        </div>
        <div>
          <label className="block">Saturation (S)</label>
          <input
            type="range"
            min={0}
            max={100}
            value={local.s}
            onChange={(e) => update({ s: Number(e.target.value) })}
            className="w-full"
            disabled={swatch.locked}
          />
        </div>
        <div>
          <label className="block">Luminosité (L)</label>
          <input
            type="range"
            min={0}
            max={100}
            value={local.l}
            onChange={(e) => update({ l: Number(e.target.value) })}
            className="w-full"
            disabled={swatch.locked}
          />
        </div>
        <div>
          <label className="block">Opacité (A)</label>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(local.a * 100)}
            onChange={(e) => update({ a: Number(e.target.value) / 100 })}
            className="w-full"
            disabled={swatch.locked}
          />
        </div>
      </div>
    </div>
  );
}
