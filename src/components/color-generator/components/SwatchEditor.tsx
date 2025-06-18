"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
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

const DEBOUNCE_DELAY = 100;

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
  const debounceTimer = useRef<NodeJS.Timeout>();

  const getNormalizedHsla = useCallback((hex: string) => {
    const [h, s, l] = chroma(hex).hsl();
    const a = chroma(hex).alpha();
    return {
      h: isNaN(h) ? 0 : h,
      s: isNaN(s) ? 0 : s,
      l: isNaN(l) ? 0 : l,
      a,
    };
  }, []);

  const [hsla, setHsla] = useState(() => getNormalizedHsla(swatch.hex));

  // Gestion du clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Synchronisation avec les props
  useEffect(() => {
    const normalized = getNormalizedHsla(swatch.hex);
    const hexChanged = swatch.hex.toLowerCase() !== hexInput.toLowerCase();
    const hslaChanged = !areHslaEqual(normalized, hsla);

    if (!isInternalChange.current && (hexChanged || hslaChanged)) {
      setHexInput(swatch.hex);
      setHsla(normalized);
    }
    isInternalChange.current = false;
  }, [swatch.hex, getNormalizedHsla, hsla]);

  // Nettoyage du timer de debounce
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleHexChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const hex = e.target.value;
      setHexInput(hex);

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
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
      }, DEBOUNCE_DELAY);
    },
    [swatch, onChange, getNormalizedHsla]
  );

  const handleHslaChange = useCallback(
    (newHsla: any) => {
      setHsla(newHsla);
      const hex = chroma
        .hsl(newHsla.h, newHsla.s, newHsla.l)
        .alpha(newHsla.a)
        .hex();
      setHexInput(hex);
      isInternalChange.current = true;
      onChange({
        ...swatch,
        hex,
        h: Math.round(newHsla.h),
        s: Math.round(newHsla.s * 100),
        l: Math.round(newHsla.l * 100),
        a: newHsla.a,
      });
    },
    [swatch, onChange]
  );

  const handleCopy = useCallback(() => {
    const hexWithAlpha = chroma(swatch.hex).alpha(swatch.a).hex("rgba");
    navigator.clipboard.writeText(hexWithAlpha);
  }, [swatch.hex, swatch.a]);

  const handleRandomize = useCallback(() => {
    const randomHue = Math.random() * 360;
    const newHsla = {
      h: randomHue,
      s: 0.5 + Math.random() * 0.5,
      l: 0.4 + Math.random() * 0.2,
      a: 1,
    };
    handleHslaChange(newHsla);
  }, [handleHslaChange]);

  const colorValues = useMemo(
    () => ({
      hex: swatch.hex,
      rgba: chroma(swatch.hex).alpha(swatch.a).css(),
      hsla: `hsla(${Math.round(swatch.h)}, ${Math.round(
        swatch.s
      )}%, ${Math.round(swatch.l)}%, ${swatch.a})`,
    }),
    [swatch]
  );

  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          aria-label="Fermer"
        >
          ✖
        </button>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-lg shadow-md"
              style={{ backgroundColor: colorValues.rgba }}
            />
            <div className="flex-1">
              <input
                type="text"
                value={hexInput}
                onChange={handleHexChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="space-y-4">
            <HslaColorPicker
              color={hsla}
              onChange={handleHslaChange}
              className="w-full"
            />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RGBA
                </label>
                <input
                  type="text"
                  value={colorValues.rgba}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HSLA
                </label>
                <input
                  type="text"
                  value={colorValues.hsla}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HEX
                </label>
                <input
                  type="text"
                  value={colorValues.hex}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleRandomize}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              🎲 Aléatoire
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-[#00ADB5] hover:bg-[#00cfd9] text-white rounded-lg transition"
            >
              📋 Copier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
