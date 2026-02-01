
import { HOCKEY_DATABASE } from '../mockNewData';
import { AIQueryResponse, HockeyPlayerEntry } from '../types';

export function executeQuery(query: AIQueryResponse): HockeyPlayerEntry[] {
  // First filter by the detected situation
  let data = HOCKEY_DATABASE.filter(p => p.situation === query.situation);

  // If we found no data for a specific situation (like 'other'), fall back to 'all'
  if (data.length === 0) {
    data = HOCKEY_DATABASE.filter(p => p.situation === 'all');
  }

  // Apply sorting based on the numeric key provided by AI
  data.sort((a, b) => {
    const valA = Number(a[query.yAxisKey]) || 0;
    const valB = Number(b[query.yAxisKey]) || 0;
    
    if (query.sortDirection === 'desc') {
      return valB - valA;
    } else {
      return valA - valB;
    }
  });

  // Take top results and return a clean set of objects
  return data.slice(0, query.limit || 8).map(item => ({...item}));
}
