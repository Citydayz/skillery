import { forwardRef, HTMLAttributes, useCallback, useState } from "react";

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, defaultValue, onValueChange, className = "" }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleTabChange = useCallback(
      (value: string) => {
        setActiveTab(value);
        onValueChange?.(value);
      },
      [onValueChange]
    );

    return (
      <div ref={ref} className={`w-full ${className}`} role="tablist">
        {children}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className = "" }, ref) => (
    <div
      ref={ref}
      className={`
        inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1
        ${className}
      `}
      role="tablist"
    >
      {children}
    </div>
  )
);

TabsList.displayName = "TabsList";

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  className?: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, value, className = "" }, ref) => {
    const isActive =
      value === (ref as any).current?.parentElement?.parentElement?.activeTab;

    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium
          transition-all duration-200
          ${
            isActive
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
          }
          ${className}
        `}
        role="tab"
        aria-selected={isActive}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  className?: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, value, className = "" }, ref) => {
    const isActive = value === (ref as any).current?.parentElement?.activeTab;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        className={`
          mt-2
          animate-in fade-in-0 zoom-in-95
          ${className}
        `}
        role="tabpanel"
        aria-labelledby={`tab-${value}`}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";
