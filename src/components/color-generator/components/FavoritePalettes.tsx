import { usePaletteStorage, FavoritePalette } from "../hooks/usePaletteStorage";

export default function FavoritePalettes({
  onLoad,
}: {
  onLoad: (colors: FavoritePalette["colors"]) => void;
}) {
  const { favorites, deleteFavorite } = usePaletteStorage(
    "analogues",
    "normal"
  );

  return (
    <div className="grid gap-4">
      {favorites.map((fav) => (
        <div key={fav.id} className="p-3 border rounded-lg shadow">
          <h3 className="text-sm font-medium">{fav.name}</h3>
          <div className="flex gap-1 mt-1">
            {fav.colors.map((c, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="text-xs text-blue-600 underline"
              onClick={() => onLoad(fav.colors)}
            >
              Charger
            </button>
            <button
              className="text-xs text-red-600 underline"
              onClick={() => deleteFavorite(fav.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
