import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { FiAlertCircle } from "react-icons/fi";

export default function ProblemSection() {
  return (
    <ScrollAnimation>
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm mb-4">
              Le problème
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              La jungle des outils numériques
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-red-500 mt-1">
                  <FiAlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Trop d'applications
                  </h3>
                  <p className="text-gray-600">
                    Trello pour les tâches, Notion pour la doc, Drive pour les
                    fichiers... La multiplication des outils crée de la
                    confusion et des pertes de temps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-red-500 mt-1">
                  <FiAlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Notifications constantes
                  </h3>
                  <p className="text-gray-600">
                    Les alertes s'accumulent, votre concentration est
                    fragmentée, et votre productivité en prend un coup.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-red-500 mt-1">
                  <FiAlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Données éparpillées
                  </h3>
                  <p className="text-gray-600">
                    Vos informations sont dispersées entre différentes
                    plateformes, rendant difficile leur accès et leur gestion.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-xl">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
}
