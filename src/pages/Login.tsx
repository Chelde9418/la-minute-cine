import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle } from '../lib/firebase';
import { LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (loading) return null;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface-variant p-8 rounded-2xl shadow-xl text-center"
      >
        <h1 className="text-3xl font-bold mb-4 font-display">Connexion Admin</h1>
        <p className="text-on-surface-variant mb-8">
          Seul l'administrateur peut accéder à cette section pour rédiger ou supprimer des articles.
        </p>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 w-full bg-primary text-on-primary py-3 px-6 rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg active:scale-95"
        >
          <LogIn size={20} />
          Se connecter avec Google
        </button>
      </motion.div>
    </div>
  );
};
