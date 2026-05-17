import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { TRENDS, LATEST_MOVIES, TOP_SERIES } from '../constants';
import { TrendCard, MovieCard } from '../components/Cards';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../services/contentService';

export function Home() {
  const latestArticles = getAllArticles();
  const heroArticle = latestArticles[0];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
        <img 
          className="absolute inset-0 w-full h-full object-cover" 
          src={heroArticle?.image || "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=2000"} 
          alt="Cinematic Hero" 
        />
        <div className="absolute inset-0 scrim-hero flex flex-col justify-end px-6 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-primary-container text-white text-xs font-bold px-3 py-1 rounded-sm mb-6"
            >
              {heroArticle?.category.toUpperCase() || "CRITIQUE"}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 max-w-4xl leading-tight tracking-tighter"
            >
              {heroArticle?.title || "Dune : Deuxième Partie — Le chef-d'œuvre de Villeneuve"}
            </motion.h1>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-4 mb-10"
            >
              <div className="flex text-primary-container">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < (heroArticle?.rating || 4) ? "currentColor" : "none"} strokeWidth={2} />
                ))}
              </div>
              <span className="text-sm font-bold text-on-surface">{heroArticle?.rating || 4.5} / 5</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to={heroArticle ? `/movies/${heroArticle.id}` : "/movies/dune-2"}
                className="inline-block bg-primary-container text-white px-10 py-4 text-xl font-bold rounded-lg transition-transform hover:scale-105 active:scale-95"
              >
                Lire la critique
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tendances */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-on-surface mb-10 tracking-tight">Tendances cette semaine</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRENDS.map((trend) => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </div>
      </section>

      {/* Derniers Films */}
      <section className="bg-surface-container-low py-20 mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-black text-on-surface tracking-tight">Derniers Films</h2>
            <Link to="/films" className="text-primary-container text-xs font-bold hover:underline flex items-center gap-1 group">
              Voir tout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {LATEST_MOVIES.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Séries du Moment */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-black text-on-surface tracking-tight">Séries du Moment</h2>
            <Link to="/series" className="text-primary-container text-xs font-bold hover:underline flex items-center gap-1 group">
              Voir tout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_SERIES.map((serie) => (
              <MovieCard key={serie.id} movie={serie} vertical={false} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
