"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

interface ToolCardProps {
  title: string;
  desc: string;
  link: string;
}

export default function ToolCard({ title, desc, link }: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="group bg-white/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg shadow-black/5 p-6 hover:bg-white/40 transition-all"
    >
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{desc}</p>
      <a
        href={link}
        className="inline-flex items-center gap-2 text-[#00ADB5] font-medium hover:gap-3 transition-all"
      >
        Essayer l'outil
        <FiArrowRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}
