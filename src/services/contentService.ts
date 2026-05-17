import { Article } from '../types';

// Use Vite's import.meta.glob to find all markdown files in src/content/articles
const articleFiles = import.meta.glob('../content/articles/*.md', { query: '?raw', eager: true });

export const getAllArticles = (): Article[] => {
  const articles: Article[] = [];

  for (const path in articleFiles) {
    try {
      const content = (articleFiles[path] as any).default;
      
      // Simple manual frontmatter parser to avoid Buffer/gray-matter issues in browser
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
        rating: data.rating ? parseInt(data.rating) : undefined
      });
    } catch (e) {
      console.error("Failed to parse article:", path, e);
    }
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getArticleById = (id: string): Article | undefined => {
  return getAllArticles().find(a => a.id === id);
};
