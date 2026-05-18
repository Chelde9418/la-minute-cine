
export interface SiteContent {
  legal: string;
  privacy: string;
}

const DEFAULT_LEGAL = `
# MENTIONS LÉGALES

## 1. Éditeur du site
Le site La Minute Cinéma accessible à l’adresse [https://laminutecinema.online/](https://laminutecinema.online/) est édité par :

- **Nom de l’éditeur :** Chelde
- **Statut :** Auto-entrepreneur
- **Adresse :** Non communiquée
- **Email :** cheldepro@gmail.com

## 2. Propriété intellectuelle
L’ensemble des contenus présents sur le site La Minute Cinéma (textes, images, vidéos, logos, éléments graphiques) est protégé par le droit de la propriété intellectuelle.
Toute reproduction, distribution, modification ou exploitation sans autorisation préalable est strictement interdite.

## 3. Responsabilité
Le site La Minute Cinéma propose des contenus à but informatif et de divertissement sur les films et séries.
L’éditeur ne peut être tenu responsable :
- des erreurs ou omissions présentes sur le site,
- d’une mauvaise utilisation des informations diffusées,
- ou de tout dommage direct ou indirect lié à l’utilisation du site.

## 4. Données personnelles
Le site peut collecter certaines données personnelles (cookies, statistiques de visite, formulaire de contact).
Ces données sont utilisées uniquement pour :
- améliorer l’expérience utilisateur,
- analyser le trafic du site,
- répondre aux demandes envoyées via le formulaire de contact.

Conformément à la réglementation en vigueur, l’utilisateur peut demander la suppression de ses données en contactant : **cheldepro@gmail.com**
`;

const DEFAULT_PRIVACY = `
# PRIVACY POLICY

## 1. INTRODUCTION
La minute ciné, accessible at [https://laminutecinema.online](https://laminutecinema.online), is committed to protecting the privacy of its users. This Privacy Policy outlines how we collect, use, and disclose personal data, ensuring transparency and compliance with applicable laws and regulations, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).

## 2. Scope of Application
This Privacy Policy applies to all visitors and users of La minute ciné. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.

## 3. COLLECTED INFORMATION
We collect usage analytics data to improve our website's performance and user experience. This data includes:
- Browser type and version
- Operating system
- Referrer URL
- Date and time of visit
- Pages visited
- Geographic location

## 4. PURPOSE OF DATA COLLECTION
The primary purpose of collecting usage analytics data is to:
- Analyze and enhance the website's functionality and content
- Improve user experience
- Ensure the website's technical performance and security

## 5. DATA PROCESSING AND STORAGE
We use standard analytics and hosting services to process and store collected data. These third-party services are contractually obligated to protect the confidentiality, integrity, and availability of your personal data.

## 6. DATA RETENTION
We retain collected data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

## 7. RIGHTS UNDER GDPR
If you are a resident of the European Economic Area, you have the following rights:
1. **Right to access**: You may request access to your personal data.
2. **Right to rectification**: You may request correction of inaccurate or incomplete personal data.
3. **Right to erasure**: You may request deletion of your personal data.
4. **Right to restriction of processing**: You may request restrictions on the processing of your personal data.
5. **Right to object**: You may object to the processing of your personal data.
6. **Right to data portability**: You may request transfer of your personal data to another controller.

## 8. RIGHTS UNDER CCPA
If you are a California resident, you have the following rights:
1. **Right to know**: You may request information about the categories and specific pieces of personal data we collect.
2. **Right to delete**: You may request deletion of your personal data.
3. **Right to opt-out**: You may opt-out of the sale of your personal data.

## 9. SECURITY MEASURES
We implement reasonable technical, administrative, and physical security measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.

## 10. CHANGES TO THIS PRIVACY POLICY
We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting on our website. We will notify you of material changes by posting a notice on our website.

## 11. CONTACT US
If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at **cheldepro@gmail.com**.

**Last updated: May 18, 2026**
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
