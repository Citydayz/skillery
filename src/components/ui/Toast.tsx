import { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const variants = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: FiInfo,
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: FiCheckCircle,
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: FiAlertTriangle,
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: FiAlertCircle,
  },
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      children,
      variant = "info",
      title,
      description,
      duration = 5000,
      onClose,
      className = "",
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const { bg, border, text, icon: Icon } = variants[variant];

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={`
          relative rounded-lg border p-4
          ${bg} ${border} ${text}
          animate-in fade-in-0 slide-in-from-top-5
          ${className}
        `}
        role="alert"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1">
            {title && <h3 className="text-sm font-medium">{title}</h3>}
            {description && (
              <div className={`text-sm ${title ? "mt-2" : ""}`}>
                {description}
              </div>
            )}
            {children}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              type="button"
              className={`
                inline-flex rounded-md p-1.5
                hover:bg-opacity-20 hover:bg-black
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${variant}-50 focus:ring-${variant}-600
                transition-colors duration-200
              `}
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              aria-label="Fermer"
            >
              <FiX className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Toast.displayName = "Toast";

interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`
        fixed bottom-4 right-4 z-50 flex flex-col gap-2
        ${className}
      `}
      role="region"
      aria-label="Notifications"
      {...props}
    >
      {children}
    </div>
  )
);

ToastContainer.displayName = "ToastContainer";
