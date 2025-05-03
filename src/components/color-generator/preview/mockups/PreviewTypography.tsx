import type { Swatch } from "../../types";

export default function PreviewTextSample({
  colors,
  isDark,
}: {
  colors: Swatch[];
  isDark: boolean;
}) {
  const bg = colors[4]?.hex || "#333333";
  const text = colors[1]?.hex || "#ffffff";

  return (
    <div
      className={`rounded-md p-4 text-sm font-medium transition ${
        isDark ? "ring-2 ring-white/10" : ""
      }`}
      style={{ backgroundColor: bg, color: text }}
    >
      Texte d'exemple affiché sur un fond coloré pour tester le contraste.
    </div>
  );
}
