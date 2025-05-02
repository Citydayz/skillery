import type { Swatch } from "../../ColorPaletteGenerator.types";
import Tooltip from "../../../ui/Tooltips"; // adapte ce chemin si nécessaire

export default function PreviewFooter({ colors }: { colors: Swatch[] }) {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between w-full px-12 py-6">
        {/* Palette + boutons verticaux à droite */}
        <div className="flex items-center gap-4">
          {/* Palette */}
          <div className="flex items-center gap-1.5 rounded overflow-hidden border border-zinc-200">
            {colors.map((color, index) => (
              <div
                key={index}
                className="h-18 w-18"
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              />
            ))}
          </div>

          {/* Boutons verticaux à droite */}
          <div className="flex flex-col gap-2">
            <Tooltip content="Ajouter une couleur" delay={0}>
              <button className="h-8 w-8 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition text-xl font-semibold">
                +
              </button>
            </Tooltip>
            <Tooltip content="Supprimer la dernière couleur" delay={0}>
              <button className="h-8 w-8 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition text-xl font-semibold">
                –
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Boutons massifs + texte en gras */}
        <div className="flex items-center gap-3 flex-wrap justify-end text-base font-semibold">
          <Tooltip content="Inverser la palette" delay={0}>
            <button className="h-12 w-12 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition text-xl">
              🔄
            </button>
          </Tooltip>
          <Tooltip content="Générer une palette aléatoire" delay={0}>
            <button className="h-12 w-12 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition text-xl">
              ⟳
            </button>
          </Tooltip>
          <Tooltip content="Générer une nouvelle palette" delay={0}>
            <button className="px-5 h-12 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition">
              🎨 Generate
            </button>
          </Tooltip>
          <Tooltip content="Parcourir les palettes sauvegardées" delay={0}>
            <button className="px-5 h-12 flex items-center justify-center rounded bg-zinc-100 hover:bg-zinc-200 transition">
              📁 Browse
            </button>
          </Tooltip>
          <Tooltip content="Exporter la palette" delay={0}>
            <button className="px-6 h-12 flex items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-700 transition">
              Export
            </button>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
}
