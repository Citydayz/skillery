"use client";

import { Toaster } from "react-hot-toast";
import Palette from "../color-generator/components/Palette";

export default function ColorPaletteGenerator() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 text-gray-800 relative">
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { marginBottom: "5px" } }}
      />
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00ADB5]">
        Générateur de palette de couleurs
      </h1>
      <Palette />
    </div>
  );
}
