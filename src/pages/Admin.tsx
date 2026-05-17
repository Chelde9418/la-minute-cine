
import { useState, useEffect } from 'react';
import { getAllArticles, updateArticleLocal } from '../services/contentService';
import { getSiteContent, updateSiteContent } from '../services/adminService';
import { getViewCount } from '../services/viewService';
import { Article } from '../types';
import { motion } from 'motion/react';
import { Save, Edit3, Trash2, Plus, FileText, Shield, CheckCircle2, ChevronRight, LayoutDashboard, Eye } from 'lucide-react';
import Markdown from 'react-markdown';

type AdminTab = 'articles' | 'legal' | 'privacy';

export function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const [siteSettings, setSiteSettings] = useState(getSiteContent());
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setArticles(getAllArticles());
  }, []);

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    updateArticleLocal(editingArticle);
    setArticles(getAllArticles());
    setEditingArticle(null);
    showSuccess('Article mis à jour avec succès (localement)');
  };

  const handleSaveSettings = () => {
    updateSiteContent(siteSettings);
    showSuccess('Paramètres du site mis à jour');
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-on-surface tracking-tight mb-2">Administration</h1>
          <p className="text-on-surface-variant">Gérez le contenu de votre site en toute simplicité.</p>
        </div>
        
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-primary-container/20 text-on-surface px-4 py-2 rounded-full border border-primary-container/30"
          >
            <CheckCircle2 size={16} className="text-primary-container" />
            <span className="text-sm font-bold">{successMsg}</span>
          </motion.div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
        {/* Navigation Sidebar */}
        <aside className="space-y-2">
          <button 
            onClick={() => setActiveTab('articles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'articles' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            <FileText size={18} /> Articles
          </button>
          <button 
            onClick={() => setActiveTab('legal')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'legal' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            <Shield size={18} /> Mentions Légales
          </button>
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'privacy' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            <Shield size={18} /> Confidentialité
          </button>
        </aside>

        {/* Content Area */}
        <main className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30 min-h-[600px]">
          {activeTab === 'articles' && (
            <div className="space-y-6">
              {editingArticle ? (
                <form onSubmit={handleSaveArticle} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black uppercase text-on-surface">Modifier : {editingArticle.title}</h2>
                    <button 
                      type="button" 
                      onClick={() => setEditingArticle(null)}
                      className="text-xs font-bold text-on-surface-variant hover:text-on-surface"
                    >
                      Annuler
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-on-surface-variant">Titre</label>
                      <input 
                        type="text" 
                        value={editingArticle.title}
                        onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                        className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-on-surface-variant">Catégorie</label>
                      <input 
                        type="text" 
                        value={editingArticle.category}
                        onChange={e => setEditingArticle({...editingArticle, category: e.target.value})}
                        className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-on-surface-variant">Image URL</label>
                    <input 
                      type="text" 
                      value={editingArticle.image}
                      onChange={e => setEditingArticle({...editingArticle, image: e.target.value})}
                      className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-on-surface-variant">Extrait (Excerpt)</label>
                    <textarea 
                      rows={2}
                      value={editingArticle.excerpt || ''}
                      onChange={e => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                      className="w-full bg-surface-container-highest rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-primary-container outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-on-surface-variant">Contenu (Markdown)</label>
                      <textarea 
                        rows={15}
                        value={editingArticle.content || ''}
                        onChange={e => setEditingArticle({...editingArticle, content: e.target.value})}
                        className="w-full bg-surface-container-highest rounded-xl px-4 py-4 text-sm font-mono focus:ring-2 focus:ring-primary-container outline-none h-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-on-surface-variant">Aperçu du contenu</label>
                      <div className="w-full bg-surface-container border border-outline-variant/10 rounded-xl px-6 py-6 overflow-y-auto max-h-[500px] prose prose-invert prose-sm">
                        <Markdown>{editingArticle.content || ''}</Markdown>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary-container text-white font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Enregistrer
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-black uppercase text-on-surface">Liste des articles</h2>
                  </div>
                  <div className="grid gap-4">
                    {articles.map(article => (
                      <div key={article.id} className="flex items-center justify-between p-4 bg-surface-container rounded-2xl border border-outline-variant/10 group hover:border-primary-container/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={article.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-on-surface">{article.title}</h3>
                            <div className="flex items-center gap-3">
                              <p className="text-[10px] text-on-surface-variant uppercase font-black">{article.category}</p>
                              <div className="flex items-center gap-1 text-[10px] text-on-surface-variant font-bold">
                                <Eye size={10} className="text-primary-container" />
                                {getViewCount(article.id).toLocaleString()} vues
                              </div>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setEditingArticle(article)}
                          className="p-2 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded-lg transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {(activeTab === 'legal' || activeTab === 'privacy') && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black uppercase text-on-surface">
                  Modifier {activeTab === 'legal' ? 'les Mentions Légales' : 'la Confidentialité'}
                </h2>
                <button 
                  onClick={() => setShowPreview(!showPreview)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${showPreview ? 'bg-primary-container text-white' : 'bg-surface-container-highest text-on-surface'}`}
                >
                  <Eye size={14} /> {showPreview ? 'Masquer Aperçu' : 'Voir Aperçu'}
                </button>
              </div>

              {showPreview ? (
                <div className="bg-surface-container rounded-2xl p-6 prose prose-invert prose-sm max-w-none border border-outline-variant/10">
                  <Markdown>{activeTab === 'legal' ? siteSettings.legal : siteSettings.privacy}</Markdown>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-on-surface-variant">Contenu (Markdown)</label>
                  <textarea 
                    rows={20}
                    value={activeTab === 'legal' ? siteSettings.legal : siteSettings.privacy}
                    onChange={e => setSiteSettings({
                      ...siteSettings, 
                      [activeTab]: e.target.value
                    })}
                    className="w-full bg-surface-container-highest rounded-xl px-4 py-4 text-sm font-mono focus:ring-2 focus:ring-primary-container outline-none"
                  />
                </div>
              )}
              
              <button 
                onClick={handleSaveSettings}
                className="w-full py-4 bg-primary-container text-white font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} /> Enregistrer les modifications
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
