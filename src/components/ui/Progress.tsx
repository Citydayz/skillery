import { forwardRef, HTMLAttributes } from "react";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "warning" | "error";
  className?: string;
}

const sizes = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const variants = {
  primary: "bg-[#00ADB5]",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      showValue = false,
      size = "md",
      variant = "primary",
      className = "",
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className="w-full">
        <div className="flex items-center gap-2">
          <div
            ref={ref}
            className={`
              relative w-full overflow-hidden rounded-full bg-gray-200
              ${sizes[size]}
              ${className}
            `}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          >
            <div
              className={`
                absolute inset-0
                ${variants[variant]}
                transition-all duration-300 ease-in-out
              `}
              style={{ width: `${percentage}%` }}
            />
          </div>
          {showValue && (
            <span className="text-sm font-medium text-gray-700">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";
