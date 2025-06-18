import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { motion } from "framer-motion";
import { FiPackage, FiZap, FiHome, FiCheck, FiStar } from "react-icons/fi";

const plans = [
  {
    icon: <FiPackage className="w-8 h-8" />,
    title: "Gratuit",
    price: "0€",
    period: "pour toujours",
    description: "Parfait pour tester et démarrer",
    features: [
      "Compression d'images (10/jour)",
      "Générateur de palettes basique",
      "Gestion de projet simple",
      "Support communautaire",
    ],
    cta: "Commencer gratuitement",
    popular: false,
  },
  {
    icon: <FiZap className="w-8 h-8" />,
    title: "Pro",
    price: "9€",
    period: "par mois",
    description: "Pour les professionnels exigeants",
    features: [
      "Compression illimitée",
      "Palettes illimitées",
      "Time tracking avancé",
      "Facturation automatique",
      "Support prioritaire",
      "Intégrations premium",
    ],
    cta: "Essai gratuit 14 jours",
    popular: true,
  },
  {
    icon: <FiHome className="w-8 h-8" />,
    title: "Entreprise",
    price: "Sur devis",
    period: "personnalisé",
    description: "Solutions sur mesure",
    features: [
      "Tout le plan Pro",
      "Multi-utilisateurs",
      "Support dédié 24/7",
      "API personnalisée",
      "Formation sur mesure",
      "SLA garanti",
    ],
    cta: "Contactez-nous",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="px-6 py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Tarifs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Des plans simples pour tous les besoins
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choisissez le plan qui correspond le mieux à vos besoins. Tous les
              plans incluent un essai gratuit de 14 jours.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <ScrollAnimation key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all ${
                  plan.popular
                    ? "border-2 border-[#00ADB5] scale-[1.03] z-10"
                    : "border border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#00ADB5] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Le plus populaire
                    </span>
                  </div>
                )}

                <div className="text-[#00ADB5] mb-4">{plan.icon}</div>
                <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[#00ADB5]">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition ${
                    plan.popular
                      ? "bg-[#00ADB5] text-white hover:bg-[#00cfd9]"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Besoin d'une solution personnalisée ?{" "}
            <a
              href="/contact"
              className="text-[#00ADB5] hover:text-[#00cfd9] font-medium"
            >
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
