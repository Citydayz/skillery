"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  description?: string;
  tag?: string;
  tagColor?: string;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

export function PageHero({
  title,
  description,
  tag,
  tagColor = "bg-red-100 text-red-600",
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative w-full min-h-[calc(100vh-4rem)] bg-white flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/5 to-[#00cfd9]/5" />

      {/* Animated Shapes - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00ADB5]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-slow" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#00cfd9]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-slow animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#00ADB5]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-slow animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 w-full py-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {tag && (
            <motion.span
              variants={itemVariants}
              className={`inline-block px-3 py-1 rounded-full text-sm ${tagColor}`}
            >
              {tag}
            </motion.span>
          )}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
