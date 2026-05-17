import { Menu, Search, Moon, Sun, Film, Tv, Star, LayoutList, Bell, Share2, MessageSquare, Mail, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { LATEST_MOVIES, TOP_SERIES } from '../constants';
import { Movie } from '../types';
import { getAllArticles } from '../services/contentService';

export function Navbar() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Get CMS articles and convert to Movie format for search
    const cmsMovies: Movie[] = getAllArticles().map(a => ({
      id: a.id,
      title: a.title,
      type: (a.category.toLowerCase().includes('série') ? 'serie' : 'film') as any,
      image: a.image,
      duration: a.readTime,
      genre: a.category,
      description: a.excerpt,
      isNew: true // Articles from CMS are typically fresh
    }));

    const allContent = [...cmsMovies, ...LATEST_MOVIES, ...TOP_SERIES];
    const filtered = allContent.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.genre.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const toggleTheme = () => setIsDark(!isDark);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Films', path: '/films' },
    { label: 'Séries', path: '/series' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-lg border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-2xl font-black text-primary-container tracking-tighter hover:opacity-90 transition-opacity">
              LaMinuteCinéma
            </Link>
            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-container ${
                    location.pathname === item.path ? 'text-primary-container border-b-2 border-primary-container pb-1' : 'text-on-surface'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
              className="p-2 text-on-surface hover:text-primary-container transition-colors"
              title="Rechercher"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 text-on-surface hover:text-primary-container transition-colors"
              title={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-on-surface hover:text-primary-container transition-colors"
              title="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-surface pt-24 px-6 md:hidden flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`text-4xl font-black transition-colors ${
                    location.pathname === item.path ? 'text-primary-container' : 'text-on-surface'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto pb-12 space-y-6">
              <div className="flex gap-6">
                <Share2 size={24} className="text-on-surface-variant hover:text-primary-container cursor-pointer transition-colors" />
                <Tv size={24} className="text-on-surface-variant hover:text-primary-container cursor-pointer transition-colors" />
                <Bell size={24} className="text-on-surface-variant hover:text-primary-container cursor-pointer transition-colors" />
              </div>
              <p className="text-sm text-on-surface-variant">© 2024 LaMinuteCinéma</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface/95 backdrop-blur-xl flex flex-col items-center pt-32 px-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-3 text-on-surface-variant hover:text-primary-container transition-colors"
            >
              <X size={32} />
            </button>

            <div className="w-full max-w-3xl">
              <input 
                autoFocus
                type="text"
                placeholder="Rechercher un film ou une série..."
                className="w-full bg-transparent border-b-4 border-outline-variant focus:border-primary-container outline-none text-4xl font-black text-on-surface placeholder:text-on-surface-variant/30 pb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                {searchResults.map((result) => (
                  <Link 
                    key={result.id}
                    to={`/movies/${result.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex gap-4 group"
                  >
                    <div className="w-24 aspect-[2/3] rounded overflow-hidden flex-shrink-0">
                      <img src={result.image} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-primary-container uppercase tracking-widest">{result.genre}</span>
                      <h4 className="text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">{result.title}</h4>
                      <p className="text-sm text-on-surface-variant line-clamp-2 mt-1">{result.description}</p>
                    </div>
                  </Link>
                ))}
                
                {searchQuery && searchResults.length === 0 && (
                  <p className="text-on-surface-variant">Aucun résultat trouvé pour "{searchQuery}"</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <span className="text-xl font-bold text-primary-container block">LaMinuteCinéma</span>
          <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
            Votre dose quotidienne de critique experte et d'actualité cinématographique premium.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-6">Navigation</h4>
          <div className="flex flex-col gap-3">
            <Link to="/mentions-legales" className="text-sm text-on-surface-variant hover:text-primary-container transition-colors">Mentions Légales</Link>
            <Link to="/confidentialite" className="text-sm text-on-surface-variant hover:text-primary-container transition-colors">Confidentialité</Link>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-6">Suivez-nous</h4>
          <div className="flex gap-4">
            <Share2 size={20} className="text-on-surface-variant hover:text-primary-container cursor-pointer transition-colors" />
            <Tv size={20} className="text-on-surface-variant hover:text-primary-container cursor-pointer transition-colors" />
            <Bell size={20} className="text-on-surface-variant hover:text-primary-container cursor-pointer transition-colors" />
          </div>
          <p className="text-xs text-on-surface-variant mt-8">© 2024 LaMinuteCinéma. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
