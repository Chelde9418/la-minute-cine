import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LATEST_MOVIES, TOP_SERIES } from '../constants';
import { MovieCard } from '../components/Cards';
import { motion } from 'motion/react';
import { fetchArticles } from '../services/contentService';
import { Article, Movie } from '../types';

export function Listing() {
  const location = useLocation();
  const isFilms = location.pathname === '/films';
  const [cmsArticles, setCmsArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then(data => {
      setCmsArticles(data);
      setLoading(false);
    });
  }, []);
  
  const title = isFilms ? 'Films' : 'Séries';
  const description = isFilms 
    ? 'Découvrez nos critiques des derniers longs-métrages sortis en salles et en streaming.' 
    : 'Nos analyses complètes des séries qui font l\'actualité, saison par saison.';
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  const filteredCms = cmsArticles.filter(a => {
    const cat = a.category.toLowerCase();
    if (isFilms) {
      return cat.includes('film') || cat.includes('critique') || cat.includes('avis') || cat.includes('top');
    } else {
      return cat.includes('série') || cat.includes('serie') || cat.includes('show') || cat.includes('show');
    }
  }).map(a => ({
    id: a.id,
    title: a.title,
    type: (isFilms ? 'film' : 'serie') as any,
    image: a.image,
    duration: a.readTime,
    genre: a.category,
    description: a.excerpt,
    rating: a.rating
  }));

  const items = isFilms ? [...filteredCms, ...LATEST_MOVIES] : [...filteredCms, ...TOP_SERIES];

  return (
    <div className="animate-fade-in pt-10">
      <header className="max-w-7xl mx-auto px-6 py-12 border-b border-outline-variant/30 mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black text-on-surface mb-4 tracking-tighter"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-on-surface-variant max-w-2xl"
        >
          {description}
        </motion.p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <MovieCard key={item.id} movie={item} vertical={isFilms} />
          ))}
        </div>
        
        {/* Empty state or "More to come" */}
        <div className="mt-20 p-12 bg-surface-container rounded-3xl text-center border border-dashed border-outline-variant/50">
          <p className="text-on-surface-variant font-medium">De nouvelles critiques arrivent chaque jour.</p>
          <p className="text-xs text-on-surface-variant/60 mt-2">Revenez bientôt pour plus de contenus exclusifs.</p>
        </div>
      </main>
    </div>
  );
}
