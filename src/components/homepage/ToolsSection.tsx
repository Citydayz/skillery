import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const tools = [
  {
    title: "Compresseur d'image",
    desc: "Optimisez, redimensionnez et convertissez vos images en WebP pour le web. Réduisez la taille de vos fichiers jusqu'à 80% sans perte de qualité visible.",
    link: "/tools/image-converter",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Générateur de palettes",
    desc: "Créez des gammes de couleurs cohérentes et harmonieuses à partir d'un ton ou d'un code hexadécimal. Parfait pour vos projets de design.",
    link: "/tools/color-palette-generator",
    gradient: "from-pink-500 to-orange-500",
  },
];

export default function ToolsSection() {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Outils disponibles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Essayez nos outils dès maintenant
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Des outils puissants et faciles à utiliser, conçus pour améliorer
              votre productivité.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool, i) => (
            <ScrollAnimation key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
                ></div>
                <div className="relative p-8">
                  <h3 className="text-2xl font-bold mb-4">{tool.title}</h3>
                  <p className="text-gray-600 mb-6">{tool.desc}</p>
                  <a
                    href={tool.link}
                    className="inline-flex items-center gap-2 text-[#00ADB5] font-semibold hover:text-[#00cfd9] transition-colors"
                  >
                    Essayer maintenant
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
