// components/color-generator/components/DraggableColorBox.tsx
"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type { Swatch } from "../types";

interface DraggableColorBoxProps {
  swatch: Swatch;
  index: number;
}

export default function DraggableColorBox({
  swatch,
  index,
}: DraggableColorBoxProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: swatch.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="sm:h-18 sm:w-18 rounded cursor-grab"
      title={swatch.hex}
    >
      <div
        className="w-full h-full rounded"
        style={{ backgroundColor: swatch.hex }}
      />
    </div>
  );
}
