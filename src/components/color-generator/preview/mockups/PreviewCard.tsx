import type { Swatch } from "../../ColorPaletteGenerator.types";

export default function PreviewCard({ colors }: { colors: Swatch[] }) {
  const bg = colors[0]?.hex || "#eeeeee";
  const text = colors[1]?.hex || "#222222";

  return (
    <div
      className="rounded-xl p-6 shadow-md"
      style={{ backgroundColor: bg, color: text }}
    >
      <h3 className="text-lg font-semibold mb-2">Titre de carte</h3>
      <p className="text-sm">
        Ceci est un exemple de carte générée avec les couleurs de la palette.
      </p>
    </div>
  );
}
