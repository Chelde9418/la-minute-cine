import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchArticles, saveArticle, deleteArticle, migrateToFirestore } from '../services/contentService';
import { Article } from '../types';
import { Plus, Trash2, Edit2, LogOut, ChevronRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { logout } from '../lib/firebase';

export const Admin: React.FC = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    const data = await fetchArticles();
    setArticles(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentArticle.title || !currentArticle.id) return;
    
    setLoading(true);
    await saveArticle({
      ...currentArticle,
      date: currentArticle.date || new Date().toISOString(),
      author: currentArticle.author || user?.displayName || 'Admin',
    } as Article);
    
    setIsEditing(false);
    setCurrentArticle({});
    await loadArticles();
    setMessage('Article enregistré avec succès !');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setLoading(true);
      await deleteArticle(id);
      await loadArticles();
      setMessage('Article supprimé.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const startEdit = (article: Article) => {
    setCurrentArticle(article);
    setIsEditing(true);
  };

  const startNew = () => {
    setCurrentArticle({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: 'Films',
      readTime: '5 min de lecture',
      trending: false,
      rating: 5
    });
    setIsEditing(true);
  };

  if (loading && articles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-black font-display text-on-surface mb-2 tracking-tight">Tableau de bord</h1>
          <p className="text-on-surface-variant">Connecté en tant que <span className="font-bold text-primary">{user?.email}</span></p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline hover:bg-surface-variant transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
          <button 
            onClick={startNew}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-on-primary font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus size={20} />
            Rédiger un article
          </button>
        </div>
      </div>

      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 text-primary p-4 rounded-lg mb-8 font-medium text-center"
        >
          {message}
        </motion.div>
      )}

      {isEditing ? (
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-variant p-8 rounded-2xl shadow-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-display">{currentArticle.id ? 'Modifier l\'article' : 'Nouvel Article'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-on-surface-variant hover:text-on-surface">Annuler</button>
          </div>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 opacity-70">Slug (ID unique)</label>
                <input 
                  type="text" 
                  value={currentArticle.id} 
                  onChange={e => setCurrentArticle({...currentArticle, id: e.target.value})}
                  className="w-full bg-surface p-3 rounded-lg border border-outline focus:ring-2 ring-primary outline-none"
                  placeholder="ex: joker-2-critique"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 opacity-70">Titre</label>
                <input 
                  type="text" 
                  value={currentArticle.title} 
                  onChange={e => setCurrentArticle({...currentArticle, title: e.target.value})}
                  className="w-full bg-surface p-3 rounded-lg border border-outline focus:ring-2 ring-primary outline-none"
                  placeholder="Le titre de l'article"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 opacity-70">Catégorie</label>
                <select 
                  value={currentArticle.category} 
                  onChange={e => setCurrentArticle({...currentArticle, category: e.target.value})}
                  className="w-full bg-surface p-3 rounded-lg border border-outline focus:ring-2 ring-primary outline-none text-on-surface"
                >
                  <option value="Films">Films</option>
                  <option value="Séries">Séries</option>
                  <option value="Top Lists">Top Lists</option>
                  <option value="Actu">Actu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 opacity-70">Image URL</label>
                <input 
                  type="text" 
                  value={currentArticle.image} 
                  onChange={e => setCurrentArticle({...currentArticle, image: e.target.value})}
                  className="w-full bg-surface p-3 rounded-lg border border-outline focus:ring-2 ring-primary outline-none"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1 opacity-70">Temps de lecture</label>
                  <input 
                    type="text" 
                    value={currentArticle.readTime} 
                    onChange={e => setCurrentArticle({...currentArticle, readTime: e.target.value})}
                    className="w-full bg-surface p-3 rounded-lg border border-outline focus:ring-2 ring-primary outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1 opacity-70">Note / 5</label>
                  <input 
                    type="number" 
                    min="0" max="5" step="0.5"
                    value={currentArticle.rating} 
                    onChange={e => setCurrentArticle({...currentArticle, rating: parseFloat(e.target.value)})}
                    className="w-full bg-surface p-3 rounded-lg border border-outline focus:ring-2 ring-primary outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="trending"
                  checked={currentArticle.trending} 
                  onChange={e => setCurrentArticle({...currentArticle, trending: e.target.checked})}
                  className="w-5 h-5 accent-primary"
                />
                <label htmlFor="trending" className="font-bold cursor-pointer">Mettre en tendance</label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 opacity-70">Extrait (Excerpt)</label>
                <textarea 
                  value={currentArticle.excerpt} 
                  onChange={e => setCurrentArticle({...currentArticle, excerpt: e.target.value})}
                  rows={3}
                  className="w-full bg-surface p-3 rounded-lg border border-outline focus:ring-2 ring-primary outline-none resize-none"
                  placeholder="Bref résumé de l'article..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 opacity-70">Contenu (Markdown)</label>
                <textarea 
                  value={currentArticle.content} 
                  onChange={e => setCurrentArticle({...currentArticle, content: e.target.value})}
                  rows={10}
                  className="w-full bg-surface p-3 rounded-lg border border-outline focus:ring-2 ring-primary outline-none font-mono text-sm"
                  placeholder="# Hello World..."
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="animate-spin" size={20} /> : 'Publier l\'article'}
              </button>
            </div>
          </form>
        </motion.section>
      ) : (
        <div className="space-y-4">
          {articles.length === 0 && (
            <div className="text-center py-20 bg-surface-variant rounded-2xl">
              <p className="text-on-surface-variant mb-4">Aucun article trouvé dans Firestore.</p>
              <button 
                onClick={async () => {
                  setLoading(true);
                  await migrateToFirestore();
                  await loadArticles();
                }}
                className="text-primary font-bold hover:underline"
              >
                Importer les articles statiques vers Firestore
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {articles.map((article) => (
                <motion.div 
                  key={article.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center justify-between p-4 bg-surface-variant rounded-xl border border-outline/50 group hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={article.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">{article.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{article.category}</span>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => startEdit(article)}
                      className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                      title="Modifier"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(article.id)}
                      className="p-2 text-on-surface-variant hover:text-error transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                    <ChevronRight size={18} className="text-on-surface-variant opacity-20" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};
