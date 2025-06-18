"use client";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiZap, FiLayers, FiClock, FiTrendingUp } from "react-icons/fi";

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

export default function Hero() {
  const handleToolsClick = () => {
    toast.success("Découvrez nos outils disponibles !", {
      duration: 4000,
      position: "bottom-center",
    });
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] bg-white flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/5 to-[#00cfd9]/5" />

      {/* Animated Shapes - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00ADB5]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-slow" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#00cfd9]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-slow animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#00ADB5]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-slow animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 w-full py-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="max-w-xl" variants={itemVariants}>
            <motion.h1
              className="text-5xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Tout ce qu'il vous faut pour créer, gérer, livrer. En mieux.
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg mb-8 max-w-lg leading-relaxed"
              variants={itemVariants}
            >
              Skillery centralise vos outils, optimise votre flux de travail et
              booste votre productivité.
            </motion.p>
            <motion.div className="flex gap-4" variants={itemVariants}>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
                href="/tools/image-converter"
                className="bg-[#00ADB5] hover:bg-[#00cfd9] transition-colors duration-200 text-white px-6 py-3 rounded-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]"
              >
                Essayer gratuitement
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
                href="#tools"
                onClick={handleToolsClick}
                className="border border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5] hover:text-white transition-colors duration-200 px-6 py-3 rounded-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]"
              >
                Voir les outils
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div className="hidden lg:block" variants={containerVariants}>
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <FiZap className="w-6 h-6 text-[#00ADB5]" />,
                  title: "Productivité",
                  description:
                    "Optimisez votre flux de travail et gagnez du temps.",
                },
                {
                  icon: <FiLayers className="w-6 h-6 text-[#00ADB5]" />,
                  title: "Intégration",
                  description: "Tous vos outils dans une interface unifiée.",
                },
                {
                  icon: <FiClock className="w-6 h-6 text-[#00ADB5]" />,
                  title: "Efficacité",
                  description: "Automatisez vos tâches répétitives.",
                },
                {
                  icon: <FiTrendingUp className="w-6 h-6 text-[#00ADB5]" />,
                  title: "Croissance",
                  description: "Évoluez avec des outils adaptés à vos besoins.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl"
                >
                  <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
