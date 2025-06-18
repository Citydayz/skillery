import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function FinalCTASection() {
  return (
    <ScrollAnimation>
      <section className="px-6 py-24 bg-gradient-to-br from-[#00ADB5]/5 to-[#00cfd9]/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à transformer votre façon de travailler ?
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Rejoignez plus de 150 professionnels qui ont déjà adopté Skillery.
              Commencez gratuitement et découvrez comment nous pouvons vous
              aider à être plus productif dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tools/image-converter"
                className="inline-flex items-center justify-center gap-2 bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-8 py-4 rounded-xl font-semibold text-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]"
              >
                Commencer maintenant
                <FiArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200"
              >
                Demander une démo
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Essai gratuit de 14 jours • Aucune carte de crédit requise
            </p>
          </motion.div>
        </div>
      </section>
    </ScrollAnimation>
  );
}
