/// <reference types="vite/client" />
import { Article } from '../types';

// Use Vite's import.meta.glob to find all markdown files in src/content/articles
const articleFiles = import.meta.glob('../content/articles/*.md', { query: '?raw', eager: true });

const ARTICLE_OVERRIDES_KEY = 'lmc-article-overrides';

export const getAllArticles = (): Article[] => {
  const articles: Article[] = [];

  // 1. Load static articles from files
  for (const path in articleFiles) {
    try {
      const content = (articleFiles[path] as any).default;
      
      const match = content.match(/^---([\s\S]*?)---([\s\S]*)$/);
      if (!match) continue;

      const frontmatterRaw = match[1];
      const body = match[2].trim();
      
      const data: any = {};
      frontmatterRaw.split('\n').forEach((line: string) => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim().replace(/^["'](.*)["']$/, '$1');
          data[key.trim()] = value;
        }
      });
      
      const idFromPath = path.split('/').pop()?.replace('.md', '') || '';
      
      articles.push({
        id: data.id || idFromPath,
        title: data.title || '',
        category: data.category || 'Films',
        image: data.image || '',
        readTime: data.readTime || '',
        author: data.author || 'LMC Team',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString(),
        content: body,
        rating: data.rating ? parseInt(data.rating) : undefined,
        trending: data.trending === 'true' || data.trending === true
      });
    } catch (e) {
      console.error("Failed to parse article:", path, e);
    }
  }

  // 2. Merge with localStorage overrides
  const overridesRaw = localStorage.getItem(ARTICLE_OVERRIDES_KEY);
  if (overridesRaw) {
    try {
      const overrides: Article[] = JSON.parse(overridesRaw);
      overrides.forEach(override => {
        const index = articles.findIndex(a => a.id === override.id);
        if (index !== -1) {
          articles[index] = override; // Update existing
        } else {
          articles.push(override); // Add new
        }
      });
    } catch (e) {
      console.error("Failed to parse article overrides", e);
    }
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const updateArticleLocal = (article: Article) => {
  const overridesRaw = localStorage.getItem(ARTICLE_OVERRIDES_KEY);
  let overrides: Article[] = [];
  if (overridesRaw) {
    try {
      overrides = JSON.parse(overridesRaw);
    } catch (e) {}
  }

  const index = overrides.findIndex(a => a.id === article.id);
  if (index !== -1) {
    overrides[index] = article;
  } else {
    overrides.push(article);
  }

  localStorage.setItem(ARTICLE_OVERRIDES_KEY, JSON.stringify(overrides));
};

export const getArticleById = (id: string): Article | undefined => {
  return getAllArticles().find(a => a.id === id);
};
