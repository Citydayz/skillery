import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    quote:
      "L'outil de compression d'images est génial ! J'ai réduit la taille de mon site de 60% tout en gardant une qualité optimale. Un vrai gain de temps et de performance.",
    author: "Thomas L.",
    role: "Développeur Web",
    avatar: "/avatars/thomas.jpg",
  },
  {
    quote:
      "Le générateur de palettes m'aide à créer des designs cohérents en quelques secondes. Un outil indispensable pour mon workflow de designer.",
    author: "Julie M.",
    role: "Designer UI/UX",
    avatar: "/avatars/julie.jpg",
  },
  {
    quote:
      "La gestion de projet est intuitive et me fait gagner des heures chaque semaine. L'interface est claire et tout est parfaitement organisé.",
    author: "Marc D.",
    role: "Product Manager",
    avatar: "/avatars/marc.jpg",
  },
  {
    quote:
      "Le time tracking m'a permis d'optimiser mes tarifs et ma productivité. Je peux maintenant facturer mes clients avec précision.",
    author: "Sophie R.",
    role: "Consultant Indépendant",
    avatar: "/avatars/sophie.jpg",
  },
  {
    quote:
      "La facturation automatique est un vrai gain de temps pour mon activité. Plus besoin de passer des heures sur mes factures.",
    author: "Lucas P.",
    role: "Freelance Marketing",
    avatar: "/avatars/lucas.jpg",
  },
  {
    quote:
      "Tout est centralisé, plus besoin de jongler entre 10 applications différentes. Skillery a vraiment simplifié mon quotidien.",
    author: "Emma T.",
    role: "Directrice Artistique",
    avatar: "/avatars/emma.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-6 py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <span className="inline-block bg-[#00ADB5]/10 text-[#00ADB5] px-3 py-1 rounded-full text-sm mb-4">
              Top avis utilisateurs
            </span>
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <FiStar className="w-6 h-6 text-yellow-400" />
                </motion.div>
              ))}
            </div>
            <p className="text-gray-600 mb-4">4,9/5 sur +150 utilisateurs</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Ils adorent Skillery
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <ScrollAnimation key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <FiStar key={j} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
