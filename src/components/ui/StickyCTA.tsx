"use client";

import { forwardRef, HTMLAttributes, useEffect, useState } from "react";

interface StickyCTAProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const StickyCTA = forwardRef<HTMLDivElement, StickyCTAProps>(
  ({ children, className = "" }, ref) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
      <div
        ref={ref}
        className={`
          fixed bottom-0 left-0 right-0 z-50
          transform transition-transform duration-300
          ${isVisible ? "translate-y-0" : "translate-y-full"}
          ${className}
        `}
      >
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

StickyCTA.displayName = "StickyCTA";
