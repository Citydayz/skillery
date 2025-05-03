"use client";

import { useEffect, useRef, useState } from "react";
import chroma from "chroma-js";
import { HslaColorPicker } from "react-colorful";
import type { Swatch } from "../types";

function areHslaEqual(a: any, b: any) {
  return (
    Math.round(a.h) === Math.round(b.h) &&
    Math.round(a.s * 100) === Math.round(b.s * 100) &&
    Math.round(a.l * 100) === Math.round(b.l * 100) &&
    Math.round(a.a * 100) === Math.round(b.a * 100)
  );
}

export default function SwatchEditor({
  swatch,
  onChange,
  onClose,
}: {
  swatch: Swatch;
  onChange: (updated: Swatch) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);
  const [hexInput, setHexInput] = useState(swatch.hex);

  const getNormalizedHsla = (hex: string) => {
    const [h, s, l] = chroma(hex).hsl();
    const a = chroma(hex).alpha();
    return {
      h: isNaN(h) ? 0 : h,
      s: isNaN(s) ? 0 : s,
      l: isNaN(l) ? 0 : l,
      a,
    };
  };

  const [hsla, setHsla] = useState(() => getNormalizedHsla(swatch.hex));

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
    const normalized = getNormalizedHsla(swatch.hex);
    const hexChanged = swatch.hex.toLowerCase() !== hexInput.toLowerCase();
    const hslaChanged = !areHslaEqual(normalized, hsla);

    if (!isInternalChange.current && (hexChanged || hslaChanged)) {
      setHexInput(swatch.hex);
      setHsla(normalized);
    }
    isInternalChange.current = false;
  }, [swatch.hex]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setHexInput(hex);
    if (chroma.valid(hex)) {
      const hsla = getNormalizedHsla(hex);
      setHsla(hsla);
      isInternalChange.current = true;
      onChange({
        ...swatch,
        hex: chroma(hex).hex(),
        h: Math.round(hsla.h),
        s: Math.round(hsla.s * 100),
        l: Math.round(hsla.l * 100),
        a: hsla.a,
      });
    }
  };

  const handlePickerChange = (color: {
    h: number;
    s: number;
    l: number;
    a: number;
  }) => {
    const scaled = {
      h: color.h,
      s: color.s / 100,
      l: color.l / 100,
      a: color.a,
    };
    const hex = chroma.hsl(scaled.h, scaled.s, scaled.l).alpha(scaled.a).hex();

    const current = getNormalizedHsla(hexInput);
    const hasChanged = !areHslaEqual(current, scaled);

    if (hasChanged) {
      isInternalChange.current = true;
      setHexInput(hex);
      setHsla(scaled);
      onChange({
        ...swatch,
        hex,
        h: Math.round(color.h),
        s: Math.round(color.s),
        l: Math.round(color.l),
        a: color.a,
      });
    }
  };

  return (
    <div
      ref={ref}
      className="bg-white p-4 rounded-xl text-sm shadow w-full border relative z-20"
    >
      <label className="block mb-1">HEX</label>
      <input
        className="w-full font-mono border rounded px-2 py-1 mb-3"
        maxLength={9}
        value={hexInput}
        onChange={handleHexChange}
        disabled={swatch.locked}
      />

      <div className="mt-4 relative">
        {swatch.locked && (
          <div className="absolute inset-0 bg-white/50 z-10 rounded" />
        )}
        <HslaColorPicker
          color={{
            h: hsla.h,
            s: hsla.s * 100,
            l: hsla.l * 100,
            a: hsla.a,
          }}
          onChange={handlePickerChange}
        />
      </div>
    </div>
  );
}
