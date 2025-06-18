import { forwardRef, HTMLAttributes, useState } from "react";

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  placement?: "top" | "right" | "bottom" | "left";
  className?: string;
}

const placements = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, placement = "top", className = "" }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div
        ref={ref}
        className={`
          relative inline-block
          ${className}
        `}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
        {isVisible && (
          <div
            className={`
              absolute z-50
              px-2 py-1 text-sm
              text-white bg-gray-900
              rounded shadow-lg
              whitespace-nowrap
              ${placements[placement]}
            `}
            role="tooltip"
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
