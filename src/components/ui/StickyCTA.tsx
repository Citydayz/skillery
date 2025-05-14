"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 400], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <p className="font-semibold">Prêt à commencer ?</p>
          <p className="text-sm text-gray-600">Essayez Skillery gratuitement</p>
        </div>
        <a
          href="/tools/image-converter"
          className="bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-4 py-2 rounded-lg font-semibold text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]"
        >
          Commencer
        </a>
      </div>
    </motion.div>
  );
}
