/**
 * Data service layer — provides products from Supabase when configured,
 * or falls back to the local hardcoded data in products.js.
 *
 * This abstraction lets the app work identically in both modes.
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  products as localProducts,
  categories as localCategories,
  collectionsInfo as localCollectionsInfo,
  getProductById as localGetProductById,
  getProductsByCollection as localGetProductsByCollection,
  getCollectionInfo as localGetCollectionInfo,
} from '../data/products';

// ─── Products ──────────────────────────────────────────────

/**
 * Fetches all products. Returns Supabase data when available,
 * otherwise returns the local hardcoded list.
 */
export async function fetchProducts() {
  if (!isSupabaseConfigured) return localProducts;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id');

  if (error) {
    console.warn('Supabase fetchProducts failed, using local data:', error.message);
    return localProducts;
  }
  return data;
}

/**
 * Fetches a single product by ID.
 */
export async function fetchProductById(id) {
  if (!isSupabaseConfigured) return localGetProductById(id);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.warn('Supabase fetchProductById failed, using local data:', error.message);
    return localGetProductById(id);
  }
  return data;
}

/**
 * Fetches products by collection slug.
 */
export async function fetchProductsByCollection(slug) {
  if (!isSupabaseConfigured) return localGetProductsByCollection(slug);

  if (slug === 'new-arrivals') return fetchProducts();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', slug)
    .order('id');

  if (error) {
    console.warn('Supabase fetchProductsByCollection failed, using local data:', error.message);
    return localGetProductsByCollection(slug);
  }
  return data;
}

// ─── Categories / Collections (remain local — they're structural) ──

export function getCategories() {
  return localCategories;
}

export function getCollectionInfo(slug) {
  return localGetCollectionInfo(slug);
}

// ─── Wishlist Sync (optional — only when Supabase auth is active) ──

/**
 * Saves a user's wishlist to Supabase so it persists across devices.
 */
export async function syncWishlistToCloud(userId, wishlistItems) {
  if (!isSupabaseConfigured || !userId) return;

  const { error } = await supabase
    .from('wishlists')
    .upsert(
      { user_id: userId, items: wishlistItems },
      { onConflict: 'user_id' }
    );

  if (error) console.warn('Wishlist sync failed:', error.message);
}

/**
 * Fetches the user's wishlist from Supabase.
 */
export async function fetchWishlistFromCloud(userId) {
  if (!isSupabaseConfigured || !userId) return null;

  const { data, error } = await supabase
    .from('wishlists')
    .select('items')
    .eq('user_id', userId)
    .single();

  if (error) return null;
  return data?.items || [];
}
