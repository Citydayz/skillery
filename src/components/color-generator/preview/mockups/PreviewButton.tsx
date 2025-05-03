import type { Swatch } from "../../types";

export default function PreviewButton({
  colors,
  isDark,
}: {
  colors: Swatch[];
  isDark: boolean;
}) {
  const bg = colors[2]?.hex || "#00ADB5";
  const text = colors[1]?.hex || "#ffffff";

  return (
    <button
      className={`px-6 py-3 rounded-full font-medium shadow transition ${
        isDark ? "ring-2 ring-white/10" : ""
      }`}
      style={{ backgroundColor: bg, color: text }}
    >
      Bouton principal
    </button>
  );
}
