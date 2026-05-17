import { Movie, Article, Trend, List } from './types';

export const TRENDS: Trend[] = [
  {
    id: '1',
    title: 'Le retour de Christopher Nolan',
    description: 'Analyse de ses projets futurs.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000',
    isNew: true
  },
  {
    id: '2',
    title: 'Cannes 2024 : Les favoris',
    description: 'Sélection officielle décryptée.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'La technologie IMAX en 2024',
    description: 'Une immersion sans précédent.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    title: "L'essor du cinéma d'animation",
    description: 'Au-delà du public enfant.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '5',
    title: 'Box-office : Records battus',
    description: "Les films qui ont dominé l'été.",
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '6',
    title: 'Le renouveau du film d\'horreur',
    description: 'Les studios A24 frappent fort.',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1000'
  }
];

export const LATEST_MOVIES: Movie[] = [
  {
    id: 'civil-war',
    title: 'Civil War',
    type: 'film',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800',
    duration: '3 min',
    genre: 'Films',
    description: 'Une plongée brutale dans une Amérique en plein chaos.',
    isNew: true
  },
  {
    id: 'the-creator',
    title: 'The Creator',
    type: 'film',
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=800',
    duration: '3 min',
    genre: 'Films',
    description: "L'intelligence artificielle face à l'humanité."
  },
  {
    id: 'anatomie-dune-chute',
    title: "Anatomie d'une Chute",
    type: 'film',
    image: 'https://images.unsplash.com/photo-1512070670213-9a3d4f8fb2a6?auto=format&fit=crop&q=80&w=800',
    duration: '3 min',
    genre: 'Films',
    description: 'Un procès fascinant qui dissèque un couple.'
  },
  {
    id: 'drive-away-dolls',
    title: 'Drive Away Dolls',
    type: 'film',
    image: 'https://images.unsplash.com/photo-1542204172-3c1f81d05d8c?auto=format&fit=crop&q=80&w=800',
    duration: '3 min',
    genre: 'Films',
    description: 'Une cavale sauvage et déjantée.'
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    type: 'film',
    image: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=800',
    duration: '180 min',
    genre: 'Films',
    description: 'Le film qui a changé le cours de l\'histoire du cinéma.'
  },
  {
    id: 'killers-of-the-flower-moon',
    title: 'Killers of the Flower Moon',
    type: 'film',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    duration: '206 min',
    genre: 'Films',
    description: 'Une fresque magistrale sur la trahison et le crime.'
  }
];

export const TOP_SERIES: Movie[] = [
  {
    id: 'house-of-the-dragon',
    title: 'House of the Dragon',
    type: 'serie',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    description: 'Saison 2',
    genre: 'Séries',
    progress: 75,
    audience: 75
  },
  {
    id: 'shogun',
    title: 'Shogun',
    type: 'serie',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    description: 'Minisérie',
    genre: 'Séries',
    progress: 100,
    audience: 100
  },
  {
    id: 'fallout',
    title: 'Fallout',
    type: 'serie',
    image: 'https://images.unsplash.com/photo-1478720568477-151d9b1dbef2?auto=format&fit=crop&q=80&w=800',
    description: 'Saison 1',
    genre: 'Séries',
    progress: 50,
    audience: 50
  },
  {
    id: 'the-bear',
    title: 'The Bear',
    type: 'serie',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    description: 'Saison 3',
    genre: 'Séries',
    progress: 33,
    audience: 33
  },
  {
    id: 'succession',
    title: 'Succession',
    type: 'serie',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
    description: 'Saison 4',
    genre: 'Séries',
    progress: 100,
    audience: 95
  },
  {
    id: 'the-last-of-us',
    title: 'The Last of Us',
    type: 'serie',
    image: 'https://images.unsplash.com/photo-14446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    description: 'Saison 1',
    genre: 'Séries',
    progress: 100,
    audience: 90
  }
];

export const ARTICE_JOKER: Article = {
  id: 'joker-folie-a-deux',
  title: 'Review: Joker Folie à Deux',
  excerpt: 'Arthur Fleck est de retour, mais cette fois, il n’est pas seul.',
  author: 'Jean-Pierre Morel',
  date: '12 Octobre 2024',
  readTime: '5 min de lecture',
  category: 'Critique Exclusive',
  image: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=1200',
  rating: 4,
  content: `Arthur Fleck est de retour, mais cette fois, il n’est pas seul. La suite tant attendue du chef-d'œuvre de Todd Phillips brouille les pistes entre réalité et comédie musicale.

Dans cette suite audacieuse, le réalisateur prend le contre-pied total du premier opus. Là où Joker était une descente aux enfers brutale et solitaire inspirée de Scorsese, Folie à Deux s'aventure dans les méandres d'une psyché partagée, orchestrée comme un rêve fiévreux.

> "Une performance habitée qui transcende le simple cadre du film de super-vilain pour devenir une étude de caractère mélancolique."

## Une dualité fascinante

L'introduction d'Harley Quinn, campée par une Lady Gaga impériale, transforme la dynamique du film. Le duo fonctionne sur une alchimie toxique et mélodieuse, où chaque scène de chant devient une fenêtre ouverte sur leurs délires respectifs. Les décors de l'Asile d'Arkham sont magnifiés par une photographie ténébreuse.

## La symphonie du chaos

Le rythme du film pourra en déstabiliser plus d'un. Le passage constant aux séquences musicales casse la linéarité du récit juridique, car une grande partie du film se déroule durant le procès de Fleck. Pourtant, c'est précisément dans cette rupture de ton que le film trouve sa propre voix.

Au final, Joker: Folie à Deux est une œuvre clivante, délibérément anti-spectaculaire dans son dernier acte, mais d'une richesse thématique rare pour le genre.`
};

export const LISTS: List[] = [
  {
    id: '1',
    title: 'Les 10 Meilleurs Films de Science-Fiction de la Décennie',
    description: "De l'exploration spatiale aux futurs dystopiques, voici notre sélection rigoureuse des chefs-d'œuvre qui ont redéfini le genre ces dix dernières années.",
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000',
    category: 'MUST WATCH',
    readTime: '10 min',
    author: 'Equipe LMC'
  },
  {
    id: '2',
    title: 'Top 10 : Netflix Original Series',
    description: 'Les incontournables de la plateforme.',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=600',
    category: 'TOP 10',
    readTime: '8 min',
    author: 'Sarah Miller',
    rank: 10
  },
  {
    id: '3',
    title: "Action 2024 : L'adrénaline Pure",
    description: 'Le meilleur du cinéma musclé.',
    image: 'https://images.unsplash.com/photo-1478720568477-151d9b1dbef2?auto=format&fit=crop&q=80&w=600',
    category: 'ACTION',
    readTime: '6 min',
    author: 'Jean Dupont',
    rank: 20
  }
];
