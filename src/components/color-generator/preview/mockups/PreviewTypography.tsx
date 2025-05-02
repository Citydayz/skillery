import type { Swatch } from "../../ColorPaletteGenerator.types";

export default function PreviewTextSample({ colors }: { colors: Swatch[] }) {
  const bg = colors[4]?.hex || "#333333";
  const text = colors[1]?.hex || "#ffffff";

  return (
    <div
      className="rounded-md p-4 text-sm font-medium"
      style={{ backgroundColor: bg, color: text }}
    >
      Texte d'exemple affiché sur un fond coloré pour tester le contraste.
    </div>
  );
}
