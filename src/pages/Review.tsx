import { useParams, Link } from 'react-router-dom';
import { ARTICE_JOKER } from '../constants';
import { getArticleById, fetchArticles } from '../services/contentService';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Clock, Calendar, User, ArrowLeft, MessageSquare, Share2, Send, Eye } from 'lucide-react';
import Markdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { recordView, getViewCount } from '../services/viewService';
import { Article } from '../types';

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export function Review() {
  const { id } = useParams();
  const storageKey = `comments-${id || 'default'}`;
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [article, setArticle] = useState<Article | null>(null);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Load comments, record view and fetch article data
  useEffect(() => {
    if (id) {
      const count = recordView(id);
      setViewCount(count);
      
      setLoading(true);
      getArticleById(id).then(data => {
        setArticle(data || ARTICE_JOKER);
        setLoading(false);
      });
    } else {
      const count = getViewCount('joker-folie-a-deux');
      setViewCount(count);
      setArticle(ARTICE_JOKER);
      setLoading(false);
    }

    fetchArticles().then(data => {
      setTrendingArticles(data.filter(a => a.trending && a.id !== id).slice(0, 3));
    });

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load comments", e);
      }
    }
  }, [id, storageKey]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: authorName.trim(),
        text: newComment.trim(),
        date: new Date().toISOString(),
      };

      const updatedComments = [comment, ...comments];
      setComments(updatedComments);
      localStorage.setItem(storageKey, JSON.stringify(updatedComments));
      
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              <div className="flex items-center gap-2 bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                <Eye size={16} className="text-primary-container" />
                <span>{viewCount.toLocaleString()} Vues</span>
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

          <footer className="mt-20 pt-10 border-t border-outline-variant/30">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                   <button className="flex items-center gap-2 text-sm font-bold text-on-surface hover:text-primary-container transition-colors">
                     <MessageSquare size={18} /> {comments.length} {comments.length > 1 ? 'Commentaires' : 'Commentaire'}
                   </button>
                </div>
                <div className="flex gap-4">
                   <button className="p-3 bg-surface-container rounded-full hover:text-primary-container transition-colors">
                     <Share2 size={18} />
                   </button>
                </div>
             </div>

             {/* Dynamic Comment Section */}
             <section className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30">
                <h3 className="text-xl font-black text-on-surface mb-8 uppercase tracking-tight">Espace Commentaires</h3>
                
                <form onSubmit={handleAddComment} className="mb-12 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Votre nom" 
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      required
                      className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <textarea 
                      placeholder="Partagez votre avis sur cet article..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                      rows={3}
                      className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-primary-container outline-none transition-all resize-none"
                    />
                    <button 
                      type="submit" 
                      disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
                      className="absolute bottom-4 right-4 p-2 bg-primary-container text-white rounded-lg disabled:opacity-50 hover:scale-105 active:scale-95 transition-all"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send size={18} />
                      )}
                    </button>
                  </div>
                </form>

                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {comments.map((comment) => (
                      <motion.div 
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        layout
                        className="p-4 bg-surface-container rounded-2xl border border-outline-variant/10"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-bold text-on-surface">{comment.author}</span>
                          <span className="text-[10px] text-on-surface-variant uppercase font-medium">
                            {new Date(comment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                          {comment.text}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {comments.length === 0 && (
                    <div className="text-center py-10">
                      <MessageSquare size={48} className="mx-auto text-outline-variant/30 mb-4" />
                      <p className="text-sm text-on-surface-variant italic">Aucun commentaire pour le moment. Soyez le premier à réagir !</p>
                    </div>
                  )}
                </div>
             </section>
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
