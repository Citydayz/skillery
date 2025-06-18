"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 0.2,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();

    const positions = {
      top: {
        x: trigger.left + (trigger.width - tooltip.width) / 2,
        y: trigger.top - tooltip.height - 8,
      },
      bottom: {
        x: trigger.left + (trigger.width - tooltip.width) / 2,
        y: trigger.bottom + 8,
      },
      left: {
        x: trigger.left - tooltip.width - 8,
        y: trigger.top + (trigger.height - tooltip.height) / 2,
      },
      right: {
        x: trigger.right + 8,
        y: trigger.top + (trigger.height - tooltip.height) / 2,
      },
    };

    setCoords(positions[position]);
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible, position]);

  const variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className={className}
      >
        {children}
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isVisible && (
              <motion.div
                ref={tooltipRef}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, delay }}
                style={{
                  position: "fixed",
                  left: coords.x,
                  top: coords.y,
                  zIndex: 1000,
                }}
                className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg max-w-xs"
                role="tooltip"
              >
                {content}
                <div
                  className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                    position === "top"
                      ? "bottom-[-4px] left-1/2 -translate-x-1/2"
                      : position === "bottom"
                      ? "top-[-4px] left-1/2 -translate-x-1/2"
                      : position === "left"
                      ? "right-[-4px] top-1/2 -translate-y-1/2"
                      : "left-[-4px] top-1/2 -translate-y-1/2"
                  }`}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
