import { forwardRef, HTMLAttributes } from "react";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  color?: "primary" | "secondary" | "muted" | "error";
  align?: "left" | "center" | "right";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
}

const variants = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-bold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold",
  h5: "text-lg font-semibold",
  h6: "text-base font-semibold",
  p: "text-base",
  span: "text-base",
};

const colors = {
  primary: "text-gray-900",
  secondary: "text-gray-700",
  muted: "text-gray-500",
  error: "text-red-600",
};

const aligns = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      variant = "p",
      color = "primary",
      align = "left",
      weight = "normal",
      className = "",
    },
    ref
  ) => {
    const Component = variant;

    return (
      <Component
        ref={ref}
        className={`
          ${variants[variant]}
          ${colors[color]}
          ${aligns[align]}
          ${weights[weight]}
          ${className}
        `}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";
