"use client";

import Hero from "@/components/homepage/Hero";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import AnimatedAccordion from "@/components/ui/AnimatedAccordion";
import StickyCTA from "@/components/ui/StickyCTA";
import ToolCard from "@/components/ui/ToolCard";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiImage,
  FiLayers,
  FiPackage,
  FiZap,
  FiHome,
  FiStar,
} from "react-icons/fi";

export default function HomePage() {
  const handleToolsClick = () => {
    toast.success("Découvrez nos outils disponibles !", {
      duration: 4000,
      position: "bottom-center",
    });
  };

  return (
    <div className="bg-white text-black w-full overflow-x-hidden">
      {/* HERO */}
      <Hero />

      {/* PROBLÈME */}
      <ScrollAnimation>
        <section className="px-6 py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trop d'outils, trop de clics, trop de pertes de temps.
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trello pour les tâches, Notion pour la doc, Drive pour les
              fichiers, Slack pour la com'... La vie d'un freelance est un vrai
              parcours du combattant entre les onglets et les notifications. Et
              si on simplifiait tout ça ?
            </p>
          </div>
        </section>
      </ScrollAnimation>

      {/* SOLUTION */}
      <ScrollAnimation>
        <section className="px-6 py-24 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Une interface unique pour tout gérer
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Skillery centralise vos projets, votre temps, vos factures, vos
              fichiers et plus encore. Un seul endroit pour tout gérer, sans
              perdre de temps à naviguer entre les applications.
            </p>
          </div>
        </section>
      </ScrollAnimation>

      {/* FONCTIONNALITÉS */}
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
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiBriefcase className="w-8 h-8" />,
                title: "Gestion de projet",
                desc: "Suivez vos projets, tâches et deadlines en un coup d'œil.",
              },
              {
                icon: <FiClock className="w-8 h-8" />,
                title: "Time tracking",
                desc: "Mesurez votre temps de travail et optimisez votre productivité.",
              },
              {
                icon: <FiDollarSign className="w-8 h-8" />,
                title: "Facturation",
                desc: "Générez et envoyez vos factures en quelques clics.",
              },
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: "Collaboration",
                desc: "Travaillez en équipe sans friction, même à distance.",
              },
              {
                icon: <FiImage className="w-8 h-8" />,
                title: "Compression d'image",
                desc: "Optimisez vos images sans perdre en qualité.",
              },
              {
                icon: <FiLayers className="w-8 h-8" />,
                title: "Générateur de palettes",
                desc: "Créez des palettes de couleurs harmonieuses.",
              },
            ].map((feat, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg shadow-black/5 p-6 hover:bg-white/40 transition-all"
                >
                  <div className="text-[#00ADB5] mb-4">{feat.icon}</div>
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

      {/* OUTILS DISPONIBLES */}
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
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollAnimation>
              <ToolCard
                title="Compresseur d'image"
                desc="Optimise, redimensionne et convertit tes images en WebP pour le web."
                link="/tools/image-converter"
              />
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <ToolCard
                title="Générateur de palettes"
                desc="Crée des gammes de couleurs cohérentes à partir d'un ton ou hex."
                link="/tools/color-palette-generator"
              />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
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
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]">
            {[...Array(6)].map((_, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <div className="mb-6 break-inside-avoid bg-white/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg shadow-black/5 p-6 hover:bg-white/40 transition-all">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {i === 0 &&
                      `"L'outil de compression d'images est génial ! J'ai réduit la taille de mon site de 60%."`}
                    {i === 1 &&
                      `"Le générateur de palettes m'aide à créer des designs cohérents en quelques secondes."`}
                    {i === 2 &&
                      `"La gestion de projet est intuitive et me fait gagner des heures chaque semaine."`}
                    {i === 3 &&
                      `"Le time tracking m'a permis d'optimiser mes tarifs et ma productivité."`}
                    {i === 4 &&
                      `"La facturation automatique est un vrai gain de temps pour mon activité."`}
                    {i === 5 &&
                      `"Tout est centralisé, plus besoin de jongler entre 10 applications différentes."`}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-semibold">
                        {i === 0 && "Thomas L."}
                        {i === 1 && "Julie M."}
                        {i === 2 && "Marc D."}
                        {i === 3 && "Sophie R."}
                        {i === 4 && "Lucas P."}
                        {i === 5 && "Emma T."}
                      </p>
                      <p className="text-sm text-gray-500">
                        {i === 0 && "Développeur Web"}
                        {i === 1 && "Designer UI/UX"}
                        {i === 2 && "Product Manager"}
                        {i === 3 && "Consultant Indépendant"}
                        {i === 4 && "Freelance Marketing"}
                        {i === 5 && "Directrice Artistique"}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <span className="text-sm text-gray-400 uppercase tracking-wider">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Questions fréquentes
              </h2>
            </div>
          </ScrollAnimation>
          <div className="space-y-4">
            {[
              {
                q: "L'outil de compression est-il gratuit ?",
                a: "Oui ! Vous pouvez compresser jusqu'à 10 images par jour gratuitement. Le plan Pro offre une compression illimitée.",
              },
              {
                q: "Puis-je sauvegarder mes palettes ?",
                a: "Absolument ! Toutes vos palettes sont sauvegardées automatiquement et accessibles depuis n'importe quel appareil.",
              },
              {
                q: "Skillery remplace-t-il mes outils actuels ?",
                a: "Non, Skillery s'intègre avec vos outils existants pour les centraliser et les rendre plus efficaces.",
              },
              {
                q: "Comment mes données sont-elles sécurisées ?",
                a: "Toutes vos données sont chiffrées et hébergées en Europe selon les normes RGPD. Nous ne partageons jamais vos informations.",
              },
            ].map((item, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <AnimatedAccordion title={item.q}>{item.a}</AnimatedAccordion>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollAnimation>
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Tarifs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Des plans simples pour tous les besoins
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
            {[
              {
                icon: <FiPackage className="w-8 h-8" />,
                title: "Gratuit",
                price: "0€",
                features: [
                  "Compression d'images (10/jour)",
                  "Générateur de palettes basique",
                  "Gestion de projet simple",
                ],
              },
              {
                icon: <FiZap className="w-8 h-8" />,
                title: "Pro",
                price: "9€/mois",
                features: [
                  "Compression illimitée",
                  "Palettes illimitées",
                  "Time tracking avancé",
                  "Facturation automatique",
                ],
              },
              {
                icon: <FiHome className="w-8 h-8" />,
                title: "Entreprise",
                price: "Sur devis",
                features: [
                  "Tout le plan Pro",
                  "Multi-utilisateurs",
                  "Support dédié",
                  "API personnalisée",
                ],
              },
            ].map((plan, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative rounded-2xl p-8 bg-white/30 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/5 hover:bg-white/40 transition-all ${
                    plan.title === "Pro"
                      ? "border-[#00ADB5] scale-[1.03] z-10"
                      : "border-white/10"
                  }`}
                >
                  <div className="text-[#00ADB5] mb-4">{plan.icon}</div>
                  <h3 className="text-lg font-bold mb-1">{plan.title}</h3>
                  <p className="text-3xl font-bold text-[#00ADB5] mb-4">
                    {plan.price}
                  </p>
                  <ul className="text-gray-600 mb-6 space-y-2 text-sm">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <FiStar className="w-4 h-4 text-[#00ADB5]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 px-4 rounded-xl bg-[#00ADB5] text-white font-semibold hover:bg-[#00cfd9] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]">
                    Choisir ce plan
                  </button>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <ScrollAnimation>
        <section className="px-6 py-24 text-center bg-white">
          <h2 className="text-3xl font-bold mb-4">
            Gagne du temps, reste focus sur l'essentiel
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Découvrez comment Skillery peut transformer votre façon de
            travailler.
          </p>
          <a
            href="/tools/image-converter"
            className="bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-8 py-4 rounded-xl font-semibold text-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]"
          >
            Commencer maintenant
          </a>
        </section>
      </ScrollAnimation>

      {/* STICKY CTA */}
      <StickyCTA />
    </div>
  );
}
