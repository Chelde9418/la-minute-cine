/// <reference types="vite/client" />
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Article } from '../types';

const COLLECTION_NAME = 'articles';

// Static files (for initial migration or fallback)
const articleFiles = import.meta.glob('../content/articles/*.md', { query: '?raw', eager: true });

export const getStaticArticles = (): Article[] => {
  const articles: Article[] = [];
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
  return articles;
};

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    const articles = snapshot.docs.map(doc => doc.data() as Article);
    
    // If Firestore is empty, we show static articles
    if (articles.length === 0) {
      return getStaticArticles().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    return articles;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    return [];
  }
};

export const getArticleById = async (id: string): Promise<Article | undefined> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as Article;
    }
    
    // Fallback to static
    return getStaticArticles().find(a => a.id === id);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${COLLECTION_NAME}/${id}`);
    return undefined;
  }
};

export const saveArticle = async (article: Article): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, article.id);
    await setDoc(docRef, { ...article, date: article.date || new Date().toISOString() });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${article.id}`);
  }
};

export const deleteArticle = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
  }
};

// Migration tool to move static files to Firestore
export const migrateToFirestore = async (): Promise<void> => {
  const statics = getStaticArticles();
  for (const article of statics) {
    await saveArticle(article);
  }
};
