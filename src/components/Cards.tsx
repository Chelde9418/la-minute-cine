import { Movie, Trend, List } from '../types';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function MovieCard({ movie, vertical = true }: { movie: Movie, vertical?: boolean }) {
  if (!vertical) {
    return (
      <Link to={`/movies/${movie.id}`} className="group block bg-surface-container rounded-lg overflow-hidden border border-outline-variant/30 hover:border-primary-container/50 transition-all">
        <div className="aspect-video overflow-hidden">
          <img src={movie.image} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-4">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">
            {movie.genre} • {movie.description}
          </span>
          <h3 className="text-lg font-bold text-on-surface mb-3 group-hover:text-primary-container transition-colors line-clamp-1">{movie.title}</h3>
          {movie.progress !== undefined && (
            <div className="space-y-2">
              <div className="w-full h-1 bg-secondary-container rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-container shadow-[0_0_8px_rgba(229,9,20,0.6)]" 
                  style={{ width: `${movie.progress}%` }} 
                />
              </div>
              <p className="text-[10px] text-on-surface-variant">{movie.audience}% d'audience</p>
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/movies/${movie.id}`} className="group block">
      <div className="aspect-[2/3] rounded-lg overflow-hidden relative mb-3">
        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {movie.isNew && (
          <span className="absolute top-3 right-3 bg-primary-container text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
        )}
      </div>
      <span className="text-[10px] font-bold text-primary-container uppercase tracking-widest">{movie.genre}</span>
      <h3 className="text-lg font-bold text-on-surface mt-1 group-hover:text-primary-container transition-colors line-clamp-1">{movie.title}</h3>
      <p className="text-[10px] italic text-on-surface-variant mt-1">Lecture : {movie.duration}</p>
    </Link>
  );
}

export function TrendCard({ trend }: { trend: Trend }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer"
    >
      <img src={trend.image} alt={trend.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 scrim-card flex flex-col justify-end p-6">
        {trend.isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary-container text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
          </div>
        )}
        <h3 className="text-xl font-bold text-white mb-1">{trend.title}</h3>
        <p className="text-sm text-secondary line-clamp-1">{trend.description}</p>
      </div>
    </motion.div>
  );
}

export function ListCard({ list }: { list: List }) {
  return (
    <div className="group bg-surface-container-high rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(229,9,20,0.3)] transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img src={list.image} alt={list.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-primary-container text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
          {list.category}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary-container rounded-full" />
          <span className="text-white text-[10px] font-semibold">{list.readTime} de lecture</span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold text-on-surface mb-4 group-hover:text-primary-container transition-colors line-clamp-2">{list.title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-on-surface-variant font-medium">Par {list.author}</span>
          <ArrowRight size={14} className="text-primary-container" />
        </div>
      </div>
    </div>
  );
}
