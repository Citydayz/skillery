import type { Swatch } from "../../types";

export default function PreviewCard({
  colors,
  isDark,
}: {
  colors: Swatch[];
  isDark: boolean;
}) {
  const bg = colors[0]?.hex || "#eeeeee";
  const text = colors[1]?.hex || "#222222";

  return (
    <div
      className={`rounded-xl p-6 shadow-md transition ${
        isDark ? "ring-2 ring-white/10" : ""
      }`}
      style={{ backgroundColor: bg, color: text }}
    >
      <h3 className="text-lg font-semibold mb-2">Titre de carte</h3>
      <p className="text-sm">
        Ceci est un exemple de carte générée avec les couleurs de la palette.
      </p>
    </div>
  );
}
