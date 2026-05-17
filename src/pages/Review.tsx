import { useParams, Link } from 'react-router-dom';
import { ARTICE_JOKER } from '../constants';
import { getArticleById, getAllArticles } from '../services/contentService';
import { motion } from 'motion/react';
import { Star, Clock, Calendar, User, ArrowLeft, MessageSquare, Share2 } from 'lucide-react';
import Markdown from 'react-markdown';

export function Review() {
  const { id } = useParams();
  
  // Try to load from CMS first, then fallback to constant
  const dynamicArticle = id ? getArticleById(id) : undefined;
  const article = dynamicArticle || ARTICE_JOKER;

  const trendingArticles = getAllArticles()
    .filter(a => a.trending && a.id !== id)
    .slice(0, 3);

  if (!article) return <div className="pt-32 text-center text-on-surface">Article non trouvé</div>;

  let displayDate = '';
  try {
    if (article.date) {
      const d = new Date(article.date);
      if (!isNaN(d.getTime())) {
        displayDate = d.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      } else {
        displayDate = String(article.date);
      }
    }
  } catch (e) {
    displayDate = String(article.date);
  }

  return (
    <article className="pt-20 animate-fade-in">
      {/* Article Header */}
      <header className="relative h-[60vh] min-h-[500px] w-full">
        <img 
          src={article.image} 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 scrim-hero flex flex-col justify-end p-10">
          <div className="max-w-4xl mx-auto w-full">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={16} /> Retour à l'accueil
            </Link>
            <span className="bg-primary-container text-white text-xs font-bold px-3 py-1 rounded-sm mb-6 inline-block uppercase tracking-widest">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
              {article.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-2">
                <User size={16} className="text-primary-container" />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary-container" />
                {displayDate}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary-container" />
                {article.readTime}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16 py-20">
        <main>
          <div className="flex items-center gap-4 mb-12 p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30">
            <div className="text-sm font-bold text-on-surface uppercase tracking-widest">La Note LMC :</div>
            <div className="flex text-primary-container">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={24} 
                  fill={i < (article.rating || 0) ? "currentColor" : "none"} 
                  strokeWidth={2} 
                />
              ))}
            </div>
            <span className="text-lg font-black text-on-surface">{article.rating}/5</span>
          </div>

          <div className="markdown-body">
            <Markdown>{article.content}</Markdown>
          </div>

          <footer className="mt-20 pt-10 border-t border-outline-variant/30 flex justify-between items-center">
             <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm font-bold text-on-surface hover:text-primary-container transition-colors">
                  <MessageSquare size={18} /> 43 Commentaires
                </button>
             </div>
             <div className="flex gap-4">
                <button className="p-3 bg-surface-container rounded-full hover:text-primary-container transition-colors">
                  <Share2 size={18} />
                </button>
             </div>
          </footer>
        </main>

        <aside className="space-y-12">
          <div className="bg-surface-container rounded-2xl p-8 sticky top-30">
            <h3 className="text-lg font-black text-on-surface mb-6 uppercase tracking-tight">À lire aussi</h3>
            <div className="space-y-8">
              {trendingArticles.map((trending) => (
                <Link key={trending.id} to={`/movies/${trending.id}`} className="group block">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-surface-container-highest">
                    <img 
                      src={trending.image} 
                      alt={trending.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-primary-container transition-colors line-clamp-2">
                    {trending.title}
                  </h4>
                </Link>
              ))}
              {trendingArticles.length === 0 && (
                <p className="text-xs text-on-surface-variant italic">Pas d'articles suggérés pour le moment.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
