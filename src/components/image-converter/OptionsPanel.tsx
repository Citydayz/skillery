"use client";

export default function OptionsPanel({ options, setOptions }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
      <div>
        <label>Qualité</label>
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.1}
          value={options.quality}
          onChange={(e) =>
            setOptions({ ...options, quality: parseFloat(e.target.value) })
          }
          className="w-full"
        />
        <span>{Math.round(options.quality * 100)}%</span>
      </div>

      <div>
        <label>Largeur max</label>
        <input
          type="number"
          value={options.maxWidth}
          onChange={(e) =>
            setOptions({ ...options, maxWidth: parseInt(e.target.value) })
          }
          className="w-full border p-2 rounded"
          placeholder="ex: 1920"
        />
      </div>

      <div>
        <label>Nom du fichier (optionnel)</label>
        <input
          type="text"
          value={options.prefix}
          onChange={(e) =>
            setOptions({ ...options, prefix: e.target.value })
          }
          className="w-full border p-2 rounded"
          placeholder="ex : mon-image"
        />
      </div>

      <div>
        <label>Format de sortie</label>
        <select
          value={options.format}
          onChange={(e) =>
            setOptions({ ...options, format: e.target.value })
          }
          className="w-full border p-2 rounded"
        >
          <option value="webp">webp</option>
          <option value="jpeg">jpeg</option>
          <option value="png">png</option>
          <option value="avif">avif</option>
          <option value="bmp">bmp</option>
        </select>
      </div>
    </div>
  );
}
