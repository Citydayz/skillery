import { forwardRef, HTMLAttributes } from "react";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "success" | "warning" | "error";
  className?: string;
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const variants = {
  default: "text-gray-400",
  primary: "text-[#00ADB5]",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", variant = "default", className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent
          ${sizes[size]}
          ${variants[variant]}
          ${className}
        `}
        role="status"
        aria-label="Chargement en cours"
        {...props}
      >
        <span className="sr-only">Chargement en cours</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
