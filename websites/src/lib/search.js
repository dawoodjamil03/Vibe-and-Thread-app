/**
 * Fuzzy search engine powered by Fuse.js.
 *
 * Handles typos gracefully (e.g., "korta" → "kurta", "aksesory" → "accessories").
 * Works entirely client-side — no API costs, no rate limits, instant results.
 */
import Fuse from 'fuse.js';
import { products } from '../data/products';

const fuseOptions = {
  // Which fields to search
  keys: [
    { name: 'name', weight: 0.45 },
    { name: 'categoryLabel', weight: 0.25 },
    { name: 'description', weight: 0.2 },
    { name: 'category', weight: 0.1 },
  ],
  // How fuzzy the matching is (0 = perfect match, 1 = match anything)
  threshold: 0.4,
  // Ignore case
  ignoreLocation: true,
  // Minimum characters before searching
  minMatchCharLength: 2,
  // Include match score in results
  includeScore: true,
};

// Create the Fuse index once — it's reused on every search
let fuseInstance = new Fuse(products, fuseOptions);

/**
 * Rebuild the Fuse index (call if products change, e.g. from Supabase fetch)
 */
export function rebuildSearchIndex(productList) {
  fuseInstance = new Fuse(productList, fuseOptions);
}

/**
 * Perform a fuzzy search.
 * @param {string} query - The search term (can have typos)
 * @param {number} limit - Maximum results to return
 * @returns {Array} - Array of product objects, sorted by relevance
 */
export function fuzzySearch(query, limit = 8) {
  if (!query || query.trim().length < 2) return [];

  const results = fuseInstance.search(query.trim(), { limit });

  // Return just the product objects (Fuse wraps them in { item, score })
  return results.map((result) => result.item);
}
