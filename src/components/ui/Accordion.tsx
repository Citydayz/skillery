import { forwardRef, HTMLAttributes, useCallback, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, defaultOpen = false, className = "" }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    return (
      <div ref={ref} className={`border-b border-gray-200 ${className}`}>
        {children}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultOpen?: boolean;
  className?: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, title, defaultOpen = false, className = "" }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    return (
      <div
        ref={ref}
        className={`
          border-b border-gray-200 last:border-0
          ${className}
        `}
      >
        <button
          className={`
            flex w-full items-center justify-between py-4 text-left
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]
          `}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${ref}`}
        >
          <span className="text-sm font-medium text-gray-900">{title}</span>
          <FiChevronDown
            className={`
              h-5 w-5 text-gray-500
              transition-transform duration-200
              ${isOpen ? "rotate-180" : ""}
            `}
            aria-hidden="true"
          />
        </button>
        <div
          id={`accordion-content-${ref}`}
          className={`
            overflow-hidden transition-all duration-200
            ${isOpen ? "max-h-96" : "max-h-0"}
          `}
        >
          <div className="pb-4 text-sm text-gray-500">{children}</div>
        </div>
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";
