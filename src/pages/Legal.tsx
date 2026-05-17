import { motion } from 'motion/react';
import { getSiteContent } from '../services/adminService';
import Markdown from 'react-markdown';

export function Legal() {
  const { legal } = getSiteContent();

  return (
    <div className="animate-fade-in pt-10">
      <header className="max-w-4xl mx-auto px-6 py-12 border-b border-outline-variant/30 mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black text-on-surface mb-4 tracking-tighter"
        >
          Mentions Légales
        </motion.h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20 prose prose-invert prose-on-surface max-w-none">
        <div className="text-on-surface-variant leading-relaxed">
          <Markdown>{legal}</Markdown>
        </div>
      </main>
    </div>
  );
}

export function Privacy() {
  const { privacy } = getSiteContent();

  return (
    <div className="animate-fade-in pt-10">
      <header className="max-w-4xl mx-auto px-6 py-12 border-b border-outline-variant/30 mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black text-on-surface mb-4 tracking-tighter"
        >
          Confidentialité
        </motion.h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20 prose prose-invert prose-on-surface max-w-none">
        <div className="text-on-surface-variant leading-relaxed">
          <Markdown>{privacy}</Markdown>
        </div>
      </main>
    </div>
  );
}
