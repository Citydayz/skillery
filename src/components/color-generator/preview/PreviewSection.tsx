import type { Swatch } from "../ColorPaletteGenerator.types";

export default function PreviewSection({ colors }: { colors: Swatch[] }) {
  const bg = colors[3]?.hex || "#f5f5f5";
  const text = colors[1]?.hex || "#222222";

  return (
    <section
      className="rounded-lg p-6 border shadow-sm"
      style={{ backgroundColor: bg, color: text }}
    >
      <h2 className="text-xl font-bold mb-2">Section de contenu</h2>
      <p className="text-sm leading-relaxed">
        Exemple de section de page utilisant les couleurs de la palette
        actuelle.
      </p>
    </section>
  );
}
