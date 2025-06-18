"use client";

import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { PageHero } from "@/components/ui/PageHero";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiTarget,
  FiHeart,
  FiAward,
  FiGlobe,
  FiShield,
  FiClock,
  FiTrendingUp,
  FiSmile,
} from "react-icons/fi";

const values = [
  {
    icon: <FiUsers className="w-8 h-8" />,
    title: "Collaboration",
    description:
      "Nous croyons en la puissance du travail d'équipe et de l'intelligence collective.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <FiTarget className="w-8 h-8" />,
    title: "Innovation",
    description:
      "Nous repoussons constamment les limites pour créer des solutions toujours plus performantes.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <FiHeart className="w-8 h-8" />,
    title: "Passion",
    description:
      "Notre passion pour l'excellence nous pousse à toujours donner le meilleur de nous-mêmes.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: <FiAward className="w-8 h-8" />,
    title: "Excellence",
    description:
      "Nous visons l'excellence dans chaque aspect de notre travail et de nos produits.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: <FiGlobe className="w-8 h-8" />,
    title: "Impact",
    description:
      "Nous créons des outils qui ont un impact positif sur la vie des professionnels.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <FiShield className="w-8 h-8" />,
    title: "Confiance",
    description:
      "La confiance de nos utilisateurs est notre plus grande récompense.",
    color: "from-red-500 to-red-600",
  },
];

const whyWeDoIt = [
  {
    icon: <FiClock className="w-8 h-8" />,
    title: "Gagner du temps précieux",
    description:
      "Nous avons constaté que les professionnels passent en moyenne 3 heures par jour à jongler entre différents outils. Notre mission est de leur rendre ce temps précieux.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <FiTrendingUp className="w-8 h-8" />,
    title: "Booster la productivité",
    description:
      "En centralisant les outils essentiels, nous permettons aux professionnels de se concentrer sur ce qui compte vraiment : leur travail et leur créativité.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <FiSmile className="w-8 h-8" />,
    title: "Simplifier le quotidien",
    description:
      "Nous croyons que les meilleurs outils sont ceux qui se font oublier. Notre objectif est de créer une expérience fluide et agréable.",
    color: "from-pink-500 to-pink-600",
  },
];

const team = [
  {
    name: "Alexandre Martin",
    role: "Fondateur & CEO",
    bio: "15 ans d'expérience dans le développement web et l'entrepreneuriat. Passionné par l'innovation et l'expérience utilisateur.",
    image: "/team/alexandre.jpg",
  },
  {
    name: "Sophie Dubois",
    role: "Directrice Produit",
    bio: "Expert en UX/UI avec une passion pour la création d'expériences utilisateur exceptionnelles. Ancienne designer chez Google.",
    image: "/team/sophie.jpg",
  },
  {
    name: "Thomas Leroy",
    role: "Lead Developer",
    bio: "Spécialiste en architecture logicielle et optimisation des performances. A contribué à des projets open-source majeurs.",
    image: "/team/thomas.jpg",
  },
  {
    name: "Julie Moreau",
    role: "Designer Principal",
    bio: "Créative et innovante, elle donne vie à nos interfaces avec élégance. Lauréate de plusieurs prix de design.",
    image: "/team/julie.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-black w-full overflow-x-hidden">
      <PageHero
        title="Notre mission : Transformer la façon dont vous travaillez"
        description="Chez Skillery, nous croyons que chaque professionnel mérite des outils puissants et faciles à utiliser. Notre mission est de créer une suite d'outils qui transforme la façon dont vous travaillez, en vous permettant de vous concentrer sur ce qui compte vraiment : votre créativité et votre impact."
        tag="À propos de nous"
        tagColor="bg-[#00ADB5]/10 text-[#00ADB5]"
      />

      {/* Pourquoi Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Pourquoi nous faisons cela
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Notre motivation vient d'une conviction profonde : le travail
                devrait être une source d'épanouissement, pas de frustration.
                Découvrez pourquoi nous nous levons chaque matin pour créer
                Skillery.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {whyWeDoIt.map((item, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div
                    className={`inline-block p-3 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
                <div className="space-y-6 text-gray-600">
                  <p className="leading-relaxed">
                    Fondée en 2023, Skillery est née d'une frustration
                    personnelle : notre fondateur, Alexandre, passait des heures
                    à jongler entre différents outils et applications, perdant
                    un temps précieux qu'il aurait pu consacrer à sa créativité.
                  </p>
                  <p className="leading-relaxed">
                    Après avoir discuté avec d'autres professionnels, il a
                    réalisé que ce problème était universel. Les outils
                    existants étaient soit trop complexes, soit trop limités,
                    soit trop chers.
                  </p>
                  <p className="leading-relaxed">
                    C'est ainsi qu'est née l'idée de Skillery : créer une suite
                    d'outils simple, puissante et abordable, qui permettrait aux
                    professionnels de se concentrer sur ce qui compte vraiment.
                  </p>
                  <p className="leading-relaxed">
                    Aujourd'hui, Skillery aide plus de 150 professionnels à
                    travailler plus efficacement, en leur faisant gagner en
                    moyenne 10 heures par semaine. Et ce n'est que le début.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/10 to-[#00cfd9]/10 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                  <div className="aspect-video bg-gradient-to-br from-[#00ADB5] to-[#00cfd9] rounded-lg flex items-center justify-center">
                    <div className="text-white text-4xl font-bold">2023</div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#00ADB5] font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Lancement</h4>
                        <p className="text-sm text-gray-600">
                          Première version de Skillery
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#00ADB5] font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Croissance</h4>
                        <p className="text-sm text-gray-600">
                          150+ utilisateurs actifs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#00ADB5] font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Innovation</h4>
                        <p className="text-sm text-gray-600">
                          Nouveaux outils en développement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ces valeurs guident chacune de nos décisions et nous aident à
                créer des produits exceptionnels qui transforment la vie des
                professionnels.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div
                    className={`inline-block p-3 rounded-xl bg-gradient-to-br ${value.color} text-white mb-4`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Une équipe passionnée de professionnels dédiés à votre succès.
                Chaque membre apporte son expertise unique pour créer une
                expérience exceptionnelle.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#00ADB5] font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
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
              Rejoignez l'aventure Skillery
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Découvrez comment notre équipe peut vous aider à transformer votre
              façon de travailler et à libérer votre potentiel créatif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
              >
                Nous contacter
              </a>
              <a
                href="/tools"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition"
              >
                Découvrir nos outils
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
