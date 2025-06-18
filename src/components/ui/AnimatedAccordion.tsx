"use client";

import { forwardRef, HTMLAttributes, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface AnimatedAccordionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const AnimatedAccordion = forwardRef<
  HTMLDivElement,
  AnimatedAccordionProps
>(
  (
    { children, title, isOpen: controlledIsOpen, onToggle, className = "" },
    ref
  ) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
    const isControlled = controlledIsOpen !== undefined;

    const handleToggle = () => {
      if (!isControlled) {
        setUncontrolledIsOpen(!uncontrolledIsOpen);
      }
      onToggle?.();
    };

    return (
      <div
        ref={ref}
        className={`
          border border-gray-200 rounded-lg
          ${className}
        `}
      >
        <button
          type="button"
          className={`
            flex w-full items-center justify-between
            px-4 py-3 text-left
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isOpen ? "border-b border-gray-200" : ""}
          `}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${title}`}
        >
          <span className="text-sm font-medium text-gray-900">{title}</span>
          <FiChevronDown
            className={`
              h-5 w-5 text-gray-500
              transform transition-transform duration-200
              ${isOpen ? "rotate-180" : ""}
            `}
            aria-hidden="true"
          />
        </button>
        <div
          id={`accordion-content-${title}`}
          className={`
            overflow-hidden transition-all duration-200
            ${isOpen ? "max-h-96" : "max-h-0"}
          `}
        >
          <div className="px-4 py-3 text-sm text-gray-700">{children}</div>
        </div>
      </div>
    );
  }
);

AnimatedAccordion.displayName = "AnimatedAccordion";
