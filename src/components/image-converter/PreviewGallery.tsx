"use client";

import { useEffect, useRef, useState } from "react";

export default function PreviewGallery({
  files,
  options,
  setConvertedFiles,
  addFiles,
  removeFile,
  setLoading,
}: {
  files: File[];
  options: any;
  setConvertedFiles: (files: File[]) => void;
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  setLoading: (isLoading: boolean) => void;
}) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [sizes, setSizes] = useState<{ original: number; converted: number }[]>(
    []
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "converting" | "ready">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const convert = async () => {
      setLoading(true);
      setStatus("converting");

      const converted: File[] = [];
      const previewUrls: string[] = [];
      const sizesTemp: { original: number; converted: number }[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const image = new Image();
        const url = URL.createObjectURL(file);
        image.src = url;

        await new Promise((resolve) => {
          image.onload = () => {
            const canvas = document.createElement("canvas");
            const scale = Math.min(options.maxWidth / image.width, 1);
            canvas.width = image.width * scale;
            canvas.height = image.height * scale;

            const ctx = canvas.getContext("2d");
            ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const originalSize = file.size;
                  const convertedSize = blob.size;
                  sizesTemp.push({
                    original: originalSize,
                    converted: convertedSize,
                  });

                  const fileBaseName = options.prefix?.trim()
                    ? `${options.prefix}${files.length > 1 ? `-${i + 1}` : ""}`
                    : file.name.split(".").slice(0, -1).join(".");

                  const convertedFile = new File(
                    [blob],
                    `${fileBaseName}.${options.format}`,
                    { type: `image/${options.format}` }
                  );
                  converted.push(convertedFile);
                  previewUrls.push(URL.createObjectURL(blob));
                }
                resolve(null);
              },
              `image/${options.format}`,
              options.quality
            );
          };
        });

        URL.revokeObjectURL(url);
      }

      setConvertedFiles(converted);
      setSizes(sizesTemp);
      setPreviews(previewUrls);
      setStatus("ready");
      setLoading(false);
    };

    if (files.length > 0) {
      convert();
    } else {
      setPreviews([]);
      setSizes([]);
      setStatus("idle");
    }
  }, [files, options]);

  if (files.length === 0) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-[#00ADB5] mb-4">Aperçu</h2>
      <p className="text-lg text-gray-500 text-center mb-4">
        💡 Clique sur une image pour l’agrandir et voir sa qualité finale.
      </p>

      {status === "converting" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
          {files.map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="w-full h-[180px] bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {status === "ready" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
          {previews.map((url, i) => {
            const originalKB = (sizes[i]?.original || 0) / 1024;
            const convertedKB = (sizes[i]?.converted || 0) / 1024;
            const ratio = sizes[i]
              ? ((1 - sizes[i].converted / sizes[i].original) * 100).toFixed(1)
              : "0";

            return (
              <div
                key={`preview-${i}`}
                className="relative flex flex-col items-center text-center transition-transform duration-200 hover:scale-105"
              >
                <button
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-600 z-10"
                  title="Supprimer"
                >
                  ✕
                </button>

                <img
                  src={url}
                  alt={`converted-${i}`}
                  onClick={() => setSelectedImage(url)}
                  className="w-full h-auto rounded shadow cursor-pointer"
                />

                <div className="mt-2 text-sm text-gray-600">
                  <div>
                    <strong>Avant :</strong> {originalKB.toFixed(1)} Ko
                  </div>
                  <div>
                    <strong>Après :</strong> {convertedKB.toFixed(1)} Ko
                  </div>
                  <div className="text-[#00ADB5] font-medium">
                    Compression : {ratio}%
                  </div>
                </div>
              </div>
            );
          })}

          {/* Ajouter des images */}
          <div
            className="group flex items-center justify-center border-2 border-dashed border-[#00ADB5]/50 rounded-xl aspect-square cursor-pointer hover:bg-[#00ADB5]/10 transition relative"
            onClick={() => fileInputRef.current?.click()}
            title="Ajouter des images"
          >
            <span className="text-[#00ADB5] font-bold text-3xl pointer-events-none">
              +
            </span>
            <input
              type="file"
              ref={fileInputRef}
              className="absolute inset-0 opacity-0 pointer-events-none"
              multiple
              accept="image/*"
              onChange={(e) => {
                const newFiles = Array.from(e.target.files || []);
                addFiles(newFiles);
              }}
            />
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Aperçu grand format"
              className="w-full h-auto rounded-xl shadow-lg border border-white"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black/60 rounded-full px-3 py-1 hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
