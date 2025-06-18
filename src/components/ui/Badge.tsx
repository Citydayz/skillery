import { forwardRef, HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variants = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-blue-100 text-blue-800",
  secondary: "bg-purple-100 text-purple-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-base",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "default", size = "md", className = "" }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center justify-center
          font-medium rounded-full
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
