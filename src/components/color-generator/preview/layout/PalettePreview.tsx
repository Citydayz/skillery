import type { Swatch } from "../../types";

import PreviewCard from "../mockups/PreviewCard";
import PreviewButton from "../mockups/PreviewButton";
import PreviewSection from "../mockups/PreviewSection";
import PreviewTypography from "../mockups/PreviewTypography";
import PreviewFooter from "./PreviewFooter";

export default function PalettePreview({ colors }: { colors: Swatch[] }) {
  return (
    <>
      <div className="w-[60%] mx-auto mt-12 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PreviewCard colors={colors} />
          <PreviewButton colors={colors} />
          <PreviewSection colors={colors} />
          <PreviewTypography colors={colors} />
        </div>
      </div>

      <PreviewFooter colors={colors} />
    </>
  );
}
