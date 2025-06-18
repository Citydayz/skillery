import { forwardRef, HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variants = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded-none",
};

const sizes = {
  sm: "h-4",
  md: "h-6",
  lg: "h-8",
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "text", size = "md", className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          animate-pulse bg-gray-200
          ${variants[variant]}
          ${sizes[size]}
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

Skeleton.displayName = "Skeleton";

interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  className?: string;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-2 ${className}`} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            size="md"
            className={index === lines - 1 ? "w-3/4" : "w-full"}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = "SkeletonText";
