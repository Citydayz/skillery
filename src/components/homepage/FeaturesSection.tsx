import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiImage,
  FiLayers,
} from "react-icons/fi";

const features = [
  {
    icon: <FiBriefcase className="w-8 h-8" />,
    title: "Gestion de projet",
    desc: "Suivez vos projets, tâches et deadlines en un coup d'œil avec notre interface intuitive.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <FiClock className="w-8 h-8" />,
    title: "Time tracking",
    desc: "Mesurez précisément votre temps de travail et optimisez votre productivité.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <FiDollarSign className="w-8 h-8" />,
    title: "Facturation",
    desc: "Générez et envoyez vos factures professionnelles en quelques clics.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <FiUsers className="w-8 h-8" />,
    title: "Collaboration",
    desc: "Travaillez en équipe sans friction grâce à nos outils de collaboration intégrés.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: <FiImage className="w-8 h-8" />,
    title: "Compression d'image",
    desc: "Optimisez vos images pour le web sans compromettre la qualité.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: <FiLayers className="w-8 h-8" />,
    title: "Générateur de palettes",
    desc: "Créez des palettes de couleurs harmonieuses pour vos projets créatifs.",
    color: "from-red-500 to-red-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-6 py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Fonctionnalités
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Une suite complète d'outils conçus pour les professionnels
              modernes. Simple, efficace, et parfaitement intégrée.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <ScrollAnimation key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feat.color} text-white mb-4`}
                >
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
