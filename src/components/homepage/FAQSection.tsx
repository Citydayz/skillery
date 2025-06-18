import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { AnimatedAccordion } from "@/components/ui/AnimatedAccordion";

const faqs = [
  {
    q: "L'outil de compression est-il vraiment gratuit ?",
    a: "Oui ! Notre version gratuite vous permet de compresser jusqu'à 10 images par jour. C'est parfait pour tester l'outil et pour les petits projets. Pour une utilisation plus intensive, notre plan Pro offre une compression illimitée et des fonctionnalités avancées.",
  },
  {
    q: "Comment mes données sont-elles sécurisées ?",
    a: "La sécurité de vos données est notre priorité absolue. Toutes vos informations sont chiffrées de bout en bout, hébergées en Europe selon les normes RGPD, et nous ne partageons jamais vos données avec des tiers. Nous effectuons également des sauvegardes régulières pour garantir la disponibilité de vos données.",
  },
  {
    q: "Puis-je utiliser Skillery avec mes outils actuels ?",
    a: "Absolument ! Skillery s'intègre parfaitement avec vos outils existants. Nous proposons des intégrations avec les plateformes les plus populaires comme Trello, Notion, Slack, et bien d'autres. Vous pouvez ainsi centraliser votre travail tout en conservant vos outils préférés.",
  },
  {
    q: "Comment fonctionne la facturation ?",
    a: "Notre système de facturation est simple et transparent. Vous pouvez choisir entre un paiement mensuel ou annuel, avec une réduction de 20% sur l'abonnement annuel. Tous les plans incluent un essai gratuit de 14 jours, sans engagement. Vous pouvez annuler à tout moment.",
  },
  {
    q: "Quel type de support proposez-vous ?",
    a: "Nous offrons un support premium à tous nos utilisateurs. Notre équipe est disponible par email et chat du lundi au vendredi, de 9h à 18h. Les utilisateurs Pro bénéficient d'un temps de réponse prioritaire, et les clients Entreprise ont accès à un support dédié 24/7.",
  },
  {
    q: "Puis-je personnaliser l'interface selon mes besoins ?",
    a: "Oui ! Skillery est conçu pour s'adapter à vos besoins. Vous pouvez personnaliser les tableaux de bord, créer des workflows personnalisés, et configurer les notifications selon vos préférences. Les utilisateurs Pro et Entreprise ont accès à des options de personnalisation avancées.",
  },
];

export default function FAQSection() {
  return (
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
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur Skillery et ses fonctionnalités.
              Si vous ne trouvez pas votre réponse, n'hésitez pas à nous
              contacter.
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <ScrollAnimation key={i} delay={i * 0.1}>
              <AnimatedAccordion title={item.q}>{item.a}</AnimatedAccordion>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
