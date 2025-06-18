import { forwardRef, HTMLAttributes } from "react";

interface KbdProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, className = "" }, ref) => {
    return (
      <kbd
        ref={ref}
        className={`
          inline-flex items-center justify-center
          px-2 py-1 text-xs font-medium
          rounded border border-gray-200
          bg-gray-50 text-gray-900
          ${className}
        `}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";
