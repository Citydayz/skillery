import Hero from "@/components/homepage/Hero";

export default function HomePage() {
  return (
    <div className="bg-white text-black w-full overflow-x-hidden">
      {/* HERO */}
      <Hero />

      {/* INTÉGRATIONS */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Intégrations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Connecte les outils que tu utilises déjà
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 place-items-center">
            {[
              "Notion",
              "Slack",
              "Google Drive",
              "Figma",
              "Outlook",
              "Gmail",
              "Trello",
              "Linear",
              "Salesforce",
            ].map((tool, i) => (
              <div
                key={i}
                className="aspect-square w-full max-w-[80px] bg-white border border-gray-200 shadow-md rounded-xl flex items-center justify-center"
              >
                <span className="text-xs text-gray-600 font-medium">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SÉCURITÉ */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-sm text-gray-400 uppercase tracking-wider">
            Sécurité
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            Tes données, en sécurité
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            Skillery respecte les normes RGPD. Toutes les données sont chiffrées
            et hébergées en Europe. Tu es maître de tes informations, en toute
            transparence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔐",
                title: "Chiffrement avancé",
                text: "Toutes tes données sont chiffrées côté client et serveur.",
              },
              {
                icon: "📍",
                title: "Hébergement en Europe",
                text: "Serveurs localisés en France pour un meilleur respect du RGPD.",
              },
              {
                icon: "🛡️",
                title: "Confidentialité totale",
                text: "Nous ne revendons ni analysons jamais tes contenus.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow text-left"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES CLÉS */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Fonctionnalités
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Ce que Skillery fait pour toi
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Centralisation",
                desc: "Tous tes outils accessibles depuis une seule interface claire et rapide.",
              },
              {
                title: "Personnalisation",
                desc: "Adapte ton espace selon tes préférences, avec des modules flexibles.",
              },
              {
                title: "Collaboration",
                desc: "Travaille avec ton équipe en temps réel, sans friction.",
              },
            ].map((feat, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm text-gray-400 uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            Questions fréquentes
          </h2>
          <div className="text-left divide-y divide-gray-200">
            {[
              {
                q: "Est-ce que Skillery est vraiment gratuit ?",
                a: "Oui ! Tu peux utiliser les fonctions de base gratuitement et sans inscription.",
              },
              {
                q: "Puis-je connecter tous mes outils ?",
                a: "Nous prenons en charge les outils les plus populaires. Et d'autres arrivent très vite !",
              },
              {
                q: "Où sont stockées mes données ?",
                a: "En Europe, sur des serveurs sécurisés.",
              },
              {
                q: "Skillery peut-il remplacer mon Notion ou mon Trello ?",
                a: "Pas totalement, mais il peut les centraliser et te faire gagner du temps au quotidien.",
              },
            ].map((item, i) => (
              <details key={i} className="py-4 group cursor-pointer">
                <summary className="font-medium text-lg group-open:text-[#00ADB5] transition">
                  {item.q}
                </summary>
                <p className="mt-2 text-gray-600 text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-sm text-gray-400 uppercase tracking-wider">
            On t'explique
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-12">
            Comment fonctionne Skillery ?
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            {[
              {
                step: "1",
                title: "Crée ton espace",
                text: "Tu n’as besoin que d’un email. Aucun mot de passe requis.",
              },
              {
                step: "2",
                title: "Connecte tes outils",
                text: "Ajoute Notion, Slack, Drive ou n’importe quelle app pro.",
              },
              {
                step: "3",
                title: "Pilote tout depuis Skillery",
                text: "Un seul hub, une interface claire, des raccourcis efficaces.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 shadow">
                <div className="text-4xl font-bold text-[#00ADB5] mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES BENTO */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Ils adorent Skillery
            </h2>
          </div>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="mb-6 break-inside-avoid bg-white rounded-2xl p-6 shadow-md"
              >
                <p className="text-gray-600 mb-4">
                  {i === 0 &&
                    `"Skillery m'a permis de gagner un temps fou en centralisant mes outils. Un indispensable."`}
                  {i === 1 &&
                    `"Un outil essentiel pour gérer mes tâches plus efficacement. Je recommande !"`}
                  {i === 2 &&
                    `"La vue d'ensemble me permet de mieux planifier mes journées. Très intuitif."`}
                  {i === 3 &&
                    `"J'utilise Skillery tous les jours. Les automatisations me font gagner un temps fou."`}
                  {i === 4 &&
                    `"Très bon outil, interface claire et outils puissants. Je recommande à 100%."`}
                  {i === 5 &&
                    `"L'outil vidéo intégré m'a bluffé. Il simplifie toute la communication interne."`}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="font-semibold">
                      {i === 0 && "John D."}
                      {i === 1 && "Sarah W."}
                      {i === 2 && "Sam J."}
                      {i === 3 && "Daniela T."}
                      {i === 4 && "Alex M."}
                      {i === 5 && "Claire B."}
                    </p>
                    <p className="text-sm text-gray-500">
                      {i === 0 && "Marketing Lead"}
                      {i === 1 && "UX Designer"}
                      {i === 2 && "Product Manager"}
                      {i === 3 && "Operations Manager"}
                      {i === 4 && "Développeur freelance"}
                      {i === 5 && "RH & Communication"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-sm text-gray-400 uppercase tracking-wider">
            Tarifs
          </span>
          <h2>Test webhook sdsd dsdsdsd🚀</h2>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Des plans simples pour tous les besoins
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
            {[
              {
                title: "Gratuit",
                price: "0€",
                features: [
                  "Accès aux outils de base",
                  "Sans inscription",
                  "Utilisation illimitée",
                ],
              },
              {
                title: "Pro",
                price: "9€/mois",
                features: [
                  "Outils premium",
                  "Support prioritaire",
                  "Personnalisation avancée",
                ],
              },
              {
                title: "Entreprise",
                price: "Sur devis",
                features: [
                  "Équipe & multi-utilisateurs",
                  "Support dédié",
                  "Connecteurs sur-mesure",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 shadow-xl border transition-all bg-white ${
                  plan.title === "Pro"
                    ? "border-[#00ADB5] scale-[1.03] z-10"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <h3 className="text-lg font-bold mb-1">{plan.title}</h3>
                <p className="text-3xl font-bold text-[#00ADB5] mb-4">
                  {plan.price}
                </p>
                <ul className="text-gray-600 mb-6 space-y-2 text-sm">
                  {plan.features.map((feat, j) => (
                    <li key={j}>✓ {feat}</li>
                  ))}
                </ul>
                <button className="w-full py-3 px-4 rounded-xl bg-[#00ADB5] text-white font-semibold hover:bg-[#00cfd9] transition">
                  Choisir ce plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 py-24 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">
          Passe à la vitesse supérieure
        </h2>
        <p className="text-gray-600 mb-8">
          Gagne du temps, reste focus sur l'essentiel. Skillery s'occupe du
          reste.
        </p>
        <a
          href="/tools/image-converter"
          className="bg-[#00ADB5] hover:bg-[#00cfd9] text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
        >
          Commencer maintenant
        </a>
      </section>
    </div>
  );
}
