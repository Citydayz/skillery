import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, trigger, align = "left", className = "" }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen]);

    return (
      <div ref={dropdownRef} className={`relative inline-block ${className}`}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {trigger}
        </div>
        {isOpen && (
          <div
            ref={ref}
            className={`
              absolute z-50 mt-2 w-56 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5
              animate-in fade-in-0 zoom-in-95
              ${align === "right" ? "right-0" : "left-0"}
            `}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-trigger"
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  className?: string;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ children, icon, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          flex w-full items-center px-4 py-2 text-sm text-gray-700
          hover:bg-gray-100
          focus:outline-none focus:bg-gray-100
          ${className}
        `}
        role="menuitem"
        {...props}
      >
        {icon && (
          <span className="mr-3 h-5 w-5" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

interface DropdownTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ children, className = "" }, ref) => {
  return (
    <button
      ref={ref}
      className={`
          inline-flex items-center justify-center gap-2 rounded-md
          px-4 py-2 text-sm font-medium text-gray-700
          hover:bg-gray-100
          focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2
          ${className}
        `}
    >
      {children}
      <FiChevronDown className="h-4 w-4" aria-hidden="true" />
    </button>
  );
});

DropdownTrigger.displayName = "DropdownTrigger";
