"use client";

import React from "react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiX,
  FiZap,
  FiPackage,
  FiHome,
  FiHelpCircle,
} from "react-icons/fi";

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "pour toujours",
    description: "Parfait pour tester et démarrer",
    icon: <FiPackage className="w-8 h-8" />,
    features: [
      { text: "Compression d'images (10/jour)", included: true },
      { text: "Générateur de palettes basique", included: true },
      { text: "Gestion de projet simple", included: true },
      { text: "Support communautaire", included: true },
      { text: "Compression illimitée", included: false },
      { text: "Palettes illimitées", included: false },
      { text: "Time tracking avancé", included: false },
      { text: "Facturation automatique", included: false },
      { text: "Support prioritaire", included: false },
      { text: "Intégrations premium", included: false },
    ],
    cta: "Commencer gratuitement",
    popular: false,
  },
  {
    name: "Pro",
    price: "9€",
    period: "par mois",
    description: "Pour les professionnels exigeants",
    icon: <FiZap className="w-8 h-8" />,
    features: [
      { text: "Compression d'images (10/jour)", included: true },
      { text: "Générateur de palettes basique", included: true },
      { text: "Gestion de projet simple", included: true },
      { text: "Support communautaire", included: true },
      { text: "Compression illimitée", included: true },
      { text: "Palettes illimitées", included: true },
      { text: "Time tracking avancé", included: true },
      { text: "Facturation automatique", included: true },
      { text: "Support prioritaire", included: true },
      { text: "Intégrations premium", included: true },
    ],
    cta: "Essai gratuit 14 jours",
    popular: true,
  },
  {
    name: "Entreprise",
    price: "Sur devis",
    period: "personnalisé",
    description: "Solutions sur mesure",
    icon: <FiHome className="w-8 h-8" />,
    features: [
      { text: "Tout le plan Pro", included: true },
      { text: "Multi-utilisateurs", included: true },
      { text: "Support dédié 24/7", included: true },
      { text: "API personnalisée", included: true },
      { text: "Formation sur mesure", included: true },
      { text: "SLA garanti", included: true },
      { text: "Intégrations personnalisées", included: true },
      { text: "Déploiement sur site", included: true },
      { text: "Gestion des accès avancée", included: true },
      { text: "Rapports personnalisés", included: true },
    ],
    cta: "Contactez-nous",
    popular: false,
  },
];

const faqs = [
  {
    question: "Puis-je changer de formule à tout moment ?",
    answer:
      "Oui, vous pouvez passer à une formule supérieure à tout moment. Si vous souhaitez revenir à une formule inférieure, cela prendra effet à la fin de votre période de facturation actuelle.",
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer:
      "Non, nos prix sont transparents. Le prix affiché est celui que vous paierez, sans frais supplémentaires. La TVA est incluse dans nos tarifs.",
  },
  {
    question: "Comment fonctionne l'essai gratuit ?",
    answer:
      "L'essai gratuit de 14 jours vous donne accès à toutes les fonctionnalités du plan Pro. Aucune carte bancaire n'est requise pour commencer. Vous pouvez annuler à tout moment.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et les virements bancaires pour les formules Entreprise.",
  },
  {
    question: "Puis-je obtenir un remboursement ?",
    answer:
      "Oui, nous offrons une garantie de remboursement de 30 jours si vous n'êtes pas satisfait de nos services.",
  },
];

const detailedFeatures = [
  {
    category: "Compression d'images",
    features: [
      {
        name: "Nombre de compressions par jour",
        free: "10",
        pro: "Illimité",
        enterprise: "Illimité",
      },
      {
        name: "Taille maximale par image",
        free: "5 MB",
        pro: "20 MB",
        enterprise: "50 MB",
      },
      {
        name: "Formats supportés",
        free: "JPG, PNG",
        pro: "JPG, PNG, WebP, AVIF",
        enterprise: "Tous formats",
      },
      {
        name: "Compression par lot",
        free: "Non",
        pro: "Jusqu'à 50 images",
        enterprise: "Illimité",
      },
    ],
  },
  {
    category: "Générateur de palettes",
    features: [
      {
        name: "Nombre de palettes",
        free: "5",
        pro: "Illimité",
        enterprise: "Illimité",
      },
      {
        name: "Couleurs par palette",
        free: "5",
        pro: "10",
        enterprise: "20",
      },
      {
        name: "Export des palettes",
        free: "HEX",
        pro: "HEX, RGB, HSL",
        enterprise: "Tous formats",
      },
      {
        name: "Suggestions IA",
        free: "Non",
        pro: "Oui",
        enterprise: "Avancées",
      },
    ],
  },
  {
    category: "Gestion de projet",
    features: [
      {
        name: "Nombre de projets",
        free: "3",
        pro: "Illimité",
        enterprise: "Illimité",
      },
      {
        name: "Collaborateurs par projet",
        free: "1",
        pro: "5",
        enterprise: "Illimité",
      },
      {
        name: "Stockage des fichiers",
        free: "1 GB",
        pro: "10 GB",
        enterprise: "100 GB",
      },
      {
        name: "Historique des versions",
        free: "7 jours",
        pro: "30 jours",
        enterprise: "Illimité",
      },
    ],
  },
  {
    category: "Time tracking",
    features: [
      {
        name: "Suivi du temps",
        free: "Basique",
        pro: "Avancé",
        enterprise: "Personnalisé",
      },
      {
        name: "Rapports",
        free: "Non",
        pro: "Mensuels",
        enterprise: "Personnalisés",
      },
      {
        name: "Intégration calendrier",
        free: "Non",
        pro: "Oui",
        enterprise: "Oui",
      },
      {
        name: "Export des données",
        free: "Non",
        pro: "CSV, PDF",
        enterprise: "Tous formats",
      },
    ],
  },
  {
    category: "Support",
    features: [
      {
        name: "Type de support",
        free: "Communautaire",
        pro: "Email prioritaire",
        enterprise: "Dédié 24/7",
      },
      {
        name: "Temps de réponse",
        free: "48h",
        pro: "24h",
        enterprise: "4h",
      },
      {
        name: "Formation",
        free: "Non",
        pro: "Documentation",
        enterprise: "Personnalisée",
      },
      {
        name: "SLA",
        free: "Non",
        pro: "Non",
        enterprise: "99.9%",
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="bg-white text-black w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-6 py-24 bg-gradient-to-br from-[#00ADB5]/5 to-[#00cfd9]/5">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Des tarifs simples et transparents
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Choisissez la formule qui correspond à vos besoins. Toutes nos
              formules incluent des mises à jour régulières et un support
              réactif.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Plans Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
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
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#00ADB5]">
                      {plan.price}
                    </span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-8">{plan.description}</p>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        {feature.included ? (
                          <FiCheck className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <FiX className="w-5 h-5 text-gray-300 mt-0.5" />
                        )}
                        <span
                          className={`${
                            feature.included ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.name === "Entreprise" ? "/contact" : "/register"}
                    className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition ${
                      plan.popular
                        ? "bg-[#00ADB5] hover:bg-[#00cfd9] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Comparaison détaillée des fonctionnalités
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Consultez notre tableau comparatif complet pour voir toutes les
                fonctionnalités disponibles dans chaque formule.
              </p>
            </div>
          </ScrollAnimation>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-left font-semibold text-gray-600">
                    Fonctionnalités
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-600">
                    Gratuit
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-[#00ADB5]">
                    Pro
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-600">
                    Entreprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {detailedFeatures.map((category, i) => (
                  <React.Fragment key={i}>
                    <tr className="bg-gray-50">
                      <td
                        colSpan={4}
                        className="py-3 px-6 font-semibold text-gray-800"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, j) => (
                      <tr
                        key={j}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6 text-gray-600">
                          {feature.name}
                        </td>
                        <td className="py-4 px-6 text-center text-gray-600">
                          {feature.free}
                        </td>
                        <td className="py-4 px-6 text-center text-[#00ADB5] font-medium">
                          {feature.pro}
                        </td>
                        <td className="py-4 px-6 text-center text-gray-600">
                          {feature.enterprise}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Besoin d'une fonctionnalité spécifique ? Contactez-nous pour en
              discuter.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-gray-600">
                Tout ce que vous devez savoir sur nos tarifs et notre service
              </p>
            </div>
          </ScrollAnimation>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-[#00ADB5] mt-1">
                      <FiHelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-br from-[#00ADB5]/5 to-[#00cfd9]/5">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold mb-6">
              Prêt à transformer votre façon de travailler ?
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Rejoignez plus de 150 professionnels qui font confiance à Skillery
              pour leur productivité quotidienne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
              >
                Commencer gratuitement
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition"
              >
                Parler à un expert
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
