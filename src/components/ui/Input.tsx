// src/components/ui/Input.tsx
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input = ({ className = "", ...props }: InputProps) => {
  const baseClasses =
    "border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";

  return <input className={`${baseClasses} ${className}`} {...props} />;
};
