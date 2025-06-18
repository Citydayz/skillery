"use client";

import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface ScrollAnimationProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ScrollAnimation = forwardRef<HTMLDivElement, ScrollAnimationProps>(
  ({ children, delay = 0, className = "" }, ref) => {
    const controls = useAnimation();
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);
    const isInView = useInView(elementRef, {
      once: true,
      margin: "-100px 0px",
    });

    useEffect(() => {
      if (isInView && !hasAnimated) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: delay,
            ease: [0.25, 0.1, 0.25, 1],
          },
        });
        setHasAnimated(true);
      }
    }, [isInView, controls, delay, hasAnimated]);

    return (
      <motion.div
        ref={elementRef}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollAnimation.displayName = "ScrollAnimation";
