import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { FiCheckCircle } from "react-icons/fi";

export default function SolutionSection() {
  return (
    <ScrollAnimation>
      <section className="px-6 py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm mb-4">
              Notre solution
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Une plateforme unique pour tout gérer
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl transform -rotate-3"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-[#00ADB5] to-[#00cfd9] rounded-lg flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">Skillery</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-green-500 mt-1">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Centralisation intelligente
                  </h3>
                  <p className="text-gray-600">
                    Tous vos outils et données sont regroupés dans une interface
                    intuitive, éliminant la confusion et les pertes de temps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-green-500 mt-1">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Productivité maximale
                  </h3>
                  <p className="text-gray-600">
                    Une expérience fluide et sans friction qui vous permet de
                    vous concentrer sur l'essentiel : votre travail.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-green-500 mt-1">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Intégration parfaite
                  </h3>
                  <p className="text-gray-600">
                    Synchronisation automatique avec vos outils existants pour
                    une transition en douceur vers une meilleure organisation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
}
