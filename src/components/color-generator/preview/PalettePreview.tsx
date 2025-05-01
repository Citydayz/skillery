import type { Swatch } from "../ColorPaletteGenerator.types";
import PreviewCard from "./PreviewCard";
import PreviewButton from "./PreviewButton";
import PreviewSection from "./PreviewSection";
import PreviewTextSample from "./PreviewTextSample";

export default function PalettePreview({ colors }: { colors: Swatch[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <PreviewCard colors={colors} />
      <PreviewButton colors={colors} />
      <PreviewSection colors={colors} />
      <PreviewTextSample colors={colors} />
    </div>
  );
}
