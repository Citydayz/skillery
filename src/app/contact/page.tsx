"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

const contactInfo = [
  {
    icon: FiMail,
    title: "Email",
    content: "contact@skillery.com",
    link: "mailto:contact@skillery.com",
  },
  {
    icon: FiPhone,
    title: "Téléphone",
    content: "+33 1 23 45 67 89",
    link: "tel:+33123456789",
  },
  {
    icon: FiMapPin,
    title: "Adresse",
    content: "123 Rue de l'Innovation, 75001 Paris",
    link: "https://maps.google.com",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="Contactez-nous"
        description="Une question ? Un projet ? N'hésitez pas à nous contacter, notre équipe est là pour vous aider."
        tag="Contact"
        tagColor="bg-[#00ADB5]/10 text-[#00ADB5]"
      />

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollAnimation>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Envoyez-nous un message
                </h2>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 outline-none transition"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 outline-none transition"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 outline-none transition"
                      placeholder="Sujet de votre message"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 outline-none transition resize-none"
                      placeholder="Votre message..."
                      required
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                  >
                    <FiSend className="w-5 h-5" />
                    Envoyer le message
                  </motion.button>
                </form>
              </motion.div>
            </ScrollAnimation>

            {/* Contact Info */}
            <ScrollAnimation>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Informations de contact
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Notre équipe est disponible du lundi au vendredi, de 9h à
                    18h. Nous nous efforçons de répondre à toutes les demandes
                    dans les 24 heures ouvrables.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="w-12 h-12 bg-[#00ADB5]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-[#00ADB5]" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-gray-600">{info.content}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-[#00ADB5]/5 to-[#00cfd9]/5 rounded-2xl p-6">
                  <h3 className="font-semibold mb-2">Besoin d'aide rapide ?</h3>
                  <p className="text-gray-600 mb-4">
                    Consultez notre centre d'aide pour trouver rapidement des
                    réponses à vos questions.
                  </p>
                  <a
                    href="/support"
                    className="inline-flex items-center gap-2 text-[#00ADB5] font-medium hover:text-[#00cfd9] transition"
                  >
                    Accéder au centre d'aide
                  </a>
                </div>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}
