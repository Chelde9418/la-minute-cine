export interface Movie {
  id: string;
  title: string;
  type: 'film' | 'serie';
  image: string;
  rating?: number;
  duration?: string;
  genre: string;
  description: string;
  isNew?: boolean;
  progress?: number; // For series
  audience?: number; // For series
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  rating?: number;
  trending?: boolean;
}

export interface Trend {
  id: string;
  title: string;
  description: string;
  image: string;
  isNew?: boolean;
}

export interface List {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  rank?: number;
}
