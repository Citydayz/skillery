"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone({ onDrop }: { onDrop: (files: File[]) => void }) {
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 p-12 text-center rounded-xl bg-gray-50 hover:border-[#00ADB5] transition mb-8"
    >
      <input {...getInputProps()} />
      <p className="text-gray-500">
        {isDragActive ? "Dépose ici tes images..." : "Glisse ici tes images ou clique pour sélectionner"}
      </p>
    </div>
  );
}
