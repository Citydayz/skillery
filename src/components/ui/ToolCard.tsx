"use client";

import { forwardRef, HTMLAttributes } from "react";

interface ToolCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
}

export const ToolCard = forwardRef<HTMLDivElement, ToolCardProps>(
  ({ children, title, description, icon, href, className = "" }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={`
          block p-6 bg-white rounded-lg border border-gray-200
          hover:border-blue-500 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          transition-all duration-200
          ${className}
        `}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {children}
      </a>
    );
  }
);

ToolCard.displayName = "ToolCard";
