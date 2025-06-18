import { forwardRef, HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  color?: "primary" | "secondary" | "muted" | "error";
  align?: "left" | "center" | "right";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
}

const variants = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
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

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      children,
      variant = "base",
      color = "primary",
      align = "left",
      weight = "normal",
      className = "",
    },
    ref
  ) => {
    return (
      <span
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
      </span>
    );
  }
);

Text.displayName = "Text";
