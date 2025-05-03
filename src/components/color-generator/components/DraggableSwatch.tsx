import chroma from "chroma-js";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { FiLock, FiUnlock, FiCopy, FiX, FiMove } from "react-icons/fi";
import type { Swatch } from "../types";

interface DraggableSwatchProps {
  swatch: Swatch;
  onClick: () => void;
  onRemove: () => void;
  onToggleLock: () => void;
  onCopy: () => void;
  isSelected: boolean;
  onHover: () => void;
  onHoverOut: () => void;
  children: React.ReactNode;
}

export default function DraggableSwatch({
  swatch,
  onClick,
  onRemove,
  onToggleLock,
  onCopy,
  isSelected,
  onHover,
  onHoverOut,
  children,
}: DraggableSwatchProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: swatch.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const rgba = chroma(swatch.hex).alpha(swatch.a);
  const cssColor = rgba.css();
  const hexWithAlpha = rgba.hex("rgba");

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="space-y-2 w-[240px]"
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
    >
      <div
        className="relative rounded-xl shadow h-[320px] flex flex-col justify-between items-center p-4 text-white cursor-pointer"
        style={{ backgroundColor: cssColor }}
        onClick={onClick}
      >
        <div
          data-dnd-handle
          className="absolute top-4 left-1/2 -translate-x-1/2 text-white opacity-60 hover:opacity-100 cursor-grab z-10"
          {...listeners}
          title="Glisser pour déplacer"
        >
          <FiMove size={16} />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-3 left-2 text-white bg-black/30 rounded-full p-1 hover:bg-black/50 z-10"
        >
          <FiX size={14} />
        </button>

        <div className="self-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock();
            }}
            className="text-white opacity-80 hover:opacity-100"
          >
            {swatch.locked ? <FiLock /> : <FiUnlock />}
          </button>
        </div>

        <div className="text-center">
          <div className="text-xs font-mono bg-black/30 px-2 py-1 rounded mt-1">
            {hexWithAlpha}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCopy();
          }}
          className="text-sm font-mono bg-black/30 px-3 py-1 rounded backdrop-blur hover:bg-black/50 transition"
        >
          Copier <FiCopy className="inline ml-2 text-xs" />
        </button>
      </div>

      {isSelected && children}
    </div>
  );
}
