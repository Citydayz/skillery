import { forwardRef, HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  className?: string;
}

const orientations = {
  horizontal: "w-full h-px",
  vertical: "h-full w-px",
};

const variants = {
  solid: "border-0 bg-gray-200",
  dashed: "border-0 border-dashed border-gray-200",
  dotted: "border-0 border-dotted border-gray-200",
};

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    { children, orientation = "horizontal", variant = "solid", className = "" },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          ${orientations[orientation]}
          ${variants[variant]}
          ${className}
        `}
        role="separator"
        aria-orientation={orientation}
      />
    );
  }
);

Divider.displayName = "Divider";
