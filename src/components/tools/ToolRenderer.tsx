"use client";

import dynamic from "next/dynamic";
import type { Swatch } from "../color-generator/ColorPaletteGenerator.types";

export default function ToolRenderer({ component }: { component: string }) {
  const ToolComponent = dynamic(() => import(`./${component}`), {
    ssr: false,
  });

  return <ToolComponent />;
}
