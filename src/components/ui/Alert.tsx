import { forwardRef, HTMLAttributes } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  showIcon?: boolean;
  showCloseButton?: boolean;
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

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = "info",
      title,
      showIcon = true,
      showCloseButton = false,
      onClose,
      className = "",
    },
    ref
  ) => {
    const { bg, border, text, icon: Icon } = variants[variant];

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
          {showIcon && (
            <div className="flex-shrink-0">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
          )}
          <div className="ml-3 flex-1">
            {title && <h3 className="text-sm font-medium">{title}</h3>}
            <div className={`text-sm ${title ? "mt-2" : ""}`}>{children}</div>
          </div>
          {showCloseButton && (
            <div className="ml-4 flex-shrink-0">
              <button
                type="button"
                className={`
                  inline-flex rounded-md p-1.5
                  hover:bg-opacity-20 hover:bg-black
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${variant}-50 focus:ring-${variant}-600
                  transition-colors duration-200
                `}
                onClick={onClose}
                aria-label="Fermer"
              >
                <FiX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
