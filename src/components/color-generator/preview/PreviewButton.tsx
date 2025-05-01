import type { Swatch } from "../ColorPaletteGenerator.types";

export default function PreviewButton({ colors }: { colors: Swatch[] }) {
  const bg = colors[2]?.hex || "#00ADB5";
  const text = colors[1]?.hex || "#ffffff";

  return (
    <button
      className="px-6 py-3 rounded-full font-medium shadow"
      style={{ backgroundColor: bg, color: text }}
    >
      Bouton principal
    </button>
  );
}
