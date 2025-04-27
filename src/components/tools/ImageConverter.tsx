"use client";

import { useEffect, useRef, useState } from "react";
import Dropzone from "@/components/image-converter/Dropzone";
import PreviewGallery from "@/components/image-converter/PreviewGallery";
import OptionsPanel from "@/components/image-converter/OptionsPanel";
import toast, { Toaster } from "react-hot-toast";
import JSZip from "jszip";

export default function ImageConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<File[]>([]);
  const [options, setOptions] = useState({
    quality: 0.9,
    maxWidth: 1920,
    prefix: "",
    format: "webp",
  });

  const realButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isRealButtonVisible, setIsRealButtonVisible] = useState(false);

  // ✅ Observer le bouton réel visible en bas
  useEffect(() => {
    const el = realButtonRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsRealButtonVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [convertedFiles.length, realButtonRef.current]);

  const handleDownloadAll = async () => {
    if (convertedFiles.length === 1) {
      const file = convertedFiles[0];
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Téléchargement terminé !");
    } else if (convertedFiles.length > 1) {
      const zip = new JSZip();
      convertedFiles.forEach((file) => zip.file(file.name, file));
      const blob = await zip.generateAsync({ type: "blob" });

      const zipUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = "images-converties.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("ZIP téléchargé !");
    }
  };

  const handleReset = () => {
    setFiles([]);
    setConvertedFiles([]);
    setOptions({
      quality: 0.9,
      maxWidth: 1920,
      prefix: "",
      format: "webp",
    });
    toast("Images réinitialisées.");
  };

  const handleAddFiles = (newFiles: File[]) => {
    const uniqueNames = new Set(files.map((f) => f.name));
    const filtered = newFiles.filter((f) => !uniqueNames.has(f.name));
    setFiles([...files, ...filtered]);
    if (filtered.length > 0) {
      toast("✅ Image(s) ajoutée(s) avec succès", {
        style: {
          background: "#D1FAE5",
          color: "#065F46",
        },
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    toast("🗑️ Image supprimée", {
      style: {
        background: "#FEE2E2",
        color: "#991B1B",
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800 px-4 py-10 flex flex-col items-center relative">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            marginBottom: isRealButtonVisible ? "0px" : "80px",
            zIndex: 60,
          },
        }}
      />

      <h1 className="text-4xl md:text-5xl font-bold text-[#00ADB5] mb-6 text-center">
        Convertisseur d'images
      </h1>
      <p className="text-gray-500 mb-10 text-center max-w-xl">
        Glisse tes images ci-dessous pour les convertir, redimensionner ou
        compresser en un clic.
      </p>

      {/* Dropzone visible uniquement si aucun fichier */}
      {files.length === 0 && (
        <div className="w-full max-w-2xl mb-10">
          <h2 className="text-2xl font-semibold text-[#00ADB5] mb-4">
            Importer des images
          </h2>
          <Dropzone onDrop={handleAddFiles} />
        </div>
      )}

      {/* Options */}
      {files.length > 0 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl border border-gray-100 mb-10">
          <h2 className="text-2xl font-semibold text-[#00ADB5] mb-4">
            Options de conversion
          </h2>
          <OptionsPanel options={options} setOptions={setOptions} />
        </div>
      )}

      {/* Aperçu */}
      <div className="w-full max-w-2xl">
        <PreviewGallery
          files={files}
          addFiles={handleAddFiles}
          removeFile={handleRemoveFile}
          options={options}
          setConvertedFiles={setConvertedFiles}
          setLoading={() => {}}
        />
      </div>

      {/* Bouton flottant si le vrai bouton n’est pas visible */}
      {convertedFiles.length > 0 && !isRealButtonVisible && (
        <button
          onClick={handleDownloadAll}
          className="fixed bottom-6 right-6 bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-5 py-3 rounded-full shadow-lg transition z-50"
        >
          📥 Télécharger {convertedFiles.length > 1 ? "le ZIP" : "l’image"}
        </button>
      )}

      {/* Bouton naturel visible en bas */}
      {files.length > 0 && convertedFiles.length > 0 && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <button
            ref={realButtonRef}
            onClick={handleDownloadAll}
            className="bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-8 py-3 rounded-xl font-medium shadow transition duration-200"
          >
            📥 Télécharger {convertedFiles.length > 1 ? "le ZIP" : "l’image"}
          </button>
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:underline"
          >
            Réinitialiser l’outil
          </button>
        </div>
      )}
    </div>
  );
}
