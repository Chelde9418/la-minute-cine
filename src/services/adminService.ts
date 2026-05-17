
export interface SiteContent {
  legal: string;
  privacy: string;
}

const DEFAULT_LEGAL = `
## 1. Édition du site
En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet LaMinuteCinéma l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.

**Propriétaire du site :** LMC Media Group
**Contact :** contact@laminutecinema.com
**Adresse :** 75008 Paris, France.

## 2. Propriété intellectuelle
LMC Media Group est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.

## 3. Hébergement
Le site est hébergé par Google Cloud Platform, dont le siège social est situé à 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
`;

const DEFAULT_PRIVACY = `
## Protection des données
Conformément au Règlement Général sur la Protection des Données (RGPD), LaMinuteCinéma s'engage à protéger la vie privée de ses utilisateurs.

## Collecte des données
Nous ne collectons que les données nécessaires au bon fonctionnement de nos services (préférences d'affichage mode sombre/clair, recherches récentes stockées localement).

## Cookies
Le site utilise des cookies essentiels pour maintenir vos préférences de session et améliorer votre expérience de navigation.
`;

const STORAGE_KEY = 'lmc-site-settings';

export function getSiteContent(): SiteContent {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse site settings", e);
    }
  }
  return {
    legal: DEFAULT_LEGAL,
    privacy: DEFAULT_PRIVACY
  };
}

export function updateSiteContent(content: Partial<SiteContent>) {
  const current = getSiteContent();
  const updated = { ...current, ...content };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
