import {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { FiX } from "react-icons/fi";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  className?: string;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      children,
      isOpen,
      onClose,
      title,
      description,
      showCloseButton = true,
      className = "",
    },
    ref
  ) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target === overlayRef.current) {
            onClose();
          }
        }}
      >
        <div
          ref={ref}
          className={`
            relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl
            animate-in fade-in-0 zoom-in-95
            ${className}
          `}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "dialog-title" : undefined}
          aria-describedby={description ? "dialog-description" : undefined}
        >
          {showCloseButton && (
            <button
              type="button"
              className="
                absolute right-4 top-4
                rounded-md p-1
                text-gray-400 hover:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2
                transition-colors duration-200
              "
              onClick={onClose}
              aria-label="Fermer"
            >
              <FiX className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          {title && (
            <h2
              id="dialog-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
          )}
          {description && (
            <p id="dialog-description" className="mt-2 text-sm text-gray-500">
              {description}
            </p>
          )}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    );
  }
);

Dialog.displayName = "Dialog";

interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  )
);

DialogContent.displayName = "DialogContent";

interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`mt-4 flex items-center justify-end space-x-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

DialogFooter.displayName = "DialogFooter";
