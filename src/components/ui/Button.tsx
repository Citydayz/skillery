// src/components/ui/Button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
};

export const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses = "px-4 py-2 rounded cursor-pointer";
  const variantClasses =
    variant === "outline"
      ? "border border-gray-300 bg-transparent text-gray-700"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
