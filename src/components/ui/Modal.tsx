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

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full",
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      isOpen,
      onClose,
      title,
      description,
      size = "md",
      className = "",
    },
    ref
  ) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
      >
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            aria-hidden="true"
            onClick={onClose}
          />
          <div
            ref={ref}
            className={`
              relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all
              ${sizes[size]}
              ${className}
            `}
          >
            <div className="absolute right-4 top-4">
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={onClose}
              >
                <span className="sr-only">Fermer</span>
                <FiX className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {title && (
              <h3
                id="modal-title"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </h3>
            )}
            {description && (
              <p id="modal-description" className="mt-2 text-sm text-gray-500">
                {description}
              </p>
            )}
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  )
);

ModalContent.displayName = "ModalContent";

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
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

ModalFooter.displayName = "ModalFooter";
