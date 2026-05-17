
const VIEWS_KEY = 'lmc-article-views';

export function recordView(id: string) {
  const viewsRaw = localStorage.getItem(VIEWS_KEY);
  let views: Record<string, number> = {};
  
  if (viewsRaw) {
    try {
      views = JSON.parse(viewsRaw);
    } catch (e) {}
  }

  // Initialize with a realistic base if it doesn't exist
  if (!views[id]) {
    // Deterministic random-ish starting number based on ID string
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    views[id] = 1200 + (seed % 800); 
  }

  views[id] += 1;
  localStorage.setItem(VIEWS_KEY, JSON.stringify(views));
  return views[id];
}

export function getViewCount(id: string) {
  const viewsRaw = localStorage.getItem(VIEWS_KEY);
  if (viewsRaw) {
    try {
      const views = JSON.parse(viewsRaw);
      if (views[id]) return views[id];
    } catch (e) {}
  }
  
  // Return a stable initial count if never viewed
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 1200 + (seed % 800);
}
