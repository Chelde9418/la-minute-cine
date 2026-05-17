import { motion } from 'motion/react';

export function Legal() {
  return (
    <div className="animate-fade-in pt-10">
      <header className="max-w-4xl mx-auto px-6 py-12 border-b border-outline-variant/30 mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black text-on-surface mb-4 tracking-tighter"
        >
          Mentions Légales
        </motion.h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface">1. Édition du site</h2>
          <p className="text-on-surface-variant leading-relaxed">
            En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet LaMinuteCinéma l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
          </p>
          <p className="text-on-surface-variant">
            <strong>Propriétaire du site :</strong> LMC Media Group<br />
            <strong>Contact :</strong> contact@laminutecinema.com<br />
            <strong>Adresse :</strong> 75008 Paris, France.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface">2. Propriété intellectuelle</h2>
          <p className="text-on-surface-variant leading-relaxed">
            LMC Media Group est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface">3. Hébergement</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Le site est hébergé par Google Cloud Platform, dont le siège social est situé à 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
          </p>
        </section>
      </main>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="animate-fade-in pt-10">
      <header className="max-w-4xl mx-auto px-6 py-12 border-b border-outline-variant/30 mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black text-on-surface mb-4 tracking-tighter"
        >
          Confidentialité
        </motion.h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface">Protection des données</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD), LaMinuteCinéma s'engage à protéger la vie privée de ses utilisateurs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface">Collecte des données</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Nous ne collectons que les données nécessaires au bon fonctionnement de nos services (préférences d'affichage mode sombre/clair, recherches récentes stockées localement).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface">Cookies</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Le site utilise des cookies essentiels pour maintenir vos préférences de session et améliorer votre expérience de navigation.
          </p>
        </section>
      </main>
    </div>
  );
}
