import { forwardRef, HTMLAttributes, useState } from "react";
import { FiUser } from "react-icons/fi";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, src, alt, size = "md", fallback, className = "" }, ref) => {
    const [error, setError] = useState(false);

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    };

    return (
      <div
        ref={ref}
        className={`
          relative inline-flex items-center justify-center
          rounded-full bg-gray-100
          ${sizes[size]}
          ${className}
        `}
      >
        {src && !error ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full rounded-full object-cover"
            onError={() => setError(true)}
          />
        ) : fallback ? (
          <span className="text-sm font-medium text-gray-600">
            {getInitials(fallback)}
          </span>
        ) : (
          <FiUser className="h-1/2 w-1/2 text-gray-400" aria-hidden="true" />
        )}
        {children}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  className?: string;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 3, className = "" }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const total = childrenArray.length;
    const visible = Math.min(total, max);
    const hidden = total - visible;

    return (
      <div
        ref={ref}
        className={`
          flex -space-x-2
          ${className}
        `}
      >
        {childrenArray.slice(0, visible).map((child, index) => (
          <div
            key={index}
            className="ring-2 ring-white"
            style={{ zIndex: visible - index }}
          >
            {child}
          </div>
        ))}
        {hidden > 0 && (
          <div
            className={`
              relative flex items-center justify-center
              rounded-full bg-gray-100 ring-2 ring-white
              ${sizes.md}
            `}
            style={{ zIndex: 0 }}
          >
            <span className="text-sm font-medium text-gray-600">+{hidden}</span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";
